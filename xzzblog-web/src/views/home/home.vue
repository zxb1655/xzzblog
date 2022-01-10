<template>
  <div class="home">
    <myheader></myheader>
    <div class="app-content">
      <router-view></router-view>
    </div>
    <div class="myfooter">
      <myfooter></myfooter>
    </div>
    <login v-if="isNeedLogin"></login>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import login from "src/components/login/login";
import myheader from "src/components/myheader/myheader";
import myfooter from "src/components/myfooter/myfooter";
export default {
  name: "home",
  components: {
    myheader,
    myfooter,
    login
  },
  mounted() {
    this.$store.commit("login/updateUserInfo");
  },
  computed: {
    ...mapGetters({
      isNeedLogin: "login/isNeedLogin"
    })
  }
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
}
.app-content {
  min-height: 100vh;
  flex: 1;
  z-index: 10;
}
.myfooter {
  height: 80px;
}
</style>
