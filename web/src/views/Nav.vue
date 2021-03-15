<template>
  <div class="main-container" v-if="model">
    <div class="navhead">
      <div class="post-tags">
        <a v-for="item in model" :key="item._id" @click="scrollItem(item.name)">
          {{ item.name }}
        </a>
      </div>
    </div>

    <div class="container archive-page">
      <div
        v-for="item in model"
        :key="item._id"
        :ref="`${item.name}`"
        class="post-lists anchor"
      >
        <div>
          <div class="categorys-title" v-if="item.navsList.length">
            {{ item.name }}
          </div>
          <div
            v-for="tag in item.navsList"
            :key="tag._id"
            class="post-list-item"
          >
            <div class="tourl d-flex jc-center" @click="toUrl(tag.url)">
              <el-card class="box-card flex-1 hand">
                <div slot="header" class="clearfix">
                  <el-avatar
                    class="verticle-middle"
                    :src="tag.icon"
                  ></el-avatar>
                  <span class="pl-4 fs-xxxl text-grey">{{ tag.title }}</span>
                </div>
                <span class="urlbody text item">{{ tag.body }}</span>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      model: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/navs");
      console.log(res.data);
      this.model = res.data;
    },
    getDataHover(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    },
    toUrl(url) {
      window.open(url, "_blank");
    },
    scrollItem(name) {
      const H = this.$refs[name][0].offsetTop - 40;
      window.scrollTo({
        top: H,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.archive-page {
  padding-top: 50px;
}
.navhead {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 9;
}
.post-tags {
  margin: 0;
  padding: 5px 0 20px;
  a {
    font-size: 13px;
    font-weight: 600;
    display: inline-block;
    margin: 20px 8px 10px 0;
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
.anchor {
  margin-top: -80px;
  padding-top: 80px;
  .categorys-title {
    color: #34b686;
    letter-spacing: 2px;
    font-size: 18px;
    font-weight: 700;
    position: relative;
    margin: 10px auto;
    padding: 8px 15px;
    border-left: 5px solid #34b686;
    background: #fff;
    box-shadow: 0px 1px 10px #ccc;
    border-radius: 1px;
  }
}
.tourl {
  width: 100%;
  .el-card {
    transition: transform 0.5s;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 5px #fff;
    }
    .urlbody {
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
