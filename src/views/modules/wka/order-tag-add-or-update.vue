<template>
  <el-dialog :append-to-body="true"
             title="标签详情"
             :close-on-click-modal="false"
             width="70%"
             :visible.sync="visible">
    <el-form :model="userTagForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="标签：">
            <el-tag effect="dark"> {{ userTagForm.userTag }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="总金额：">
            <el-tag effect="dark"> {{ regFenToYuan(userTagForm.totalMoney) }} 元</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-card class="box-card">
        <el-table :data="dataList" border v-loading="dataListLoading" height="calc(50vh - 100px)"
                  :row-class-name="tableRowClassName">
          <el-table-column
            prop="userTag"
            header-align="center"
            align="center"
            label="标签">
            <template slot-scope="scope">
              <el-tag :key="scope.row.tag" type="success">{{scope.row.userTag}}</el-tag>
            </template>
          </el-table-column>
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
            prop="createTime"
            header-align="center"
            align="center"
            width="160px"
            label="创建时间">
          </el-table-column>
          <el-table-column align="center" label="状态" width="100px">
            <template slot-scope="scope">
              <el-tag type="" v-if="scope.row.status===1">待确认</el-tag>
              <el-tag type="success" v-else-if="scope.row.status===2">已完成</el-tag>
              <el-tag type="danger" v-else-if="scope.row.status===3">已取消</el-tag>
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
      </el-card>
    </el-form>
  </el-dialog>
</template>

<script>

  export default {
    data() {
      return {
        visible: false,
        userTagForm: {
          order: '',
          userTag: '',
          totalMoney: '',
          status,
          key: '',
          starTime: '',
          endTime: ''
        },
        dataRule: {},
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        tableLoading: true,
      }
    },
    methods: {
      init(userTagObj) {
        this.userTagForm.userTag = userTagObj.userTag
        this.userTagForm.totalMoney = userTagObj.totalMoney
        this.userTagForm.status = userTagObj.status
        this.userTagForm.starTime = userTagObj.starTime
        this.userTagForm.endTime = userTagObj.endTime

        this.visible = true
        this.$nextTick(() => {
          if (this.userTagForm.userTag) {
            this.dataListLoading = true
            this.$http({
              url: this.$http.adornUrl('/wka/order/list'),
              method: 'get',
              params: this.$http.adornParams({
                'page': this.pageIndex,
                'limit': this.pageSize,
                'key': this.userTagForm.userTag,
                'status': this.userTagForm.status,
                'starTime': this.userTagForm.starTime,
                'endTime': this.userTagForm.endTime
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

      handlderPrice(row, column) {
        var value = this.regFenToYuan(row.price);
        return value + " 元"
      },
      handlderTotalFee(row, column) {
        var value = this.regFenToYuan(row.totalFee);
        return value + " 元"
      },
      // 列表序号规则逻辑
      indexMethod(index) {
        return index + 1
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      // 表单提交
      dataFormSubmit() {
        onClose: () => {
          this.visible = false
          this.$emit('refreshDataList')
        }
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
    }
  }
</script>
