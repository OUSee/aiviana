<style scoped>
.svg_preloader {
    width: 310px;
    height: 310px;
    left: calc(50% - 155px);
    top: calc(50% - 155px);
    position: absolute;
    z-index: 1;
    opacity: 0.4;
}
</style>

<script setup>
import { inject } from 'vue';

const themeDark = inject('themeDark')
const dark = '#15173f'
</script>

<template>
    <svg class="svg_preloader" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 248 248"
        style="enable-background:new 0 0 248 248;" xml:space="preserve">
        <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -20">
            </feColorMatrix>
        </filter>
        <!-- <circle stroke="#fff" fill="none" stroke-width="3" cx="124" cy="124" r="120"></circle> -->
        <g id="shape" filter="url(#goo)">
            <circle :stroke="themeDark ? dark : '#fff'" fill="none" stroke-width="10" cx="124" cy="124" r="105">
            </circle>
            <circle :fill="'#fff'" cx="0" cy="0" r="36" transform="translate(124 124)">
                <animateTransform attributeName="transform" type="scale" additive="sum" values="1.3;0.55;0.55;1.3"
                    keyTimes="0;0.4;0.6;1" dur="4s" repeatCount="indefinite"></animateTransform>
            </circle>
            <circle fill="#bf9df8" cx="0" cy="0" r="22">
                <animateMotion path="M124.1,124l-14.9-14.9c-22.3-22.3-2.5-60.3,28.4-54.4c13.3,2.6,26.1,9,36.4,19.4
  		c10.1,10.1,16.5,22.4,19.2,35.4c6.5,31.3-31.7,51.9-54.3,29.3L124.1,124z" dur="4s" repeatCount="indefinite">
                </animateMotion>
            </circle>
            <circle fill="#a5dbfd" cx="0" cy="0" r="22">
                <animateMotion path="M124.1,124l15.2,15.2c22.2,22.2,2.5,60-28.3,54.2c-13.5-2.5-26.4-9-36.8-19.4c-8.9-8.9-14.9-19.5-18-30.7
  		c-9.1-32.5,31.4-55.7,55.2-31.8L124.1,124z" dur="4s" repeatCount="indefinite"></animateMotion>
            </circle>
        </g>
    </svg>
</template>
