<script setup lang="ts">
import {useNewsList} from "@/stores/tenders";
import {onMounted} from "vue";

const newsList = useNewsList();
onMounted(() => {
  newsList.getNews2('https://api.test-webest.ru/list')
})
import TenderItem from "@/components/TenderItem.vue";
</script>

<template>
<ul>
  <TenderItem/>
</ul>
</template>

<style scoped>

</style>