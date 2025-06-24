<script setup>
import AiFace from '../AiFace/AiFace.vue'
import ProgressBar from '../ProgressBar/ProgressBar.vue'
import Microphone from '../Microphone/Mirophone.vue'
import SoundWaves from '../SoundWaves/SoundWaves.vue'
import { ref, provide } from 'vue'
const currentState = ref('idle')
const progress_state = ref(0);
const microOn = ref(false)

provide('currentState', currentState)
provide('progress_state', progress_state)
provide('microOn', microOn)

const handleEndInterview = () => {
  state.value = 'end'
}
</script>

<template>
  <div class="main-view">
    <div class="content">
      <h1>
        AI-Интервью
      </h1>
      <AiFace :currentState="currentState" />
      <ProgressBar progressBarId="interview-progress" :progressValue="progress_state" />
      <div class="interview-manuals">
        <p>
          Ваш микрофон:
        </p>
        <Microphone :microOn="microOn" />
        <SoundWaves :microOn="microOn" />
        <p class="ml-auto">
          Пройдено {{ progress_state }}%
        </p>
        <button @click="handleEndInterview" class="button-classic">
          Завершить интервью
        </button>
      </div>
    </div>
  </div>
  <!-- <VoiceRecognition /> -->
</template>

<style scoped>
@import url(./Body.scss);
</style>
