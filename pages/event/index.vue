<script setup lang="ts">
import { useTruncate } from "~~/composables/useTruncate";
import { eventServices } from "~~/services";
import { IEvent } from "~~/services/types/event";

const { truncateText } = useTruncate();
const eventRef = ref<IEvent[]>([]);
const token = useCookie("accessToken");

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
</script>
<template>
  <button class="btn bg-[#FA3454] text-white mb-5">Tambah Data</button>
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
        <tr v-for="(i, index) in eventRef" :key="i.id">
          <td>{{ index + 1 }}</td>
          <td>{{ truncateText(i?.title, 15) ?? "-" }}</td>
          <td>{{ truncateText(i?.description, 20) ?? "-" }}</td>
          <td>{{ i?.event_date ?? "-" }}</td>
          <td>{{ i?.reminder_date ?? "-" }}</td>
          <td>{{ i?.links ?? "-" }}</td>
          <td>{{ i?.is_online ?? "-" }}</td>
          <td class="flex gap-2">
            <button class="btn btn-square btn-outline border">
              <i class="add-icons"></i>
            </button>
            <button class="btn btn-square btn-outline border">
              <i class="edit-icons"></i>
            </button>
            <button class="btn btn-square btn-outline border">
              <i class="delete-icons"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
