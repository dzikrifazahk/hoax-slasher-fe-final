<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from '~~/components/landing/Header.vue';
</script>
<template>
  <v-app>
    <Header />
    <RouterView />
  </v-app>
</template>


