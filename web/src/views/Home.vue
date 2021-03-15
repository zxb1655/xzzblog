<template>
  <div class="pb-4 home" :style="{ backgroundColor: $store.state.backColor }">
    <div class="mb-7">
      <div class="bgImg d-flex jc-around ai-center" id="header">
        <!-- 泡泡 -->
        <div>
          <div class="ball"></div>
          <div class="shadow"></div>
        </div>

        <div class="hollow">{{ content.name }}</div>
        <!-- 转圈 -->
        <div>
          <div class="bg0"></div>
          <div class="hx-box">
            <ul class="pr">
              <li class="hx-k1">
                <span></span>
              </li>
              <li class="hx-k2">
                <span></span>
              </li>
              <li class="hx-k3">
                <span></span>
              </li>
            </ul>
          </div>
        </div>

        <div class="arrow-down">
          <i class="iconfont icon-down" @click="downPage"></i>
        </div>
      </div>
    </div>

    <div class="arttitle post-container">
      <i class="iconfont icon-shuye"></i>
      <span class="fs-xl">Article</span>
    </div>

    <div class="container" ref="content">
      <div class="d-flex user-info jc-around">
        <div class="left">
          <ArticleItem :articles="articles"></ArticleItem>
        </div>
        <div class="right mt-6">
          <div class="userInfo p-6">
            <div>
              <img src="http://cdn.jzzz66.cn/avatar.png" />
              <div class="fs-xxxxl py-4">{{ title }}</div>
              <div class="fs-sm">{{ desc }}</div>
            </div>
            <div class="d-flex jc-around">
              <p>
                <span>文章</span>
                <span>{{ articleSum }}</span>
              </p>
              <p>
                <span>留言</span>
                <span>{{ messageSum }}</span>
              </p>
              <p>
                <span>用户</span>
                <span>{{ userSum }}</span>
              </p>
            </div>
            <div class="addbook hand" @click="addFavo">
              <i class="iconfont icon-shuye"></i>
              加入书签
            </div>
            <div class="infoIcon">
              <i class="iconfont icon-github hand" @click="goGithub"></i>
              <el-popover placement="bottom" width="200" trigger="hover">
                <slot name="content">
                  <img class="modelImg" src="../assets/images/qq.jpg" alt="" />
                </slot>
                <i class="iconfont icon-qq hand" slot="reference"></i>
              </el-popover>
              <el-popover placement="bottom" width="200" trigger="hover">
                <slot name="content">
                  <img class="modelImg" src="../assets/images/wx.jpg" alt="" />
                </slot>
                <i class="iconfont icon-weixin-copy hand" slot="reference"></i>
              </el-popover>
            </div>
          </div>
          <div class="notice">
            <div>
              <i class="iconfont icon-lujing"></i>
              公告
            </div>
            <p>{{ notice }}</p>
          </div>
        </div>
      </div>
      <div class="text-center pt-6">
        <el-tooltip
          content="点击去查看更多文章哦~"
          placement="right"
          effect="light"
        >
          <img class="hand" @click="goArticle" src="../assets/images/1.gif" />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from "../components/articleItem";
