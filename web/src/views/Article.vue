<template>
  <div class="article">
    <div class="d-flex jc-around container" v-if="model">
      <div class="bg-white left">
        <div class="text-green fs-xxxxl mt-4 ml-6">{{ model.title }}</div>
        <div class="text-grey-2 d-flex fs-sm my-4 ml-4">
          <p class="mr-4">
            {{ model.createdAt | date("YYYY-MM-DD HH:mm:ss") }}
          </p>
          <p class="mr-4">字数 {{ model.body.length }}</p>
          <p>评论 {{ Comments.length }}</p>
        </div>
        <div class="ml-4">
          <router-link
            tag="div"
            :to="`/tags`"
            class="p-2 bdr post-tags text-border text-center bg-blue fs-sm hand mb-6"
          >
            <span> <i class="iconfont icon-tag1"></i> </span>&nbsp;
            <span class>{{ model.categories[0].name }}</span>
          </router-link>
        </div>
        <div class="text-grey-2 fs-md mb-9">
          <div class="markdown-body">
            <div id="content" v-html="model.body"></div>
          </div>
        </div>
      </div>
      <div class="d-none right">
        <div class="blogs-menu toc-sticky text-grey-1 pl-9">
          <div>
            <h2>目录</h2>
            <div
              class="menu-title hand text-ellipsis"
              :title="item.text"
              v-for="item in articleToc"
              :key="item.id"
              :style="{ paddingLeft: `${item.indent}em` }"
              @click="scrollTo(item.id)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container bg-white" v-if="model">
      <h3 class="fs-xxxxl mt-9">评论</h3>
      <comment-textarea
        class="textarea-box bg-white bdr"
        model="comments"
        @toResponse="getBlogsComments"
        type="parent"
        :blogsId="id"
        placeholder="输入留言内容"
      ></comment-textarea>
      <comment-list
        class="mt-7 mb-10"
        model="comments"
        @getCommentList="getBlogsComments"
        :commentsList="parentComments"
        v-if="parentComments"
        :blogsId="id"
      ></comment-list>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-eighties.css";
import Toc from "../plugins/Toc.js";

const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
});

export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
      Comments: [],
      articleToc: [],
      parentComments: [],
    };
  },
  watch: {
    id: "fetch",
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/detail/${this.id}`);
      this.model = res.data;
      let tocData = Toc(marked(res.data.body));
      console.log(Toc(res.data.body));
      this.model.body = tocData.article;
      this.articleToc = tocData.toc;
    },
    scrollTo(id) {
      // 绑定 toc 点击事件
      let node = document.querySelector('[data-id="' + id + '"]');
      if (!node) {
        return;
      }
      node.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    },
    async getBlogsComments() {
      const res = await this.$http.get(`/comments/${this.id}`);
      const blogsComments = res.data;
      this.parentComments = blogsComments.filter(
        (v) => v.parent == "5ec884e3fe28d35475b43fb3"
      );
      this.parentComments.forEach((c) => {
        return (c.children = blogsComments.filter((v) => v.parent == c._id));
      });
      this.Comments = res.data;
    },
  },
  mounted() {
    this.fetch();
    this.getBlogsComments();
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.article {
  width: 1280px;
  margin: 82px auto 0;
}
#content {
  line-height: 1.8;
}

.post-tags {
  max-width: 60px;
}

.post-tags:hover {
  background-color: map-get($colors, "border");
  color: map-get($colors, "grey");
}

.article {
  .left {
    width: 70%;
    #content {
      width: 80%;
      margin: 0 auto;
    }
  }
  .right {
    width: 25%;
  }
}

.blogs-menu {
  max-width: 200px;
  line-height: 1.3;
  .menu-title {
    padding: 6px 0;
    color: map-get($colors, "green-1");
    &:hover {
      text-decoration: underline;
    }
  }
}
.toc-sticky {
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 80px;
}
.art-comment {
  max-width: 650px;
  margin: 0 auto 40px;
}
.textarea-box {
  padding: 15px;
}

@media screen and (max-width: 900px) {
  .d-none {
    display: none;
  }
  .page {
    margin: 0 auto;
  }
}
@media screen and (max-width: 768px) {
  .page {
    width: 95%;
    margin: 0 auto;
  }
  .art-comment {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
