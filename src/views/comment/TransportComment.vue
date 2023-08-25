<script lang="ts">
import { defineComponent} from 'vue';
    import IconCreate from '@/components/icons/interface/IconCreate.vue';
    import TransportCommentSkeletonComponent from "@/components/comment/transportcomment/TransportCommentSkeletonComponent.vue";
    import { TransportCommentViewModel } from '@/viewmodels/TransportCommentViewModel';
    import TransportCommentViewComponent from "@/components/comment/transportcomment/TransportCommentViewComponent.vue";
    import axios from '@/plugins/axios'
    import { useI18n } from 'vue-i18n';
    import IconHome from '@/components/icons/IconHome.vue';
    import TransportCommentCreate from '../../modals/comments/transportcomment/TransportCommentCreate.vue'
    import { PaginationMetaData } from '@/utils/PaginationUtils';

export default defineComponent({
    components:{
      TransportCommentViewComponent, 
      TransportCommentSkeletonComponent,
    IconCreate,
    IconHome,
    TransportCommentCreate
},
  methods:{
    async getDataAsync(){
      this.isLoaded = false;
      var response = await axios.get<TransportCommentViewModel[]>("/api/transports/comments");
      var paginationJson = JSON.parse(response.headers["x-pagination"]);
      this.metaData = new PaginationMetaData();
      this.metaData.totalPages = paginationJson.TotalPages;
      this.metaData.hasNext = paginationJson.HasNext;
      this.metaData.hasPrevious = paginationJson.HasPrevious;
      this.isLoaded=true;
      this.instrumentList = response.data;
      console.log(this.instrumentList);
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
      instrumentList: [] as TransportCommentViewModel[],
      defaultSkeletons: 4 as Number,
      isLoaded: false as Boolean,
      isCreateModalOpen: false,
      metaData: {} as PaginationMetaData,
      isBigPagination: false as boolean,
    }
  },
  setup(){
    const { t } = useI18n();
  },
  async mounted() {
      await this.getDataAsync();
  },
});
</script>



<template>

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
        <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{{ $t("comments") }}</span>
      </div>
    </li>
    <li aria-current="page">
      <div class="flex items-center">
        <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{{ $t("transport") }}</span>
      </div>
    </li>
    
  </ol>
  </nav>
  

    

  <ul v-show="isLoaded === false">
      <template v-for="element in defaultSkeletons">
        <TransportCommentSkeletonComponent class="mt-2 mb-3" />
      </template>
    </ul>

    <ul v-show="isLoaded === true">
        <template v-for="element in instrumentList">
            <TransportCommentViewComponent
                :id="element.id"
                :firstName="element.firstName"
                :lastName="element.lastName"
                :name="element.name"
                :comment="element.comment"
                :createdAt="element.createdAt"
                :updatedAt="element.updatedAt"
                class="mt-16 mb-12"
            />
        </template>
      </ul>

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

    <div id="div-gpt-ad-listing-sponsored-ad-first" class="baxter-container" data-testid="qa-advert-slot">
      <div id="div-gpt-ad-listing-sponsored-ad-first-inner" class="baxter-inner baxter-1800337551">
      </div>
    </div>


</template>