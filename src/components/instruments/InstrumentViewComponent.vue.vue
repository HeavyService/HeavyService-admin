<script lang="ts">
import IconEdit from "../../components/icons/interface/IconEdit.vue"
import IconDelete from "../../components/icons/interface/IconDelete.vue"
import IconCalendar from "../../components/icons/interface/IconCalendar.vue";
import IconCalendarEdit from "../../components/icons/interface/IconCalendarEdit.vue";
import { formatDate } from "@/helpers/DateHelper";
import axios from '@/plugins/axios'
import { defineComponent } from "vue";
import IconLocation from "../icons/interface/IconLocation.vue";
import IconPhone from "../icons/interface/IconPhone.vue";
import FlowbiteSetup from "@/FlowbiteSetup.vue";
import { InstrumentUpdateDto } from "@/dtos/instruments/InstrumentUpdateDto";
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    IconEdit,
    IconDelete,
    IconCalendar,
    IconCalendarEdit,
    IconLocation,
    IconPhone,
    FlowbiteSetup
},
  props: {
    id: Number,
    firstName: String,
    lastName: String,
    name: String,
    imagePath: String,
    pricePerDay: Number,
    district: String,
    region: String,
    address: String,
    phoneNumber: String,
    description: String,
    status: Number,
    createdAt: Date,
    updatedAt: Date 
  },
  data() {
    return {
      baseURL: "" as String,
      imageFullPath: "" as String,
      createdAtString: "" as String,
      updatedAtString: "" as String,
      updateData: new InstrumentUpdateDto()

    }
  },
  methods: {
    load() {
      this.baseURL = axios.defaults.baseURL!;
      this.imageFullPath = this.baseURL + "/" + this.imagePath;
      this.createdAtString = formatDate(this.createdAt!);
      this.updatedAtString = formatDate(this.updatedAt!);
    },
    deleteDate(){
      axios.delete(`${this.baseURL}/api/instruments/${this.id}`)
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
    handleImageChange(event) {
      this.updateData.imagePath = event.target.files[0];
    },
    async handleSubmit() {
      debugger;
      try {
        const formData = new FormData();
        for (const key in this.updateData) {
          if (key === 'imagePath') {
            formData.append(key, this.updateData[key], this.updateData[key].name);
          } else {
            formData.append(key, this.updateData[key]);
          }
        }
        const response = await axios.put('/api/instruments/'+this.id, formData);
        alert('Item created successfully!');
        location.reload();
        // Handle the response or redirect as needed
      } catch (error) {
        console.error('An error occurred:', error);
        alert('Item do not created !');
      }
    },
  },
  
    setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
  mounted() {
    this.load();
  }
});
</script>


<template>
    <div class="card flex border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex-none w-64">
      <img style="height: 100%; width: 100%; object-fit: cover;" class="rounded-lg"
            v-bind:src="imageFullPath"/>
    </div>

    <div class="flex-auto p-4">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ name }}</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">{{ description }}</p>
      <div class="flex flex-wrap items-center mt-5 mb-5">
        <IconLocation></IconLocation>
        <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">
          {{ district }}
        </p>
        <IconLocation></IconLocation>
        <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">
          {{ region }}
        </p>
        <IconLocation></IconLocation>
        <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">
          {{ address }}
        </p>
      </div>
      <div class="flex flex-wrap items-center mt-5 mb-5">
        <IconPhone></IconPhone>
        <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">
          {{ phoneNumber }}
        </p>
        <!-- <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">
         {{ status }}
        </p> -->
        <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">
         {{ pricePerDay }} - Day
        </p>
      </div>
      <div class="flex flex-wrap items-center mt-5 mb-5">
        <IconCalendar></IconCalendar>
        <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ createdAtString }}</p>
        <IconCalendarEdit></IconCalendarEdit>
        <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ updatedAtString }}</p>
      </div>

    </div>
    <div class="flex-none w-16">
      <button type="button" data-modal-target="Create-modal" data-modal-toggle="Create-modal"
        class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <IconEdit></IconEdit>
      </button>
      <button type="button" @click="deleteDate"
        class="mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
        <IconDelete></IconDelete>
      </button>
    </div>

    <div id="Create-modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-md max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="Create-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h5 text-center class="mb-4 text-center text-xl font-medium text-gray-900 dark:text-white">{{ t('instruments') }} {{ t('update') }}</h5>
              <form class="space-y-6" action="#">
                <div>
                  <label for="Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{t('name')}}</label>
                  <input v-model="updateData.name" type="text" id="Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                  
                <div>
                  <label for="imagePath" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('image') }}</label>
                  <input type="file" @change="handleImageChange" id="imagePath" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" accept="image/*" required >
                </div>
                
                <div>
                  <label for="pricePerHours" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('pricePerHours') }}</label>
                  <input v-model="updateData.pricePerDay" type="text" id="pricePerHours" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                  
                <div>
                  <label for="district" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{t('district')}}</label>
                  <input v-model="updateData.district" type="text" id="district" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                  
                <div>
                  <label for="region" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('region') }}</label>
                  <input v-model="updateData.region" type="text" id="region" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                  
                <div>
                   <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{t('address')}}</label>
                  <input v-model="updateData.address" type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                 
                <div>
                  <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{t('status')}}</label>
                  <select v-model.number="updateData.status" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    <option value="0">{{ t('empty') }}</option>
                    <option value="1">{{ t('rent') }}</option>
                  </select>
                </div>

                <div>
                  <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('phone') }}</label>
                  <input v-model="updateData.phoneNumber" type="text" id="phoneNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>

                <div>
                  <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('description') }}</label>
                  <textarea v-model="updateData.description" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></textarea>
                </div>
                <button type="button"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click="handleSubmit">{{ t('update') }}</button>
              </form>
            </div>
          </div>
        </div>
    </div>

  </div>
  <FlowbiteSetup></FlowbiteSetup>
</template>