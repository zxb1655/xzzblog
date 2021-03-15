<template>
  <div class="navback pt-11 container d-flex" v-if="model">
    <div class="left">
      <ArticleItem :articles="articles"></ArticleItem>
      <div class="my-6" v-if="articles.length > 0">
        <div class="page-navigator d-flex jc-center">
          <div
            :class="{ current: 1 == pagination.pageNum }"
            class="mx-4 hand fs-md"
          >
            <a @click="goToPage(1)" data-hover="首页">
              <span class="text-blue-1">首页</span>
            </a>
          </div>
          <div class="mx-4 hand fs-md">
            <a @click="prev()">
              <span class="text-blue-1">&laquo;</span>
            </a>
          </div>
          <div
            class="mx-4 hand fs-md"
            :class="{ current: article == pagination.pageNum }"
            v-for="article in pagination.totalPage"
            :key="article"
          >
            <a
              @click="goToPage(article)"
              :data-hover="article"
              class="text-blue-1"
              >{{ article }}</a
            >
          </div>

          <div class="mx-4 hand fs-md">
            <a @click="next()">
              <span class="text-blue-1">&raquo;</span>
            </a>
          </div>
          <div
            class="mx-4 hand fs-md"
            :class="{ current: pagination.totalPage == pagination.pageNum }"
          >
            <a @click="goToPage(pagination.totalPage)" data-hover="末页">
              <span class="text-blue-1">末页</span>
            </a>
          </div>
          <div class="current mx-4 fs-md">
            <span class="text-blue-1"
              >第{{ pagination.pageNum }}页 / 共{{
                pagination.totalPage
              }}页</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="bg-white" ref="backNav" v-if="show">
        <div class="search px-6 bg-blue d-flex jc-center py-5">
          <el-input
            class="inline-input"
            v-model="state"
            placeholder="请输入内容"
            @keyup.enter.native="search"
          >
            <i class="iconfont icon-find" slot="suffix" @click="search"></i
          ></el-input>
        </div>
        <div class="post-tags">
          <div
            class="tag-item"
            v-for="item in model"
            :key="item._id"
            @click="clicktag(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <transition name="move-fade-top-to-bottom">
        <div class="bg-white show1" ref="backNav" v-if="show1">
          <div class="search px-6 bg-grey-2 d-flex jc-center py-5">
            <el-input
              class="inline-input"
              v-model="state"
              placeholder="请输入内容"
              @keyup.enter.native="search"
            >
              <i class="iconfont icon-find" slot="suffix" @click="search"></i
            ></el-input>
          </div>
          <div class="post-tags">
            <div
              class="tag-item"
              v-for="item in model"
              :key="item._id"
              @click="clicktag(item.name)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import ArticleItem from "../components/articleItem";
export default {
  data() {
    return {
      state: "",
      model: [],
      show: true,
      show1: false,
      articles: [],
      value: "全部",
      type: 0, // 0表示标签或全部  1表示搜索
      pagination: {
        pageNum: 1, //当前页码
        count: 0, //总数量
        totalPage: 0, //总页数
        limit: 6, //每页限制多少条
      },
    };
  },
  components: {
    ArticleItem,
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/tags");
      this.model = res.data;
    },
    async fetchData() {
      this.type = 0;
      const res = await this.$http.get(
        `/articles/list?page=${this.pagination.pageNum}&value=${this.value}`
      );
      const { articles, count } = res.data;
      this.articles = articles;
      this.pagination.count = count;
      this.pagination.totalPage = Math.ceil(count / this.pagination.limit);
    },
    async goToPage(pageNum) {
      this.pagination.pageNum = pageNum;
      if (this.type === 0) {
        this.fetchData();
      } else {
        this.goSearch();
      }
      this.goBack();
    },
    goBack() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    prev() {
      if (this.pagination.pageNum == 1) {
        return;
      }
      this.pagination.pageNum--;
      if (this.type === 0) {
        this.fetchData();
      } else {
        this.goSearch();
      }
      this.goBack();
    },
    next() {
      if (this.pagination.pageNum == this.pagination.totalPage) {
        return;
      }
      this.pagination.pageNum++;
      if (this.type === 0) {
        this.fetchData();
      } else {
        this.goSearch();
      }
      this.goBack();
    },
    getDataHover(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    },
    handleScroll() {
      var top = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageYOffset
      );
      if (top >= 400) {
        this.show = false;
        this.show1 = true;
      }
      if (top < 300) {
        this.show = true;
        this.show1 = false;
      }
    },
    clicktag(name) {
      this.value = name;
      this.pagination.pageNum = 1;
      this.fetchData();
    },
    async search() {
      this.type = 1;
      this.pagination.pageNum = 1;
      this.goSearch();
    },
    async goSearch() {
      const res = await this.$http.get(
        `/search?title=${this.state}&page=${this.pagination.pageNum}`
      );
      const { articles, count } = res.data;
      this.articles = articles;
      this.pagination.count = count;
      this.pagination.totalPage = Math.ceil(count / this.pagination.limit);
    },
  },

  mounted() {
    this.fetch();
    this.fetchData();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
.move-fade-top-to-bottom-enter-active {
  animation: moveFadeFromTop 1s ease both;
}
.move-fade-top-to-bottom-leave-active {
  animation: moveFadeToBottom 0 ease both;
}
@keyframes moveFadeFromTop {
  from {
    opacity: 0.2;
    transform: translateY(-100%);
  }
}
@keyframes moveFadeToBottom {
  to {
    opacity: 0.4;
    transform: translateY(100%);
  }
}
.left {
  width: 55vw;
  height: 100%;
}
.right {
  width: 280px;
  height: 100px;
  background: white;
  margin-left: 20px;
  margin-top: 20px;
  .inline-input {
    border-radius: 50px;
    overflow: hidden;
    .icon-find {
      font-size: 22px;
      font-weight: bold;
      margin-top: 8px;
      display: block;
      margin-right: 4px;
    }
  }
}
.show1 {
  position: fixed;
  width: 280px;
}
.visibility {
  visibility: hidden;
}
.current {
  color: #e8583d;
}
.post-tags {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0 20px;
  .tag-item {
    font-size: 13px;
    font-weight: 600;
    display: inline-block;
    margin: 15px 15px 10px 0;
    padding: 5px 15px;
    &:nth-child(1n) {
      color: #fff;
      border: 1px solid #6fa3ef;
      border-radius: 15px;
      background: #6fa3ef;
    }
    &:nth-child(2n) {
      color: #fff;
      border: 1px solid #ff9800;
      border-radius: 15px;
      background: #ff9800;
    }
    &:nth-child(3n) {
      color: #fff;
      border: 1px solid #46c47c;
      border-radius: 15px;
      background: #46c47c;
    }
    &:nth-child(4n) {
      color: #fff;
      border: 1px solid #f9bb3c;
      border-radius: 15px;
      background: #f9bb3c;
    }
    &:nth-child(5n) {
      color: #fff;
      border: 1px solid #bc99c4;
      border-radius: 15px;
      background: #bc99c4;
    }
    &:nth-child(6n) {
      color: #fff;
      border: 1px solid #e8583d;
      border-radius: 15px;
      background: #e8583d;
    }
  }
}
</style>
