<template>
  <div class="productitem">
    <div class="img-div dc">
      <img class="img" :src="item.url" alt="" />
    </div>
    <div class="btn dc">
      <i class="iconfont icon-github hand" @click="goGithub"></i>
    </div>
    <div class="name">{{ item.name }}</div>
    <div class="remark" v-html="item.remark"></div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  methods: {
    goGithub() {
      window.open("https://github.com/zxb1655", "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/common.scss";
.productitem {
  width: 300px;
  cursor: pointer;
  box-shadow: 0 0 2px #ccc;
  background: #f5f7fa;
  padding-top: 20px;
  border-radius: 10px;
  margin: 20px 30px;
  transition: 0.5s;
  &:hover {
    transform: translateY(-5px);
  }
  .btn {
    display: flex;
    align-content: center;
    margin-top: 10px;
    .iconfont {
      font-size: 30px;
    }
  }
  .img-div {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 200px;
    .img {
      border: 1px solid #ccc;
      display: block;
      height: 100%;
    }
  }
  .name {
    margin: 10px 20px;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.1;
  }
  .remark {
    overflow: hidden;
    margin: 0 20px;
    height: 50px;
    color: $color-hint;
    text-overflow: ellipsis;
    font-size: 13px;
    line-height: 1.5;
    text-align: center;
  }
}
</style>
