<script setup lang="ts">
import Login from "~/components/landing/Login.vue";

definePageMeta({
  layout: "landing",
});

useHead({
  title: "Community",
});
</script>

<template>
  <div class="mt-24 w-full h-full">
    <div class="flex w-full h-full">
      <div
        class="hidden lg:flex bg-[#E5EEF7] h-full w-full flex-col gap-5 items-center justify-center"
      >
        <div>
          <p
            class="text-[#FA3454] font-poppins font-extrabold shadow-white text-3xl"
          >
            Let's Join Us
          </p>
        </div>
        <div>
          <img
            src="../../public/images/background/community.png"
            class="w-80"
            alt=""
          />
        </div>
      </div>
      <div class="h-full w-full flex items-center justify-center px-10 lg:px-0 bg-[url('../../public/images/background/community-bg.png')] bg-cover">
        <Login />
      </div>
    </div>
  </div>
</template>
