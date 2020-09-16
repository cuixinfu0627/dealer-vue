<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-select v-model="dataForm.reviewStatus" filterable placeholder="审核状态" @change="selectStatus">
        <el-option
          v-for="item in options"
          :key="item.reviewStatus"
          :label="item.label"
          :value="item.reviewStatus">
        </el-option>
      </el-select>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="商户昵称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="avatar"
        header-align="center"
        align="center"
        label="头像">
        <template slot-scope="scope">
          <div class="col-sm-3">
            <el-image style="width: 100px; height: 50px" :src="scope.row.avatar" fit="contain"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="nickname"
        header-align="center"
        align="center"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="tag"
        header-align="center"
        align="center"
        label="用户标签">
        <template slot-scope="scope">
          <el-tag :key="scope.row.tag" type="success">{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="注册时间"
        width="160">
      </el-table-column>
      <!--<el-table-column label="审核状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.reviewStatus===1">审核通过</el-tag>
          <el-tag type="warning" v-else-if="scope.row.reviewStatus===2">审核不通过</el-tag>
          <el-tag type="danger" v-else-if="scope.row.reviewStatus===3">待审核</el-tag>
        </template>
      </el-table-column>-->
      <el-table-column
        prop="reviewName"
        header-align="center"
        align="center"
        label="审核人姓名">
      </el-table-column>
      <el-table-column
        prop="reviewContent"
        header-align="center"
        align="center"
        label="审核内容">
      </el-table-column>
      <el-table-column
        prop="reviewTime"
        header-align="center"
        align="center"
        label="审核时间"
        width="160">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './user-add-or-update'
  export default {
    data () {
      return {
        options: [{
          reviewStatus: '',
          label: '全部状态'
        }, {
          reviewStatus: '1',
          label: '审核通过'
        },{
          reviewStatus: '3',
          label: '待审核'
        }, {
          reviewStatus: '2',
          label: '审核不通过'
        }],
        dataForm: {
          reviewStatus: '',
          key: '',
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ]
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      selectStatus(value){
        this.dataForm.reviewStatus = value
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/wka/user/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'reviewStatus': this.dataForm.reviewStatus,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对已选[id=${ids.join(',')}]的用户进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/wka/user/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
