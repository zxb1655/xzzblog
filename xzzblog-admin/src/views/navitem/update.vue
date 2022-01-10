<template>
  <div class="pagebox">
    <div class="pagebox-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" width="100%" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title" style="width: 500px">
          <el-input v-model.trim="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <el-input v-model.trim="ruleForm.desc" style="width: 500px" type="textarea"> </el-input>
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model.trim="ruleForm.url" style="width: 500px" type="textarea"> </el-input>
        </el-form-item>

        <el-form-item label="导航" prop="tag">
          <el-select style="width: 400px" v-model="ruleForm.navId" value-key="id" placeholder="请选择">
            <el-option v-for="item in navList" :key="item.name" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面" prop="icon">
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
          <img width="100%" :src="ruleForm.icon" alt="" style="display: none" />
          <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
            <img width="100%" :src="ruleForm.icon" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即保存 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavItemUpdate',
  computed: {
    ...mapGetters({
      tabs: 'login/tabs'
    })
  },
  data() {
    return {
      navList: [],
      dialogVisible: false,
      uploadUrl: `${process.env.VUE_APP_BASE_API}/api/upload`,
      fileList: [],
      ruleForm: {
        title: '',
        desc: '',
        icon: '',
        navId: '',
        url: ''
      },
      bucket: 'navitem',
      tagSelect: [],
      rules: {
        title: [{ required: true, message: '请输入链接标题', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入链接简介', trigger: 'blur' }],
        url: [{ required: true, message: '请输入链接地址', trigger: 'blur' }]
      }
    }
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.ruleForm.icon = ''
    },
    successPic(file) {
      this.ruleForm.icon = file.data.url
    },
    handlePictureCardPreview(file) {
      this.ruleForm.icon = file.url
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
      let pramas = {
        ...this.ruleForm
      }
      await this.$api.navitem.updateNavitem(this.ruleForm.id, pramas)
      this.$message.success('更新成功')
      this.$router.push('/navitem')
    },
    async getNav() {
      const res = await this.$api.nav.getNavList()
      this.navList = res
    },
    async getDetail() {
      const res = await this.$api.navitem.getNavitemDeatil(this.$route.params.id)
      this.fileList = [{ url: res.icon }]
      this.ruleForm = res
      this.getNav()
    }
  },
  mounted() {
    this.getDetail()
  }
}
</script>
