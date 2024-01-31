<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Accommodation Details</h1>
    <!-- Display details of the selected accommodation -->
    <div>
      <h2 class="text-xl font-semibold">{{ accommodation.name }}</h2>
      <!-- Add more details as needed -->
    </div>
    <router-link to="/booking-form">Book Now</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const accommodation = ref(null);

const fetchAccommodationDetails = () => {
    // Fetch accommodation details based on the route parameter (id)
    const route = useRoute();
    const accommodationId = route.params.id;

    // Simulated API call, replace with actual API call
    setTimeout(() => {
        accommodation.value = accommodations.find((acc) => acc.id === Number(accommodationId));
    }, 500);
};

onMounted(fetchAccommodationDetails);
</script>
