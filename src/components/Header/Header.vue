<script setup>
import { inject } from 'vue';
import Toggle from '../Toggle/Toggle.vue'
const mobileVsible = window.innerWidth > 762;
const themeDark = inject('themeDark')
const handleThemeChange = () => {
    themeDark.value = !themeDark.value
}
</script>

<template>
    <header>
        <a href="#" class="logo--main">
            <img src="/aiviana-logo-big.svg" alt="">
        </a>
        <a href="#" class="lk disabled">
            <p v-if="mobileVsible">Личный кабинет</p>
            <div class="user-bg">
                <img src="/User.svg" alt="">
            </div>
        </a>
        <Toggle :themeToggle="true" :onChange="handleThemeChange" />
    </header>
</template>

<style type="scss">
@import url(./Header.scss);
</style>
