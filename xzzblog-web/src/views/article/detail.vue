<template>
  <div class="detail">
    <div class="content layout">
      <div class="article">
        <div class="wapper" id="wapper">
          <mavon-editor
            ref="editor"
            :value="content"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :ishljs="true"
          >
          </mavon-editor>
          <!--
            :value="content"：引入要转换的内容
            :subfield = "false"：开启单栏模式
            :defaultOpen = "'preview'"：默认展示预览区域
            :toolbarsFlag = "false"：关闭工具栏
            :editable="false"：不允许编辑
            scrollStyle="true"：开启滚动条样式(暂时仅支持chrome)
            :ishljs = "true"：开启代码高亮
          -->
        </div>
        <div class="tree">
          <div class="nav">
            <div class="list pointer" v-for="item in nav" :key="item.id">
              <a class="li-a" @click="_scrollTo(item.id)">{{ item.name }}</a>
              <ul>
                <li
                  class="code-li"
                  @click="_scrollTo(code.id)"
                  v-for="(code, codeindex) in item.list"
                  :key="codeindex"
                >
                  <a>{{ code.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="comment">
          <write :cparams.sync="cparams"></write>
          <div class="line"></div>
          <commentlist :aid="aid"></commentlist>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "../../assets/styles/_highlight.scss";
import write from "src/components/write/write";
import commentlist from "src/components/write/commentlist";
export default {
  name: "detail",
  components: {
    mavonEditor,
    write,
    commentlist
  },
  data() {
    return {
      defaultOpen: {
        navigation: true,
        preview: true
      },
      cparams: {
        pid: 0,
        aid: this.$route.query.id,
        answer: ""
      },
      aid: this.$route.query.id,
      detail: {},
      content: "",
      nav: []
    };
  },
  methods: {
    _scrollTo(id) {
      var top = document.getElementById(id).offsetTop;
      window.scrollTo({
        top: top - 0,
        behavior: "smooth"
      });
    },
    async getDetail() {
      let params = {
        id: this.$route.query.id
      };
      const { data } = await this.$api.getArticleDetail(params);
      this.content = data.content;
      setTimeout(() => {
        //  生成目录结构
        let childrens = document.getElementsByClassName("v-show-content")[0]
            .children,
          treeArray = [];

        for (let i = 0; i < childrens.length - 1; i++) {
          let nodeName = childrens[i].nodeName;
          if (nodeName == "H2" || nodeName == "H3") {
            treeArray.push({
              id: childrens[i].childNodes[0].getAttribute("id"),
              name: childrens[i].innerText,
              tag: childrens[i].nodeName
            });
          }
        }

        // 获取标题级别
        function getLevel(str = "") {
          const result = str.slice(-1);
          return Number(result);
        }

        function format(list) {
          const result = [];
          let prevItem;

          list.forEach(item => {
            if (!prevItem) {
              result.push(item);
              prevItem = item;
              return;
            }
            const level = getLevel(item.tag);
            const prevLevel = getLevel(prevItem.tag);
            // 比较级别大小
            const isSmall = level > prevLevel; // 注意大小判断 2 > 3
            if (isSmall) {
              prevItem.list = prevItem.list || [];
              prevItem.list.push(item);
            } else {
              result.push(item);
              prevItem = item;
            }
          });
          return result;
        }
        this.nav = format(treeArray);
        console.log(this.nav);
      }, 100);
      this.detail = data;
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/common.scss";

.detail {
  padding: 80px 0 50px;
  background-color: $color-bg;
}
.content {
  .article {
    position: relative;
    overflow: hidden;
    margin: 0 auto;

    .wapper {
      float: left;
      margin-right: 20px;
      margin-bottom: 20px;
      width: 940px;
    }
    .tree {
      float: left;
      .nav {
        position: fixed;
        padding: 20px;
        width: 240px;
        background: #fff;
        box-shadow: 0 0px 3px rgba(0, 0, 0, 0.14), 0 0px 3px rgba(0, 0, 0, 0.15);
        text-align: center;
      }
      .list {
        text-align: justify;
        font-size: 14px;
        line-height: 1.6;
        .code-li {
          padding-left: 15px;
        }
        .li-a,
        .code-li {
          &:hover {
            color: $color-text;
          }
          a:target {
            position: relative;
            top: -100px;
            display: inline-block;
          }
        }
      }
    }
  }
}

.v-show-content h2 > a {
  position: relative;
  top: 44px; // 偏移值
  display: block;
}
.comment {
  padding-top: 30px;
  clear: both;
  padding-bottom: 40px;
  width: 940px;
  border-radius: 3px;
  background: #fff;
}
.line {
  margin: 30px 0;
  width: 100%;
  height: 1px;
  background: #dfdfdf;
}
</style>
