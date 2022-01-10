<template>
  <div class="footer">
    <div class="footer-floor">
      <p class="mr">
        <a
          href="https://beian.miit.gov.cn/"
          class="text-textcolor"
          target="_blank"
          >粤ICP备19089604号-1</a
        >
      </p>
      <p>
        Copyright（c）·
        <a
          href="https://github.com/zxb1655"
          class="text-textcolor"
          target="_blank"
          >zxb小猪猪</a
        >
        ·版权所有
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.footer {
  height: 100%;
  .footer-floor {
    text-align: center;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 10px;
    height: 100%;
    background-image: linear-gradient(0deg, #12202b 0%, #2d6592 80%);
    font-size: 14px;
    p {
      color: #fff;
    }
    .mr {
      margin-bottom: 6px;
    }
    .text-textcolor {
      color: #ccc;
    }
  }
}
</style>
