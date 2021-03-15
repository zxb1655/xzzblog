<template>
  <div>
    <div class="header">
      <div class="logo hand">
        <router-link tag="div" to="/"
          ><img src="../assets/images/logo.png" alt=""
        /></router-link>
      </div>
      <div class="search">
        <input @keyup.enter="search" v-model="input" placeholder="请输入内容" />
        <button class="hand" type="primary" @click="search">搜索</button>
      </div>
      <ul class="menu">
        <li
          class="hand"
          :class="{ current: index == activeIndex }"
          v-for="(item, index) in data"
          :key="index"
          @click="handleSelect(index)"
        >
          {{ item.name }}
        </li>
        <li class="hand">
          <router-link tag="div" to="/">返回小猪猪博客</router-link>
        </li>
      </ul>
    </div>
    <div class="iframe" v-for="(item, index) in data" :key="index">
      <transition name="fade">
        <iframe
          v-if="index == activeIndex"
          :src="data[index].src + content"
          frameborder="0"
          :style="{ top: data[index].top }"
        ></iframe>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "0",
      input: "小猪猪",
      content: "小猪猪",
      data: [
        { src: "https://www.baidu.com/s?wd=", name: "百度", top: "5px" },
        { src: "https://cn.bing.com/search?q=", name: "必应", top: "-30px" },
        { src: "https://www.so.com/s?q=", name: "360", top: "1px" },
        { src: "https://www.sogou.com/web?query=", name: "搜狗", top: "14px" },
        { src: "https://search.gitee.com/?q=", name: "Gitee", top: "-55px" },
      ],
    };
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
    },
    search() {
      if (this.input == "") {
        alert("搜索内容不为空");
        return;
      }
      this.content = this.input;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  height: 60px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-image: linear-gradient(
    135deg,
    #52e5e7 10%,
    #1981d6 80%,
    #2924d1 100%
  );
  box-shadow: 0px 1px 5px 0px #138da57a;
  .logo {
    margin: auto;
    img {
      width: 140px;
      height: 40px;
    }
  }
  .menu {
    display: flex;
    list-style: none;
    justify-content: space-around;
    color: #5f5f5f;
    width: 40vw;
    height: 100%;
    margin: 0;
    line-height: 60px;
    font-size: 16px;
    li {
      color: white;
      &:last-child {
        margin-left: 5vw;
      }
    }
    .current {
      color: #fff;
      background: #346990;
      padding: 0px 30px;
      border-radius: 5px;
    }
  }
  .search {
    display: flex;
    height: 100%;
    input {
      height: 30px;
      margin: auto;
      border-radius: 7px;
      border: 0;
      width: 15vw;
      padding: 5px;
    }
    button {
      height: 30px;
      margin: 15px;
      width: 5vw;
      color: #fff;
      border: 0;
      background-color: #1d66b1;
      border-color: #409eff;
      box-shadow: -1px 0 0 0 #409eff;
      border-radius: 5px;
    }
  }
}
.iframe {
  iframe {
    border: none;
    width: 100%;
    height: 100vh;
    position: fixed;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
