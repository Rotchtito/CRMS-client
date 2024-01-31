<template>
  <form @submit.prevent="submitBooking">
    <!-- Your form fields for travel agents to input booking details -->
    <label for="travelAgent">Travel Agent:</label>
    <select v-model="selectedTravelAgent" @change="fetchContractRates">
      <option v-for="agent in travelAgents" :key="agent.id" :value="agent.id">{{ agent.name }}</option>
    </select>

    <label for="dates">Dates:</label>
    <input type="text" v-model="bookingDates">

    <!-- Other form fields go here -->

    <button type="submit">Submit Booking</button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

const selectedTravelAgent = ref(null);
const bookingDates = ref('');
const travelAgents = ref([]); // Fetch this from your Laravel backend

const fetchContractRates = async () => {
    if (selectedTravelAgent.value) {
        // Fetch and display contract rates based on the selected travel agent
        const response = await axios.get(`/api/contract-rates/${selectedTravelAgent.value}`);
        // Handle the response and update your component state accordingly
    }
};

const submitBooking = async () => {
    // Implement the logic to submit the booking details to your Laravel backend
};
</script>
