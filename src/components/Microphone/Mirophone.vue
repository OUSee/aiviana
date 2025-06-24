<script setup>
import { ref, inject } from 'vue'
const microOn = inject('microOn')

const handleMicroClick = () => {
    microOn.value = !microOn.value
    console.log('=> microOn', microOn.value)
}

</script>

<template>
    <button @click="handleMicroClick" class="microphone-toggle" :class="{ active: microOn !== false }">
        <svg v-if="microOn === false" width="33" height="33" viewBox="0 0 33 33" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.5783 8.98728V8.58627C21.5783 5.63218 19.1856 3.2395 16.2315 3.2395C13.2774 3.2395 10.8848 5.63218 10.8848 8.58627V15.2697"
                stroke="#6066EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M12.2749 19.5338C13.2507 20.6165 14.6676 21.2849 16.2315 21.2849C19.1856 21.2849 21.5783 18.8922 21.5783 15.9381V15.2698"
                stroke="#6066EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M9.25439 23.2232C11.0857 24.9208 13.5318 25.9634 16.2319 25.9634C21.8728 25.9634 26.4576 21.3785 26.4576 15.7377V13.4653"
                stroke="#6066EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.00586 13.4653V15.7377C6.00586 17.1546 6.28656 18.4913 6.80787 19.7211" stroke="#6066EE"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M27.0185 4.3623L5.44434 25.9499" stroke="#6066EE" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M14.895 4.57617V8.58625" stroke="#6066EE" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M16.2314 25.9634V29.9735" stroke="#6066EE" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
        <svg v-else width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.3984 21.2846C18.2343 21.2846 20.5312 18.8919 20.5312 15.9378V8.58603C20.5312 5.63194 18.2343 3.23926 15.3984 3.23926C12.5625 3.23926 10.2656 5.63194 10.2656 8.58603V15.9378C10.2656 18.8919 12.5625 21.2846 15.3984 21.2846Z"
                stroke="#6066EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M5.58203 13.4648V15.7372C5.58203 21.3781 9.98338 25.9629 15.3985 25.9629C20.8135 25.9629 25.2149 21.3781 25.2149 15.7372V13.4648"
                stroke="#6066EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.6147 9.16091C14.7696 8.7198 16.0271 8.7198 17.182 9.16091" stroke="#6066EE" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.3716 11.9948C15.0517 11.8077 15.7574 11.8077 16.4375 11.9948" stroke="#6066EE"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.3984 25.9629V29.973" stroke="#6066EE" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    </button>
</template>