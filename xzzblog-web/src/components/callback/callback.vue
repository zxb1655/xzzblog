<template>
  <div class="model dc">
    <div class="wrapper">
      <h3 class="title">回复</h3>
      <textarea v-model.trim="content" class="textarea" rows="5"></textarea>
      <div class="btn-list">
        <div class="btn lg dc submit pointer" @click="submit">回复</div>
        <div class="btn close dc pointer" @click="$emit('close')">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      content: ""
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "login/userInfo"
    })
  },
  methods: {
    async submit() {
      if (!this.content) {
        this.$message.warning("请输入回复内容哦～");
        return;
      } else {
        let params = {
          username: this.userInfo.username,
          avatar: this.userInfo.avatar,
          email: this.userInfo.email,
          content: this.content
        };
        await this.$api.createMessage(params);
        this.$message.success("回复成功，等待审核～");
        this.$emit("close");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.model {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  .wrapper {
    padding: 30px;
    width: 800px;
    border-radius: 6px;
    background: #fff;
    .title {
      margin-bottom: 30px;
      text-align: center;
      color: #6bc30d;
      font-weight: bold;
    }
    .textarea {
      min-height: 100px;
      width: 100%;
      border-color: #999;
      border-radius: 5px;
      &:focus {
        outline: none !important;
        border-color: #6bc30d;
      }
    }
    .btn-list {
      display: flex;
      justify-content: space-evenly;
    }
    .btn {
      margin-top: 30px;
      width: 100px;
      height: 38px;
      color: #fff;
      font-size: 16px;
    }
    .submit {
      border: 1px solid #6bc30d;
      color: #6bc30d;
    }
    .close {
      border: 1px solid #999;
      color: red;
    }
  }
}
</style>
