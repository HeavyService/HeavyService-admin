<template>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="../../assets/logo.svg" alt="logo" />
          Heavy Service
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h1>
            <form class="space-y-4 md:space-y-6" @submit="validateForm">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                <input type="email" name="email" id="email" required
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com" v-model="email" />
              </div>
              <div>
                <label for="newPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                <input type="password" name="newPassword" id="newPassword" required
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter new password" v-model="newPassword" />
              </div>
              <div>
                <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" required
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Confirm new password" v-model="confirmPassword" />
              </div>
                <button type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Change Password
                </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import router from '@/router';
import { ref } from 'vue';
  
  const email = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');
  
  function validateForm(event: Event) {
    debugger;
    if (!emailIsValid(email.value)) {
      alert('Please enter a valid Gmail address.');
      event.preventDefault();
    } else if (!passwordsMatch(newPassword.value, confirmPassword.value)) {
      alert('New passwords do not match.');
      event.preventDefault();
    } else if (!passwordIsValid(newPassword.value)) {
      alert('Password must be at least 7 characters and contain uppercase, lowercase, numbers, and special characters.');
      event.preventDefault();
    }
    else{
      router.push("/auth/verify")
    }

  }
  
  function emailIsValid(email: string): boolean {
    const emailPattern = /^[^\s@]+@gmail\.com$/;
    return emailPattern.test(email);
  }
  
  function passwordsMatch(password1: string, password2: string): boolean {
    return password1 === password2;
  }
  
  function passwordIsValid(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{7,}$/;
    return passwordPattern.test(password);
}
</script>
  