<template>
  <div class="pagebox">
    <div class="pagebox-search">
      <el-form :inline="true" size="mini">
        <el-form-item label="标题">
          <el-input placeholder="" clearable v-model.trim="searchData.keyword" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch">搜索 </el-button>
        </el-form-item>
        <el-form-item style="float: right; margin-right: 0">
          <el-button type="primary" @click="openAdd"> 新建 </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="pagebox-content">
      <el-table :data="tableData" border size="mini" v-loading="!ableToLoad" stripe>
        <el-table-column type="index" width="60" fixed></el-table-column>
        <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="desc" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="图标" show-overflow-tooltip>
          <template slot-scope="scope">
            <img :src="scope.row.icon" height="30" />
          </template>
        </el-table-column>
        <el-table-column label="分类" width="100">
          <template slot-scope="scope">
            {{ scope.row.nav.name }}
          </template>
        </el-table-column>
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
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click.native.prevent="openUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click.native.prevent="del(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格分页 -->
    <div class="pagebox-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navitem',
  data() {
    return {
      activeRouteName: '',
      tableData: [],
      ableToLoad: true,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      searchData: {
        keyword: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSearch() {
      this.pageIndex = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    },
    indexMethod(index) {
      return index + this.pageSize * (this.pageIndex - 1) + 1
    },

    openAdd() {
      this.$router.push('/navitem/add')
    },

    openUpdate(row) {
      this.$router.push(`/navitem/update/${row.id}`)
    },

    async delHandler(item) {
      await this.$api.navitem.deleteNavitem(item.id)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.getList()
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

    async getList() {
      if (!this.ableToLoad) return
      this.ableToLoad = false
      let params = {
        ...this.searchData,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      const res = await this.$api.navitem.getNavitemList(params)
      console.log(res)
      this.tableData = res.data
      this.totalCount = res.totalCount
      this.ableToLoad = true
    }
  }
}
</script>
