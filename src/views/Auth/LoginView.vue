<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="../../assets/logo.jpg" alt="logo" />
        Heavy Service
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit="validateForm">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email
              </label>
              <input type="email" name="email" id="email" required
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" v-model="email" />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input required type="password" name="password" id="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="password" />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <RouterLink to ="/auth/forget">
                <div fill="currentColor"  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Forget
                password?</div>
              </RouterLink>
              
              
            </div>
            <button type="button"
              @click="handleSignIn"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              This site is for Heavy Service administrators only!
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import Cookies from 'js-cookie';
const email = ref('');
const password = ref('');

function validateForm(event: Event) {
  if (!emailIsValid(email.value)) {
    alert('Please enter a valid Gmail address.');
    event.preventDefault(); // Prevent form submission
  } else if (!passwordIsValid(password.value)) {
    alert('Password must meet the criteria for a strong password.');
    event.preventDefault(); // Prevent form submission
  }
}

function emailIsValid(email: string): boolean {
  const emailPattern = /^[^\s@]+@gmail\.com$/;
  return emailPattern.test(email);
}

function passwordIsValid(password: string): boolean {
  // Implement your password validation criteria here
  // For example, you can check if it has at least 8 characters, contains uppercase, lowercase, numbers, and special characters.
  // Return true if the password is valid, otherwise return false.
  return password.length >= 7 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[^A-Za-z\d]/.test(password);
}


const router = useRouter();
async function handleSignIn(event: Event){
  const userLogin: LoginDto = {
    email: email.value,
    password: password.value,
  };

  interface LoginDto {
    email: string;
    password: string;
  }

  try {
    const response = await axios.post('http://95.130.227.191:8080/api/auth/login', userLogin);
    
    if (response.status === 200) {
      const token = response.data.token;
      Cookies.set('token', token);
      console.log('Logged in successfully');
      router.push('/dashboard');
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
  }


function saveTokenToCookie(token: string) {
  document.cookie = `token=${encodeURIComponent(token)}; path=/`; // Customize as needed
}


}
// window.addEventListener('beforeunload', () => {
//   Cookies.remove('token');
// });
// window.addEventListener('popstate', () => {
//   Cookies.remove('token');
// });


</script>