export default {
  data() {
    return {
      articles: [],
      backgroudImg: "http://cdn.jzzz66.cn/bg.jpg",
      content: {},
      title: "吉珠小猪猪",
      desc: "在前端路上努力学习的菜鸟",
      notice: "等您很久啦！ 小猪猪博客欢迎您~",
      articleSum: 0,
      messageSum: 0,
      userSum: 0,
    };
  },
  components: {
    ArticleItem,
  },
  methods: {
    typeWrite() {
      let store = "小猪猪博客";
      let i = 0;
      const time = setInterval(() => {
        i++;
        const text = store.substring(0, i);
        this.$set(this.content, "name", text);
        if (text.length == store.length) {
          clearInterval(time);
        }
      }, 400);
    },
    addFavo() {
      this.$message({
        message: "按下 CTRL+D 收藏【小猪猪博客】",
        type: "warning",
      });
    },
    async fetchData() {
      const res = await this.$http.get(`/articles/recent`);
      this.articles = res.data.data;
    },
    async fetchCount() {
      const res = await this.$http.get(`/count`);
      this.articleSum = res.data.articleSum;
      this.userSum = res.data.userSum;
      this.messageSum = res.data.messageSum;
    },
    goArticle() {
      this.$router.push("/tags");
    },
    goGithub() {
      window.open("http://github.com/zxb1655", "_blank");
    },
    downPage() {
      window.scrollTo({
        top: this.$refs.content.offsetTop - 135,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.fetchData();
    this.fetchCount();
    setTimeout(() => {
      this.typeWrite();
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.ball {
  animation: float 3.5s ease-in-out infinite;
  height: 12vw;
  width: 12vw;
  left: 90%;
  border-radius: 50%;
  position: relative;
  bottom: 6vw;
  right: 1vw;

  background: radial-gradient(
    circle at 75% 30%,
    white 5px,
    aqua 8%,
    darkblue 60%,
    aqua 100%
  );
  box-shadow: inset 0 0 20px #fff, inset 10px 0 46px #eaf5fc,
    inset 88px 0px 60px #c2d8fe, inset -20px -60px 100px #fde9ea,
    inset 0 50px 140px #fde9ea, 0 0 90px #fff;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-80px);
  }
  100% {
    transform: translatey(0px);
  }
}

.shadow {
  background: #6fa3ef;
  width: 10vw;
  height: 2vw;
  top: 65%;
  left: 20%;
  animation: expand 3.5s infinite;
  position: absolute;
  border-radius: 50%;
}
@keyframes expand {
  0%,
  100% {
    transform: scale(0.5);
  }

  50% {
    transform: scale(1);
  }
}

.hollow {
  margin-right: 10vw;
  font-size: 80px;
  color: #fefefe;
  text-shadow: 0 0 0.5em #13e6d8, 0 0 0.2em #ffeded;
  font-family: cursive;
}
.modelImg {
  width: 176px;
  height: 176px;
}
.home {
  background-color: #515250;
}
.bgImg {
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(135deg, #52e5e7 10%, #130cb7 100%);
  .arrow-down {
    position: absolute;
    bottom: 60px;
    color: #fff;
    animation: arrowDown 0.8s linear infinite alternate;
    .icon-down {
      cursor: pointer;
      font-size: 45px;
    }
  }
}
.user-info {
  .left {
    width: 70%;
  }
  .right {
    width: 23%;
    .userInfo {
      background: #fff;
      text-align: center;
      margin-bottom: 20px;
      border-radius: 10px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .d-flex {
        span {
          display: block;
          padding: 5px 0;
        }
      }
      .addbook {
        width: 90%;
        margin-left: 12px;
        line-height: 40px;
        margin-bottom: 15px;
        height: 40px;
        background: #1ab3d6;
        color: white;
      }
      .infoIcon {
        .iconfont {
          font-size: 30px;
          padding: 5px 20px;
        }
      }
    }
    .notice {
      background: #fff;
      padding: 15px;
      border-radius: 10px;
      .iconfont {
        display: inline-block;
        color: red;
        padding-right: 5px;
        transition: all 0.5s;
        animation: changeBig 1s linear infinite;
      }
      p {
        text-align: center;
        color: #666;
      }
    }
  }
}
@keyframes changeBig {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
@keyframes arc {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotateY(360deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}
@keyframes arrowDown {
  0% {
    visibility: hidden;
    opacity: 0;
    -webkit-transform: translatey(-20%);
  }
  20% {
    visibility: visible;
    opacity: 0;
    -webkit-transform: translatey(10%);
  }
  100% {
    visibility: visible;
    opacity: 1;
    -webkit-transform: translatey(20%);
  }
}
.arttitle {
  text-align: center;
  .iconfont {
    font-size: 22px;
    color: #fff;
    color: #0a91b9;
    font-weight: bold;
    margin-right: 6px;
  }
  span {
    color: #0a91b9;
    font-weight: 800;
  }
}
</style>
<style lang="scss">
.bg0 {
  position: absolute;
  width: 22vw;
  height: 22vw;
  top: 40%;
  right: 0;
  transform: translate(-50%, -50%);
  background: url("../assets/images/bg0.png") no-repeat center center;
  background-size: 150%;
}
.hx-box {
  position: absolute;
  top: 38%;
  width: 22vw;
  height: 22vw;
  right: 0;
  transform-style: preserve-3d;
  transform: translate(-50%, -50%) rotateY(75deg);
}

.hx-box ul {
  position: relative;
  width: 22vw;
  height: 22vw;
  transform-style: preserve-3d;
  animation: hxz 20s linear infinite;
}

@keyframes hxz {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-360deg);
  }
}

.hx-box ul li {
  position: absolute;
  width: 22vw;
  height: 22vw;
  border: 4px solid #5ec0ff;
  border-radius: 1000px;
}

.hx-box ul li span {
  display: block;
  width: 100%;
  height: 100%;
  background: url("../assets/images/hx.png") no-repeat center center;
  background-size: 100% 100%;
  animation: hx 4s linear infinite;
}

@keyframes hx {
  to {
    transform: rotate(360deg);
  }
}

.hx-k2 {
  transform: rotateX(60deg) rotateZ(60deg);
}

.hx-k3 {
  transform: rotateX(-60deg) rotateZ(-60deg);
}
</style>
