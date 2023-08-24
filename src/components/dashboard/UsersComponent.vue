<script lang="ts">

import { defineComponent } from "vue";


export default defineComponent({
    props:{
        id: Number,
        firstName: String,
        lastName: String,
        email: String,
        createdAt: Date,
        updatedAt: Date
    },
    
    methods:{
        
      
    },

    mounted() {

    },
    
})

</script>

<template>
     <div class="flow-root">
        <ul role="list" class="mt-5 divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {{ firstName ,lastName }}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {{ email }}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {{ createdAt }}
                    </div>
                </div>
            </li>
        </ul>
        </div>
</template>