<style type="scss" scoped>
.test_loader {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    height: 280px;
    width: 280px;
    animation: rotate_3922 3s linear infinite;
    background-color: #e5e9ff;
    background-image: linear-gradient(#e5e9ff, #bbe9fe, #ffffff);
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.3s ease-in-out;
    z-index: 1;

    &.active {
        opacity: 1;
        transform: scale(1);
    }
}

.test_loader span {
    position: absolute;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    background-color: #bbe9fe;
    background-image: linear-gradient(#e5e9ff, #bbe9fe, #ffffff);
}

.test_loader span:nth-of-type(1) {
    filter: blur(5px);
}

.test_loader span:nth-of-type(2) {
    filter: blur(10px);
}

.test_loader span:nth-of-type(3) {
    filter: blur(25px);
}

.test_loader span:nth-of-type(4) {
    filter: blur(50px);
}


@keyframes rotate_3922 {
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>

<script setup>
import { inject } from 'vue';

const ai_talk = inject('ai_talk');

</script>

<template>
    <div class="test_loader" :class="{ active: ai_talk }">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>
