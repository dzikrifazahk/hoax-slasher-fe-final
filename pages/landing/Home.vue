<script setup lang="ts">
import Content1 from "~~/components/landing/Home/Content1.vue";
import Content2 from "~~/components/landing/Home/Content2.vue";
import OurProducts from "~~/components/landing/Home/OurProducts.vue";
import LandingFooter from "~~/components/landing/Footer.vue";
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
      <div
        class="font-poppins font-bold text-3xl w-full flex justify-center mt-10"
      >
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
      <div
        class="bg-[#C0244F] w-full h-auto mt-10 flex p-10 flex-col md:flex-row"
      >
        <div
          class="flex w-full md:w-1/2 h-full items-center justify-center font-bold font-poppins text-white lg:text-3xl text-xl"
        >
          <span>Try Our Products Here</span>
        </div>
        <div
          class="w-full flex items-center lg:justify-end md:justify-center gap-5 pr-10 mt-5 md:mt-0"
        >
          <img
            src="../../public/images/products/appstore.png"
            alt="appstore"
            class="lg:w-1/4 w-1/2 object-contain"
          />
          <img
            src="../../public/images/products/playstore.png"
            alt="playstore"
            class="lg:w-1/4 w-1/2 object-contain"
          />
        </div>
      </div>
    </div>
    <div class="">
      <LandingFooter />
    </div>
  </div>
</template>
