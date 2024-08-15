<script setup lang="ts">
defineProps({
  tender: {
    type: Object,
    required: true,
    id: Number,
    eid: Number,
    title: String,
    description: String,
    awarded_value_eur: Number,
    date: Date,
    deadline_date: Date
  }
})

</script>

<template>
<li class="tender__item">
  <div class="tender__item-description">
    <h2 class="tender__item-title">
      <router-link :to="{path: `/tenders/${tender?.id}`}">№ {{tender?.eid}}</router-link>
    </h2>
    <div class="tender__item-wrapper">
      <span class="tender__item-small">Название</span>
      <p class="tender__item-object" :title="tender?.title">{{tender?.title}}</p>
    </div>
    <div class="tender__item-wrapper">
      <span class="tender__item-small">Описание</span>
      <p class="tender__item-text" :title="tender?.description">{{tender?.description}}</p>
    </div>
  </div>
  <div class="tender__item-cost">
    <div class="tender__item-wrapper">
      <span class="tender__item-small">Начальная цена</span>
      <h3 class="tender__item-title">{{tender?.awarded_value_eur}} ₽</h3>
    </div>
    <div class="tender__item-footer">
      <div class="tender__item-wrapper">
        <span class="tender__item-small">Размещено</span>
        <p>{{tender?.date}}</p>
      </div>
      <div class="tender__item-wrapper">
        <span class="tender__item-small">Дедлайн</span>
        <p>{{tender?.deadline_date}}</p>
      </div>
    </div>
  </div>
</li>
</template>

<style scoped>

</style>