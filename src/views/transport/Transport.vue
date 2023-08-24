<template>
  <div>
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <IconHome></IconHome>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{{ $t("transport") }}</span>
          </div>
        </li>
      </ol>
    </nav>

    <!-- Transports Skeletons -->
    <ul v-show="isLoaded === false">
      <template v-for="element in defaultSkeletons">
        <TransportSkeletonComponent class="mt-2 mb-3" />
      </template>
    </ul>

    <!-- Transports -->
    <div class="flex justify-between mt-5 flex items-center">
      <!-- Modal toggle -->
      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button">
        <div class="flex items-center">
            <IconCreate/>
            <p class="mx-2">{{ $t("create") }}</p>
          </div>
      </button>

      <!-- Main modal -->
      <div id="authentication-modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-md max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h5 text-center class="mb-4 text-center text-xl font-medium text-gray-900 dark:text-white">{{ t('instruments') }} {{ t('create') }}</h5>
              <form class="space-y-6" action="#">
                <div>
                  <label for="Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{t('name')}}</label>
                  <input v-model="formData.name" type="text" id="Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                  
                <div>
                  <label for="imagePath" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('image') }}</label>
                  <input type="file" @change="handleImageChange" id="imagePath" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" accept="image/*" required >
                </div>
                
                <div>
                  <label for="pricePerHours" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('pricePerHours') }}</label>
                  <input v-model="formData.pricePerHours" type="text" id="pricePerHours" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                  
                <div>
                  <label for="district" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{t('district')}}</label>
                  <input v-model="formData.district" type="text" id="district" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                  
                <div>
                  <label for="region" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('region') }}</label>
                  <input v-model="formData.region" type="text" id="region" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                  
                <div>
                   <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{t('address')}}</label>
                  <input v-model="formData.address" type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                 
                <div>
                  <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{t('status')}}</label>
                  <select v-model.number="formData.status" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    <option value="0">{{ t('empty') }}</option>
                    <option value="1">{{ t('rent') }}</option>
                  </select>
                </div>

                <div>
                  <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('phone') }}</label>
                  <input v-model="formData.phoneNumber" type="text" id="phoneNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>

                <div>
                  <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('description') }}</label>
                  <textarea v-model="formData.description" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></textarea>
                </div>

                  


                <button type="button"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click="handleSubmit">{{ $t('create') }}</button>
              </form>
            </div>
          </div>
        </div>
      </div>



      <form class="flex justify-end pb-5 w-full" @submit.prevent="handleSearchSubmit">
        <div class="flex relative right-0 w-2/5">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input v-model="searchQuery" type="search" id="default-search"
            class="flex end w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name..." />
          <button type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {{ $t("search") }}
          </button>
        </div>
      </form>
    </div>
    <ul v-show="isLoaded === true">
      <template v-for="element in transportList">
        <TransportViewComponent :id="element.id" :firstName="element.firstName" :lastName="element.lastName"
          :name="element.name" :imagePath="element.imagePath" :pricePerHours="element.pricePerHours"
          :district="element.district" :region="element.region" :address="element.address"
          :phoneNumber="element.phoneNumber" :description="element.description" :status="element.status"
          :createdAt="element.createdAt" :updatedAt="element.updatedAt" class="mt-2 mb-3" />
      </template>
    </ul>
    <!-- End: Transports -->

    <!-- Sponsored Ad Section -->
    <div id="div-gpt-ad-listing-sponsored-ad-first" class="baxter-container" data-testid="qa-advert-slot">
      <div id="div-gpt-ad-listing-sponsored-ad-first-inner" class="baxter-inner baxter-1800337551">
        <!-- Ad content here -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconCreate from '@/components/icons/interface/IconCreate.vue';
import TransportSkeletonComponent from "@/components/transports/TransportSkeletonComponent.vue";
import { TransportViewModel } from '../../viewmodels/TransportViewMoldels';
import TransportViewComponent from "@/components/transports/TransportViewComponent.vue";
import axios from '@/plugins/axios';
import { useI18n } from 'vue-i18n';
import IconHome from '@/components/icons/IconHome.vue';
import TransportCreateModal from '../../modals/transports/TransportModal.vue'
import FlowbiteSetup from '@/FlowbiteSetup.vue';
import { TransportCreateDto } from '../../dtos/transports/TransportCreateDto'; // Adjust the import path

export default defineComponent({
  name: 'TransportCreateModal',
  components: {
    TransportViewComponent,
    TransportSkeletonComponent,
    IconCreate,
    IconHome,
    TransportCreateModal,
    FlowbiteSetup
  },
  methods: {
    async getDataAsync() {
      this.isLoaded = false;
      try {
        const response = await axios.get<TransportViewModel[]>("/api/transports");
        this.transportList = response.data;
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        this.isLoaded = true;
      }
    },
    async handleSearchSubmit() {
      if (this.searchQuery.trim() === '') {
        await this.getDataAsync();
        return;
      }

      this.isLoaded = false;
      try {
        const response = await axios.get<TransportViewModel[]>("/api/instruments/search", {
          params: {
            search: this.searchQuery,
            page: 1, // Assuming you want to search on page 1
          },
        });
        this.transportList = response.data;
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        this.isLoaded = true;
      }
    },

    handleImageChange(event) {
      this.formData.imagePath = event.target.files[0];
    },
    async handleSubmit() {
      debugger;
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
        alert('Item created successfully!');
        location.reload();
        // Handle the response or redirect as needed
      } catch (error) {
        console.error('An error occurred:', error);
        alert('Item do not created !');
      }
    },

  },
  data() {
    return {
      transportList: [] as TransportViewModel[],
      defaultSkeletons: 4 as number,
      isLoaded: false as boolean,
      isCreateModalOpen: false,
      searchQuery: '',
      formData: new TransportCreateDto(),
    };
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
  async mounted() {
    await this.getDataAsync();
  },
});
</script>
