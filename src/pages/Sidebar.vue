<template>
  <div class="bg-gray-800 text-white p-4 min-h-screen">
    <div v-if="userRole === 'admin'" class="text-2xl font-semibold mb-4">Admin</div>
    <div v-if="userRole === 'police'" class="text-2xl font-semibold mb-4">Police</div>
    <ul class="space-y-2">
      <li @click="navigateTo('dashboard')" class="nav-item bg-blue-700 hover:bg-blue-700">Dashboard</li>
      <li v-if="userRole == 'admin'" @click="navigateTo('police')" class="nav-item bg-blue-700 hover:bg-blue-700">Police</li>
      <li @click="navigateTo('suspects')" class="nav-item bg-blue-700 hover:bg-blue-700">Suspects</li>
      <li @click="navigateTo('complainants')" class="nav-item bg-blue-700 hover:bg-blue-700">Complainants</li>
      <li @click="navigateTo('complaints')" class="nav-item bg-blue-700 hover:bg-blue-700">Cases</li>
      <li @click="navigateTo('profile')" class="nav-item bg-blue-700 hover:bg-blue-700">Profile</li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (route) => {
  router.push({ name: route });
};

const userRole = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  return user.role || '';
};
</script>

<style scoped>
.nav-item {
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 0.25rem;
  transition: background-color 0.3s;
}

.nav-item:hover {
  filter: brightness(90%);
}
</style>
