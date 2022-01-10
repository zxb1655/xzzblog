<template>
  <div class="msg">
    <div class="msg_head">
      <h3 class="h3mes">留言板</h3>
    </div>
    <div class="form-content">
      <div class="avatar-info">
        <img class="avatar" v-if="userInfo.avatar" :src="userInfo.avatar" />
        <img
          class="avatar pointer"
          v-if="!userInfo.avatar"
          src="./avatar.png"
          @click="login"
        />
        <div class="nickname">
          {{ userInfo.username || "快来留个言～" }}
        </div>
        <div class="tips" v-if="!userInfo.username">(点击头像登录)</div>
      </div>
      <div class="form">
        <div class="text" :class="isShow ? 'active' : ''">
          <textarea
            @blur="getBlur"
            @focus="getFocus"
            v-model.trim="content"
            class="textarea"
            rows="5"
          ></textarea>
        </div>
        <div class="emoji-btn">
          <div
            class="submit dc pointer"
            @click="submit"
            :class="!content ? 'disabled' : ''"
          >
            发布
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters({
      userInfo: "login/userInfo"
    })
  },
  data() {
    return {
      content: "",
      isShow: false
    };
  },
  methods: {
    getBlur() {
      this.isShow = false;
    },
    getFocus() {
      this.isShow = true;
    },
    login() {
      if (!this.userInfo.username) {
        this.$store.commit("login/setShow", true);
      }
    },
    async submit() {
      if (!this.content) {
        this.$message.warning("请填写留言信息哦😊😊～");
        return;
      }
      const { avatar, email, username } = this.userInfo;
      if (!username) {
        this.$message.warning("请先登录再留言哦😊😊～");
        this.$store.commit("login/setShow", true);
        return;
      }
      let params = {
        avatar,
        content: this.content,
        email: email,
        username: username
      };
      await this.$api.createMessage(params).then(res => {
        this.content = "";
        this.$message.success("留言成功，等待管理员审核留言😊");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/common.scss";
.msg {
  margin: 0 auto;
  padding: 20px;
  min-height: 120px;
  width: 100%;
  background-color: #fff;
  .msg_head {
    text-align: center;
    .h3mes {
      color: rgb(81, 82, 80);
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
  .form-content {
    display: flex;
    .avatar-info {
      margin-right: 20px;
      padding-top: 10px;
      width: 80px;
      .avatar {
        margin: 0 auto;
        width: 60px;
        height: 60px;
      }
      .nickname {
        color: #4ebbaa;
        text-align: center;
        font-size: 12px;
        margin-top: 10px;
      }
      .tips {
        color: #999;
        font-size: 11px;
      }
    }
    .form {
      flex: 1;
      margin-top: 8px;
    }
    .text {
      position: relative;
      overflow: hidden;
    }
    .textarea {
      padding: 10px;
      min-height: 140px;
      max-height: 200px;
      max-width: 1000px;
      min-width: 1000px;
      font-size: 14px;
      border: 1px solid #ccc;
      &:focus {
        outline: none;
        border: 1px solid #6bc30d;
      }
    }
    .emoji-btn {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      width: 100%;
      padding-right: 90px;
      .submit {
        width: 120px;
        height: 40px;
        border-radius: 4px;
        background-image: $bg;
        color: #fff;
        font-size: 14px;
        &.disabled {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
