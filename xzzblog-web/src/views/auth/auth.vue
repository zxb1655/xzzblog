<template>
  <div class="auth dc">
    <div class="loading">
      <p>Loading...</p>
      <div class="center"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Fc from "../../utils/function";
import { checkGithubLogin } from "../../utils/fetch";
export default {
  name: "auth",
  methods: {},
  computed: {
    ...mapGetters({})
  },
  async created() {
    let code = Fc.getQueryString("code") ? Fc.getQueryString("code") : "";
    console.info("code", code);
    if (code) {
      const { data = {} } = await this.$api.getGithubToken({ code });
      localStorage.setItem("zxb_blog_github", JSON.stringify(data));
      await checkGithubLogin()
        .then(result => {
          let redirect_url = localStorage.getItem("GITHUB_LOGIN_REDIRECT_URL")
            ? localStorage.getItem("GITHUB_LOGIN_REDIRECT_URL")
            : "/";
          this.$store.commit("login/registerUserinfo", result.data);
          this.$store.commit("login/setHide", false);
          this.$store.commit("login/updateUserInfo");
          this.$router.push(redirect_url);
        })
        .catch(err => {
          console.info(JSON.stringify(err));
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.auth {
  width: 100%;
  height: 100vh;
}
.loading {
  // width: 200px;
  // height: 60px;
  // background: rgba(0, 0, 0, 0.5);
  color: #999;
}
p {
  margin-bottom: 45px;
  color: #999;
  font-size: 14px;
}
.center {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #dfdfdf;
  animation: centerBig 2s linear infinite;
}
@keyframes centerBig {
  from {
    opacity: 1;
  }

  to {
    width: 1000px;
    // height: 1000px;
    opacity: 0;
  }
}
</style>
