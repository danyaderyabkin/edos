<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
const route = useRoute();
const errorPage = ref(false)

const tenderItem= ref(null)
const getTender = async (page: number = 1) => {
  return await (new Promise(resolve => setTimeout(resolve, 10)))
      .then(async () => {
        return await fetch(`https://api.test-webest.ru/element/?id=${route.params.id}`).then(res => res.json());
      })
      .then((res) => {
        tenderItem.value = res;
      })
      .catch(error => errorPage.value = true)

}
onMounted(() => getTender())
</script>

<template>
  <main>
    <div class="container">
      <button @click.prevent="$router.go(-1)" class="btn">Назад</button>
      <div v-if="!errorPage">
        <h1 v-if="tenderItem" class="heading">Тендер № {{tenderItem?.eid}}</h1>
        <p class="tender__item-title">{{tenderItem?.description}}</p>
      </div>
      <div v-else class="error-wrap">
        <h4 class="text" >Ошибка загрузки!</h4>
        <button class="btn" @click.prevent="$router.go(0)">Перезагрузить страницу</button>
      </div>

    </div>
  </main>
</template>

<style scoped>

</style>