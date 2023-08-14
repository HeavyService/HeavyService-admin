<script setup lang="ts">
  import Header from "../components/common/Header.vue";
  import Saidbar from "../components/common/Saidbar.vue";
  import Foolter from "../components/common/Foolter.vue";
  import ThemeSetter from "@/components/common/ThemeSetter.vue";
</script>

<template>
  <ThemeSetter></ThemeSetter>
  <Header></Header>
  <Saidbar></Saidbar>
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <main>
      </main>
      <Foolter></Foolter>
    </div>
  </div>
</template>
