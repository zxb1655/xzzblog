<template>
  <div class="pagebox">
    <div class="pagebox-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" width="100%" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title" style="width: 500px">
          <el-input v-model.trim="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model.trim="ruleForm.introduction" style="width: 500px" type="textarea"> </el-input>
        </el-form-item>

        <el-form-item label="标签" prop="tag">
          <el-select style="width: 400px" v-model="ruleForm.tag" multiple value-key="id" placeholder="请选择">
            <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面" prop="cover">
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            name="file"
            :data="{ bucket }"
            :on-preview="handlePictureCardPreview"
            :limit="1"
            :on-remove="handleRemove"
            :on-success="successPic"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <img width="100%" :src="ruleForm.cover" alt="" style="display: none" />
          <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
            <img width="100%" :src="ruleForm.cover" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor ref="editor" @imgAdd="imgAdd" :ishljs="true" v-model="ruleForm.content" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即保存 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import '../../styles/highlight.scss'
import { mapGetters } from 'vuex'
export default {
  name: 'ArticleUpdate',
  components: {
    mavonEditor
  },
  computed: {
    ...mapGetters({
      tabs: 'login/tabs'
    })
  },
  data() {
    return {
      categoryList: [],
      dialogVisible: false,
      uploadUrl: `${process.env.VUE_APP_BASE_API}/api/upload`,
      fileList: [],
      ruleForm: {
        title: '',
        content: '',
        introduction: '',
        cover: '',
        tag: null
      },
      bucket: 'article',
      tagSelect: [],
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        introduction: [{ required: true, message: '请输入文章简介', trigger: 'blur' }],
        content: [{ required: true, message: '请填写文章', trigger: 'blur' }]
      }
    }
  },

  methods: {
    // markdown 上传图片
    async imgAdd(pos, $file) {
      let parms = {
        file: $file,
        bucket: this.bucket
      }
      let res = await this.$api.user.upload(parms)
      this.$refs.editor.$img2Url(pos, res.url)
    },
    changeData() {
      this.html = this.$refs.md.d_render //html
      // let textcontent = this.$refs.md.d_value; //普通文本
      // console.info("content", html);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.ruleForm.cover = ''
    },
    successPic(file) {
      this.ruleForm.cover = file.data.url
    },
    handlePictureCardPreview(file) {
      this.ruleForm.cover = file.url
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit()
        } else {
          return false
        }
      })
    },
    async submit() {
      console.log(this.$refs.editor.d_render)
      let tag = this.ruleForm.tag.map(item => item.id).join(',')
      let pramas = {
        ...this.ruleForm,
        tag
      }
      await this.$api.article.updateArticle(this.ruleForm.id, pramas)
      this.$message.success('更新成功')
      this.$router.push('/article')
    },
    async getCategory() {
      const res = await this.$api.category.getCategoryList({
        author: 'admin'
      })
      console.log(res)
      this.categoryList = res
    },
    async getDetail() {
      const res = await this.$api.article.getArticleDeatil(this.$route.params.id)
      res.tag = res.categories
      this.fileList = [{ url: res.cover }]
      this.ruleForm = res
      this.getCategory()
    }
  },
  mounted() {
    this.getDetail()
  }
}
</script>
