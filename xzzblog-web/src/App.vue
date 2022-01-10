<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
  mounted() {
    if (this._isMobile()) {
      location.href = "https://mblog.jzzz66.cn";
    }
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/styles/common.scss";
.fade-enter-active {
  animation: moveFadeFromTop 2s ease both;
}
@keyframes moveFadeFromTop {
  from {
    opacity: 0.2;
    transform: translateY(-100%);
  }
}
</style>
