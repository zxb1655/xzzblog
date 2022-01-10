<template>
  <el-dialog
    :title="selectData.id ? '编辑分类' : '新增分类'"
    :visible.sync="status"
    :modal-append-to-body="false"
    width="700px"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 300px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" width="400px" auto-complete="off"> </el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createdAt" v-if="selectData.id">
        <div>{{ ruleForm.createdAt }}</div>
      </el-form-item>
      <el-form-item label="更新时间" prop="updatedAt" v-if="selectData.id">
        <div>{{ ruleForm.updatedAt }}</div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close(false)">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'aa',
  props: {
    showAddUpdate: Boolean,
    selectData: Object
  },
  data() {
    return {
      status: this.showAddUpdate,
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      ruleForm: {
        name: ''
      }
    }
  },
  created() {
    this.ruleForm = this.selectData
  },
  methods: {
    close(val = false) {
      this.$emit('close', val)
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
    submit() {
      if (this.ruleForm.id) {
        this.update()
      } else {
        this.add()
      }
    },
    async add() {
      let params = {
        ...this.ruleForm
      }
      await this.$api.category.createCategory(params)
      this.$message.success('创建成功')
      this.close(true)
    },
    async update() {
      let params = {
        ...this.ruleForm
      }
      await this.$api.category.updateCategory(this.ruleForm.id, params)
      this.$message.success('更新成功')
      this.close(true)
    }
  }
}
</script>

<style></style>
