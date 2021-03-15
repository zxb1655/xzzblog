<template>
  <div id="app">
    <transition name="move-fade-top-to-bottom">
      <router-view class="app-router-view"></router-view>
    </transition>
    <context-menu
      class="right-menu"
      :target="contextMenuTarget"
      :show="contextMenuVisible"
      @update:show="(show) => (contextMenuVisible = show)"
    >
      <a href="javascript:;" @click="goIndex">请尊重劳动成果</a>
    </context-menu>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      contextMenuTarget: document.body,
      contextMenuVisible: false,
    };
  },
  methods: {
    goIndex() {
      this.contextMenuVisible = false;
    },
  },
};
</script>
<style>
.app .app-router-view {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  visibility: visible;
}
.move-fade-top-to-bottom-enter-active {
  animation: moveFadeFromTop 2s ease both;
}
@keyframes moveFadeFromTop {
  from {
    opacity: 0.2;
    transform: translateY(-100%);
  }
}
.right-menu {
  position: fixed;
  border-radius: 3px;
  z-index: 999;
  display: none;
}
.right-menu a {
  text-align: center;
  display: block;
  background: #ffded1;
  padding: 5px 10px;
  border: 1px solid #ffded1;
  color: #fd8989;
}
.right-menu a:hover {
  background: #f7d0c1;
  color: #b47878;
}
</style>
