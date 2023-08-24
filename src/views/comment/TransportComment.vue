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
  <div class="flex justify-between mt-5 flex items-center">
    <button type="button" @click="openCreateModal" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          <div class="flex items-center">
            <IconCreate />
            <p class="mx-2">{{ $t("create") }}</p>
          </div>
        </button>
      <TransportCommentCreate v-if="isCreateModalOpen" @close="closeCreateModal" />

    
  </div>
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
                class="mt-2 mb-3"
            />
        </template>
      </ul>


    <div id="div-gpt-ad-listing-sponsored-ad-first" class="baxter-container" data-testid="qa-advert-slot">
      <div id="div-gpt-ad-listing-sponsored-ad-first-inner" class="baxter-inner baxter-1800337551">
      </div>
    </div>


</template>