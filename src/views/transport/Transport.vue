<script lang="ts">
    import { defineComponent} from 'vue';
    import IconCreate from '@/components/icons/interface/IconCreate.vue';
    import TransportSkeletonComponent from "@/components/transports/TransportSkeletonComponent.vue";
    import { TransportViewModel } from '@/viewmodels/TransportViewMoldels';
    import TransportViewComponent from "@/components/transports/TransportViewComponent.vue";
    import axios from '@/plugins/axios'
    import { useI18n } from 'vue-i18n';
    import Cookies from 'js-cookie';
    import IconHome from '@/components/icons/IconHome.vue';

export default defineComponent({
    components:{
    TransportViewComponent, TransportSkeletonComponent,
    IconCreate, IconHome
    },
  methods:{
    async getDataAsync(){
      this.isLoaded = false;
      var response = await axios.get<TransportViewModel[]>("/api/transports");
      this.isLoaded=true;
      this.transportList = response.data;
      console.log(this.transportList);
    }    
  },
  data() {
    return {
      transportList: [] as TransportViewModel[],
      defaultSkeletons: 4 as Number,
      isLoaded: false as Boolean
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
        <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{{ $t("transport") }}</span>
      </div>
    </li>
  </ol>
</nav>


    <!-- Begin: Transports Skeletons -->
    <ul v-show="isLoaded === false">
        <template v-for="element in defaultSkeletons">
            <TransportSkeletonComponent class="mt-2 mb-3" />
        </template>
    </ul>
    <!-- End: Transports Skeletons -->

    <!-- Begin: Transports -->

    <div class="flex w-100 justify-end">
        <button type="button"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <div class="flex flex-wrap items-center">
                <IconCreate />
                <p class="mx-2">{{ $t("create") }}</p>
            </div>
        </button>
    </div>
      <ul v-show="isLoaded === true">
        <template v-for="element in transportList">
            <TransportViewComponent
                :id="element.id"
                :firstName="element.firstName"
                :lastName="element.lastName"
                :name="element.name"
                :imagePath="element.imagePath"
                :pricePerHours="element.pricePerHours"
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
    
    <!-- End: Transports -->

    <div id="div-gpt-ad-listing-sponsored-ad-first" class="baxter-container" data-testid="qa-advert-slot">
      <div id="div-gpt-ad-listing-sponsored-ad-first-inner" class="baxter-inner baxter-1800337551">

      </div>
    </div>
</template>