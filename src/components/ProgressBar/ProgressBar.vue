<script setup>
import { inject } from 'vue';
const props = defineProps(['progressBarId'])
const progressValue = inject('progress_state')
</script>

<template>
    <progress :id="progressBarId" max="100" :value="progressValue" aria-busy="false">
    </progress>
</template>