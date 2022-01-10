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
          <el-select style="width: 400px" v-model="ruleForm.tag" multiple placeholder="请选择">
            <el-option v-for="item in categoryList" :key="item.name" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面" prop="cover">
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            name="file"
            :limit="1"
            :data="{ bucket }"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="successPic"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <img width="100%" :src="ruleForm.cover" alt="" style="display: none" />
          <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
            <img width="100%" :src="ruleForm.cover" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor ref="editor" :ishljs="true" v-model="ruleForm.content" @imgAdd="imgAdd" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建 </el-button>
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
  name: 'ArticleAdd',
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
      ruleForm: {
        title: '',
        content: '',
        introduction: '',
        cover: '',
        tag: null
      },
      bucket: 'article',
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        introduction: [{ required: true, message: '请输入文章简介', trigger: 'blur' }],
        // cover: [{ required: true, message: "请上传封面图", trigger: "blur" }],
        // tag: [{ required: true, message: "请选择标签", trigger: "change" }],
        content: [{ required: true, message: '请填写文章', trigger: 'blur' }]
      }
    }
  },

  methods: {
    // markdown 上传图片
    async imgAdd(pos, $file) {
      // console.info(555, $file);
      let parms = {
        file: $file,
        bucket: this.bucket
      }
      let res = await this.$api.user.upload(parms)
      this.$refs.editor.$img2Url(pos, res.url)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.ruleForm.cover = ''
    },
    successPic(response) {
      this.ruleForm.cover = response.data.url
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
          console.log('error submit!!')
          return false
        }
      })
    },
    async submit() {
      let parmas = {
        ...this.ruleForm,
        bucket: this.bucket,
        author: 'admin'
      }
      await this.$api.article.createArticle(parmas)
      this.$message.success('创建成功')
      this.$router.push('/article')
    },
    async getCategory() {
      const res = await this.$api.category.getCategoryList({
        author: 'admin'
      })
      this.categoryList = res
    }
  },
  created() {
    this.getCategory()
  }
}
</script>

<style lang="scss" scoped></style>
