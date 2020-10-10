<template>
  <el-dialog :append-to-body="true"
             title="用户订单详情"
             :close-on-click-modal="false"
             width="70%"
             :visible.sync="visible">
    <el-form :model="userOrderForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称：">
            <el-tag effect="dark"> {{ userOrder.username }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货人：">
            <el-tag effect="dark"> {{ userOrder.buyerNick }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话：">
            <el-tag effect="dark"> {{ userOrder.mobile }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货地址：">
            <el-tag effect="dark"> {{ userOrder.shippingAddress }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合计金额：">
            <el-tag effect="dark"> {{ regFenToYuan(userOrder.payment) }} 元</el-tag>
          </el-form-item>
        </el-col>
       <!-- <el-col :span="8">
          <el-form-item>
            <el-button type="success" round @click="exportExcel()">导出Excel</el-button>
          </el-form-item>
        </el-col>-->
      </el-row>
      <el-card class="box-card">
        <el-table :data="dataList" border v-loading="dataListLoading" height="calc(50vh - 100px)"
                  :row-class-name="tableRowClassName">
          <el-table-column
            prop="nickname"
            header-align="center"
            align="center"
            width="180px"
            label="客户名称">
          </el-table-column>
          <el-table-column
            prop="title"
            header-align="center"
            align="center"
            width="180px"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="picPath"
            header-align="center"
            align="center"
            label="图片">
            <template slot-scope="scope">
              <div class="col-sm-3">
                <el-image style="width: 100px; height: 50px" :src="scope.row.picPath" fit="contain"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="num"
            header-align="center"
            align="center"
            :formatter="handlderNum"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="price"
            header-align="center"
            align="center"
            :formatter="handlderPrice"
            label="商品单价">
          </el-table-column>
          <el-table-column
            prop="totalFee"
            header-align="center"
            align="center"
            :formatter="handlderTotalFee"
            label="商品总价">
          </el-table-column>
          <el-table-column
            prop="createTime"
            header-align="center"
            align="center"
            label="创建日期">
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
      </el-card>
    </el-form>
  </el-dialog>
</template>

<script>

  export default {
    data () {
      return {
        visible: false,
        userOrder: {},
        dataRule: {},
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        tableLoading: true,
        userOrderForm: {},
      }
    },
    methods: {
      init (userOrder) {
        this.userOrder = userOrder
        this.visible = true
        this.$nextTick(() => {
          if (this.userOrder.id) {
            this.dataListLoading = true
            this.$http({
              url: this.$http.adornUrl('/wka/user-order/info'),
              method: 'get',
              params: this.$http.adornParams({
                'page': this.pageIndex,
                'limit': this.pageSize,
                'orderId': this.userOrder.id
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
          }
        })
      },
      // 导出Excel表格
      exportExcel () {
        var exportXlsUrl = this.$http.adornUrl('/wka/user-order/exportExcel') +
          '?fileName=配送订单详情' +
          '&orderId=' + this.userOrder.id +
          '&page=1&limit=10000'
        top.location.href = exportXlsUrl
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
      handlderNum(row, column) {
        var value = row.num +' ('+row.spec +')'
        return value
      },
      handlderPrice (row, column) {
        var value = this.regFenToYuan(row.price)
        return value + ' 元'
      },
      handlderTotalFee (row, column) {
        var value = this.regFenToYuan(row.totalFee)
        return value + ' 元'
      },
      // 列表序号规则逻辑
      indexMethod (index) {
        return index + 1
      },
      tableRowClassName ({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      // 表单提交
      dataFormSubmit () {
        onClose: () => {
          this.visible = false
          this.$emit('refreshDataList')
        }
      },
      regFenToYuan (fen) {
        var num = fen
        num = fen * 0.01
        num += ''
        var reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g
        num = num.replace(reg, '$1')
        num = this.toDecimal2(num)
        return num
      },
      toDecimal2 (x) {
        var f = parseFloat(x)
        if (isNaN(f)) {
          return false
        }
        var f = Math.round(x * 100) / 100
        var s = f.toString()
        var rs = s.indexOf('.')
        if (rs < 0) {
          rs = s.length
          s += '.'
        }
        while (s.length <= rs + 2) {
          s += '0'
        }
        return s
      },
    }
  }
</script>
