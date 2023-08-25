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
        <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{{ $t("users") }}</span>
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
      <form class="flex justify-end pb-5 w-full" @submit.prevent="handleSearchSubmit">
        <div class="flex relative right-0 w-2/5">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input v-model="searchQuery"
            type="search"
            id="default-search"
            class="flex end w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name..."  />
          <button type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {{ $t("search") }}
          </button>
        </div>
      </form>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4" v-show="isLoaded === true">
      <template v-for="element in userList">
        <UserViewComponent
          :id="element.id"
          :firstName="element.firstName"
          :lastName="element.lastName"
          :email="element.email"
          :createdAt="element.createdAt"
          :updatedAt="element.updatedAt"
          class="mt-2 mb-3"
        />
      </template>
    </div>
    <!-- End: Transports -->

    <nav aria-label="Page navigation example">
  <ul class="inline-flex -space-x-px text-sm">
    <li v-show="metaData.hasPrevious=true">
      <a href="#" class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        {{ $t("previous") }}
      </a>
    </li>
      <li v-for="el in metaData.totalPages">
        <button @click="getDataAsync(el)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {{ el }}
        </button>
      </li>
    <li v-show="metaData.hasNext=true">
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        {{ $t("next") }}
      </a>
    </li>
  </ul>
</nav>

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
import UserSkeletonComponent from "@/components/users/UserSkeletonComponent.vue";
import { UserViewModel } from '@/viewmodels/UserViewModels';
import UserViewComponent from "@/components/users/UserViewComponent.vue";
import axios from '@/plugins/axios';
import { useI18n } from 'vue-i18n';
import IconHome from '@/components/icons/IconHome.vue';
import { PaginationMetaData } from '@/utils/PaginationUtils';

export default defineComponent({
  components: {
    UserViewComponent,
    UserSkeletonComponent,
    IconCreate,
    IconHome,
  },
  methods: {
    async getDataAsync() {
      this.isLoaded = false;
      try {
        const response = await axios.get<UserViewModel[]>("/api/users");
        var paginationJson = JSON.parse(response.headers["x-pagination"]);
        this.metaData = new PaginationMetaData();
        this.metaData.totalPages = paginationJson.TotalPages;
        this.metaData.hasNext = paginationJson.HasNext;
        this.metaData.hasPrevious = paginationJson.HasPrevious;
        this.userList = response.data;
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        this.isLoaded = true;
      }
    },
    async handleCreateClick() {
      // Handle create button click
    },
    async handleSearchSubmit() {
      if (this.searchQuery.trim() === '') {
        await this.getDataAsync();
        return;
      }

      this.isLoaded = false;
      try {
        const response = await axios.get<UserViewModel[]>("/api/instruments/search", {
          params: {
            search: this.searchQuery,
            page: 1, // Assuming you want to search on page 1
          },
        });
        this.userList = response.data;
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        this.isLoaded = true;
      }
    },
  },
  data() {
    return {
      userList: [] as UserViewModel[],
      defaultSkeletons: 4 as number,
      isLoaded: false as boolean,
      metaData: {} as PaginationMetaData,
      isBigPagination: false as boolean,
      searchQuery: '', // Added property to store the search query
    };
  },
  setup() {
    const { t } = useI18n
    return {
      t,
    };
  },
  async mounted() {
    await this.getDataAsync();
  },
});
</script>
