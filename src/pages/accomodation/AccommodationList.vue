<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-4xl font-bold mb-8">Explore Our Accommodations</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div v-for="accommodation in accommodations" :key="accommodation.id">
        <router-link
          :to="{ name: 'accommodationDetails', params: { id: accommodation.id }}"
          class="block relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
        >
          <img
            :src="`/images/${accommodation.id}.jpg`" 
            :alt="accommodation.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ accommodation.name }}</h2>
            <!-- You can add more details here -->
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const accommodations = ref([
    { id: 1, name: 'Modern Suite' },
    { id: 2, name: 'Luxury Villa' },
    // Add more accommodations as needed
    ]);
</script>

<style scoped>
/* Add your custom styles or overrides here */
</style>
