<script setup lang="ts">
import { useTruncate } from "~~/composables/useTruncate";
import AddModal from "~~/components/dashboard/AddModal.vue";
import { trustedSourceService } from "~~/services";
import { IAddPayload, ITrustedSource } from "~~/services/types/trusted-source";
import Swal from "sweetalert2";

const { truncateText } = useTruncate();
const trustedSourceRef = ref<ITrustedSource[]>([]);
const token = useCookie("accessToken");
const modalRef = ref();
const modalTitle = ref("");

//pagination
const currentPage = ref(1);
const itemsPerPage = 10;
const searchQuery = ref("");

const trustedCompanyData = ref({
  id: "",
  name: "",
  description: "",
  email: "",
});

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  fetchTrustedSource();
});

const fetchTrustedSource = () => {
  trustedSourceService.getDatas(token.value).then((res) => {
    trustedSourceRef.value = res.data;
  });
};

const openAddModal = () => {
  modalTitle.value = "Add Data";
  modalRef.value?.show();
};

const openEditModal = async (id: string) => {
  const gettrustedCompanyData = await trustedSourceService.getDataById(id);
  trustedCompanyData.value.name = gettrustedCompanyData.data.company_name;
  trustedCompanyData.value.description = gettrustedCompanyData.data.company_description;
  trustedCompanyData.value.email = gettrustedCompanyData.data.company_email;
  trustedCompanyData.value.id = gettrustedCompanyData.data.id;

  modalTitle.value = "Change Data";
  modalRef.value?.show();
};

const handleSubmit = async () => {
  try {
    let payload: IAddPayload = {
      companyName: trustedCompanyData.value.name,
      companyDescription: trustedCompanyData.value.description,
      companyEmail: trustedCompanyData.value.email,
    };

    if (trustedCompanyData.value.id !== "") {
      payload.id = trustedCompanyData.value.id;
    }

    const response = await trustedSourceService.createOrUpdate(payload);

    Swal.fire({
      icon: "success",
      title: `Success`,
      text: `${response.message}`,
      showConfirmButton: false,
      timer: 1500,
    });

    fetchTrustedSource();
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
  trustedCompanyData.value = {
    id: "",
    name: "",
    email: "",
    description: "",
  };
};

const deleteUser = (id: string) => {
  Swal.fire({
    title: "Are You Sure?",
    text: `Delete Data`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "No, cancel!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      trustedSourceService.deleteData(id).then((res) => {
        Swal.fire({
          title: "",
          text: `${res.message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchTrustedSource();
        clearData();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      closeModal();
    }
  });
};

const filteredData = computed(() => {
  if (!searchQuery.value) return trustedSourceRef.value;
  return trustedSourceRef.value.filter(
    (item) =>
      item.company_name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      item.company_email.toLowerCase().includes(searchQuery.value.toLowerCase())
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
          v-model="trustedCompanyData.name"
          type="text"
          placeholder="Name"
          class="input input-bordered w-full border max-w-md bg-white"
        />
      </div>
      <div class="w-full flex flex-col gap-2">
        <span>Email</span>
        <input
          v-model="trustedCompanyData.email"
          type="text"
          placeholder="Email"
          class="input input-bordered w-full border max-w-md bg-white"
        />
      </div>
      <div class="w-full flex flex-col gap-2">
        <div class="label">
          <span>Description</span>
        </div>
        <textarea
          class="textarea textarea-bordered h-24 bg-white border"
          v-model="trustedCompanyData.description"
          placeholder="Description"
        ></textarea>
      </div>
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
  </AddModal>

  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Company Name</th>
          <th>Description</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in paginatedData" :key="i.id">
          <td>{{ index + 1 }}</td>
          <td>{{ i?.company_name ?? "-" }}</td>
          <td>{{ truncateText(i?.company_description, 20) ?? "-" }}</td>
          <td>{{ i?.company_email ?? "-" }}</td>
          <td class="flex gap-2">
            <button
              class="btn btn-square btn-outline border"
              @click="openEditModal(i.id)"
            >
              <i class="edit-icons"></i>
            </button>
            <button
              class="btn btn-square btn-outline border"
              @click="deleteUser(i.id)"
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
