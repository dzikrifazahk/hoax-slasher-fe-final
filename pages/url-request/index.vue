<script setup lang="ts">
import { useTruncate } from "~~/composables/useTruncate";
import { urlReqService } from "~~/services";
import { IUrlRequest } from "~~/services/types/url-requests";
import { ref, computed, onMounted } from "vue";

const { truncateText } = useTruncate();
const urlReqRef = ref<IUrlRequest[]>([]);
const token = useCookie("accessToken");

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 10;

// Search state
const searchQuery = ref("");

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  fetchUsers();
});

const fetchUsers = () => {
  urlReqService.getDatas(token.value).then((res) => {
    urlReqRef.value = res.data;
  });
};

// Computed property for filtered data based on search query
const filteredData = computed(() => {
  if (!searchQuery.value) return urlReqRef.value;
  return urlReqRef.value.filter((item) =>
    item.url.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.user_id.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Computed property for paginated data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredData.value.slice(start, start + itemsPerPage);
});

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage);
});

// Methods to change page
const setPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<template>
  <div class="flex">
    <div class="w-full"></div>
    <div class="w-1/2">
      <label class="input input-bordered border-gray-400 flex items-center gap-2 bg-white">
        <input
          type="text"
          class="grow"
          placeholder="Search"
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
      <thead>
        <tr>
          <th></th>
          <th>Url</th>
          <th>User Id</th>
          <th>Status</th>
          <th>Is Scrapping</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in paginatedData" :key="i.id">
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td>{{ truncateText(i?.url, 15) ?? "-" }}</td>
          <td>{{ truncateText(i?.user_id, 20) ?? "-" }}</td>
          <td>{{ i?.status ?? "-" }}</td>
          <td>{{ i?.is_scrapping ?? "-" }}</td>
          <td class="flex gap-2">
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
      <span>Page <b>{{ currentPage }}</b> from <b>{{ totalPages }}</b></span>
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
