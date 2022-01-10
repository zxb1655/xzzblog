<template>
  <div class="commentlist">
    <ul class="ul">
      <li class="li" v-for="(item, index) in list" :key="item.id">
        <div class="li-item">
          <img class="img" :src="item.avatar" />
          <div class="top">
            <div class="fw username">{{ item.username }}</div>
            <div class="content">{{ item.content }}</div>
            <div class="value">
              {{ item.createdAt | timeStampFormat }}
            </div>
            <ul>
              <li v-for="code in item.messages" :key="code.id">
                <div class="li-item">
                  <img class="img" :src="code.avatar" alt="" />
                  <div class="top">
                    <div class="nickanme">
                      <span class="fw">{{ code.username }}</span>
                      <span> 回复 {{ code.answer }}: </span>
                      <div class="replycontent">{{ code.content }}</div>
                    </div>
                    <div class="value">
                      {{ code.createdAt | timeStampFormat }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div class="loadText">
      <div
        ref="load"
        :class="{ pointer: pageIndex < totalPages }"
        @click="loadMore"
      >
        {{ pageIndex >= totalPages ? "没有更多了" : "加载更多" }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show: false,
      callback: false,
      showCallback: false,
      totalPages: 0,
      pageIndex: 1,
      pageSize: 5,
      list: []
    };
  },
  mounted() {
    this.getList(this.pageIndex);
  },
  methods: {
    async loadMore() {
      if (this.pageIndex++ < this.totalPages) {
        await this.getList(this.pageIndex);
        const top = this.$refs.load.offsetTop;
        window.scrollTo({
          top,
          behavior: "smooth"
        });
      }
    },
    async getList(pageIndex) {
      let params = {
        pageIndex,
        pageSize: this.pageSize
      };
      const {
        data: { totalPages, data }
      } = await this.$api.getMessageList(params);
      console.log(data);
      this.totalPages = totalPages;
      this.list = [...this.list, ...data];
    }
  },
  computed: {
    ...mapGetters({
      hasUserInfo: "login/hasUserInfo"
    })
  }
};
</script>

<style lang="scss" scoped>
.callback {
  color: #337ab7;
  font-size: 14px;
}

.loadText {
  text-align: center;
  color: #337ab7;
  font-size: 16px;
}

.ul {
  padding: 0 30px;
}

.fw {
  font-weight: 900;
}
.replycontent {
  margin: 4px 0;
}
.username {
  font-size: 12px;
  margin-bottom: 4px;
}
.content {
  margin-bottom: 4px;
  color: #555;
}

ul {
  color: #333;
  font-size: 14px;
  li {
    margin-bottom: 10px;
    .li-item {
      display: flex;
    }
    .img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .top {
      flex: 1;
      padding-left: 15px;
    }
    .value {
      margin-bottom: 10px;
    }
  }
}
</style>
