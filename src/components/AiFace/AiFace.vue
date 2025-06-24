<script setup>
import { ref, inject, useTemplateRef } from 'vue'

const currentState = inject('currentState')
const counter = ref(0)
const orbRef = useTemplateRef('orb')

const stateTranslate = {
    'idle': 'Анализирую',
    'speak': 'Говорю',
    'listen': 'Слушаю',
    'preprocessing': 'Готовлюсь к анализу',
    'connecting': ''
}

</script>

<template>
    <div ref="orb" class="orb">
        <div v-if="currentState !== 'connecting'" class="orb-target" :class="currentState">
        </div>
        <video v-else autoplay loop>
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