<template>
  <div class="flex h-screen">
    <Sidebar />
    <!-- Main content -->
    <div class="flex-1 p-4">
      <h2 class="text-2xl font-semibold mb-4">Police Management</h2>
      <div class="flex justify-end">
        <router-link to="/add/police" class="bg-blue-500 text-white text-end mb-2 px-4 py-2 rounded-md shadow-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300">Add new Police</router-link>
      </div>
      <div v-if="policeList.length === 0" class="text-gray-500">No police found.</div>
      <div v-else>
        <table class="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2">First Name</th>
              <th class="px-4 py-2">Last Name</th>
              <th class="px-4 py-2">Email</th>
             <th class="px-4 py-2">Phone</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="police in policeList" :key="police.id" class="border-b border-gray-300">
              <td class="px-4 py-2">{{ police.first_name }}</td>
              <td class="px-4 py-2">{{ police.last_name }}</td>
              <td class="px-4 py-2">{{ police.email }}</td>
              <td class="px-4 py-2">{{ police.phone }}</td>
              <!-- Display other relevant data -->
              <td class="px-4 py-2">
                <router-link :to="'/edit/police/' + police.id" class="text-blue-500 hover:underline mr-2">Edit</router-link>
                <button @click="deletePolice(police.id)" class="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Import Axios
import Sidebar from "../../pages/Sidebar.vue";

const policeList = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/police');
    policeList.value = response.data;
  } catch (error) {
    console.error('Error fetching police:', error);
  }
});

async function deletePolice(id) {
  try {
    await axios.delete(`http://localhost:8000/api/police/${id}`);
    policeList.value = policeList.value.filter(police => police.id !== id);
  } catch (error) {
    console.error('Error deleting police:', error);
  }
}
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
