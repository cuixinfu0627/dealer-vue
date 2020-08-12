<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-select v-model="dataForm.status" filterable placeholder="状态" @change="selectStatus">
        <el-option
          v-for="item in options"
          :key="item.status"
          :label="item.label"
          :value="item.status">
        </el-option>
      </el-select>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('wka:order:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="订单id">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        header-align="center"
        align="center"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="payment"
        header-align="center"
        align="center"
        label="实付金额">
      </el-table-column>
      <el-table-column label="支付类型">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.paymentType===1">在线支付</el-tag>
          <el-tag type="warning" v-else-if="scope.row.paymentType===2">货到付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="" v-if="scope.row.status===1">未付款</el-tag>
          <el-tag type="success" v-else-if="scope.row.status===2">已付款</el-tag>
          <el-tag type="info" v-else-if="scope.row.status===3">未发货</el-tag>
          <el-tag type="danger" v-else-if="scope.row.status===4">已发货</el-tag>
          <el-tag type="warning" v-else-if="scope.row.status===5">交易成功</el-tag>
          <el-tag type="info" v-else-if="scope.row.status===6">交易完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="endTime"
        header-align="center"
        align="center"
        label="完成时间">
      </el-table-column>
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="用户">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="buyerMessage"
        header-align="center"
        align="center"
        label="买家留言">
      </el-table-column>
      <el-table-column
        prop="buyerNick"
        header-align="center"
        align="center"
        label="买家昵称">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.orderId)">明细</el-button>
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.orderId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.orderId)">删除</el-button>
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
  import AddOrUpdate from './order-add-or-update'
  export default {
    data () {
      return {
        options: [{
          status: '',
          label: '全部状态'
        }, {
          status: '1',
          label: '未付款'
        },{
          status: '2',
          label: '已付款'
        }, {
          status: '3',
          label: '未发货'
        }, {
          status: '4',
          label: '已发货'
        },{
          status: '5',
          label: '交易成功'
        }, {
          status: '6',
          label: '交易关闭'
        }],
        dataForm: {
          status,
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
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
        this.dataForm.status = value
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/wka/order/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'status': this.dataForm.status,
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
          return item.orderId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/wka/order/delete'),
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
