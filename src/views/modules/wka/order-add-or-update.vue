<template>
  <el-dialog :append-to-body="true"
    :title="!dataForm.id ? '订单详情' : '订单详情'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-card shadow="never" class="margin-top-10">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单号：">
              <el-tag effect="dark"> {{ dataForm.orderNum }}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实付金额：">
              <el-tag effect="dark"> {{ regFenToYuan(dataForm.payment) }} 元</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户：">
              <el-tag effect="dark"> {{ dataForm.username }}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户标签：">
              <el-tag effect="dark"> {{ dataForm.userTag }}</el-tag>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left" class="divider-show"></el-divider>
        <el-row>
          <el-col :span="6">
            <el-form-item label="买家昵称：">
              <el-tag effect="dark"> {{ dataForm.buyerNick }}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话：">
              <el-tag effect="dark"> {{ dataForm.mobile }}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配送地址：">
              <el-tag effect="dark"> {{ dataForm.shippingAddress }}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="买家留言：">
              <el-tag effect="dark"> {{ dataForm.buyerMessage }}</el-tag>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left" class="divider-show"></el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建时间：">
              <el-tag effect="dark"> {{ dataForm.createTime }}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单状态：">
              <el-tag type="" v-if="dataForm.status===1">待确认</el-tag>
              <el-tag type="success" v-else-if="dataForm.status===2">已确认</el-tag>
              <el-tag type="danger" v-else-if="dataForm.status===3">已取消</el-tag>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <el-table v-loading="tableLoading" border :data="orderItemList" height="calc(50vh - 100px)"
                  :row-class-name="tableRowClassName">
          <el-table-column
            :index="indexMethod"
            prop="Serial_number"
            sortable type="index"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="picPath"
            header-align="center"
            align="center"
            label="商品图片">
            <template slot-scope="scope">
              <div class="col-sm-3">
                <el-image style="width: 100px; height: 50px" :src="scope.row.picPath" fit="contain"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            header-align="center"
            align="center"
            label="名称">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="100"
                trigger="hover"
                :disabled="scope.row.title.length <= 10">
                <div>{{ scope.row.title }}</div>
                <span slot="reference" v-if="scope.row.title.length <= 10">{{scope.row.title}}</span>
                <span slot="reference"
                      v-if="scope.row.title.length > 10">{{scope.row.title.substr(0, 10) + "..."}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="num"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="price"
            :formatter="handlderPrice"
            label="商品价格">
          </el-table-column>
          <el-table-column
            :formatter="handlderTotalFee"
            prop="totalFee"
            label="商品总金额">
          </el-table-column>
          <el-table-column align="center" label="状态" width="100px">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status===1">正常</el-tag>
              <el-tag type="danger" v-else-if="scope.row.status===2">已取消</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="cancelOrderItemHandle(scope.row.id)">取消</el-button>
              <el-button type="text" size="small" @click="updateOrderItemHandle(scope.row.id)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-form>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate"
                   @refreshDataList="addOrUpdateReturnHandle"></add-or-update>
  </el-dialog>
</template>

<script>
  import AddOrUpdate from "./order-item-add-or-update";

  export default {
    data() {
      return {
        visible: false,
        dataForm: {
          orderId: 0,
          orderNum: '',
          payment: '',
          paymentType: '',
          postFee: '',
          status: '',
          createTime: '',
          updateTime: '',
          paymentTime: '',
          consignTime: '',
          endTime: '',
          closeTime: '',
          userId: '',
          username: '',
          mobile: '',
          shippingAddress: '',
          userTag: '',
          buyerMessage: '',
          buyerNick: '',
          buyerRate: ''
        },
        dataRule: {},
        orderItemList: [],
        tableLoading: true,
        addOrUpdateVisible: false,
      }
    },
    components: {
      AddOrUpdate
    },
    methods: {
      init(id) {
        this.dataForm.orderId = id || 0
        this.visible = true
        this.$nextTick(() => {
          if (this.dataForm.orderId) {
            this.$http({
              url: this.$http.adornUrl(`/wka/order/info/${this.dataForm.orderId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderNum = data.wkaOrder.orderNum
                this.dataForm.payment = data.wkaOrder.payment
                this.dataForm.paymentType = data.wkaOrder.paymentType
                this.dataForm.postFee = data.wkaOrder.postFee
                this.dataForm.status = data.wkaOrder.status
                this.dataForm.createTime = data.wkaOrder.createTime
                this.dataForm.updateTime = data.wkaOrder.updateTime
                this.dataForm.paymentTime = data.wkaOrder.paymentTime
                this.dataForm.consignTime = data.wkaOrder.consignTime
                this.dataForm.endTime = data.wkaOrder.endTime
                this.dataForm.closeTime = data.wkaOrder.closeTime
                this.dataForm.shippingAddress = data.wkaOrder.shippingAddress
                this.dataForm.userId = data.wkaOrder.userId
                this.dataForm.username = data.wkaOrder.username
                this.dataForm.mobile = data.wkaOrder.mobile
                this.dataForm.userTag = data.wkaOrder.userTag
                this.dataForm.buyerMessage = data.wkaOrder.buyerMessage
                this.dataForm.buyerNick = data.wkaOrder.buyerNick
                this.dataForm.buyerRate = data.wkaOrder.buyerRate
                this.orderItemList = data.wkaOrder.orderItemList
                this.tableLoading = false
              }
            })
          }
        })
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
      // 修改订单状态
      cancelOrderItemHandle(id) {
        this.$confirm(`您确定要对该订单中的商品进行取消操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/wka/order/cancel'),
            method: 'post',
            data: this.$http.adornData({
              'id': id
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // 表单提交
      dataFormSubmit() {
        onClose: () => {
          this.visible = false
          this.$emit('refreshDataList')
        }
      },
      updateOrderItemHandle(id) {
        // 修改商品订单
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 修改
      addOrUpdateReturnHandle() {
        this.addOrUpdateVisible = false
        this.$nextTick(() => {
          this.init(this.dataForm.orderId)
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
    }
  }
</script>
