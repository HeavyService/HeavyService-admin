<script lang="ts">
import IconEdit from "../../components/icons/interface/IconEdit.vue"
import IconDelete from "../../components/icons/interface/IconDelete.vue"
import IconCalendar from "../../components/icons/interface/IconCalendar.vue";
import IconCalendarEdit from "../../components/icons/interface/IconCalendarEdit.vue";
import { formatDate } from "@/helpers/DateHelper";
import axios from '@/plugins/axios'
import { defineComponent } from "vue";

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
    email: String,
    createdAt: Date,
    updatedAt: Date
  },
  data() {
    return {
      isDropdownVisible: false,
      baseURL: "" as String,
      imageFullPath: "" as String,
      createdAtString: "" as String,
      updatedAtString: "" as String
    }
  },
  methods: {
    toggleDropdown() {
        debugger;
        this.isDropdownVisible = !this.isDropdownVisible;
    },
    load() {
      this.baseURL = axios.defaults.baseURL!;
    //   this.imageFullPath = this.baseURL + "/" + this.imagePath;
      this.createdAtString = formatDate(this.createdAt!);
      this.updatedAtString = formatDate(this.updatedAt!);
    },
    deleteDate(){
      console.log(this.id)
      axios.delete(`${this.baseURL}/api/users/${this.id}`)
     .then((response) => {
      if (response.status === 200) {
        console.log('Deletion was successful.');
        location.reload();
      } else {
        console.log(`Deletion failed with status code: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(`An error occurred: ${error.message}`);
    });
    },
  },
  mounted() {
    this.load();
  }
});
</script>


<template>
    <div class="flex">
      <div class="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="justify-end px-4 pt-4">
          <button 
            id="dropdownButton"
            class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            @click="toggleDropdown"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path
                d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            class="z-10  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            v-show="isDropdownVisible">
            <ul class="py-2">
              <li>
                <a
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                <IconEdit></IconEdit>
                {{ $t("update") }}
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                   @click="deleteDate">
                <IconDelete></IconDelete>
                {{ $t("delete") }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Bonnie image"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {{ lastName }}  {{ firstName }}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400"> {{ email }} </span>
          <div class="flex flex-wrap items-center mt-5 mb-5">
            <IconCalendar></IconCalendar>
            <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">
              {{ createdAtString }}
            </p>
            <IconCalendarEdit></IconCalendarEdit>
            <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">
              {{ updatedAtString }}
            </p>
          </div>
        </div>
        
      </div>
      
    </div>
  </template>




