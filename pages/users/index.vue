<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usersService } from '~~/services';
import { UserType } from '~~/services/types/users';
import AddModal from '~~/components/dashboard/AddModal.vue';
import { useTruncate } from '~~/composables/useTruncate';

const { truncateText } = useTruncate();
const usersRef = ref<UserType[]>([]);
const token = useCookie("accessToken");
const modalRef = ref();
const modalTitle = ref("");
const currentUser = ref<UserType | null>(null);

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
  currentUser.value = null; // Reset the current user
  modalTitle.value = "Tambah Data";
  modalRef.value?.show();
};

const openEditModal = (user: UserType) => {
  currentUser.value = user; // Set the current user for editing
  modalTitle.value = "Edit Data";
  modalRef.value?.show();
};
</script>

<template>
  <button class="btn bg-[#FA3454] text-white mb-5" @click="openAddModal">
    Tambah Data
  </button>

  <AddModal ref="modalRef" :title="modalTitle">
    <p>Press ESC key or click the button below to close</p>
    <!-- Include the form inputs and other relevant data here -->
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
        <tr v-for="(i, index) in usersRef" :key="i.id">
          <td>{{ index + 1 }}</td>
          <td>{{ truncateText(i?.name, 15) ?? "-" }}</td>
          <td>{{ truncateText(i?.email, 20) ?? "-" }}</td>
          <td>{{ i?.role ?? "-" }}</td>
          <td class="flex gap-2">
            <button class="btn btn-square btn-outline border" @click="openEditModal(i)">
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
