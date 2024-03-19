<template>
  <div class="flex h-screen">
    <Sidebar />
    <!-- Main content -->
    <div class="flex-1 p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Display Number of Cases for Each Status -->
        <div class="bg-white shadow rounded-lg p-4">
          <h2 class="text-xl font-semibold mb-4">Cases by Status</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="status in statuses" :key="status">
              <div class="bg-gray-100 rounded-lg p-4">
                <h3 class="text-lg font-semibold">{{ status }}</h3>
                <p class="text-3xl font-bold">{{ casesByStatus[status] !== undefined ? casesByStatus[status] : 0 }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Basic Line Chart for Number of Cases Against Time -->
        <div class="bg-white shadow rounded-lg p-4">
          <h2 class="text-xl font-semibold mb-4">Cases Over Time</h2>
          <line-chart :data="casesOverTimeData" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from "../../pages/Sidebar.vue";
import axios from 'axios'; // Import Axios or your HTTP client library
import Chart from 'chart.js/auto'; // Import Chart.js


const statuses = ['pending', 'processing', 'resolved'];
const casesByStatus = ref({});
const casesOverTimeData = ref({});

// Fetch data for number of cases by status
async function fetchCasesByStatus() {
  try {
    const response = await axios.get('http://localhost:8000/api/dashboard/cases-by-status');
    casesByStatus.value = response.data;
  } catch (error) {
    console.error('Error fetching cases by status:', error);
  }
}

// Fetch data for cases over time
async function fetchCasesOverTime() {
  try {
    const response = await axios.get('http://localhost:8000/api/dashboard/cases-over-time');
    casesOverTimeData.value = response.data;
    drawLineChart();
  } catch (error) {
    console.error('Error fetching cases over time:', error);
  }
}

// Function to draw line chart using Chart.js
function drawLineChart() {
  const ctx = document.getElementById('line-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: casesOverTimeData.value,
    options: {
      // Add options here for customization
    }
  });
}

// Fetch data on component mounted
onMounted(() => {
  fetchCasesByStatus();
  fetchCasesOverTime();
});
</script>

<style>
/* Add custom styles here */
</style>
