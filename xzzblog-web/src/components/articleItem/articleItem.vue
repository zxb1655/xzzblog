<template>
  <section class="article-item">
    <div class="head">
      <div class="fc-flag" v-if="item.browser > 99">热门</div>
      <router-link :to="`/article/detail?id=${item.id}`">
        <h5 class="title">
          <span class="text-blue">【原创】</span>
          <span class="text-blue-1">{{ item.title }}</span>
        </h5>
      </router-link>
      <div class="time">
        <span class="day">{{ item.createdAt | dayFmt }}</span>
        <span class="text">{{ item.createdAt | monthFmt }}月</span>
        <span class="text">{{ item.createdAt | yearFmt }}</span>
      </div>
    </div>

    <div class="content">
      <a href="javascript:;" class="cover">
        <img :src="item.cover" alt="" class="artImage" />
      </a>
      <router-link :to="`/article/detail?id=${item.id}`">
        <span class="text-grey">{{ item.introduction }}</span>
      </router-link>
    </div>

    <div class="read">
      <a :href="`/article/detail?id=${item.id}`" class="read_text">继续阅读</a>
    </div>
    <div class="footer">
      <i class="iconfont icon-biaoqian"></i>
      <span
        class="foot_tag"
        v-for="(item1, index) in item.categories"
        :key="index"
        >{{ item1.name }}</span
      >
    </div>
  </section>
</template>

<script>
export default {
  props: {
    item: Object
  },
  name: "articleItem",
  filters: {
    dayFmt(time) {
      return new Date(time).getDay();
    },
    yearFmt(time) {
      return new Date(time).getFullYear();
    },
    monthFmt(time) {
      return new Date(time).getMonth() + 1;
    }
  }
};
</script>

<style scoped lang="scss">
.article-item {
  overflow: hidden;
  padding: 0 30px 10px 30px;
  position: relative;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.075),
    -5px -5px 10px rgba(0, 0, 0, 0.075);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  .head {
    height: 100px;
    display: flex;
    padding-top: 30px;
  }
  .title {
    line-height: 30px;
    padding: 0 19vw 5px 0;
    border-bottom: 1px solid #e8e9e7;
    font-size: 18px;
    font-weight: 400;
    .text-blue {
      color: #6fa3ef;
      font-size: 18px;
    }
    .text-blue-1 {
      color: #8b88e4;
      font-size: 17px;
    }
  }
  .fc-flag {
    position: absolute;
    height: 20px;
    line-height: 20px;
    text-align: center;
    width: 74px;
    background-color: #ff5722;
    color: #fff;
    transform: rotate(-45deg);
    left: -18px;
    top: 9px;
    font-size: 15px;
  }
  .time {
    font-family: SourceCodeProRegular, Menlo, Monaco, Consolas, "Courier New",
      monospace, "Helvetica Neue", Arial, sans-serif;
    position: absolute;
    right: 10px;
    top: 15px;
    background-color: #fff;
    padding: 0 20px 5px 20px;
    line-height: 32px;
    .text {
      color: #999;
      font-size: 16px;
    }
    .day {
      display: block;
      text-align: center;
      font-weight: 700;
      font-size: 40px;
      color: #6bc30d;
      position: relative;
      top: 2px;
    }
  }
  .content {
    .cover {
      display: block;
      width: 300px;
      height: 180px;
      border: 1px solid #e8e9e7;
      overflow: hidden;
      float: left;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
      .artImage {
        transition: all 0.5s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .text-grey {
      color: #5f5f5f;
      font-size: 18px;
      line-height: 1.5;
      letter-spacing: 2px;
      display: block;
      height: 185px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .read {
    position: relative;
    .read_text {
      color: #666;
      font-size: 18px;
      margin-top: 10px;
      font-weight: 700;
    }
    &::before {
      content: " ";
      display: inline-block;
      height: 1px;
      top: 20px;
      left: 100px;
      right: 0;
      position: absolute;
      background-color: #d0d0d0;
    }
  }
  .footer {
    .foot_tag {
      background: #bbb;
      color: #5f5f5f;
      font-size: 10px;
      padding: 2px 8px 2px;
      margin-right: 10px;
    }
  }
}
</style>
