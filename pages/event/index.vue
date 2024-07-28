<script setup lang="ts">
import { useTruncate } from "~~/composables/useTruncate";
import { eventServices, usersService } from "~~/services";
import { IEvent } from "~~/services/types/event";
import { useFormatDate } from "~~/composables/formatDate";
import Swal from "sweetalert2";
import AddModal from "~~/components/dashboard/AddModal.vue";
import { UserType } from "~~/services/types/users";

const { truncateText } = useTruncate();
const eventRef = ref<IEvent[]>([]);
const token = useCookie("accessToken");
const modalRef = ref();
const modalTitle = ref("");
const { formatDate } = useFormatDate();

//pagination
const currentPage = ref(1);
const itemsPerPage = 10;
const searchQuery = ref("");

const eventRefData = ref({
  id: "",
  title: "",
  description: "",
  eventDate: "",
  isOnline: false,
  links: "",
  reminderDate: "",
});

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  fetchEvents();
});

const fetchEvents = () => {
  eventServices.getEvents(token.value).then((res) => {
    eventRef.value = res.data;
  });
};

const openAddModal = () => {
  modalTitle.value = "Add Data";
  modalRef.value?.show();
};

const openEditModal = async (id: string) => {
  const eventData = await eventServices.getDataById(token.value, id);
  eventRefData.value.id = eventData.data.id;
  eventRefData.value.title = eventData.data.title;
  eventRefData.value.description = eventData.data.description;

  eventRefData.value.eventDate = formatDate(
    eventData.data.event_date,
    "YYYY-MM-DDTHH:MM"
  );
  eventRefData.value.reminderDate = formatDate(
    eventData.data.reminder_date,
    "YYYY-MM-DDTHH:MM"
  );

  eventRefData.value.links = eventData.data.links;
  eventRefData.value.isOnline = eventData.data.is_online;

  modalTitle.value = "Change Data";
  modalRef.value?.show();
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("title", eventRefData.value.title);
    formData.append("description", eventRefData.value.description);
    formData.append("eventDate", eventRefData.value.eventDate);
    formData.append("isOnline", String(eventRefData.value.isOnline));
    formData.append("links", eventRefData.value.links);
    formData.append("reminderDate", eventRefData.value.reminderDate);

    if (eventRefData.value.id !== "") {
      formData.append("id", eventRefData.value.id);
    }

    const response = await eventServices.createOrUpdate(token.value, formData);

    Swal.fire({
      icon: "success",
      title: `Success`,
      text: `${response.message}`,
      showConfirmButton: false,
      timer: 1500,
    });

    fetchEvents();
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
  eventRefData.value = {
    id: "",
    title: "",
    description: "",
    eventDate: "",
    links: "",
    isOnline: false,
    reminderDate: "",
  };
};

const deleteData = (id: string) => {
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
      eventServices.deleteData(token.value, id).then((res) => {
        Swal.fire({
          title: "User Deleted",
          text: "User Deleted Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchEvents();
        clearData();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      closeModal();
    }
  });
};

const filteredData = computed(() => {
  if (!searchQuery.value) return eventRef.value;
  return eventRef.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
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
          placeholder="Search Title"
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
    <div class="flex flex-col gap-3 font-poppins">
      <div class="flex flex-col gap-3">
        <div class="w-full flex flex-col gap-2">
          <span>Event Title</span>
          <input
            v-model="eventRefData.title"
            type="text"
            placeholder="Event Title"
            class="input input-bordered w-full border max-w-md bg-white"
          />
        </div>
        <div class="w-full flex flex-col gap-2">
          <div class="label">
            <span>Description</span>
          </div>
          <textarea
            class="textarea textarea-bordered h-24 bg-white border"
            v-model="eventRefData.description"
            placeholder="Description"
          ></textarea>
        </div>
      </div>
      <div class="w-full flex flex-col gap-2">
        <span>Event Date</span>
        <input
          v-model="eventRefData.eventDate"
          type="datetime-local"
          placeholder="Date"
          class="input input-bordered w-full border max-w-md bg-white"
        />
      </div>
      <div class="w-full flex flex-col gap-2">
        <span>Reminder Date</span>
        <input
          v-model="eventRefData.reminderDate"
          type="datetime-local"
          placeholder="Date"
          class="input input-bordered w-full border max-w-md bg-white"
        />
      </div>
      <div class="w-full flex flex-col gap-2">
        <span>Links</span>
        <input
          v-model="eventRefData.links"
          type="text"
          placeholder="Links"
          class="input input-bordered w-full border max-w-md bg-white"
        />
      </div>
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text text-black">Is Online</span>
          <input
            type="checkbox"
            v-model="eventRefData.isOnline"
            class="checkbox checkbox-error border"
          />
        </label>
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
          <th>Title</th>
          <th>Description</th>
          <th>Event Date</th>
          <th>Reminder Date</th>
          <th>Links</th>
          <th>Is Online</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in paginatedData" :key="i.id">
          <td>{{ index + 1 }}</td>
          <td>{{ truncateText(i?.title, 15) ?? "-" }}</td>
          <td>{{ truncateText(i?.description, 20) ?? "-" }}</td>
          <td>{{ formatDate(i?.event_date, "DD-MMM-YYYY MM:HH") ?? "-" }}</td>
          <td>
            {{ formatDate(i?.reminder_date, "DD-MMM-YYYY MM:HH") ?? "-" }}
          </td>
          <td>{{ i?.links ?? "-" }}</td>
          <td>{{ i?.is_online ?? "-" }}</td>
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
