<template>
  <div>
    <header>
      <div class="layout">
        <nav class="indigo">
          <img
            class="brand-logo"
            src="../../assets/images/logo.png"
            alt="logo"
          />
          <div class="brand-menu">
            <ul class="nav-ul">
              <router-link
                tag="li"
                :to="{ path: item.path }"
                class="nav-li pointer"
                v-for="(item, index) in list"
                :key="index"
              >
                <div class="title">
                  <i class="iconfont" :class="item.icon"></i>
                  {{ item.name }}
                </div>
              </router-link>
              <li
                class="nav-li pointer"
                v-if="!userInfo.username"
                @click="login"
              >
                登录
              </li>
              <li class="nav-li user pointer" v-if="userInfo.username">
                <el-popover placement="bottom" width="150" v-model="visible">
                  <div class="logout pointer" @click="logout">
                    点击清除个人信息
                  </div>
                  <span slot="reference">{{ userInfo.username }}</span>
                </el-popover>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    <a
      href="javascript:;"
      @click="backHead"
      class="cd-top"
      :class="isScrolling ? 'cd-is-visible' : ''"
    ></a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activeHeaderBg: "",
      userinfo: {},
      isScrolling: false,
      visible: false
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/nav",
      userInfo: "login/userInfo"
    })
  },
  methods: {
    logout() {
      this.$confirm("是否退出登录并清除个人信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.visible = false;
          this.$store.commit("login/logout");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    backHead() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    ajustNavigation() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.isScrolling = scrollTop > 0;
    },
    login() {
      this.$store.commit("login/setShow", true);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.ajustNavigation);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.ajustNavigation);
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/common.scss";

header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background: $color-bg;
  color: #fff;
  background-image: linear-gradient(135deg, #52e5e7 10%, #1981d6 80%, #2924d1);
  box-shadow: 0 1px 5px 0 rgb(19 141 165 / 48%);
}
.logout {
  text-align: center;
}
.indigo {
  display: flex;
  height: 64px;
  line-height: 64px;
}
.cd-top {
  position: fixed;
  right: 25px;
  top: -900px;
  z-index: 99;
  width: 70px;
  height: 80vh;
  background: url("../../assets/images/xzz-scroll.png") no-repeat center;
  background-size: contain;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  opacity: 1;
}
.cd-is-visible {
  top: 66px;
  opacity: 1;
}
.brand-logo {
  width: 200px;
}
.brand-menu {
  flex: 1;
}
.nav-ul {
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  .nav-li {
    display: inline-block;
    padding: 0 10px;
    margin: 0 15px;
    position: relative;
    &.user {
      color: #ccc;
    }
    &::before {
      width: 0;
      height: 2px;
      content: "";
      position: absolute;
      bottom: 10px;
      left: 50%;
      transition: all 0.6s;
      background: #ccc;
    }
    &.router-link-exact-active,
    &:hover {
      color: #ccc;
      &::before {
        width: 100%;
        left: 0;
      }
    }
  }
}
</style>
