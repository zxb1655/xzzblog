<template>
  <div>
    <div class="userInfo">
      <div>
        <img src="https://cdn.jzzz66.cn/avatar.png" />
        <div class="title">小猪猪</div>
        <div class="desc">在前端不断学习的菜鸟</div>
      </div>
      <!-- <div class="d-flex">
              <p>
                <span>文章</span>
                <span>10</span>
              </p>
              <p>
                <span>留言</span>
                <span>0</span>
              </p>
              <p>
                <span>用户</span>
                <span>10</span>
              </p>
            </div> -->
      <el-button class="addbook" @click="addFavo" type="primary">
        <i class="iconfont icon-shuye"></i>
        加入书签
      </el-button>
      <div class="infoIcon">
        <i class="iconfont icon-github hand" @click="goGithub"></i>
        <el-popover placement="bottom" width="200" trigger="hover">
          <slot name="content">
            <img class="modelImg" src="../../assets/images/qq.jpg" alt="" />
          </slot>
          <i class="iconfont icon-qq hand" slot="reference"></i>
        </el-popover>
        <el-popover placement="bottom" width="200" trigger="hover">
          <slot name="content">
            <img
              class="modelImg"
              src="../../assets/images/weixin.jpeg"
              alt=""
            />
          </slot>
          <i class="iconfont icon-weixin-copy hand" slot="reference"></i>
        </el-popover>
      </div>
    </div>
    <div class="notice">
      <div class="notice_title">
        <i class="iconfont icon-lujing"></i>
        公告
      </div>
      <p class="notice_desc">等您很久啦！小猪猪博客欢迎您～</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "userinfo",
  methods: {
    goArticle() {
      this.$router.push("/article");
    },
    addFavo() {
      this.$message({
        message: "按下 CTRL+D 收藏【小猪猪博客】",
        type: "warning"
      });
    },
    goGithub() {
      window.open("https://github.com/zxb1655", "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  padding: 20px 0;
  background: #fff;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 10px;
  img {
    margin-bottom: 6px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: inline-block;
  }
  .title {
    font-size: 20px;
    margin-bottom: 4px;
  }
  .desc {
    font-size: 13px;
    margin-bottom: 10px;
  }
  .d-flex {
    padding: 10px 0 10px;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    span {
      display: block;
      padding: 5px 0;
    }
  }
  .addbook {
    width: 90%;
    margin-bottom: 15px;
    height: 40px;
  }
  .infoIcon {
    cursor: pointer;
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
  .notice_title {
    font-size: 14px;
  }
  .iconfont {
    display: inline-block;
    color: red;
    padding-right: 5px;
    transition: all 0.5s;
    animation: changeBig 1s linear infinite;
  }
  .notice_desc {
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color: #666;
  }
}

.modelImg {
  width: 176px;
  height: 176px;
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
</style>
