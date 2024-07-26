<script setup lang="ts">
import { NewsType } from "~~/services/types/news";
import { useTruncate } from "~~/composables/useTruncate";
import { communityService } from "~~/services";
import { UserType } from "~~/services/types/users";
import { CommunityTypes } from "~~/services/types/community";

const { truncateText } = useTruncate();
const communityRef = ref<CommunityTypes[]>([]);
const token = useCookie("accessToken");

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  fetchCommunities();
});

const fetchCommunities = () => {
  communityService.getCommunities(token.value).then((res) => {
    communityRef.value = res.data;
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
          <th>Name</th>
          <th>Description</th>
          <th>Address</th>
          <th>Leader</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in communityRef" :key="i.id">
          <td>{{ index + 1 }}</td>
          <td>{{ truncateText(i?.name, 15) ?? "-" }}</td>
          <td>{{ truncateText(i?.description, 20) ?? "-" }}</td>
          <td>{{ i?.address ?? "-" }}</td>
          <td>{{ i?.leader?.name ?? "-" }}</td>
          <td>{{ i?.status ?? "-" }}</td>
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
