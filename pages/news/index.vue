<script setup lang="ts">
import { newsService } from "~~/services";
import { NewsType } from "~~/services/types/news";
import { useTruncate } from "~~/composables/useTruncate";
import { useFormatDate } from "~~/composables/formatDate";
const { truncateText } = useTruncate();
const { formatDate } = useFormatDate();

const newsRef = ref<NewsType[]>([]);

const currentPage = ref(1);
const itemsPerPage = 10;
const searchQuery = ref("");

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  fetchNews();
});

const fetchNews = () => {
  newsService.getNews().then((res) => {
    newsRef.value = res.data;
  });
};

const filteredData = computed(() => {
  if (!searchQuery.value) return newsRef.value;
  return newsRef.value.filter(
    (item) =>
      item.source.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
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
  <button class="btn bg-[#FA3454] text-white mb-5">Tambah Data</button>
  <div class="flex">
    <div class="w-full"></div>
    <div class="w-1/2">
      <label
        class="input input-bordered border-gray-400 flex items-center gap-2 bg-white"
      >
        <input
          type="text"
          class="grow"
          placeholder="Search Title, Author, Source"
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
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Description</th>
          <th>Author</th>
          <th>Source</th>
          <th>Publish Date</th>
          <th>Validated Date</th>
          <th>Is Training</th>
          <th>Training Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in paginatedData" :key="i.id">
          <td>{{ index + 1 }}</td>
          <td>{{ truncateText(i?.title, 15) ?? "-" }}</td>
          <td>{{ truncateText(i?.description, 20) ?? "-" }}</td>
          <td>{{ i?.author ?? "-" }}</td>
          <td>{{ i?.source ?? "-" }}</td>
          <td>{{ formatDate(i?.publish_date, "DD-MMM-YYYY MM:HH") ?? "-" }}</td>
          <td>{{ formatDate(i?.validated_date, "DD-MM-YYYY") ?? "-" }}</td>
          <td>{{ i?.is_training ?? "-" }}</td>
          <td>{{ formatDate(i?.training_date, "DD-MM-YYYY") ?? "-" }}</td>
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
