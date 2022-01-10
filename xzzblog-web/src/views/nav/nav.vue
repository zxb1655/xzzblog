<template>
  <div class="nav">
    <div class="navhead">
      <div class="post-tags">
        <a v-for="item in model" :key="item.id" @click="scrollItem(item.name)">
          {{ item.name }}
        </a>
      </div>
    </div>
    <div class="container archive-page">
      <div
        v-for="item in model"
        :key="item.id"
        :ref="`${item.name}`"
        class="anchor"
      >
        <div>
          <div class="categorys-title" v-if="item.navitems.length">
            {{ item.name }}
          </div>
          <div
            v-for="tag in item.navitems"
            :key="tag.id"
            class="post-list-item"
          >
            <div class="tourl" @click="toUrl(tag.url)">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <el-avatar class="urlicon" :src="tag.icon"></el-avatar>
                  <span class="urltitle">{{ tag.title }}</span>
                </div>
                <span class="urlbody">{{ tag.desc }}</span>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$api.getnavList();
      this.model = res.data;
    },
    toUrl(url) {
      window.open(url, "_blank");
    },
    scrollItem(name) {
      const H = this.$refs[name][0].offsetTop - 140;
      window.scrollTo({
        top: H,
        behavior: "smooth"
      });
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
.nav {
  padding-top: 80px;
  padding-bottom: 20px;
  .archive-page {
    padding-top: 60px;
  }
  .navhead {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 9;
    background-color: #f0f0f0;
  }
  .post-tags {
    margin: 0;
    padding: 5px 0 20px;
    a {
      font-size: 13px;
      font-weight: 600;
      display: inline-block;
      margin: 20px 12px 10px 6px;
      padding: 5px 15px;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
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
    position: relative;
    overflow: hidden;
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
  .post-list-item {
    float: left;
    width: 25%;
    height: auto;
    padding: 15px;
    align-items: center;
  }
  .tourl {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .el-card {
      flex: 1;
      transition: transform 0.5s;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 0 5px #fff;
      }
      .urlicon {
        vertical-align: middle;
      }
      .urltitle {
        color: #5f5f5f;
        font-size: 20px;
      }
      .urlbody {
        cursor: pointer;
        font-size: 15px;
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
