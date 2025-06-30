<style type="scss" scoped>
.loader {
  width: 330px;
  height: 330px;
  position: relative;


}

.loader::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  width: 330px;
  height: 330px;
  border-radius: 50%;
  border-top: 2px solid #bf9df8;
  border-right: 2px solid transparent;
  animation: spinner8217 2.8s linear infinite;
  z-index: 1;
}

.loader::after {
  content: '';
  background-color: #EEFAFF;
  border: 2px solid #bf9df8;
  position: absolute;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  position: absolute;
  top: 48px;
  left: 280px;
  z-index: 3;
  transform-origin: -114px 117px;
  animation: spinner8217 2.8s linear infinite;
}


@keyframes spinner8217 {
  to {
    transform: rotate(360deg);
  }
}
</style>
<!-- transform-origin: -112px 114px; -->
<!-- top: 42px;
  left: 272px; -->
transform-origin: 160px 160px;
animation: spinner8217 2.8s linear infinite;
transform-origin: 165px 165px;
animation: spinner8217 2.8s linear infinite;

<template>
  <div class="loader">
  </div>
</template>
