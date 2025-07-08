<script setup>
import { inject } from 'vue';
import Toggle from '../Toggle/Toggle.vue'
import BigLogoIcon from '../icons/BigLogoIcon.vue'
const themeDark = inject('themeDark')
const handleThemeChange = () => {
    themeDark.value = !themeDark.value
}
</script>

<template>
    <header>
        <a href="#" class="logo--main">
            <BigLogoIcon :themeDark="themeDark" />
        </a>
        <a href="#" class="lk disabled">
            <p>Личный кабинет</p>
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
