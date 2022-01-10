<template>
  <view class="bg-white">
    <cu-custom bgColor="bg-gradual-blue">
      <block slot="content">文章</block>
    </cu-custom>
    <view class="canui-head-box" :style="{ top: StatusBar + 'px' }">
      <navigator
        class="cuIcon-back"
        open-type="navigateBack"
        hover-class="none"
      ></navigator>
      <navigator
        class="cuIcon-homefill"
        url="/pages/index/index"
        open-type="switchTab"
        hover-class="none"
      >
      </navigator>
    </view>
    <view class="padding bg-gray">
      <view class="radius shadow shadow-lg bg-white padding">
        <view class="text-xl margin-bottom">
          <text class="text-black">{{ articleDetail.title }}</text>
        </view>
        <view class="flex justify-between">
          <view class="flex flex-direction align-center">
            <view
              class="cu-avatar lg round margin-left"
              style="background-image: url(https://cdn.jzzz66.cn/avatar.png)"
            ></view>
            <text class="text-grey margin-left mt-10">小猪猪</text>
          </view>
          <view class="solid-left padding text-xxl text-center">
            <text class="cuIcon-attention"></text>
            <view class="text-gray text-xs">{{ articleDetail.browser }}</view>
          </view>
        </view>
        <view class="text-sm margin-xs">
          <text class="cuIcon-remind"></text>
          <text class="text-grey margin-lr-xs"
            >发表于 {{ articleDetail.createdAt }}</text
          >
        </view>
        <view class="text-sm margin-xs">
          <text class="cuIcon-refresh"></text>
          <text class="text-grey margin-lr-xs"
            >最后更新于 {{ articleDetail.updatedAt }}</text
          >
        </view>
        <view class="text-sm margin-xs">
          <text class="cuIcon-edit"></text>
          <text v-if="articleDetail.isOriginal" class="text-grey margin-lr-xs"
            >本文章由小猪猪原创</text
          >
          <text v-else class="text-grey margin-lr-xs"
            >本文章转载来源于网络</text
          >
        </view>
      </view>
    </view>

    <view class="margin-sm content">
      <u-parse :content="article"></u-parse>
    </view>

    <!-- <view class="cu-bar tabbar bg-white shadow foot">
      <view class="action text-gray" @tap="showModal" data-target="ChooseModal">
        <view class="cuIcon-homefill"></view> 目录
      </view>
      <view class="action text-gray">
        <view class="cuIcon-similar"></view> 暂无
      </view>
      <view class="action text-gray add-action">
        <button class="cu-btn cuIcon-add bg-gray shadow"></button>
        分享(暂无)
      </view>
      <view class="action text-gray">
        <view class="cuIcon-notification"></view>
        诵读(暂无)
      </view>
      <view class="action text-gray" @tap="goTop()">
        <view class="cuIcon-pullup"> </view>
        返回顶部
      </view>
    </view> -->

    <view
      class="cu-modal bottom-modal"
      :class="modalName == 'ChooseModal' ? 'show' : ''"
      @tap="hideModal"
    >
      <view class="cu-dialog">
        <view class="cu-bar bg-white">
          <view class="action text-blue" @tap="hideModal">取消</view>
          <view class="content">Modal标题</view>
          <view class="action text-green" @tap="hideModal">确定</view>
        </view>
        <view class="toc">
          <block v-for="item in toc" :key="item.id">
            <view
              class="padding"
              :class="'text' + item.indent"
              @tap="scrollTo(item.id)"
              :style="{ paddingLeft: `${item.indent}em` }"
            >
              {{ item.text }}
            </view>
          </block>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uParse from "@/components/feng-parse/parse.vue";
import Toc from "../../utils/Toc.js";
import { marked } from "marked";
export default {
  data() {
    return {
      StatusBar: this.StatusBar + 6,
      articleDetail: {},
      id: 7,
      modalName: null,
      article: "",
      toc: "",
      height: "",
    };
  },
  components: {
    uParse,
  },
  onLoad(options) {
    if (options._id) {
      this.id = options._id;
    }
		this.getArticleDetail();
  },
  methods: {
    showModal(e) {
      this.modalName = e.currentTarget.dataset.target;
    },
    hideModal(e) {
      this.modalName = null;
    },
    scrollTo(index) {
      //#ifdef H5
      uni
        .createSelectorQuery()
        .select(`#${index}`)
        .boundingClientRect((res) => {
          uni.pageScrollTo({
            scrollTop: res.top - 50,
          });
        })
        .exec();
      //#endif

      //#ifdef MP-WEIXIN
      // uni.createSelectorQuery().select(`#${index}`).boundingClientRect((res) => {
      // 	console.log(res)
      // 	uni.pageScrollTo({
      // 		scrollTop: res.top - 50,
      // 	})
      // }).exec()
      //#endif
    },
    async getArticleDetail() {
      const id = this.id;
      const { data } = await this.$request(`/article/webdetail`, {
        id,
      });
      this.articleDetail = data;
      const result = Toc(marked(data.content));
      this.article = result.article;
      this.toc = result.toc;
    },
    goTop() {
      uni.pageScrollTo({
        scrollTop: 0,
      });
    },
    getSimpleText(html) {
      var msg = html.replace(/<pre><code>(.*?)<\/code><\/pre>/g, "");
      var re1 = new RegExp("<.+?>", "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
      var msg1 = msg.replace(re1, ""); //执行替换成空字符
      return msg1;
    },
  },
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.toc {
  text-align: left;
  padding: 20rpx;
}

.text0 {
  color: #000;
  font-weight: 900;
}

.text1 {
  color: #333;
}

.text2 {
  color: #666;
}

.radius {
  border-radius: 20rpx;
}

.mt-10 {
  margin-top: 10rpx;
}

.content {
  padding-bottom: 40rpx;
}

/*-------左上角按钮-------*/
.canui-head-box {
  position: fixed;
  margin-left: 10px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 20px;
  padding: 4px 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 9999;
}

.canui-head-box navigator {
  padding: 8px;
  font-size: 20px;
  display: initial;
}

.canui-head-box navigator + navigator {
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  margin: 0 3px;
  padding: 0 5px;
  padding-left: 15px;
}
</style>
