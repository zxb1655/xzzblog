<template>
  <div class="box">
    <ul class="event_year">
      <li
        v-for="(item, index) in model"
        :key="index"
        :class="{ current: index === currentIndex }"
        @click="changeIndex(index)"
      >
        {{ item.list[0].createdAt | fmtYearMon }}
      </li>
    </ul>

    <ul class="event_list">
      <div
        ref="content"
        v-for="(item, index) in model"
        :key="index"
        class="disnone"
      >
        <h3 id="2013">{{ item.list[0].createdAt | fmtYearMon }}</h3>
        <li
          v-for="item1 in item.list"
          :key="item1._id"
          class="hand"
          @click="goDetail(item1._id)"
        >
          <span>{{ item1.createdAt | fmtMonDay }}</span>
          <p>
            <span>{{ item1.title }}</span>
          </p>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: [],
      reverse: true,
      activeName: 1,
      currentIndex: 0,
      liConheight: 0,
    };
  },
  filters: {
    fmtYearMon(n) {
      const time = new Date(n);
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      return `${year}年${month}月`;
    },
    fmtMonDay(n) {
      const time = new Date(n);
      const Day = time.getDate();
      let month = time.getMonth() + 1;
      month = month > 10 ? month : "0" + month;
      return `${month}月${Day}号`;
    },
    fmtYear(n) {
      const time = new Date(n);
      const year = time.getFullYear();
      return year + "年";
    },
  },
  methods: {
    async getArchive() {
      const res = await this.$http.get("/archive");
      this.model = res.data;
    },
    goDetail(_id) {
      this.$router.push(`/article/list/${_id}`);
    },
    changeIndex(index) {
      const content = this.$refs.content;
      let conHei = 0;
      if (index > this.currentIndex) {
        for (let i = 0; i < index; i++) {
          conHei += content[i].offsetHeight;
          content[i].style.opacity = 0;
        }
        for (let i = index; i < content.length; i++) {
          content[i].style.top = `-${conHei}px`;
        }
      }
      if (index < this.currentIndex) {
        for (let i = index; i < this.currentIndex; i++) {
          content[i].style.opacity = 1;
        }
        for (let i = 0; i < index; i++) {
          conHei += content[i].offsetHeight;
        }
        for (let i = index; i < content.length; i++) {
          content[i].style.top = `-${conHei}px`;
        }
      }
      this.currentIndex = index;
    },
  },
  mounted() {
    this.getArchive();
  },
};
</script>

<style lang="scss" scoped>
.box {
  background: #f0f0f0;
  width: 1280px;
  margin: 80px auto 0;
  display: flex;
  justify-content: center;
  .event_year {
    text-align: center;
    position: fixed;
    left: 14vw;
    li {
      line-height: 40px;
      background: #fff;
      font-size: 14px;
      color: #828282;
      cursor: pointer;
      position: relative;
      margin: 10px 0;
      border-radius: 50px 35px 35px 50px;
      box-shadow: 10px 10px 10px #ccc;
      &::before {
        content: "";
        top: 10px;
        right: -18px;
        position: absolute;
        border: 10px solid;
        border-color: transparent transparent transparent #fff;
      }
      &.current {
        width: 140px;
        background: #4e6fa1;
        color: #fff;
        text-align: right;
        padding-right: 9px;
        &::before {
          border-color: transparent transparent transparent #4e6fa1;
        }
      }
    }
  }

  .event_list {
    .disnone {
      transition: all 1s;
      position: relative;
      top: 0;
      z-index: 2;
    }
    h3 {
      margin-top: 0;
      margin-bottom: 0;
      font-size: 24px;
      font-family: Georgia;
      color: #506c95;
      height: 38px;
      line-height: 30px;
      font-style: italic;
      position: relative;
      border-left: 4px solid #ccc;
      padding-left: 10px;
      margin-left: 90px;
      &::before {
        position: absolute;
        left: -8px;
        top: 25%;
        content: "";
        width: 12px;
        height: 12px;
        background: #506c95;
        border-radius: 50%;
      }
      &::after {
        position: absolute;
        left: -4px;
        top: 32%;
        content: "";
        width: 5px;
        height: 5px;
        background: #fff;
        border-radius: 50%;
      }
    }
    li {
      display: flex;
      span {
        width: 70px;
        text-align: right;
        margin-right: 20px;
        padding-top: 13px;
        color: #506c95;
        letter-spacing: 1px;
      }
      p {
        margin-top: 0;
        margin-bottom: 0;
        border-left: 4px solid #ccc;
        padding-left: 20px;
        position: relative;
        &::before {
          position: absolute;
          left: -8px;
          top: 25%;
          content: "";
          width: 12px;
          height: 12px;
          background: #666;
          border-radius: 50%;
        }
        span {
          text-align: left;
          position: relative;
          display: block;
          background: #fff;
          width: 600px;
          height: 60px;
          margin-bottom: 10px;
          box-shadow: 10px 10px 10px #ccc;
          padding-left: 20px;
          padding-bottom: 10px;
          border-radius: 10px;
          transition: 0.3s;
          &:hover {
            font-size: 18px;
          }
          &::before {
            position: absolute;
            left: -19px;
            top: 25%;
            content: "";
            border: 10px solid;
            border-color: transparent #fff transparent transparent;
          }
        }
      }
    }
  }
}
.mybox-leave-active,
.mybox-enter-active {
  transition: all 1s ease;
}
.mybox-leave-active,
.mybox-enter {
  height: 0px !important;
}
.mybox-leave,
.mybox-enter-active {
  height: 100%;
}
// @keyframes show{
//   0% {
//     opacity: 1;
//     height: 100%;
//     visibility: visible;
//   }
//   50%{
//     visibility: visible;
//     opacity: .5;
//     height: 50%;
//   }
//   100%{
//     opacity: 0;
//     visibility: hidden;
//     height: 0;
//   }
// }
</style>
