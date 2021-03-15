<template>
  <div class="main-container page-message d-flex flex-column ai-center">
    <div class="message mb-6">
      <div class="text-center text-dark fs-xxxxl">
        <h3 class="h3mes">留言板</h3>
      </div>
      <div :class="{ 'message-box': parentComments.length > 0 }">
        <div class="textarea-box bdr">
          <comment-textarea
            model="messages"
            @toResponse="getMessagesList"
            type="parent"
            placeholder="输入留言内容"
          ></comment-textarea>
        </div>
      </div>
    </div>
    <div class="message mb-6">
      <div
        :class="{ 'message-box': parentComments.length > 0 }"
        class="my-2 ml-4"
      >
        <comment-list
          model="messages"
          @getCommentList="getMessagesList"
          :commentsList="parentComments"
          v-if="parentComments"
        ></comment-list>
      </div>
    </div>
    <div class="message p-5">
      <div class="content">
        <div class="text-green fs-xxxxl">Message</div>
        <div class="mt-5 mb-5"></div>
        <div class="py-4">
          <span class="fs-xxl text-green">#</span>
          &nbsp;
          <span class="fs-xxl text-grey-1">留言前需知</span>
        </div>
        <div class="pl-5 text-green-1">
          <p>• 烦请各位大佬留言时填写自己的真实邮件</p>
          <p>• 留言我基本都会回复，并会以邮件通知您</p>
        </div>
        <p class="my-8 text-grey-2">希望能向小猪猪提出好的建议。 ^_^</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentComments: [],
    };
  },
  mounted() {
    this.getMessagesList();
  },
  methods: {
    async getMessagesList() {
      let res = await this.$http.get("messages");
      let blogsComments = res.data;
      this.parentComments = blogsComments.filter(
        (v) => v.parent == "5ec884e3fe28d35475b43fb3"
      );
      this.parentComments.forEach((c) => {
        return (c.children = blogsComments.filter((v) => v.parent == c._id));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  background: #fff;
  width: 80vw;
}
.h3mes {
  color: #515250;
  font-size: 28px;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 0;
}
.textarea-box {
  width: 100%;
  max-width: 650px;
  padding: 5px 15px 15px;
}
.content {
  line-height: 1.8 !important;
}
</style>
