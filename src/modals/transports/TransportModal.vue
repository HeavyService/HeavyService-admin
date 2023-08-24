<template>
    <!-- <div class="modal-overlay" >
      <div class="modal">
        <div class="card">
        <h6>{{ $t('create') }}</h6>
        <form @submit.prevent="handleSubmit" class="form">
          
          <label for="Name" class="label">Name</label>
          <input v-model="formData.name" type="text" id="Name" class="input" required>
          
          <label for="imagePath" class="label">Image</label>
          <input type="file" @change="handleImageChange" id="imagePath" class="input" accept="image/*" required>

          <label for="pricePerHours" class="label">pricePerHours</label>
          <input v-model="formData.pricePerHours" type="text" id="pricePerHours" class="input" required>

          <label for="district" class="label">District</label>
          <input v-model="formData.district" type="text" id="district" class="input" required>

          <label for="region" class="label">Region</label>
          <input v-model="formData.region" type="text" id="region" class="input" required>
  
          <label for="address" class="label">Address</label>
          <input v-model="formData.address" type="text" id="address" class="input" required>
  
          <label for="status" class="label">Status</label>
          <select v-model.number="formData.status" id="status" class="input" required>
            <option value="0">Bo'sh</option>
            <option value="1">Arendada</option>
          </select>
  
          <label for="phoneNumber" class="label">Phone Number</label>
          <input v-model="formData.phoneNumber" type="text" id="phoneNumber" class="input" required>
  
          <label for="description" class="label">Description</label>
          <textarea v-model="formData.description" id="description" class="input" required></textarea>
  
          <div class="button-container">
            <button type="submit" class="button create-button">{{ $t('create') }}</button>
            <button type="button" @click="closeModal" class="button cancel-button">{{ $t('cancel') }}</button>
          </div>
        </form>
      </div>
      </div>
    </div> -->
    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                <form class="space-y-6" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required>
                            </div>
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 
</template>
  
  
  <script lang="ts">
  import axios from '@/plugins/axios';
  import { TransportCreateDto } from '../../dtos/transports/TransportCreateDto'; // Adjust the import path
  import { useI18n } from 'vue-i18n';

export default {
  name: 'TransportCreateModal',
  data() {
    return {
      formData: new TransportCreateDto(),
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    handleImageChange(event) {
      this.formData.imagePath = event.target.files[0];
    },
    async handleSubmit() {
      try {
        const formData = new FormData();
        for (const key in this.formData) {
          if (key === 'imagePath') {
            formData.append(key, this.formData[key], this.formData[key].name);
          } else {
            formData.append(key, this.formData[key]);
          }
        }
        const response = await axios.post('/api/transports', formData);
        this.closeModal();
        alert('Item created successfully!');
        // Handle the response or redirect as needed
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
};
  </script>
  
  <style scoped>
  /* Modal overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* overflow: scroll; */
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Modal */
  .modal {
    width: auto;
    height: 500px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    overflow: scroll;
  }
  
  /* Form styles */
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

  .label {
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 12px;
  }
  
  /* Button styles */
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
  
  .button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .create-button {
    background-color: #3490dc;
    color: white;
  }
  
  .cancel-button {
    background-color: #ccc;
    color: #333;
  }
  
  .button:hover {
    background-color: #4a9ed9;
  }
  </style>
  