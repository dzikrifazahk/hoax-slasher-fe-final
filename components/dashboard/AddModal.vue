<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box bg-white">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <div class="py-4">
        <slot />
      </div>
      <div class="modal-action">
        <button class="btn" @click="close">Close</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Modal Title",
  },
});

const modal = ref<HTMLDialogElement | null>(null);

const show = () => {
  if (modal.value) {
    modal.value.showModal();
  }
};

const close = () => {
  if (modal.value) {
    modal.value.close();
  }
};

defineExpose({ show, close });
</script>

<style scoped></style>
