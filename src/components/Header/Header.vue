<script setup>
import Toggle from '../Toggle/Toggle.vue'
</script>

<template>
    <header>
        <a href="#" class="logo--main">
            <img src="/aiviana-logo-big.svg" alt="">
        </a>
        <a href="#" class="lk disabled">
            Личный кабинет
            <img src="/User.svg" alt="">
        </a>
        <Toggle toggleId="theme-toggle-change" checked />
    </header>
</template>

<style type="scss">
@import url(./Header.scss);
</style>
