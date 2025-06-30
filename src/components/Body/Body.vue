<script setup>
import AiFace from '../AiFace/AiFace.vue'
import ProgressBar from '../ProgressBar/ProgressBar.vue'
import Microphone from '../Microphone/Mirophone.vue'
import SoundWaves from '../SoundWaves/SoundWaves.vue'
import VoiceRecognition from '../AiFace/VoiceRecognition.vue'

import { ref, provide } from 'vue'
const currentState = ref('connecting');
const progress_state = ref(30);
const microOn = ref(false)
const audioDetected = ref(false)
const ai_talk = ref(false)

provide('currentState', currentState)
provide('progress_state', progress_state)
provide('microOn', microOn)
provide('audioDetected', audioDetected)
provide('ai_talk', ai_talk)

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
        <SoundWaves :microOn="microOn" :audioDetected="audioDetected" />
        <p class="ml-auto">
          Пройдено {{ progress_state }}%
        </p>
        <button :on_click="handleEndInterview" class="button-classic">
          Завершить интервью
        </button>
      </div>
    </div>
  </div>
  <VoiceRecognition :currentState="currentState" :audioDetected="audioDetected" :microOn="microOn" :ai_talk="ai_talk" />
</template>

<style scoped>
@import url(./Body.scss);
</style>
