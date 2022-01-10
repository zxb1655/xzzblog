<template>
  <div class="pagebox">
    <div class="pagebox-search">
      <el-form :inline="true" class="fr" size="mini">
        <el-form-item>
          <el-button type="primary" @click="add">新建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="pagebox-content">
      <el-table border :data="tableData" size="mini" v-loading="!ableToLoad" stripe>
        <el-table-column type="index" width="60" fixed></el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip> </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.createdAt }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            {{ scope.row.updatedAt }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="update(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click.native.prevent="del(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <add-update :showAddUpdate.sync="showAddUpdate" :selectData.sync="selectData" v-if="showAddUpdate" @close="close">
    </add-update>
  </div>
</template>

<script>
import addUpdate from '@/components/categoryCom/addUpdate'

export default {
  name: 'Category',
  data() {
    return {
      pageheight: null,
      tableData: [],
      ableToLoad: true,
      showAddUpdate: false,
      selectData: {}
    }
  },
  components: {
    'add-update': addUpdate
  },
  methods: {
    close(val) {
      if (val) {
        this.getList()
      }
      this.selectData = {}
      this.showAddUpdate = false
    },
    add() {
      this.showAddUpdate = true
    },
    update(row) {
      this.showAddUpdate = true
      this.selectData = row
    },
    del(item) {
      this.$confirm('确定删除吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delHandler(item)
        })
        .catch(() => {})
    },
    async delHandler(item) {
      this.$api.category.deleteCategory(item.id)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      this.getList()
    },
    async getList() {
      if (!this.ableToLoad) return
      this.ableToLoad = false
      const res = await this.$api.category.getCategoryList({
        author: 'admin'
      })
      this.ableToLoad = true
      this.tableData = res
    }
  },
  created() {
    this.getList()
  },
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
