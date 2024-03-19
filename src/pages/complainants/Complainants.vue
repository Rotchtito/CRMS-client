<template>
  <div class="flex h-screen">
    <Sidebar />
    <!-- Main content -->
    <div class="flex-1 p-4">
      <!-- Add Complainant button -->
      <h1 class="text-2xl font-semibold mb-4">Complainants</h1>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">phone</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="complainant in complainants" :key="complainant.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ complainant.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ complainant.email || 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ complainant.phone || 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ complainant.address }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <router-link :to="'/complainants/' + complainant.id" class="text-blue-500 hover:text-blue-700">View Details</router-link>
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

const complainants = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/complainants');
    complainants.value = response.data;
  } catch (error) {
    console.error('Error fetching complainants:', error);
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
