<template>
  <div>
    <section
      v-for="(item, index) in articles"
      :key="index"
      class="article-item bg-white d-flex flex-column"
    >
      <div class="head d-flex">
        <div class="fc-flag">置顶</div>
        <router-link :to="`/article/list/${item._id}`">
          <h5 class="title">
            <span class="text-blue fs-xxxl">【原创】</span>
            <span class="text-blue-1 fs-xxl">{{ item.title }}</span>
          </h5>
        </router-link>
        <div class="time">
          <span class="day">{{ item.createdAt | dayFmt }}</span>
          <span class="text-grey-1 pr-6 fs-xxl"
            >{{ item.createdAt | monthFmt }}月</span
          >
          <span class="text-grey-1 fs-xxl">{{ item.createdAt | yearFmt }}</span>
        </div>
      </div>
      <div class="content">
        <a href="javascript:;" class="cover">
          <el-image
            class="artImage"
            fit="fill"
            :src="item.icon"
            :preview-src-list="[item.icon]"
          >
          </el-image>
        </a>
        <router-link :to="`/article/list/${item._id}`">
          <span class="text-grey" v-html="item.body"></span>
        </router-link>
      </div>

      <div class="read">
        <a :href="`/article/list/${item._id}`" class="fs-xl mt-4">继续阅读</a>
      </div>
      <div class="footer mt-4">
        <i class="iconfont icon-biaoqian"></i>
        <span
          class="bg-grey-1 ml-4 text-grey"
          v-for="(item1, index) in item.categories"
          :key="index"
          >{{ item1.name }}</span
        >
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array,
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
    },
  },
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
  .title {
    line-height: 30px;
    padding: 0 19vw 5px 0;
    border-bottom: 1px solid #e8e9e7;
    font-size: 18px;
    font-weight: 400;
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
    span {
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
    a {
      display: block;
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
    span {
      font-size: 10px;
      padding: 2px 8px 2px;
    }
  }
}
</style>
