<script setup lang="ts">
import {computed, ref, watch} from "vue";
const emit = defineEmits(['changePage'])
const props = defineProps({
  pages: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: false,
    default: 10
  },
  pageApi: {
    type: Number,
    required: true
  },
  loading: {
    type: Boolean,
    required: false
  }
});
const arrayPages = ref([])
const pageNumber = ref(0)

const getPages = (num: number) => {
  for(let i: number = 0; i <= num; i++){
    arrayPages.value.push(i)
  }
}
const getPaged = computed(() => {
  return props?.pages / props?.size
})
const nextPage = () => pageNumber.value += 1;
const prevPage = () => pageNumber.value -= 1;

const paginate = (page: number) => {
  emit('changePage', ++page)
}

const paginatedData = computed(() => {
  const start = (pageNumber.value) * props?.size,
        end = start + props?.size;
  return arrayPages.value.slice(start, end)
});
watch(() => getPaged.value, () => {
  getPages(getPaged.value)
})

</script>

<template>
  <li v-if="paginatedData.length">
    <button @click.prevent="prevPage" class="btn">prev</button>
  </li>
  <li v-for="page in paginatedData" :key="page">
    <button @click.prevent="paginate(page)" :class="{active: (page + 1) === pageApi }" :disabled="loading" class="btn">{{ page + 1 }}</button>
  </li>
  <li v-if="paginatedData.length">
    <button @click.prevent="nextPage" class="btn">next</button>
  </li>
</template>

<style scoped>

</style>