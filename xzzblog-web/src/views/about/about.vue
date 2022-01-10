<template>
  <div class="about">
    <header class="Aboutbg">
      <div class="about-head">
        <h1>关于我</h1>
        <p>一个不断努力学习的前端菜鸟，加油！</p>
      </div>
    </header>

    <div class="container">
      <article class="about-title">
        <h1>关于自己</h1>
        <div class="about_text">
          <p>• 吉林大学珠海学院-21届-网络工程，目前📍：广州</p>
          <p>• 未来希望成为一名优秀的前端程序🐵</p>
          <p>
            •
            平时热爱学习，也喜欢逛一些像掘金，CSND，简书等论坛，学习更多关于前端的知识
          </p>
        </div>
      </article>
      <article class="about-title">
        <h1>关于博客</h1>
        <div class="about_text">
          <p>
            • 该博客PC前台和后台管理系统Vue+Element UI，小程序和H5使用uniapp，
            koa2后端接口，mysql数据库，部署在腾讯学生云服务器上，
            搭建博客的初衷是希望把自己平常工作学习生活中学到的知识点或者遇到的难题，亦或是有趣的事情记录下来
          </p>
          <p>
            •
            本人也还只是个前端菜鸟，代码可能也很菜，如果有什么建议，请留言告知，都会虚心受教的并且给予回复的！
          </p>
        </div>
      </article>
      <article class="about-title">
        <h1>关于项目</h1>
        <div class="myPro">
          <div v-for="(item, index) in list" :key="index">
            <productitem :item.sync="item"></productitem>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import productitem from "src/components/productitem/productitem";
export default {
  components: {
    productitem
  },
  data() {
    return {
      list: [
        {
          url: require("./images/pyq.png"),
          name: "集赞截图生成工具（移动端-H5）",
          remark: "朋友圈转发集赞截图生成，仿朋友圈页面，多种模式"
        },
        {
          url: require("./images/xzzshop.jpeg"),
          name: "猪猪小店（小程序）",
          remark: "一个微信商城小程序"
        },
        {
          url: require("./images/duo.png"),
          name: "画一个哆啦A梦（css）",
          remark: "css画一个哆啦A梦"
        },
        {
          url: require("./images/mi.png"),
          name: "仿小米商城（PC-H5）",
          remark: "慕课网学习的一个仿小米PC商城项目"
        },
        {
          url: require("./images/account.png"),
          name: "斌斌记账本（移动端-H5）",
          remark: "Vue + Ts 移动端H5记账应用项目"
        },
        {
          url: require("./images/draw.png"),
          name: "在线画板（canvas）",
          remark: "一个简单的在线画板，基于 Canvas 和 JavaScript 的小demo"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.about {
  padding-top: 60px;
  .Aboutbg {
    margin-bottom: 20px;
    height: 300px;
    overflow: hidden;
    background-image: linear-gradient(
      135deg,
      #52e5e7 5%,
      #1981d6 60%,
      #2924d1 100%
    );
    .about-head {
      color: #fff;
      letter-spacing: 10px;
      text-align: center;
      margin-top: 100px;
      h1 {
        font-weight: 800;
        margin-bottom: 15px;
      }
      p {
        font-size: 16px;
      }
    }
  }
  .container {
    margin-bottom: 20px;
  }
  .about-title {
    background: #fff;
    padding: 20px 10px 10px;
    margin-bottom: 20px;
    h1 {
      border-left: 5px solid #6bc30d;
      color: #34b686;
      padding-left: 10px;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .about_text {
      font-size: 15px;
      color: #666;
      p {
        margin: 10px 0 0 30px;
        line-height: 1.7;
      }
    }
  }
  .myPro {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
}
</style>
