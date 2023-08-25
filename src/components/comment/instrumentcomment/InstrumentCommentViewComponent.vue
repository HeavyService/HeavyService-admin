<script lang="ts">
import IconEdit from '../../icons/interface/IconEdit.vue'
import IconDelete from "../../icons/interface/IconDelete.vue"
import IconCalendar from "../../icons/interface/IconCalendar.vue";
import IconCalendarEdit from "../../icons/interface/IconCalendarEdit.vue";
import { formatDate } from "../../../helpers/DateHelper";
import axios from '../../../plugins/axios'
import { defineComponent } from "vue";
import router from '@/router';



export default defineComponent({
  components: {
    IconEdit,
    IconDelete,
    IconCalendar,
    IconCalendarEdit
  },
  props: {
    id: Number,
    firstName: String,
    lastName: String,
    name: String,
    comment: String,
    createdAt: Date,
    updatedAt: Date
  },
  data() {
    return {
      isDropdownVisible: false,
      baseURL: "" as String,
      createdAtString: "" as String,
      updatedAtString: "" as String
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    load() {
      this.baseURL = axios.defaults.baseURL!;
      this.createdAtString = formatDate(this.createdAt!);
      this.updatedAtString = formatDate(this.updatedAt!);
    },
    async deleteData() {
      try {
        const response = await axios.delete(this.baseURL+'/api/instruments/comment', {
          params: {
            commentId: this.id
          }
        });

        if (response.status === 200) {
          console.log('Comment deletion was successful.');
          location.reload();
          // You might want to update your UI or perform other actions here
        } else {
          console.log(`Comment deletion failed with status code: ${response.status}`);
        }
      } catch (error) {
        console.error('An error occurred:', error);

      }

    }
  },
  mounted() {
    this.load();
  }
});

</script>


<template>
  <article class="md:gap-8 md:grid md:grid-cols-3">
    <div>
      <div class="flex items-center mb-6 space-x-4">
        <img class="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="">
        <div class="space-y-1 font-medium dark:text-white">
          <p>{{ firstName }} {{ lastName }}</p>
        </div>
      </div>
      <ul class="space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <li class="flex items-center"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
          <IconCalendar></IconCalendar>
          </svg>{{ createdAtString }}</li>
        <li class="flex items-center"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 19">
            <path
              d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
            <path
              d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
          </svg>Family</li>
      </ul>
    </div>
    <div class="col-span-2 mt-6 md:mt-0">
      <div class="flex items-start mb-5">
        <div class="pr-4">
          <div class="flex flex-wrap items-center mt-5 mb-5">
            <IconCalendar></IconCalendar>
            <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ createdAtString }}</p>
            <IconCalendarEdit></IconCalendarEdit>
            <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ updatedAtString }}</p>
          </div>
          <h4 class="text-xl font-bold text-gray-900 dark:text-white">{{ name }}</h4>
      </div>
      <div class="flex-none w-16">
      <button type="button" @click="deleteData" 
         class="mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
        <IconDelete></IconDelete>
      </button>
    </div>
    </div>
    <p class="mb-2 text-gray-500 dark:text-gray-400">{{ comment }}</p>
  </div>
</article>
</template>