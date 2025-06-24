<script setup>
const props = defineProps(['progressBarId', 'progressValue'])
</script>

<template>
    <progress :id="progressBarId" max="100" :value="progressValue" aria-busy="false">
    </progress>
</template>