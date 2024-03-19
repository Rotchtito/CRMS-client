<template>
  <div class="flex h-screen">
    <Sidebar />
    <!-- Main content -->
    <div class="flex-1 p-4">
      <!-- Add Suspect button -->
      <h1 class="text-2xl font-semibold mb-4">Suspects</h1>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="suspect in suspects" :key="suspect.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ suspect.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ suspect.age || 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ suspect.description || 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ suspect.address }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <router-link :to="'/suspects/' + suspect.id" class="text-blue-500 hover:text-blue-700">View Details</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Sidebar from "../../pages/Sidebar.vue";

const suspects = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/suspects');
    suspects.value = response.data;
  } catch (error) {
    console.error('Error fetching suspects:', error);
  }
});
</script>

<style scoped>
/* Add component-specific styles here */
/* Style for the table header */
th {
  padding: 0.75rem;
  text-align: left;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom-width: 1px;
  border-color: #d2d6dc;
}

/* Style for the table rows */
td {
  padding: 0.75rem;
  font-size: 0.875rem;
  vertical-align: top;
}
</style>
