<script lang="ts">
import { defineComponent } from 'vue';
import IconCreate from '@/components/icons/interface/IconCreate.vue';
import InstrumentSkeletonComponent from "@/components/instruments/InstrumentSkeletonComponent.vue";
import { InstrumentViewModel } from '@/viewmodels/InstrumentViewModel';
import InstrumentViewComponent from "@/components/instruments/InstrumentViewComponent.vue.vue";
import axios from '@/plugins/axios';
import { useI18n } from 'vue-i18n';
import IconHome from '@/components/icons/IconHome.vue';
import InstrumentCreateModal from '../../modals/instruments/InstrumentCreateModal.vue'

export default defineComponent({
  components: {
    InstrumentViewComponent,
    InstrumentSkeletonComponent,
    IconCreate,
    IconHome,
    InstrumentCreateModal,
  },
  methods: {
    async getDataAsync() {
      this.isLoaded = false;
      try {
        const response = await axios.get<InstrumentViewModel[]>("/api/instruments");
        this.instrumentList = response.data;
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
        const response = await axios.get<InstrumentViewModel[]>("/api/instruments/search", {
          params: {
            search: this.searchQuery,
            page: 1, // Assuming you want to search on page 1
          },
        });
        this.instrumentList = response.data;
        console.log(this.instrumentList)
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        this.isLoaded = true;
      }
    },
    openCreateModal() {
      debugger;
      this.isCreateModalOpen = true;
    },
    closeCreateModal() {
      this.isCreateModalOpen = false;
      location.reload();
    },
  },
  data() {
    return {
      instrumentList: [] as InstrumentViewModel[],
      defaultSkeletons: 4 as number,
      isLoaded: false as boolean,
      isCreateModalOpen: false,
      searchQuery: '', // Added property to store the search query
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



  <template>
    <div>
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
    <li class="inline-flex items-center">
        <IconHome></IconHome>
    </li>
    <li aria-current="page">
      <div class="flex items-center">
        <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{{ $t("instruments") }}</span>
      </div>
    </li>
  </ol>
      </nav>
  
      <!-- Create and Search Form -->
      <div class="flex justify-between mt-5 flex items-center">
        <button type="button" @click="openCreateModal" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          <div class="flex items-center">
            <IconCreate />
            <p class="mx-2">{{ $t("create") }}</p>
          </div>
        </button>
        <InstrumentCreateModal v-if="isCreateModalOpen" @close="closeCreateModal" />
        <form class="flex justify-end pb-5 w-full" @submit.prevent="handleSearchSubmit">
          <div class="flex relative right-0 w-2/5">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search"
              class="flex end w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="searchQuery" placeholder="Name..."  />
            <button type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {{ $t("search") }}
            </button>
          </div>
        </form>
      </div>
  
      <!-- Instruments Skeletons -->
      <ul v-show="isLoaded === false">
        <template v-for="element in defaultSkeletons">
          <InstrumentSkeletonComponent class="mt-2 mb-3" />
        </template>
      </ul>
  
      <!-- Instruments -->
      <ul v-show="isLoaded === true">
        <template v-for="element in instrumentList">
          <InstrumentViewComponent
            :id="element.id"
            :firstName="element.firstName"
            :lastName="element.lastName"
            :name="element.name"
            :imagePath="element.imagePath"
            :pricePerDay="element.pricePerDay"
            :district="element.district"
            :region="element.region"
            :address="element.address"
            :phoneNumber="element.phoneNumber"
            :description="element.description"
            :status="element.status"
            :createdAt="element.createdAt"
            :updatedAt="element.updatedAt"
            class="mt-2 mb-3"
          />
        </template>
      </ul>
  
      <!-- Sponsored Ad Section -->
      <div id="div-gpt-ad-listing-sponsored-ad-first" class="baxter-container" data-testid="qa-advert-slot">
        <div id="div-gpt-ad-listing-sponsored-ad-first-inner" class="baxter-inner baxter-1800337551">
          <!-- Ad content here -->
        </div>
      </div>
    </div>
  </template>
  