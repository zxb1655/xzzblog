<template>
  <header
    class="head nav d-flex jc-around ai-center"
    :class="isScrolling ? `mini` : ''"
  >
    <div class="hand">
      <router-link tag="div" to="/">
        <img src="../assets/images/logo.png" height="42" class="main-img" />
      </router-link>
    </div>
    <div class="d-flex hand pr-5">
      <router-link
        exact
        tag="div"
        :to="item.link"
        v-for="item in items"
        :key="item.text"
        active-class="active"
        class="nav-item px-8 icon"
      >
        <i class="iconfont" :class="item.icon"></i>
        {{ item.text }}</router-link
      >
      <div class="play pl-5">
        <i
          v-show="!isPlay"
          active-class="active"
          class="iconfont icon-zanting fs-xxl"
          @click="playMusic(true)"
        ></i>
        <i
          v-show="isPlay"
          active-class="active"
          class="iconfont icon-bofang fs-xxl"
          @click="playMusic(false)"
        ></i>
      </div>
      <div v-show="isPlay">
        <audio
          id="music"
          ref="music"
          src="http://cdn.jzzz66.cn/at2011723214335.mp3"
          loop
        ></audio>
      </div>
      <a
        href="javascript:;"
        @click="backHead"
        class="cd-top"
        :class="isScrolling ? 'cd-is-visible' : ''"
      ></a>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isShowMenu: false,
      isPlay: false,
      isScrolling: false,
      items: [
        { text: "首页", icon: "icon-shouye", link: "/" },
        { text: "文章", icon: "icon-biaoqian", link: "/tags" },
        { text: "归档", icon: "icon-iconset0124", link: "/archives" },
        { text: "留言", icon: "icon-liuyan", link: "/message" },
        { text: "关于", icon: "icon-guanyu", link: "/about" },
        { text: "导航", icon: "icon-daohang", link: "/navs" },
        { text: "全网搜索", icon: "icon-guanyu", link: "/search" },
      ],
    };
  },
  mounted() {
    this.ajustNavigation();
    window.addEventListener("scroll", this.ajustNavigation);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.ajustNavigation);
  },
  methods: {
    backHead() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    ajustNavigation() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.isScrolling = scrollTop > 0;
    },
    playMusic(play) {
      this.isPlay = !this.isPlay;
      if (play) {
        this.$refs.music.play();
      } else {
        this.$refs.music.pause();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/style.scss";

.nav-item {
  position: relative;
  &::before {
    width: 0;
    height: 2px;
    position: absolute;
    bottom: -22px;
    left: 50%;
    background-color: map-get($colors, "blue");
    content: "";
    transition: all 0.6s;
    z-index: -1;
  }
}
.nav-item.active {
  color: map-get($colors, "textcolor");
  &::before {
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: -22px;
    left: 0;
    background-color: map-get($colors, "blue");
    content: "";
    transition: all 0.6s;
    z-index: -1;
  }
}

.nav-item:hover {
  color: map-get($colors, "textcolor");
  &::before {
    width: 100%;
    left: 0;
  }
}

.head {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  display: relative;
  height: 65px;
  background-image: linear-gradient(
    135deg,
    #52e5e7 10%,
    #1981d6 80%,
    #2924d1 100%
  );
  box-shadow: 0px 1px 5px 0px #138da57a;
  transition: 0.5s ease-in-out;
  color: white;
  .icon-music-o {
    font-size: 19px;
  }
  .icon-Pause1 {
    font-size: 19px;
  }
  .header-logo {
    font-family: BarbaraHand;
    font-size: 40px;
    text-align: center;
  }
}

.mini {
  background-color: #42a5f4a1;
  height: 66px;
  transition: 0.5s ease-in-out;
  color: #fff;
}
.show-list {
  display: block !important;
}
.menu-button {
  border: none;
  display: none;
  i {
    display: block;
    width: 24px;
    height: 3px;
    background-color: #fff;
    margin: 5px auto;
    transition: 0.2s ease-in-out;
  }
}
.isShowMenu {
  i {
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(1) {
      transform: translateY(8px) rotate(-45deg);
    }
    &:nth-child(3) {
      transform: translateY(-8px) rotate(45deg);
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
}
@media screen and (max-width: 650px) {
  .nav-item {
    display: none;
  }
  .play {
    display: none;
  }
  .menu-button {
    display: block;
    margin-left: 120px;
  }
}
.cd-top {
  position: fixed;
  right: 25px;
  top: -900px;
  z-index: 99;
  width: 70px;
  height: 80vh;
  background: url("../assets/images/xzz-scroll.png") no-repeat center;
  background-size: contain;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  opacity: 1;
}
.cd-is-visible {
  top: 66px;
  opacity: 1;
}
.toggle--checkbox {
  display: none;
}
.toggle--checkbox:checked + .toggle--label {
  background: #6b7abb;
  border-color: #e8e8ea;
}

.toggle--checkbox:checked + .toggle--label:before {
  background: #9b9999;
  border-color: #e8e8ea;
  animation-name: switch;
  animation-duration: 350ms;
  animation-fill-mode: forwards;
}
.toggle--checkbox:checked + .toggle--label:after {
  transition-delay: 350ms;
  opacity: 1;
}
.toggle--label {
  width: 88px;
  height: 44px;
  background: #96dcee;
  border-radius: 50px;
  border: 5px solid #72cce3;
  display: flex;
  position: relative;
  transition: all 350ms ease-in;
}

.toggle--label:before {
  animation-name: reverse;
  animation-duration: 350ms;
  animation-fill-mode: forwards;
  transition: all 350ms ease-in;
  content: "";
  width: 28px;
  height: 28px;
  border: 2px solid #f5eb71;
  top: 1px;
  left: 2px;
  position: absolute;
  border-radius: 50%;
  background: #e1eb88;
}

@keyframes switch {
  0% {
    left: 2px;
  }
  60% {
    left: 2px;
    width: 36px;
  }
  100% {
    left: 46px;
    width: 28px;
  }
}
@keyframes reverse {
  0% {
    left: 46px;
    width: 28px;
  }
  60% {
    left: 46px;
    width: 36px;
  }
  100% {
    left: 1px;
  }
}
</style>
