<script setup lang="ts">
import { NewsType } from "~~/services/types/news";
import { useTruncate } from "~~/composables/useTruncate";
import { communityService, usersService } from "~~/services";
import { UserType } from "~~/services/types/users";
import { CommunityTypes } from "~~/services/types/community";
import Swal from "sweetalert2";
import AddModal from "~~/components/dashboard/AddModal.vue";

const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/heic"];
const { truncateText } = useTruncate();
const communityRef = ref<CommunityTypes[]>([]);
const token = useCookie("accessToken");
const modalRef = ref();
const modalTitle = ref("");
const userData = ref<UserType[]>([]);
const { handleUploadSingleFile, inpFileAttachment } =
  useFileUpload(allowedFileTypes);
const conf = useRuntimeConfig();
const path = "community";
definePageMeta({
  middleware: ["auth"],
});

//pagination
const currentPage = ref(1);
const itemsPerPage = 10;
const searchQuery = ref("");

const communityData = ref({
  id: "",
  name: "",
  description: "",
  address: "",
  leader: "",
  communityImage: "",
});

onMounted(() => {
  fetchUsers();
  fetchCommunities();
});

const fetchUsers = () => {
  usersService.getUsers(token.value).then((res) => {
    userData.value = res.data;
  });
};

const fetchCommunities = () => {
  communityService.getCommunities(token.value).then((res) => {
    communityRef.value = res.data;
  });
};

const openAddModal = () => {
  modalTitle.value = "Add Data";
  modalRef.value?.show();
};

const openEditModal = async (id: string) => {
  const commmunityResponse = await communityService.getDataById(
    token.value,
    id
  );
  communityData.value.id = commmunityResponse.data.id;
  communityData.value.name = commmunityResponse.data.name;
  communityData.value.description = commmunityResponse.data.description;
  communityData.value.address = commmunityResponse.data.address;
  communityData.value.leader = commmunityResponse.data.id;

  if (
    commmunityResponse.data.file_name != null &&
    commmunityResponse.data.file_name != "" &&
    commmunityResponse.data.file_name != undefined
  ) {
    communityData.value.communityImage =
      conf.public.baseImageUrl +
      "/" +
      path +
      "/" +
      commmunityResponse.data.file_name;
  }

  modalTitle.value = "Change Data";
  modalRef.value?.show();
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("name", communityData.value.name);
    formData.append("description", communityData.value.description);
    formData.append("address", communityData.value.address);
    formData.append("leader", communityData.value.leader);

    if (inpFileAttachment.value) {
      formData.append("file", inpFileAttachment.value);
    }

    if (communityData.value.id !== "") {
      formData.append("id", communityData.value.id);
    }

    const response = await communityService.createOrUpdate(
      token.value,
      formData
    );

    Swal.fire({
      icon: "success",
      title: `Success`,
      text: `${response.message}`,
      showConfirmButton: false,
      timer: 1500,
    });

    fetchCommunities();
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
  communityData.value = {
    id: "",
    name: "",
    description: "",
    address: "",
    leader: "",
    communityImage: "",
  };
  inpFileAttachment.value = null;
};

const deleteData = (id: string) => {
  Swal.fire({
    title: "Are You Sure?",
    text: `Delete Community Data`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "No, cancel!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      communityService.deleteData(token.value, id).then((res) => {
        Swal.fire({
          title: "Community Deleted",
          text: "Community Deleted Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchCommunities();
        clearData();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      closeModal();
    }
  });
};

const filteredData = computed(() => {
  if (!searchQuery.value) return communityRef.value;
  return communityRef.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
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
    Tambah Data
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
          placeholder="Search Name"
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
          v-model="communityData.name"
          type="text"
          placeholder="Name"
          class="input input-bordered w-full border max-w-md bg-white"
        />
      </div>
      <div class="w-full flex flex-col gap-2">
        <div class="label">
          <span>Description</span>
        </div>
        <textarea
          class="textarea textarea-bordered h-24 bg-white border"
          v-model="communityData.description"
          placeholder="Description"
        ></textarea>
      </div>
      <div class="w-full flex flex-col gap-2">
        <span>Address</span>
        <input
          v-model="communityData.address"
          type="text"
          placeholder="Name"
          class="input input-bordered w-full border max-w-md bg-white"
        />
      </div>
      <div class="w-full flex flex-col gap-2">
        <span>Role</span>
        <select
          v-model="communityData.leader"
          name="role"
          id="role"
          class="select w-full max-w-md bg-white border"
        >
          <option value="" disabled selected>Select a role</option>
          <option v-for="i in userData" :key="i.id" :value="i.id">
            {{ i.name }}
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
        v-if="
          communityData.communityImage != '' &&
          communityData.communityImage != null
        "
      >
        <span>Community Image</span>
        <img
          :src="communityData.communityImage"
          alt="community-image"
          class="h-20 mt-3"
        />
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
          <th>Description</th>
          <th>Address</th>
          <th>Leader</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in paginatedData" :key="i.id">
          <td>{{ index + 1 }}</td>
          <td>{{ truncateText(i?.name, 15) ?? "-" }}</td>
          <td>{{ truncateText(i?.description, 20) ?? "-" }}</td>
          <td>{{ i?.address ?? "-" }}</td>
          <td>{{ i?.leader?.name ?? "-" }}</td>
          <td>{{ i?.status ?? "-" }}</td>
          <td class="flex gap-2">
            <button
              class="btn btn-square btn-outline border"
              @click.stop="openEditModal(i.id)"
            >
              <i class="edit-icons"></i>
            </button>
            <button
              class="btn btn-square btn-outline border"
              @click.stop="deleteData(i.id)"
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
