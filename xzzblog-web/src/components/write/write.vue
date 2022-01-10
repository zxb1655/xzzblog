<template>
  <div class="write">
    <img
      src="../msg/avatar.png"
      v-if="isShow && !userInfo.avatar"
      alt=""
      class="avatar"
    />
    <img
      :src="userInfo.avatar"
      v-if="isShow && userInfo.avatar"
      alt=""
      class="avatar"
    />
    <div class="input">
      <textarea
        class="textarea"
        v-model="content"
        cols="30"
        rows="10"
        :placeholder="
          cparams.answer
            ? `${userInfo.username} 回复 ${cparams.answer}`
            : '各位拔刀吧🔪🔪🔪'
        "
      ></textarea>
      <div class="bottom">
        <input
          type="text"
          placeholder="接收回复的邮箱"
          class="email"
          v-model="email"
        />
        <div class="submit pointer" @click="submit">
          {{ userInfo.username ? "提交" : "注册" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../../utils/bus";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      content: "",
      email: ""
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "login/userInfo"
    })
  },
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    cparams: {
      type: Object,
      default: function() {
        return {
          answer: ""
        };
      }
    }
  },
  mounted() {
    this.email = this.userInfo.email;
  },
  methods: {
    submit() {
      if (!this.userInfo.username) {
        this.$store.commit("login/setShow", true);
        return;
      } else if (!this.content) {
        this.$message.warning("请填写留言信息哦😊😊～");
        return;
      } else {
        let params = {
          ...this.cparams,
          username: this.userInfo.username,
          avatar: this.userInfo.avatar,
          email: this.email,
          content: this.content
        };
        this.$api.createArticleComment(params).then(res => {
          this.content = "";
          this.$message.warning("等待管理员审核留言😊");
          this.$emit("reload", true);

          // 兄弟组件通讯，懒的使用vuex的
          bus.$emit("zxb_blog_close_writemodel", false);

          // 改写本地的缓存：
          localStorage.setItem(
            "zxb_blog_userinfo",
            JSON.stringify({ ...this.userInfo, email: this.email })
          );
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.write {
  display: flex;
  padding: 0px 30px 0 30px;
  font-size: 14px;
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .input {
    overflow: hidden;
    flex: 1;
    margin-left: 10px;
    background-color: #f2f2f2;
    border-radius: 10px;
  }
  .textarea {
    padding: 10px;
    min-height: 80px;
    background-color: #f2f2f2;
    width: 100%;
    font-size: 14px;
    resize: none;
    border: none;
    &:focus {
      outline: none;
    }
  }
  .bottom {
    height: 40px;
    border-top: 0;
    .submit {
      float: right;
      width: 120px;
      height: 100%;
      background: #5788aa;
      color: #fff;
      text-align: center;
      font-size: 16px;
      line-height: 40px;
      border-radius: 10px;
    }
    .email {
      float: left;
      margin-top: 5px;
      margin-left: 20px;
      padding-left: 15px;
      width: 200px;
      height: 30px;
      outline: none;
      color: #333;
      border: 1px solid #999;
      border-radius: 5px;
      background-color: #f2f2f2;
      -webkit-appearance: none;
    }
  }
}
</style>
