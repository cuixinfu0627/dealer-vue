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
      <el-date-picker size="medium" v-model="dateValue" type="daterange" class="margin-right-20" unlink-panels
                      range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                      :picker-options="pickerOptions" @change="chooseTimeRange" format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="请输入订单号或用户标签" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <!--    <el-button v-if="isAuth('wka:order:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
      <el-form-item>
        <el-button type="success" round @click="exportExcel()">导出Excel</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <!--      <el-table-column-->
      <!--        type="selection"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        width="50">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="orderNum"
        header-align="center"
        align="center"
        width="180px"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="payment"
        header-align="center"
        align="center"
        :formatter="handlderPrice"
        label="实付金额">
      </el-table-column>
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="用户">
      </el-table-column>
      <el-table-column
        prop="buyerNick"
        header-align="center"
        align="center"
        label="买家昵称">
      </el-table-column>
      <el-table-column
        prop="userTag"
        header-align="center"
        align="center"
        label="用户标签">
        <template slot-scope="scope">
          <el-tag :key="scope.row.tag" type="success">{{scope.row.userTag}}</el-tag>
        </template>
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
        prop="buyerMessage"
        header-align="center"
        align="center"
        label="买家留言">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="160px"
        label="创建时间">
      </el-table-column>
      <el-table-column align="center" label="状态" width="100px">
        <template slot-scope="scope">
          <el-tag type="" v-if="scope.row.status===1">待确认</el-tag>
          <el-tag type="success" v-else-if="scope.row.status===2">已确认</el-tag>
          <el-tag type="danger" v-else-if="scope.row.status===3">已取消</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        width="160px"
        label="修改时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">明细</el-button>
          <template v-if="scope.row.status==1">
            <el-button type="text" small @click="updateOrderHandle(scope.row.id,2)">确定</el-button>
            <el-button type="text" small @click="updateOrderHandle(scope.row.id,3)">取消</el-button>
          </template>
          <template v-if="scope.row.status==2">
            <el-button type="text" plain @click="updateOrderHandle(scope.row.id,3)">取消</el-button>
          </template>
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
    data() {
      return {
        options: [{
          status: '',
          label: '全部状态'
        }, {
          status: '1',
          label: '待确认'
        }, {
          status: '2',
          label: '已确认'
        }, {
          status: '3',
          label: '已取消'
        }],
        dateValue: '',
        pickerOptions: {
          shortcuts: [{
            text: '今日',
            onClick(picker) {
              const end = new Date()
              const begin = new Date()
              picker.$emit('pick', [begin, end])
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const begin = new Date()
              begin.setTime(begin.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [begin, end])
            }
          },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const begin = new Date()
                begin.setTime(begin.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [begin, end])
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const begin = new Date()
                begin.setTime(begin.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [begin, end])
              }
            }
          ]
        },
        dataForm: {
          status,
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
    activated() {
      this.getDataList()
    },
    methods: {
      selectStatus(value) {
        this.dataForm.status = value
        this.getDataList()
      },
      handlderPrice(row, column) {
        var value = this.regFenToYuan(row.payment);
        return value + " 元"
      },
      chooseTimeRange(t) {
        if (t === null || t === '') {
          this.dataForm.starTime = ''
          this.dataForm.endTime = ''
          return
        }
        this.dateValue = t
        var starTime = this.dateValue[0]
        var endTime = this.dateValue[1]
        if (starTime === endTime) {
          this.dataForm.endTime = endTime + ' 23:59:00'
        } else {
          this.dataForm.endTime = endTime + ' 00:00:00'
        }
        this.dataForm.starTime = starTime + ' 00:00:00'
        this.getDataList()
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/wka/order/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'status': this.dataForm.status,
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
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 修改订单状态
      updateOrderHandle(id, status) {
        this.$confirm(`您确定要对该订单进行[${status == 2 ? '确定' : '取消'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/wka/order/updateOrderStatus'),
            method: 'post',
            data: this.$http.adornData({
              'id': id,
              'status': status
            })
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
      // 导出Excel表格
      exportExcel() {
        // var exportXlsUrl = this.$http.adornUrl('/wka/order/exportExcel') +
        //   '?fileName=设备列表' +
        //   '&status=' + this.dataForm.status +
        //   '&key=' + this.dataForm.key +
        //   '&starTime=' + this.dataForm.starTime +
        //   '&endTime=' + this.dataForm.endTime
        // '&page=1&limit=10000'
        // top.location.href = exportXlsUrl

        this.$http({
          url: this.$http.adornUrl('/wka/order/exportExcel'),
          method: 'post',
          params: this.$http.adornParams({
            'fileName': '订单列表',
            'page': 1,
            'limit': 10000,
            'status': this.dataForm.status,
            'key': this.dataForm.key,
            'starTime': this.dataForm.starTime,
            'endTime': this.dataForm.endTime
          }),
          responseType: 'blob'
        }).then(({res}) => {
          console.log(res)
          const link = document.createElement('a')
          let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob);
          let num = ''
          for (let i = 0; i < 10; i++) {
            num += Math.ceil(Math.random() * 10)
          }
          link.setAttribute('download', 'fileName' + num + '.xlsx')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }).catch(error => {
          this.$Notice.error({
            title: '错误',
            desc: '网络连接错误'
          })
          console.log(error)
        })
      },
      regFenToYuan(fen) {
        var num = fen;
        num = fen * 0.01;
        num += '';
        var reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
        num = num.replace(reg, '$1');
        num = this.toDecimal2(num)
        return num
      },
      toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      },
      // 删除
      deleteHandle(id) {
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
