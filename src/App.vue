<script setup>
import { provide, ref, watch } from 'vue';
import Header from './components/Header/Header.vue'
import Body from '@/components/Body/Body.vue'

const themeDark = ref(false)

provide('themeDark', themeDark)

const bodyTag = document.querySelector('body')

watch(themeDark, (value, prevValue) => {
  if (value) {
    bodyTag.classList.add('dark')
  }
  else {
    bodyTag.classList.remove('dark')
  }
})
</script>

<template>
  <div class="container">
    <Header />

    <Body />
  </div>
</template>

<style lang="scss">
@import url(_variables.scss);
</style>
