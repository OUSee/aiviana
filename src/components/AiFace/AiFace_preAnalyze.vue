<style scoped>
.preloader {
    width: 280px;
    height: 280px;
    position: absolute;
    z-index: 1;
    opacity: 0.3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    filter: url("#goo");
    animation: rotate-move 3s ease-in-out infinite;
}

.dot {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.dot-3 {
    background-color: #9853f5;
    animation: dot-3-move 2s ease infinite, index 6s ease infinite;
}

.dot-2 {
    background-color: #1ebbd6;
    animation: dot-2-move 2s ease infinite, index 6s -4s ease infinite;
}

.dot-1 {
    background-color: #fff;
    animation: dot-1-move 2s ease infinite, index 6s -2s ease infinite;
}

@keyframes dot-3-move {
    20% {
        transform: scale(1);
    }

    45% {
        transform: translateY(-18px) scale(0.45);
    }

    60% {
        transform: translateY(-90px) scale(0.45);
    }

    80% {
        transform: translateY(-90px) scale(0.45);
    }

    100% {
        transform: translateY(0px) scale(1);
    }
}

@keyframes dot-2-move {
    20% {
        transform: scale(1);
    }

    45% {
        transform: translate(-16px, 12px) scale(0.45);
    }

    60% {
        transform: translate(-80px, 60px) scale(0.45);
    }

    80% {
        transform: translate(-80px, 60px) scale(0.45);
    }

    100% {
        transform: translateY(0px) scale(1);
    }
}

@keyframes dot-1-move {
    20% {
        transform: scale(1);
    }

    45% {
        transform: translate(16px, 12px) scale(0.45);
    }

    60% {
        transform: translate(80px, 60px) scale(0.45);
    }

    80% {
        transform: translate(80px, 60px) scale(0.45);
    }

    100% {
        transform: translateY(0px) scale(1);
    }
}

@keyframes rotate-move {
    55% {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    80% {
        transform: translate(-50%, -50%) rotate(360deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes index {

    0%,
    100% {
        z-index: 3;
    }

    33.3% {
        z-index: 2;
    }

    66.6% {
        z-index: 1;
    }
}
</style>

<template>
    <div class="preloader">
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="goo">
                    <feGaussianBlur result="blur" stdDeviation="10" in="SourceGraphic"></feGaussianBlur>
                    <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" mode="matrix" in="blur">
                    </feColorMatrix>
                </filter>
            </defs>
        </svg>
    </div>


</template>
