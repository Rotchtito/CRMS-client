<template>
  <div class="flex">
    <Sidebar class="flex-none" />
    <div class="flex-1 p-4">
      <h2 class="text-2xl font-semibold mb-4">Add New Police</h2>
      <form @submit.prevent="addPolice">
        <div class="mb-4">
          <label for="firstName" class="block text-gray-700 font-bold mb-2">First Name:</label>
          <input type="text" id="firstName" v-model="newPolice.first_name" class="border border-gray-400 rounded-md px-3 py-2 w-full">
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-gray-700 font-bold mb-2">Last Name:</label>
          <input type="text" id="lastName" v-model="newPolice.last_name" class="border border-gray-400 rounded-md px-3 py-2 w-full">
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-gray-700 font-bold mb-2">Phone:</label>
          <input type="text" id="phone" v-model="newPolice.phone" class="border border-gray-400 rounded-md px-3 py-2 w-full">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">Email:</label>
          <input type="email" id="email" v-model="newPolice.email" class="border border-gray-400 rounded-md px-3 py-2 w-full">
        </div>
       
    
        <div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Police</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Sidebar from "../../pages/Sidebar.vue";

const router = useRouter();

const newPolice = ref({
  first_name: '',
  last_name: '',
  phone: '',
  email: '',


});

async function addPolice() {
  try {
    const response = await axios.post('http://localhost:8000/api/police', newPolice.value);
    // Handle success, maybe show a success message
    console.log('Police added successfully:', response.data);
    // Redirect the user back to the police management page
    router.push('/police');
  } catch (error) {
    console.error('Error adding police:', error);
    // Handle error, maybe show an error message
  }
}
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
