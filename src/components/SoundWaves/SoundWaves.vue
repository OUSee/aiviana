<script setup>
import { inject } from 'vue';
const microOn = inject('microOn');
const audioDetected = inject('audioDetected');

</script>

<template>
    <div class="soundwaves" :class="{ active: microOn && audioDetected }">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<style scoped>
@import url(./SoundWaves.scss);
</style>
