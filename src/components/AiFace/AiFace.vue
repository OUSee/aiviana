<script setup>
import { ref, watch, inject, useTemplateRef } from 'vue'
import AiFace_speak from './AiFace_speak.vue'
import AiFace_analyze from './AiFace_analyze.vue';
import AiFace_preAnalyze from './AiFace_preAnalyze.vue';
import AiFace_preanalyze_test from './AiFace_preanalyze_test.vue';

const currentState = inject('currentState')
const ai_talk = inject('ai_talk');
const orbRef = useTemplateRef('orb')

const stateTranslate = {
    'idle': 'Анализирую',
    'speak': 'Говорю',
    'listen': 'Слушаю',
    'preprocessing': 'Готовлюсь к анализу',
    'connecting': ''
}



watch(currentState, (value, prevVal) => {
    orbRef.value.classList.add('change')
    console.log('=> orbRef', orbRef.value.classList)
    console.log('=> state-change', value, '<=', prevVal)
    setTimeout(() => {
        orbRef.value.classList.remove('change')
    }, 500)
})

</script>

<template>
    <div ref="orb" class="orb">
        <AiFace_speak v-if="currentState === 'speak'" :ai_talk="ai_talk" />
        <AiFace_analyze v-if="currentState === 'idle'" />
        <!-- <AiFace_preAnalyze v-if="currentState === 'preprocessing'" /> -->
        <AiFace_preanalyze_test v-if="currentState === 'preprocessing'" />
        <div v-if="currentState !== 'connecting'" class="orb-target" :class="[{ active: ai_talk }, currentState]">
        </div>
        <video v-else autoplay loop>
            <source
                src="../../assets/ai_conditions/Firefly An ethereal, translucent glowing orb floating on a pure white background, featuring soft-foc.webm"
                type="video/webm">
            <source
                src="../../assets/ai_conditions/Firefly An ethereal, translucent glowing orb floating on a pure white background, featuring soft-foc.mp4"
                type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <p v-if="currentState !== 'connecting'" class="ai-state">// {{ stateTranslate[currentState] }} //</p>
        <p v-else class="ai-state">
            <b>AIVIANA</b><br> подключается к интервью, пожалуйста подождите...
        </p>
    </div>

</template>

<style scoped>
@import url(./AiFace.scss);
</style>