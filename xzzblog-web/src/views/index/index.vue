<template>
  <div class="home">
    <div class="bgImg" id="header">
      <div class="bg_left">
        <div class="ball"></div>
        <div class="shadow"></div>
      </div>
      <div class="hollow">小猪猪博客</div>
      <div class="bg_right">
        <div class="ball"></div>
        <div class="shadow"></div>
      </div>
      <div class="arrow-down">
        <i class="iconfont icon-down" @click="downPage"></i>
      </div>
    </div>
    <div class="arttitle">
      <i class="iconfont icon-shuye"></i>
      <span>热门文章</span>
    </div>
    <div class="container" ref="content">
      <div class="user-info">
        <div class="left">
          <articleItem
            v-for="(item, index) in list"
            :key="index"
            :item="item"
          ></articleItem>
        </div>
        <div class="right">
          <userinfo></userinfo>
        </div>
      </div>
    </div>
    <div>
      <el-tooltip
        content="点击去查看更多文章哦~"
        placement="right"
        effect="light"
      >
        <img
          @click="goArticle"
          src="../../assets/images/1.gif"
          alt=""
          class="home_foot"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import articleItem from "src/components/articleItem/articleItem.vue";
import userinfo from "src/components/userinfo/userinfo.vue";
export default {
  name: "index",
  components: {
    articleItem,
    userinfo
  },
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    goArticle() {
      this.$router.push("/article");
    },
    async getList() {
      const params = {
        pageIndex: 1,
        pageSize: 4
      };
      const { data } = await this.$api.getHotArticleList(params);
      this.list = data.data;
    },
    downPage() {
      window.scrollTo({
        top: this.$refs.content.offsetTop - 135,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common.scss";
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
@keyframes expand {
  0%,
  100% {
    transform: scale(0.5);
  }

  50% {
    transform: scale(1);
  }
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
.home {
  background-color: #f0f0f0;
  padding-bottom: 20px;
  .bg_left {
    margin-right: 150px;
  }
  .bg_right {
    margin-left: 150px;
  }
  .bgImg {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background-image: linear-gradient(135deg, #52e5e7 10%, #130cb7 100%);
    .ball {
      animation: float 3.5s ease-in-out infinite;
      height: 200px;
      width: 200px;
      margin-bottom: 100px;
      border-radius: 50%;
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
    .shadow {
      background: #6fa3ef;
      width: 200px;
      height: 40px;
      animation: expand 3.5s infinite;
      border-radius: 50%;
    }
    .hollow {
      font-size: 80px;
      color: #fefefe;
      text-shadow: 0 0 0.5em #13e6d8, 0 0 0.2em #ffeded;
      font-family: cursive;
    }
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
  .arttitle {
    text-align: center;
    margin: 20px 0 0;
    .iconfont {
      font-size: 22px;
      color: #fff;
      color: #0a91b9;
      font-weight: bold;
      margin-right: 6px;
    }
    span {
      color: #0a91b9;
      font-size: 16px;
      font-weight: 800;
    }
  }
  .user-info {
    display: flex;
    justify-content: space-between;
    .left {
      width: 70%;
    }
    .right {
      margin-top: 20px;
      width: 23%;
    }
  }
  .home_foot {
    margin: 20px auto 0;
    cursor: pointer;
  }
}
</style>
