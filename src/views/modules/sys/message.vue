<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-select v-model="dataForm.status" filterable placeholder="请选择消息分类" @change="selectStatus">
        <el-option
          v-for="item in options"
          :key="item.status"
          :label="item.label"
          :value="item.status">
        </el-option>
      </el-select>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="消息标题" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('sys:message:save')" type="primary" @click="sendMessage()">发送公告</el-button>
        <!-- <el-button v-if="isAuth('sys:message:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <!--      <el-table-column
              type="selection"
              header-align="center"
              align="center"
              width="50">
            </el-table-column>-->
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="fromNickName"
        header-align="center"
        align="center"
        label="发送人">
        <template slot-scope="scope">
          <span class="col-cont" v-html="formatterNickname(scope.row.fromNickName)"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="消息类型">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.type===1">系统通知</el-tag>
          <el-tag type="warning" v-else-if="scope.row.type===2">系统公告</el-tag>
          <el-tag type="warning" v-else-if="scope.row.type===3">服务提醒</el-tag>
          <el-tag type="warning" v-else-if="scope.row.type===4">交易提醒</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="groupType"
        header-align="center"
        align="center"
        label="接收用户">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.groupType===1">后台用户</el-tag>
          <el-tag type="warning" v-else-if="scope.row.groupType===2">小程序用户</el-tag>
          <el-tag type="danger" v-else-if="scope.row.groupType===3">所有人</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="sellPoint"
        header-align="center"
        align="center"
        label="内容">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="300"
            trigger="hover"
            :disabled="scope.row.content.length <= 15">
            <div>{{ scope.row.content }}</div>
            <span slot="reference" v-if="scope.row.content.length <= 15">{{scope.row.content}}</span>
            <span slot="reference" v-if="scope.row.content.length > 15">{{scope.row.content.substr(0, 15) + "..."}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
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
  import AddOrUpdate from './message-add-or-update'

  export default {
    data() {
      return {
        options: [{
          status: '',
          label: '全部类型'
        }, {
          status: '1',
          label: '系统通知'
        }, {
          status: '2',
          label: '系统公告'
        }, {
          status: '3',
          label: '服务提醒'
        }, {
          status: '4',
          label: '交易提醒'
        }],
        dataForm: {
          key: '',
          type: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        sendMessageVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated() {
      this.getDataList()
    },
    methods: {
      selectStatus(value) {
        this.dataForm.type = value
        this.getDataList()
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/message/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key,
            'type': this.dataForm.type
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
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      formatterNickname(val) {
        if (val == null || val === '') {
          return '-系统-'
        }
        return val
      },
      // 新增 / 修改
      sendMessage(id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
        })
      },
      // 删除
      deleteHandle(id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/message/delete'),
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
