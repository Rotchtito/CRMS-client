<template>
  <div class="flex h-screen">
    <Sidebar />
    <!-- Main content -->
    <div class="flex-1 p-4">
      <h2 class="text-2xl font-semibold mb-4">Saved Cases</h2>
      <div class="flex justify-end">
        <router-link to="/add/case" class="bg-blue-500 text-white text-end mb-2 px-4 py-2 rounded-md shadow-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300">Add new Case</router-link>
      </div>
      <div v-if="cases.length === 0" class="text-gray-500">No cases found.</div>
      <div v-else>
        <table class="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2">Title</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Complainant</th>
              <th class="px-4 py-2">Complainant Email</th>
              <th class="px-4 py-2">Complainant Phone</th>
              <th class="px-4 py-2">Suspect</th>
              <th class="px-4 py-2">Police in Charge</th>
              <th class="px-4 py-2">Video</th> <!-- New column for video -->
              <th class="px-4 py-2">Actions</th> <!-- New column for actions -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="caseItem in cases" :key="caseItem.id" class="border-b border-gray-300">
              <td class="px-4 py-2">{{ caseItem.title }}</td>
              <td class="px-4 py-2">{{ caseItem.status }}</td>
              <td class="px-4 py-2">{{ caseItem.description }}</td>
              <td class="px-4 py-2">{{ caseItem.complainant.name }}</td>
              <td class="px-4 py-2">{{ caseItem.complainant.email }}</td>
              <td class="px-4 py-2">{{ caseItem.complainant.phone }}</td>
              <td class="px-4 py-2">{{ caseItem.suspect ? caseItem.suspect.name : '-' }}</td>
              <td class="px-4 py-2">{{ caseItem.police_in_charge ? caseItem.police_in_charge.first_name : '-' }}</td>
              <td class="px-4 py-2">
              <video v-if="caseItem.video_path" width="200" controls>
  <source :src="caseItem.video_path" type="video/mp4">
  Your browser does not support the video tag.
</video>
<span v-else>No video available</span>

              </td>
              <td class="px-4 py-2">
                <div class="relative">
                  <button @click="toggleStatusDropdown(caseItem.id)" class="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300">Change Status</button>
                  <!-- Dropdown menu -->
                  <div v-if="statusDropdownId === caseItem.id" class="absolute top-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10">
                    <button @click="updateStatus(caseItem.id, 'pending')" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Pending</button>
                    <button @click="updateStatus(caseItem.id, 'processing')" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Processing</button>
                    <button @click="updateStatus(caseItem.id, 'resolved')" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Resolved</button>
                  </div>
                </div>
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

const cases = ref([]);
const statusDropdownId = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/complaints');
    cases.value = response.data;
  } catch (error) {
    console.error('Error fetching cases:', error);
  }
});

function toggleStatusDropdown(id) {
  statusDropdownId.value = statusDropdownId.value === id ? null : id;
}

async function updateStatus(id, status) {
  try {
    const caseItem = cases.value.find(item => item.id === id);
    const payload = {
      id: caseItem.id,
      title: caseItem.title,
      description: caseItem.description,
      complainant: {
        id: caseItem.complainant.id,
        name: caseItem.complainant.name,
        email: caseItem.complainant.email, // Include complainant email
        phone: caseItem.complainant.phone
      },
      suspect: caseItem.suspect ? {
        name: caseItem.suspect.name
      } : null,
      police_in_charge: caseItem.police_in_charge ? {
        first_name: caseItem.police_in_charge.first_name
      } : null,
      video_path: caseItem.video_path,
      status: status
    };

    const response = await axios.put(`http://localhost:8000/api/complaints/${id}`, payload);

    const updatedCaseIndex = cases.value.findIndex(caseItem => caseItem.id === id);
    if (updatedCaseIndex !== -1) {
      cases.value[updatedCaseIndex].status = status;
    }
    toggleStatusDropdown(id); // Hide dropdown after update
  } catch (error) {
    console.error('Error updating status:', error);
  }
}

</script>

<style>
.table-auto {
  border-spacing: 0;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}

/* Dropdown button and menu styles */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.border {
  border-width: 1px;
}

.rounded-md {
  border-radius: 0.375rem;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.w-48 {
  width: 12rem;
}

.top-10 {
  top: 2.5rem;
}

.right-0 {
  right: 0;
}

.mt-2 {
  margin-top: 0.5rem;
}

.bg-white {
  background-color: #fff;
}

.border-gray-200 {
  border-color: #e2e8f0;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.text-white {
  color: #fff;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring-2:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
</style>
