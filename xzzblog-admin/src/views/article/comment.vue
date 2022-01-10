<template>
  <div class="pagebox">
    <div class="pagebox-search">
      <el-form :inline="true" size="mini">
        <el-form-item label="关键词">
          <el-input
            placeholder="请输入内容关键词"
            clearable
            v-model="searchData.keyword"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select placeholder="请选择" v-model="searchData.status" style="width: 100px" clearable>
            <el-option label="全部" :value="''"></el-option>
            <el-option label="通过" :value="1"></el-option>
            <el-option label="拒绝" :value="2"></el-option>
            <el-option label="待审核" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch">搜索 </el-button>
        </el-form-item>
        <el-form-item style="float: right; margin-right: 0">
          <el-button type="primary" @click="openAddUpdate({})"> 新建 </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="pagebox-content" ref="opspagebox">
      <el-table :data="tableData" v-loading="!ableToLoad" border size="mini" stripe>
        <el-table-column type="index" :index="indexMethod" width="60" show-overflow-tooltip fixed></el-table-column>
        <el-table-column prop="username" label="昵称" show-overflow-tooltip> </el-table-column>
        <el-table-column label="头像" show-overflow-tooltip>
          <template slot-scope="scope">
            <img :src="scope.row.avatar" height="30" />
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :style="`color: ${scope.row.status == 2 ? 'red' : ''}`"> {{ filterSatatus(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click.native.prevent="del(scope.row)" type="danger" size="mini">删除</el-button>
            <el-button @click.native.prevent="openAddUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button
              v-if="scope.row.status == 3 || scope.row.status == 2"
              @click.native.prevent="isDel(1, scope.row)"
              type="success"
              size="mini"
              >通过</el-button
            >
            <el-button
              v-if="scope.row.status == 3"
              @click.native.prevent="isDel(2, scope.row)"
              type="danger"
              size="mini"
              >拒绝</el-button
            >

            <el-button
              @click.native.prevent="callbackinfo(scope.row)"
              v-if="scope.row.status != 3 && scope.row.pid == 0"
              type="info"
              size="mini"
              >回复
            </el-button>
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

    <add-update
      @close="close"
      :showAddUpdate.sync="showAddUpdate"
      v-if="showAddUpdate"
      :selectData.sync="selectData"
    ></add-update>
  </div>
</template>

<script>
import addUpdate from '@/components/ArticleCommentCom/addUpdate'
import Utils from '@/settings.js'

export default {
  name: 'comment',
  components: {
    addUpdate
  },
  data() {
    return {
      pageheight: null,
      tableData: [],
      ableToLoad: true,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,

      searchData: {
        keyword: '',
        status: '' // 1 通过 2 拒绝  3 待审核  '' 全部
      },
      selectData: {},

      showAddUpdate: false
    }
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

    callbackinfo(row) {
      this.$prompt('请输入回复内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (!value) {
          this.$message({
            type: 'error',
            message: '填写内容'
          })
        }
        this.callbackinfoFetch({ ...row, value })
      })
    },

    async callbackinfoFetch(data) {
      const { value } = data
      let params = {
        username: Utils.boss,
        avatar: Utils.avatar,
        email: Utils.email,
        status: 1,
        content: value,
        pid: data.id,
        aid: this.$route.params.id
      }
      await this.$api.articleComment.createArticleComment(params)
      this.$message({
        type: 'success',
        message: '回复成功'
      })
      this.close(true)
    },

    // 1 通过 2 拒绝  3 待审核  '' 全部
    filterSatatus(type) {
      if (type == 1) {
        return '通过'
      } else if (type == 2) {
        return '拒绝'
      } else if (type == 3) {
        return '待审核'
      } else {
        return '未知'
      }
    },

    close(val) {
      if (val) {
        this.getList()
      }
      this.selectData = {}
      this.showAddUpdate = false
    },

    openAddUpdate(row) {
      this.selectData = row || {}
      this.showAddUpdate = true
    },

    async isDel(status, item) {
      await this.$api.articleComment.hiddenArticleComment(item.id, { status })
      this.$message({
        type: 'success',
        message: `${!status ? '拒绝' : '通过'}成功!`
      })
      this.getList()
    },

    async getList() {
      if (!this.ableToLoad) return
      this.ableToLoad = false
      let params = {
        ...this.searchData,
        aid: this.$route.params.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        author: 'admin'
      }
      let res = await this.$api.articleComment.getArticleCommentList(params)
      this.tableData = res.data
      this.totalCount = res.totalCount
      this.ableToLoad = true
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
      await this.$api.articleComment.deleteArticleComment(item.id)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      this.getList()
    }
  },
  created() {
    this.getList()
  }
}
</script>
