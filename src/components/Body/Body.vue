<script setup>
import AiFace from '../AiFace/AiFace.vue'
import ProgressBar from '../ProgressBar/ProgressBar.vue'
import { ref } from 'vue'


const count = ref(0)
</script>

<template>
  <div class="main-view">
    <div class="content">
      <h1>
        AI-Интервью
      </h1>
      <AiFace />
      <ProgressBar progressBarId="interview-progress" progressValue="30" />
    </div>
  </div>
  <!-- <VoiceRecognition /> -->
</template>

<style scoped>
@import url(./Body.scss);
</style>
