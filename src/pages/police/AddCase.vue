<template>
  <div class="flex h-screen">
    <Sidebar />
    <!-- Main content -->
    <div class="flex-1 p-4">
      <form @submit.prevent="submitCase" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <!-- Case Information -->
        <div>
          <h2 class="text-xl font-semibold mb-2">Case Information</h2>
          <label for="title" class="block mb-2">Title:</label>
          <input type="text" id="title" v-model="title" required class="input-style">

          <label for="description" class="block mb-2 mt-4">Description:</label>
          <textarea id="description" v-model="description" required rows="4" class="input-style"></textarea>

           <!-- Evidence -->
  <h2 class="text-xl font-semibold mb-2">Evidence</h2>
  <div v-for="(item, index) in evidence" :key="index" class="mb-2">
    <input type="file" @change="handleFileChange($event, index)" accept="video/*" class="input-style">
  </div>
  <button type="button" @click="addEvidence" class="block text-blue-600 hover:text-blue-700 focus:outline-none focus:text-blue-700">Add Evidence</button>
</div>

        <!-- Complainant Information -->
        <div>
          <h2 class="text-xl font-semibold mb-2">Complainant Information</h2>
          <label for="complainantName" class="block mb-2">Name:</label>
          <input type="text" id="complainantName" v-model="complainantName" required class="input-style">

          <label for="complainantEmail" class="block mb-2 mt-4">Email:</label>
          <input type="email" id="complainantEmail" v-model="complainantEmail" required class="input-style">

          <label for="complainantPhone" class="block mb-2 mt-4">Phone:</label>
          <input type="text" id="complainantPhone" v-model="complainantPhone" required class="input-style">

          <label for="complainantAddress" class="block mb-2 mt-4">Address:</label>
          <textarea id="complainantAddress" v-model="complainantAddress" required rows="3" class="input-style"></textarea>
        </div>

        <!-- Suspect Information -->
        <div>
          <h2 class="text-xl font-semibold mb-2">Suspect Information</h2>
          <label for="suspectName" class="block mb-2">Name:</label>
          <input type="text" id="suspectName" v-model="suspectName" required class="input-style">

          <label for="suspectAge" class="block mb-2 mt-4">Age:</label>
          <input type="number" id="suspectAge" v-model="suspectAge" class="input-style">

          <label for="suspectDescription" class="block mb-2 mt-4">Description:</label>
          <textarea id="suspectDescription" v-model="suspectDescription" rows="3" class="input-style"></textarea>

          <label for="suspectAddress" class="block mb-2 mt-4">Address:</label>
          <textarea id="suspectAddress" v-model="suspectAddress" rows="3" class="input-style"></textarea>
        </div>


        <button type="submit" class="col-span-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">Submit</button>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios'; // Import Axios

const title = ref('');
const description = ref('');
const complainantName = ref('');
const complainantEmail = ref('');
const complainantPhone = ref('');
const complainantAddress = ref('');
const suspectName = ref('');
const suspectAge = ref(null);
const suspectDescription = ref('');
const suspectAddress = ref('');
const evidence = ref([]);

// Function to handle file change and store in evidence array
function handleFileChange(event, index) {
  const file = event.target.files[0];
  evidence.value[index] = file;
}

async function submitCase() {
  try {
    // Create a FormData object
    const formData = new FormData();

    // Add form data
    formData.append('title', title.value);
    formData.append('description', description.value);
    formData.append('complainantName', complainantName.value);
    formData.append('complainantEmail', complainantEmail.value);
    formData.append('complainantPhone', complainantPhone.value);
    formData.append('complainantAddress', complainantAddress.value);
    formData.append('suspectName', suspectName.value);
    formData.append('suspectAge', suspectAge.value);
    formData.append('suspectDescription', suspectDescription.value);
    formData.append('suspectAddress', suspectAddress.value);
    
  // Append each video file to the FormData with the key 'evidence[]'
evidence.value.forEach((file, index) => {
  formData.append(`evidence[${index}]`, file);
});


    // Retrieve the user object from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    // Extract the police ID from the user object
    const policeId = storedUser.id;
    formData.append('police_in_charge_id', policeId);

    // Make POST request using Axios
    const response = await axios.post('http://localhost:8000/api/complaints', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
      },
    });

    // Handle successful response
    window.location.href = '/complaints';
    
  } catch (error) {
    // Handle error
    console.error('Error submitting form:', error);
  }
}


function addEvidence() {
  evidence.value.push('');
}

</script>

<style>
.input-style {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.input-style:focus {
  border-color: #4a90e2;
  outline: none;
}
</style>
