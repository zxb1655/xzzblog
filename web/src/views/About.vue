<template>
  <div class="about">
    <header class="w-100 Aboutbg d-flex flex-column ai-center mb-6">
      <div class="about-head text-center pt-9">
        <h1>关于我</h1>
        <p class="fs-xxl">一个不断努力学习的前端菜鸟，加油！</p>
      </div>
    </header>

    <article class="about-title container bg-white py-2 px-4">
      <h1 class="a text-green pl-3">关于自己</h1>
      <div class="pl-5 text-grey-3">
        <p>• 吉林大学珠海学院-21届-网络工程，目前📍：广州</p>
        <p>• 未来希望成为一名优秀的前端程序🐵</p>
        <p>
          •
          平时热爱学习，也喜欢逛一些像掘金，CSND，简书等论坛，学习更多关于前端的知识
        </p>
      </div>
    </article>
    <article class="about-title container bg-white py-2 px-4">
      <h1 class="a text-green pl-3">关于博客</h1>
      <div class="pl-5 text-grey-3">
        <p>
          •
          该博客前台Vue，后台管理系统React，express后端接口，mongoDB数据库，部署在腾讯学生云服务器上，
          搭建博客的初衷是希望把自己平常工作学习生活中学到的知识点或者遇到的难题，亦或是有趣的事情记录下来
        </p>
        <p>
          •
          本人也还只是个实习生，代码可能也很菜，如果有什么建议，请留言告知，都会虚心受教的并且给予回复的！
        </p>
      </div>
    </article>

    <div class="container pt-6 d-flex jc-center">
      <el-card
        shadow="hover"
        class="box-card flex-1 mr-4 hand"
        v-for="(item, index) in myItem"
        :key="index"
      >
        <div slot="header" class="clearfix" @click="goItem(item.url)">
          <el-avatar class="verticle-middle" :src="item.icon"></el-avatar>
          <span class="pl-4 fs-xxxl text-grey">{{ item.name }}</span>
        </div>
        <div class="text item" @click="goItem(item.url)">{{ item.desc }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myItem: [
        {
          icon:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "卡片名称",
          desc: "个人博客",
          url: "http://github.com/zxb1655",
        },
        {
          icon:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "卡片名称",
          desc: "个人博客",
          url: "http://github.com/zxb1655",
        },
        {
          icon:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "卡片名称",
          desc: "个人博客",
          url: "http://github.com/zxb1655",
        },
        {
          icon:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "卡片名称",
          desc: "个人博客",
          url: "http://github.com/zxb1655",
        },
      ],
    };
  },
  methods: {
    goItem(url) {
      window.open(url, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/style.scss";
.about {
  margin-top: 65px;
  .Aboutbg {
    height: 260px;
    overflow: hidden;
    background-image: linear-gradient(
      135deg,
      #52e5e7 5%,
      #1981d6 60%,
      #2924d1 100%
    );
    .about-head {
      color: map-get($colors, "white");
      letter-spacing: 10px;
    }
  }
  .about-title {
    h1 {
      border-left: 5px solid #6bc30d;
    }
  }
  .el-card {
    transition: transform 0.5s;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 5px #fff;
    }
  }
}
.content {
  line-height: 1.8 !important;
}

.bd-bottom-about {
  border-bottom: 1px solid grey;
  &.bd-bottom-about:hover {
    color: map-get($colors, "red");
  }
}
</style>
