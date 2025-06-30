<script setup>
import { inject } from 'vue';

const props = defineProps(['themeToggle', 'onChange'])

// if (props.themeToggle) {
//     const is_dark = inject('themeDark')
// }

const handleChange = () => {
    console.log('=> toggle', props.onChange)
    props.onChange()
}

// const props = defineProps({
//     // isEnabled?,
//     // onChange?,
// })
// const isEnambled = ref(isEnabled)

</script>
<template>
    <label :for="toggleId" class="toggle">
        <input type="checkbox" name="toggle" :id="toggleId" checked @change="handleChange">
    </label>
</template>