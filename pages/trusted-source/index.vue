<script setup lang="ts">
import { NewsType } from "~~/services/types/news";
import { useTruncate } from "~~/composables/useTruncate";
import { trustedSourceService } from "~~/services";
import { UserType } from "~~/services/types/users";
import { ITrustedSource } from "~~/services/types/trusted-source";

const { truncateText } = useTruncate();
const trustedSourceRef = ref<ITrustedSource[]>([]);
const token = useCookie("accessToken");

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  fetchUsers();
});

const fetchUsers = () => {
  trustedSourceService.getDatas(token.value).then((res) => {
    trustedSourceRef.value = res.data;
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
          <th>Company Name</th>
          <th>Description</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in trustedSourceRef" :key="i.id">
          <td>{{ index + 1 }}</td>
          <td>{{ i?.company_name ?? "-" }}</td>
          <td>{{ truncateText(i?.company_description, 20) ?? "-" }}</td>
          <td>{{ i?.company_email ?? "-" }}</td>
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
