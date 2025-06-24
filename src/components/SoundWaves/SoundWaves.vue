<script setup>
import { inject } from 'vue';
const microOn = inject('microOn')
</script>

<template>
    <div class="soundwaves" :class="{ active: microOn }">
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
