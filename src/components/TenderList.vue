<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import TenderItem from "@/components/TenderItem.vue";
import TenderItemLoader from "@/components/TenderItemLoader.vue";
import ThePagination from "@/components/ThePagination.vue";

const tendersList = ref(null);
const stringToSearch = ref('');
const loading = ref(false);
const errorPage = ref(false);
const list = ref(null);

const getTenders = async (page: number = 1) => {
  loading.value = true;
  return await (new Promise(resolve => setTimeout(resolve, 10)))
      .then(async () => {
        return fetch(`https://api.test-webest.ru/list/?page=${page}`).then(res => res.json());
      })
      .then((res) => {
        tendersList.value = res;
        loading.value = false;
        showScrollTop()
      })
      .catch(error => errorPage.value = true)

}
const paginate = (page: number) => getTenders(page);
const showScrollTop = () => {
  list?.value?.scrollTo({top: 0, behavior: 'smooth'})
}
const searchProducts = computed(() => {
  return tendersList?.value?.data.filter(el => {
    if (el.title.includes(stringToSearch.value)) {
      return el;
    }
  })
})
onMounted(() => getTenders())
</script>

<template>
  <form v-if="!errorPage">
    <input v-model="stringToSearch" class="input" type="text" placeholder="Поиск по названию...">
  </form>
  <ul v-if="!errorPage" ref="list" class="tender__list">
    <TenderItemLoader v-if="loading"/>
    <TenderItem v-else v-for="(tender, index) in searchProducts?.slice(0, 30)" :key="index" :tender="tender"/>
  </ul>
  <div v-else class="error-wrap">
    <h4 class="text">Ошибка загрузки!</h4>
    <button class="btn" @click.prevent="$router.go(0)">Перезагрузить страницу</button>
  </div>
  <ul v-if="!errorPage" class="pagination">
    <ThePagination @change-page="paginate" :loading="loading" :pages="tendersList?.page_count"
                   :page-api="tendersList?.page_number"/>
  </ul>

</template>

<style scoped>

</style>