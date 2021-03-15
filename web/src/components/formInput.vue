<template>
  <div class="fromInput">
    <el-form :model="userForm" :rules="userRules" ref="userForm">
      <el-form-item prop="nickName">
        <el-input
          size="medium"
          :maxlength="10"
          v-model="userForm.nickName"
          placeholder="起个好听的昵称吧～"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          size="medium"
          v-model="userForm.email"
          placeholder="QQ邮箱(仅为了获取QQ头像)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="url">
        <el-input
          size="medium"
          v-model="userForm.url"
          placeholder="博客/github地址(开头http://或https://)"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="width-100" @click="saveForm('userForm')"
      >提交</el-button
    >
  </div>
</template>

<script>
import { validateQQEmail } from "../plugins/validate";
export default {
  props: {
    toForm: { type: Object, default: null },
  },
  data() {
    return {
      userForm: {
        nickName: "",
        email: "",
        url: "",
      },
      userRules: {
        nickName: {
          required: true,
          message: "必填，且不超过10个字符",
          trigger: "change",
        },
        email: {
          required: true,
          validator: validateQQEmail,
          trigger: "change",
        },
        url: { required: true, message: "必填", trigger: "change" },
      },
    };
  },
  created() {
    this.userForm = this.toForm ? this.toForm : this.userForm;
  },
  methods: {
    saveForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        this.userForm.email = this.userForm.email;
        if (valid) {
          this.$emit("toRequest", this.userForm);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.read-text {
  border-bottom: 1px solid #000;
  &:hover {
    border-color: #8600ff;
    color: #8600ff;
  }
}
.isRead {
  border-bottom: 1px solid #ffb929;
}
.avatar-uploader {
  height: 62px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff !important;
}
.avatar-uploader-icon {
  font-size: 24px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px !important;
  text-align: center;
}
.logo-img {
  width: 60px;
  height: 60px;
  display: block;
}
.el-form-item {
  margin-bottom: 18px !important;
}
</style>
