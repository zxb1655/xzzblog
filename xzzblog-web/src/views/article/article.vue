<template>
  <div class="article container">
    <div class="blog" v-if="list">
      <articleItem
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      ></articleItem>
      <div class="paginate">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </div>
    <div class="category">
      <div class="aside-box">
        <div class="search">
          <el-input
            class="inline-input"
            v-model="keyword"
            placeholder="请输入内容"
            @keyup.enter.native="search"
          >
            <i class="iconfont icon-find" slot="suffix" @click="search"></i
          ></el-input>
        </div>
        <ul class="tag-box">
          <li
            class="pointer tag-item"
            @click="filterData(item)"
            v-for="item in categoryList"
            :key="item.id"
          >
            {{ item.name }}
          </li>
          <li class="pointer tag-item" @click="filterData">
            全部分类
          </li>
        </ul>
      </div>
      <div class="aside-box" v-if="hotlist.length > 0">
        <h3 class="aside-title">热门文章</h3>
        <ul class="aside-content">
          <router-link
            :to="{ path: `/article/detail?id=${item.id}` }"
            tag="li"
            class="aside-item-article pointer"
            v-for="item in hotlist"
            :key="item.id"
          >
            <div class="aside-name">{{ item.title }}</div>
            <div class="aside-count">阅读量： {{ item.browser }}</div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import articleItem from "src/components/articleItem/articleItem.vue";
export default {
  components: {
    articleItem
  },
  data() {
    return {
      list: [],
      hotlist: [],
      keyword: "",
      pageIndex: 1,
      pageSize: 5,
      totalCount: 0,
      categoryList: []
    };
  },
  methods: {
    async filterData(item) {
      let id = item && item.id;
      this.getList(id);
    },
    search() {
      this.getList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    async getList(id) {
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        is_del: 0,
        keyword: this.keyword
      };
      if (id) {
        params.categoryId = id;
      }
      const { data: res } = await this.$api.getArticleList(params);
      this.totalCount = res.count;
      this.list = res.data;
    },
    async getHotList() {
      let params = {};
      const {
        data: { data }
      } = await this.$api.getHotArticleList(params);
      this.hotlist = data;
    },
    async getAllCategory() {
      let params = {};
      const res = await this.$api.getAllCategory(params);
      this.categoryList = res.data;
    }
  },
  mounted() {
    this.getList();
    this.getHotList();
    this.getAllCategory();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common.scss";

.article {
  display: flex;
  padding-top: 60px;
  .blog {
    flex: 1;
    margin-right: 20px;
  }
  .paginate {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .category {
    margin-top: 20px;
    width: 300px;
    height: 200px;
  }
  h3.aside-title {
    padding: 0 15px;
    height: 38px;
    border-bottom: 1px solid $color-bg;
    background: #fff;
    color: #3d3d3d;
    font-size: 16px;
    line-height: 38px;
  }
  .aside-content {
    padding: 15px 15px 20px 15px;
    background: #fff;
  }
  .tag-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: #fff;
    padding: 10px 30px;
  }
  .tag-item {
    font-size: 13px;
    font-weight: 600;
    display: inline-block;
    margin: 6px 15px 8px 0;
    padding: 5px 15px;
    color: #fff;
    border-radius: 15px;
    &:nth-child(1n) {
      border: 1px solid #6fa3ef;
      background: #6fa3ef;
    }
    &:nth-child(2n) {
      border: 1px solid #ff9800;
      background: #ff9800;
    }
    &:nth-child(3n) {
      border: 1px solid #46c47c;
      background: #46c47c;
    }
    &:nth-child(4n) {
      border: 1px solid #f9bb3c;
      background: #f9bb3c;
    }
    &:nth-child(5n) {
      border: 1px solid #bc99c4;
      background: #bc99c4;
    }
    &:nth-child(6n) {
      border: 1px solid #e8583d;
      background: #e8583d;
    }
  }
  .aside-box {
    margin-bottom: 20px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  .search {
    padding: 10px 16px;
    display: flex;
    justify-content: center;
    background-color: #6fa3ef;
    .inline-input {
      border-radius: 50px;
      overflow: hidden;
    }
    .icon-find {
      font-size: 22px;
      font-weight: bold;
      margin-top: 8px;
      display: block;
      margin-right: 4px;
    }
  }
  .aside-item {
    display: flex;
    padding: 7px 0;
    color: #333;
    font-size: 14px;
    &:hover {
      color: #6bc30d;
    }
    .aside-name {
      flex: 1;
    }
  }
  .aside-item-article {
    padding: 7px 0;
    color: #333;
    font-size: 14px;
    &:hover {
      color: #6bc30d;
    }
    .aside-name {
      font-size: 12px;
      line-height: 1.4;
    }
    .aside-count {
      margin-top: 4px;
      color: $color-hint;
      font-size: 12px;
    }
  }
}
</style>
