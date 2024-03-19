

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from "../pages/Sidebar.vue"


const user = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  // Add more user details as needed
});

onMounted(() => {
  // Fetch user details from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    user.value = storedUser;
  }
});
</script>


<template>
  <div class="flex h-screen">
    <Sidebar />
    <!-- Main content -->
    <div class="flex-1 p-4">

  <div class="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-semibold mb-8 text-center">User Profile</h1>
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-lg font-semibold mb-2">User Details:</h2>
          <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <p class="text-sm text-gray-500"><strong>First Name:</strong> {{ user.first_name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500"><strong>Last Name:</strong> {{ user.last_name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500"><strong>Email:</strong> {{ user.email }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500"><strong>Phone:</strong> {{ user.phone }}</p>
            </div>
            <!-- Add more user details as needed -->
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>
</template>





