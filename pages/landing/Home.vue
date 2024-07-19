<script setup lang="ts">
import Content1 from "~~/components/landing/Home/Content1.vue";
import Content2 from "~~/components/landing/Home/Content2.vue";
import OurProducts from "~~/components/landing/Home/OurProducts.vue";

definePageMeta({
  layout: "landing",
});

useHead({
  title: "Home",
});
</script>

<template>
  <div class="mt-24">
    <Content1 />
    <div>
      <div class="font-poppins font-bold text-3xl w-full flex justify-center mt-10">
        >Our Missions
      </div>
      <div class="pt-2 flex-col max-w-[65vw] mx-auto justify-center mt-5">
        <Content2 />
      </div>
    </div>
    <div class="mt-10">
      <div class="font-poppins font-bold text-3xl w-full flex justify-center">
        >Our Products
      </div>
      <div class="pt-2 flex-col max-w-[95vw] mx-auto justify-center">
        <OurProducts />
      </div>
    </div>
    <div class="text-3xl">home</div>
    <div class="text-3xl">home</div>
    <div class="text-3xl">home</div>
    <div class="text-3xl">home</div>
    <div class="text-3xl">home</div>
    <div class="text-3xl">home</div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <div class="text-3xl">home</div>
    <div class="text-3xl">home</div>
  </div>
</template>
