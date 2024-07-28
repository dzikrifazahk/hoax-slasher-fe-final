<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usersService } from "~~/services";
import { UserType } from "~~/services/types/users";
import AddModal from "~~/components/dashboard/AddModal.vue";
import { useTruncate } from "~~/composables/useTruncate";
import { ERole } from "~~/services/types/role";
import { useFileUpload } from "~~/composables/useFileUpload";
import Swal from "sweetalert2";
const conf = useRuntimeConfig();
const path = "user-image";

const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/heic"];

const { truncateText } = useTruncate();
const { handleUploadSingleFile, inpFileAttachment } =
  useFileUpload(allowedFileTypes);
const usersRef = ref<UserType[]>([]);
const token = useCookie("accessToken");
const modalRef = ref();
const modalTitle = ref("");
const roles = Object.values(ERole);
const selectedData = ref<UserType>();

//pagination
const currentPage = ref(1);
const itemsPerPage = 10;
const searchQuery = ref("");

const userData = ref({
  id: "",
  name: "",
  email: "",
  password: "",
  role: "",
  userImage: "",
});

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  fetchUsers();
});

const fetchUsers = () => {
  usersService.getUsers(token.value).then((res) => {
    usersRef.value = res.data;
  });
};

const openAddModal = () => {
  modalTitle.value = "Add Data";
  modalRef.value?.show();
};

const openEditModal = async (id: string) => {
  const getUserData = await usersService.getUserById(token.value, id);
  userData.value.id = getUserData.data.id;
  userData.value.name = getUserData.data.name;
  userData.value.email = getUserData.data.email;
  userData.value.role = getUserData.data.role;
  if (
    getUserData.data.file_name != null &&
    getUserData.data.file_name != "" &&
    getUserData.data.file_name != undefined
  ) {
    userData.value.userImage =
      conf.public.baseImageUrl + "/" + path + "/" + getUserData.data.file_name;
  }

  modalTitle.value = "Change Data - Fill Password If Want To Change";
  modalRef.value?.show();
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("name", userData.value.name);
  formData.append("email", userData.value.email);
  if (userData.value.password) {
    formData.append("password", userData.value.password);
  }
  formData.append("role", userData.value.role);
  if (inpFileAttachment.value) {
    formData.append("file", inpFileAttachment.value);
  }

  try {
    let response;
    if (userData.value.id) {
      response = await usersService.editUser(
        token.value,
        userData.value.id,
        formData
      );
      Swal.fire({
        icon: "success",
        title: `Success`,
        text: `Change Data ${response.name}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      response = await usersService.createUser(token.value, formData);
      Swal.fire({
        icon: "success",
        title: `Success`,
        text: `UserId: ${response.userId}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }


    fetchUsers();
    closeModal();
  } catch (error) {
    console.error("Error:", error);
  }
};

const closeModal = () => {
  clearData();
  modalRef.value?.close();
};

const clearData = () => {
  userData.value = {
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    userImage: "",
  };
  inpFileAttachment.value = null;
};

const deleteUser = (id: string) => {
  Swal.fire({
    title: "Are You Sure?",
    text: `Delete User Data`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "No, cancel!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      usersService.deleteUser(token.value, id).then((res) => {
        Swal.fire({
          title: "User Deleted",
          text: "User Deleted Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchUsers();
        clearData();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      closeModal();
    }
  });
};

const filteredData = computed(() => {
  if (!searchQuery.value) return usersRef.value;
  return usersRef.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredData.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage);
});

const setPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<template>
  <button class="btn bg-[#FA3454] text-white mb-5" @click="openAddModal">
    Add Data
  </button>
  <!-- search -->
  <div class="flex">
    <div class="w-full"></div>
    <div class="w-1/2">
      <label
        class="input input-bordered border-gray-400 flex items-center gap-2 bg-white"
      >
        <input
          type="text"
          class="grow"
          placeholder="Search Name, Email"
          v-model="searchQuery"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
    </div>
  </div>

  <AddModal ref="modalRef" :title="modalTitle">
    <div class="flex flex-col gap-3">
      <div class="w-full flex flex-col gap-2">
        <span>Name</span>
        <input
          v-model="userData.name"
          type="text"
          placeholder="Name"
          class="input input-bordered w-full border max-w-md bg-white"
        />
      </div>
      <div class="w-full flex flex-col gap-2">
        <span>Email</span>
        <input
          v-model="userData.email"
          type="text"
          placeholder="Email"
          class="input input-bordered w-full border max-w-md bg-white"
        />
      </div>
      <div class="w-full flex flex-col gap-2">
        <span>Password</span>
        <input
          v-model="userData.password"
          type="password"
          placeholder="Password"
          class="input input-bordered w-full border max-w-md bg-white"
        />
      </div>
      <div class="w-full flex flex-col gap-2">
        <span>Role</span>
        <select
          v-model="userData.role"
          name="role"
          id="role"
          class="select w-full max-w-md bg-white border"
        >
          <option value="" disabled selected>Select a role</option>
          <option v-for="role in roles" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
      </div>
      <div class="w-full flex flex-col gap-2">
        <span>Choose Image</span>
        <input
          @change="handleUploadSingleFile"
          type="file"
          accept=".jpeg, .jpg, .png, .heic"
          class="file-input file-input-bordered w-full max-w-md bg-gray-200"
        />
      </div>
      <div
        class="h-auto"
        v-if="userData.userImage != '' && userData.userImage != null"
      >
        <span>Image Profile</span>
        <img :src="userData.userImage" alt="user-image" class="h-20 mt-3" />
      </div>
      <hr />
      <div class="modal-action">
        <button
          class="btn w-1/2 max-w-xs bg-[#C0244F] text-white"
          @click="handleSubmit"
        >
          Submit
        </button>
        <button class="btn btn-square" @click="clearData()">
          <i class="refresh-icons"></i>
        </button>
        <button class="btn" @click="closeModal()">Close</button>
      </div>
    </div>
  </AddModal>

  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in paginatedData" :key="i.id">
          <td>{{ index + 1 }}</td>
          <td>{{ truncateText(i?.name, 15) ?? "-" }}</td>
          <td>{{ truncateText(i?.email, 20) ?? "-" }}</td>
          <td>{{ i?.role ?? "-" }}</td>
          <td class="flex gap-2">
            <button
              class="btn btn-square btn-outline border"
              @click="openEditModal(i.id)"
            >
              <i class="edit-icons"></i>
            </button>
            <button
              class="btn btn-square btn-outline border"
              @click.stop="deleteUser(i.id)"
            >
              <i class="delete-icons"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-end mt-4">
    <div class="mr-5">
      <span
        >Page <b>{{ currentPage }}</b> from <b>{{ totalPages }}</b></span
      >
    </div>
    <div class="join">
      <button
        class="join-item btn btn-sm"
        v-for="page in totalPages"
        :key="page"
        :class="{ 'bg-[#C0244F]': currentPage === page }"
        @click="setPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
