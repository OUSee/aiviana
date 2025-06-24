<script setup>
const props = defineProps(['toggleId', 'checked'])

// const props = defineProps({
//     // isEnabled?,
//     // onChange?,
// })
// const isEnambled = ref(isEnabled)

</script>
<template>
    <label :for="toggleId" class="toggle">
        <input type="checkbox" name="toggle" :id="toggleId" :checked="checked">
    </label>
</template>