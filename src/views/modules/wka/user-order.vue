<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-date-picker size="medium" v-model="dateValue" type="daterange" class="margin-right-20" unlink-panels
                      range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                      :picker-options="pickerOptions" @change="chooseTimeRange" format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd" disabled>
      </el-date-picker>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="用户标签搜索" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('wka:user-order:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-form-item>
          <el-button v-if="isAuth('wka:user-order:update')" type="success" round @click="batchExportExcel()"
                     :disabled="dataListSelections.length <= 0">批量导出Excel
          </el-button>
        </el-form-item>
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
        prop="orderNum"
        header-align="center"
        align="center"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="用户">
      </el-table-column>
      <el-table-column
        prop="userTag"
        header-align="center"
        align="center"
        label="标签">
      </el-table-column>
      <el-table-column
        prop="buyerNick"
        header-align="center"
        align="center"
        label="收货人">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="shippingAddress"
        header-align="center"
        align="center"
        label="配送地址">
      </el-table-column>
      <el-table-column
        prop="payment"
        header-align="center"
        align="center"
        :formatter="handlderPrice"
        label="实付金额">
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
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">详情</el-button>
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
  import AddOrUpdate from './user-order-add-or-update'

  export default {
    data () {
      return {
        dateValue: [],
        pickerOptions: {
          shortcuts: [{
            text: '今日',
            onClick (picker) {
              const end = new Date()
              const begin = new Date()
              picker.$emit('pick', [begin, end])
            }
          }, {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const begin = new Date()
              begin.setTime(begin.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [begin, end])
            }
          },
            {
              text: '最近一个月',
              onClick (picker) {
                const end = new Date()
                const begin = new Date()
                begin.setTime(begin.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [begin, end])
              }
            },
            {
              text: '最近三个月',
              onClick (picker) {
                const end = new Date()
                const begin = new Date()
                begin.setTime(begin.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [begin, end])
              }
            }
          ]
        },
        dataForm: {
          key: '',
          starTime: '',
          endTime: ''
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
      //this.getDataList()
      //this.initDateTime()
    },
    mounted() {
      this.initDateTime()
    },
    methods: {
      chooseTimeRange (t) {
        if (t === null || t === '') {
          this.dataForm.starTime = ''
          this.dataForm.endTime = ''
          return
        }
        this.dateValue = t
        var starTime = this.dateValue[0]
        var endTime = this.dateValue[1]
        this.dataForm.starTime = starTime + ' 00:00:00'
        this.dataForm.endTime = endTime + ' 23:59:00'
        this.getDataList()
      },
      initDateTime () {
        //昨天的时间
        var dateTime = new Date()
        dateTime = dateTime.setDate(dateTime.getDate() - 1)
        dateTime = new Date(dateTime)
        var cuurentDate = this.formatDate(dateTime)
        this.dataForm.starTime = cuurentDate + ' 00:00:00'
        this.dataForm.endTime = cuurentDate + ' 23:59:00'
        this.dateValue.push(this.dataForm.starTime)
        this.dateValue.push(this.dataForm.endTime)
        this.getDataList()
      },
      formatDate (date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/wka/user-order/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key,
            'starTime': this.dataForm.starTime,
            'endTime': this.dataForm.endTime
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
      addOrUpdateHandle (userOrder) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(userOrder)
        })
      },
      // 批量导出Excel表格
      batchExportExcel () {
        if (this.dataListSelections.length == 0) {
          this.$message({
            message: '请选择要批量导出标签记录',
            type: 'error',
            duration: 1000,
          })
          return
        }
        var ids = this.dataListSelections.map(item => {
          return item.id
        })
        var exportXlsUrl = this.$http.adornUrl('/wka/export-order/batchExportExcel') +
          '?fileName=配送订单' +
          '&orderIds=' + ids
        top.location.href = exportXlsUrl
      },

      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/wka/user-order/delete'),
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
      },
      handlderPrice (row, column) {
        var value = this.regFenToYuan(row.payment)
        return value + ' 元'
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
