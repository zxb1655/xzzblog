<template>
  <div class="login dc" @touchmove.prevent>
    <div class="content">
      <h3 class="title lg">注册</h3>
      <div class="close dc" @click="close">x</div>

      <el-form :model="formData" :rules="userRules" ref="userForm">
        <el-form-item prop="username">
          <el-input
            size="medium"
            :maxlength="10"
            v-model="formData.username"
            placeholder="起个好听的昵称吧～"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            size="medium"
            v-model="formData.email"
            placeholder="QQ邮箱(仅为了获取QQ头像)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="url">
          <el-input
            size="medium"
            v-model="formData.url"
            placeholder="博客/github地址(开头http://或https://)"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        class="submit dc pointer"
        :class="disabled"
        @click="register(formData)"
      >
        注册
      </div>

      <div class="login-ways">
        <div class="ways">其他登录方式</div>
        <div class="href-list">
          <div class="href" @click="goGithubAuth">
            <i class="iconfont icon-github pointer"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateQQEmail, validateUrl } from "../../utils/validate";
import { mapGetters } from "vuex";
import { OAUTH_URL } from "../../utils/github";
export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        url: "",
        avatar: ""
      },
      userRules: {
        nickName: {
          required: true,
          message: "必填，且不超过10个字符",
          trigger: "change"
        },
        email: {
          required: true,
          validator: validateQQEmail,
          trigger: "change"
        },
        url: { required: true, validator: validateUrl, trigger: "change" }
      }
    };
  },

  computed: {
    ...mapGetters({
      isNeedLogin: "login/isNeedLogin"
    }),
    disabled() {
      const { username, email, url } = this.formData;
      if (username && email && url) {
        return "";
      } else {
        return "disbaled";
      }
    }
  },
  methods: {
    goGithubAuth() {
      window.location.href = OAUTH_URL;
      localStorage.setItem(
        "GITHUB_LOGIN_REDIRECT_URL",
        `${this.$route.fullPath}`
      );
    },
    close() {
      this.$store.commit("login/setShow", false);
    },
    // 注册
    register() {
      this.$refs.userForm.validate(async valid => {
        this.formData.avatar = `https://q1.qlogo.cn/g?b=qq&nk=${this.formData.email.replace(
          "@qq.com",
          ""
        )}&s=100`;
        if (valid) {
          this.$store.commit("login/registerUserinfo", this.formData);
          this.$store.commit("login/setHide", false);
          this.$store.commit("login/updateUserInfo");
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/common.scss";

.login {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: hidden;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
}
.content {
  position: relative;
  padding: 20px 40px;
  width: 400px;
  border-radius: 6px;
  background: #fff;
  animation: rotate 0.3s ease-in;
}

@keyframes rotate {
  0% {
    transform: scale(0) rotate(1turn);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.title {
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
}
.tips {
  display: inline;
  color: #999;
  font-size: 10px;
}
.close {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  font-size: 30px;
  color: #999;
  cursor: pointer;
}
.input-div {
  height: 60px;
  font-size: 16px;
  .input {
    padding: 0 20px;
    width: 100%;
    height: 50px;
    outline: none;
    border: 1px solid #999;
    border-radius: 3px;
    &:focus {
      outline: none;
      border: 1px transparent solid;
      background-image: $bg-border;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
    }
  }
}
.submit {
  margin-top: 20px;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  background-image: $bg;
  color: #fff;
  text-align: center;
  font-size: 16px;
  &.disbaled {
    opacity: 0.5;
    pointer-events: none;
  }
}
.login-ways {
  margin-top: 20px;
  .line {
    position: absolute;
    display: inline-block;
    content: "";
    height: 1px;
    background: #666;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
  }
  .ways {
    font-size: 14px;
    color: #666;
    text-align: center;
    position: relative;
    &:after {
      @extend .line;
      left: 0;
    }
    &:before {
      @extend .line;
      right: 0;
    }
  }
  .href-list {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .href {
      width: 32px;
      height: 32px;
      margin: 15px 0;
      .icon-github {
        font-size: 34px;
      }
    }
  }
}
</style>
