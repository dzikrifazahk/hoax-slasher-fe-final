<template>
  <div>
    <h1>API Data</h1>
    <ul>
      <li v-for="item in data" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

interface DataItem {
  id: string;
  name: string;
  data: Data | null;
}

interface Data {
  color: string;
  capacity: string;
}

const data = ref<DataItem[]>([]);

const fetchData = async () => {
  try {
    const response = await api.get<DataItem[]>('/objects'); // Replace '/objects' with your API endpoint
    // data.value = response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Add your styles here */
</style>
