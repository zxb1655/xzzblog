<template>
  <div class="pt-5">
    <div class="d-flex flex-column">
      <div class="mesinp d-flex">
        <div class="avatar-box text-center">
          <img
            class="mb-4 pt-6"
            @click="lookUserInfo"
            v-if="userInfo.avatarImg"
            :src="userInfo.avatarImg"
            alt="小猪猪头像"
          />
          <i
            v-else
            @click="lookUserInfo"
            class="iconfont icon-touxiang hand"
          ></i>
          <span class="avatar fs-lg text-grey-2">
            {{ userInfo.nickName ? userInfo.nickName : "留言" }}
          </span>
        </div>
        <el-input
          resize="none"
          type="textarea"
          class="btn-none"
          rows="5"
          v-model="messageObj.content"
          :placeholder="placeholder"
        ></el-input>
      </div>

      <div class="comhead d-flex jc-between pt-5">
        <button @blur="showEmoji = false" class="btn-none text-left ml-11">
          <i
            class="iconfont icon-Smile hand"
            @click="
              showBtn = true;
              showEmoji = !showEmoji;
            "
          ></i>
          <div class="position-emoji">
            <VEmojiPicker
              @focus="showEmoji = true"
              :showSearch="false"
              :emojisByRow="10"
              :emojiSize="30"
              class="emoji-picker"
              v-show="showEmoji"
              :pack="packData"
              @select="selectEmoji"
            />
          </div>
        </button>
        <el-button
          class="mesbut"
          type="primary"
          size="big"
          :loading="btnLoading"
          @click="fabuHandle"
          >发布</el-button
        >
        <el-button
          @click="resetMess"
          type="info"
          size="big"
          native-type="reset"
          class="mesbut"
          >清空留言</el-button
        >
      </div>
    </div>

    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="300px"
      center
    >
      <div :class="{ turnAnima: false }">
        <form-input @toRequest="submit" :toForm="userForm"></form-input>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { VEmojiPicker } from "v-emoji-picker";
import formInput from "./formInput";
export default {
  props: {
    model: String,
    type: String,
    blogsId: String,
    parentId: String,
    nickName: String,
    byAiteUserId: String,
    placeholder: String,
  },
  components: {
    // EmojiPicker,
    VEmojiPicker,
    formInput,
  },
  data() {
    return {
      showBtn: false,
      showEmoji: false,
      btnLoading: false,
      input: "",
      search: "",
      packData: "",
      userInfo: {
        nickName: "",
        email: "",
        url: "",
        avatarImg: "",
        _id: "",
      },
      dialogVisible: false,
      userForm: {
        nickName: "",
        email: "",
        url: "",
        avatarImg: "",
      },
      qqUrl: "https://q1.qlogo.cn/g?b=qq&nk=QQ号码&s=100",
      userRules: {
        nickName: { required: true, message: "必填", trigger: "change" },
        email: { required: true, message: "必填", trigger: "change" },
        url: { required: true, message: "必填", trigger: "change" },
      },
      messageObj: {
        nickName: "",
        avatarImg: "",
        content: "",
        relateBlogId: this.blogsId,
        parent: "",
        byAiteName: "",
      },
    };
  },
  created() {
    this.userInfo = localStorage.userInfo
      ? JSON.parse(localStorage.userInfo)
      : this.userInfo;
  },
  computed: {
    ...mapState(["map_user_info"]),
  },
  methods: {
    ...mapMutations(["map_set_user_info"]),
    lookUserInfo() {
      this.userForm = this.userInfo;
      this.dialogVisible = true;
    },
    async fabuHandle() {
      if (!localStorage.userInfo) {
        return (this.dialogVisible = true);
      }
      if (!this.messageObj.content) {
        return this.$message({
          showClose: true,
          message: "您好，请输入留言内容",
          type: "warning",
        });
      }
      this.btnLoading = true;
      this.messageObj.nickName = this.userInfo.nickName;
      this.messageObj.avatarImg = this.userInfo.avatarImg;
      this.messageObj.userId = this.userInfo._id;
      this.messageObj.parent =
        this.type == "children" ? this.parentId : "5ff665f4492f9e1a1c251364";
      this.messageObj.byAiteName =
        this.type == "children" ? this.nickName : "小猪猪";
      let url = this.model == "comments" ? "/comments" : "/messages";
      await this.$http.post(url, this.messageObj);
      this.$emit("toResponse");
      this.$message.success({
        showClose: true,
        message: "发布成功",
        type: "success",
      });

      this.btnLoading = false;
      if (this.userInfo.nickName == "小猪猪") {
        let byAiteObj = await this.$http.get(`users/${this.byAiteUserId}`);
        let replyObj = {
          recipient: byAiteObj.data.email,
          subject: this.messageObj.byAiteName,
          html: this.messageObj.content,
        };
        await this.$http.post("email", replyObj);
      }
      this.messageObj.content = "";
    },
    //弹框提交
    async submit(userForm) {
      userForm.avatarImg = this.qqUrl.replace(
        "QQ号码",
        userForm.email.replace("@qq.com", "")
      );
      let res;
      if (this.userInfo._id) {
        res = await this.$http.put(`users/${this.userInfo._id}`, userForm);
      } else {
        res = await this.$http.post("users", userForm);
      }
      this.map_set_user_info(res.data);
      this.userInfo = res.data;
      localStorage.userInfo = JSON.stringify(res.data);
      this.dialogVisible = false;
    },
    //清空留言
    resetMess() {
      this.messageObj.content = "";
    },
    //选择表情
    selectEmoji(emoji) {
      this.messageObj.content += emoji.data;
    },
    insert(emoji) {
      this.input += emoji;
    },
  },
};
</script>

<style lang="scss" scoped>
.mesinp {
  width: 74vw;
  .avatar-box {
    width: 85px;
  }
}
.mesbut {
  width: 150px;
}
.comhead {
  width: 70vw;
}
.emoji-picker {
  z-index: 1000;
}
.avatar-box {
  width: 70px;
  padding-right: 20px;
  padding-top: 14px;
  img {
    cursor: pointer;
    width: 100%;
    height: auto;
    border-radius: 50%;
  }
  .icon-touxiang {
    font-size: 44px;
    color: #c4c4c4;
  }
}
.btn-none {
  border: 1px solid transparent;
  outline: none;
}
.position-emoji {
  transition: all 0.6s ease-in-out;
  position: relative;
  .emoji-picker {
    position: absolute;
    top: -32px;
    left: 41px;
  }
}
.icon-Smile {
  font-size: 22px;
  color: #707275;
  &:hover {
    color: #ffb929;
  }
}

@media screen and (max-width: 768px) {
  .avatar-box {
    width: 65px;
    padding-right: 15px;
  }
}
@media screen and (max-width: 400px) {
  .avatar-box {
    width: 42px;
    padding-right: 10px;
    .icon-touxiang {
      font-size: 32px;
    }
  }
}
@media screen and (max-width: 375px) {
  .avatar-box {
    padding-right: 10px;
    .icon-xingzhuangkaobei {
      font-size: 32px;
    }
  }
}
</style>

<style>
.el-textarea__inner {
  font-size: 16px;
  color: #707275;
  border: 1px solid #eee;
}
</style>
