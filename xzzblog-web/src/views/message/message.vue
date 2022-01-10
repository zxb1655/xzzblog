<template>
  <div class="container">
    <div class="message">
      <msg></msg>
    </div>
    <div class="message_foot">
      <div class="content">
        <div class="con_head">Message</div>
        <div class="con_tit">
          <span class="con_tit_l">#</span>
          <span class="con_tit_r">留言前需知</span>
        </div>
        <div class="con_list">
          <p>• 烦请各位大佬留言时填写自己的真实邮件</p>
          <p>• 留言我基本都会回复，并会以邮件通知您</p>
        </div>
        <p class="con_mes">希望能向小猪猪提出好的建议。 ^_^</p>
      </div>
    </div>
    <div class="app-timeline">
      <msglist></msglist>
    </div>
  </div>
</template>

<script>
import msg from "src/components/msg/msg";
import msglist from "src/components/msg/msglist";
export default {
  name: "message",
  components: {
    msg,
    msglist
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common.scss";
.message {
  margin-top: 100px;
}
.message_foot {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  font-size: 16px;
  .content {
    line-height: 1.8;
  }
  .con_head {
    color: #34b686;
    font-size: 22px;
  }
  .con_tit {
    margin: 10px 0;
  }
  .con_tit_l {
    color: #34b686;
  }
  .con_tit_r {
    color: #bbb;
  }
  .con_list {
    margin: 20px 0;
    color: #a7ce94;
    padding-left: 20px;
    font-size: 14px;
    line-height: 2.4;
  }
  .con_mes {
    margin-top: 20px;
    color: #767676;
    font-size: 14px;
  }
}
.app-timeline {
  margin-top: 20px;
  padding: 30px 0;
  margin-bottom: 20px;
  background-color: #fff;
}
</style>
