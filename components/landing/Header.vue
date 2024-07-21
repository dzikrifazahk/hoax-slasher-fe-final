<script setup lang="ts">
import { Home2Icon, BookIcon, ReportSearchIcon } from "vue-tabler-icons";
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isOpen = ref(false);

const isActive = (path: string) => route.path === path;

const headerBgColor = computed(() => {
  return isActive('/landing/read-mode') ? 'bg-[#F1F6FE]' : 'bg-white';
});
</script>

<template>
    <div :class="['p-3', headerBgColor, 'w-full fixed z-50']">
    <div class="navbar bg-[#C0244F] rounded-lg">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl logo-hover">
          <i class="logo-with-text w-32 h-10"></i>
        </a>
      </div>
      <div class="flex-none lg:hidden">
        <button class="btn btn-ghost" @click="isOpen = !isOpen">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="#ffffff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div :class="{ 'hidden': !isOpen, 'flex flex-col absolute right-0 mt-40 items-center': isOpen }" class="flex-none lg:flex lg:items-center lg:w-auto w-full">
        <ul class="menu menu-horizontal flex px-1 w-full lg:w-auto bg-[#C0244F] lg:bg-transparent rounded-lg lg:rounded-none">
          <li class="mr-2">
            <a href="/landing/home" class="font-poppins text-white" :class="{ 'bg-[#FA3454] font-extrabold': isActive('/landing/home') }">
              <Home2Icon size="20" stroke-width="1.5" />Home
            </a>
          </li>
          <li class="mr-2">
            <a href="/landing/read-mode" class="font-poppins text-white" :class="{ 'bg-[#FA3454] font-extrabold': isActive('/landing/read-mode') }">
              <BookIcon size="20" stroke-width="1.5" />Read Mode
            </a>
          </li>
          <li class="mr-2">
            <a href="/landing/check-by-ai" class="font-poppins text-white" :class="{ 'bg-[#FA3454] font-extrabold': isActive('/landing/check-by-ai') }">
              <ReportSearchIcon size="20" stroke-width="1.5" />Check By AI
            </a>
          </li>
          <li class="pl-5">
            <a href="/landing/community" class="font-poppins font-bold text-white" :class="{ 'bg-[#FA3454] font-extrabold': isActive('/landing/community') }">
              Community
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-with-text {
  content: url("../../public/images/logos/hoax-chaser-text-logo-white.png");
  transition: content 0.5s ease-in-out;
}

.logo-hover:hover .logo-with-text {
  content: url("../../public/images/logos/hoax-chaser-text-logo.png");
}

.menu-horizontal .active {
  font-weight: bold;
}
</style>
