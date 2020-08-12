<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="实付金额。精确到2位小数;单位:元。如:200.07，表示:200元7分" prop="payment">
      <el-input v-model="dataForm.payment" placeholder="实付金额。精确到2位小数;单位:元。如:200.07，表示:200元7分"></el-input>
    </el-form-item>
    <el-form-item label="支付类型，1、在线支付，2、货到付款" prop="paymentType">
      <el-input v-model="dataForm.paymentType" placeholder="支付类型，1、在线支付，2、货到付款"></el-input>
    </el-form-item>
    <el-form-item label="邮费。精确到2位小数;单位:元。如:200.07，表示:200元7分" prop="postFee">
      <el-input v-model="dataForm.postFee" placeholder="邮费。精确到2位小数;单位:元。如:200.07，表示:200元7分"></el-input>
    </el-form-item>
    <el-form-item label="状态：1、未付款，2、已付款，3、未发货，4、已发货，5、交易成功，6、交易关闭" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态：1、未付款，2、已付款，3、未发货，4、已发货，5、交易成功，6、交易关闭"></el-input>
    </el-form-item>
    <el-form-item label="订单创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="订单创建时间"></el-input>
    </el-form-item>
    <el-form-item label="订单更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="订单更新时间"></el-input>
    </el-form-item>
    <el-form-item label="付款时间" prop="paymentTime">
      <el-input v-model="dataForm.paymentTime" placeholder="付款时间"></el-input>
    </el-form-item>
    <el-form-item label="发货时间" prop="consignTime">
      <el-input v-model="dataForm.consignTime" placeholder="发货时间"></el-input>
    </el-form-item>
    <el-form-item label="交易完成时间" prop="endTime">
      <el-input v-model="dataForm.endTime" placeholder="交易完成时间"></el-input>
    </el-form-item>
    <el-form-item label="交易关闭时间" prop="closeTime">
      <el-input v-model="dataForm.closeTime" placeholder="交易关闭时间"></el-input>
    </el-form-item>
    <el-form-item label="物流名称" prop="shippingName">
      <el-input v-model="dataForm.shippingName" placeholder="物流名称"></el-input>
    </el-form-item>
    <el-form-item label="物流单号" prop="shippingCode">
      <el-input v-model="dataForm.shippingCode" placeholder="物流单号"></el-input>
    </el-form-item>
    <el-form-item label="用户id" prop="dealerId">
      <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
    </el-form-item>
    <el-form-item label="买家留言" prop="buyerMessage">
      <el-input v-model="dataForm.buyerMessage" placeholder="买家留言"></el-input>
    </el-form-item>
    <el-form-item label="买家昵称" prop="buyerNick">
      <el-input v-model="dataForm.buyerNick" placeholder="买家昵称"></el-input>
    </el-form-item>
    <el-form-item label="买家是否已经评价" prop="buyerRate">
      <el-input v-model="dataForm.buyerRate" placeholder="买家是否已经评价"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          orderId: 0,
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
          shippingName: '',
          shippingCode: '',
          userId: '',
          buyerMessage: '',
          buyerNick: '',
          buyerRate: ''
        },
        dataRule: {
          payment: [
            { required: true, message: '实付金额。精确到2位小数;单位:元。如:200.07，表示:200元7分不能为空', trigger: 'blur' }
          ],
          paymentType: [
            { required: true, message: '支付类型，1、在线支付，2、货到付款不能为空', trigger: 'blur' }
          ],
          postFee: [
            { required: true, message: '邮费。精确到2位小数;单位:元。如:200.07，表示:200元7分不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态：1、未付款，2、已付款，3、未发货，4、已发货，5、交易成功，6、交易关闭不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '订单创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '订单更新时间不能为空', trigger: 'blur' }
          ],
          paymentTime: [
            { required: true, message: '付款时间不能为空', trigger: 'blur' }
          ],
          consignTime: [
            { required: true, message: '发货时间不能为空', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '交易完成时间不能为空', trigger: 'blur' }
          ],
          closeTime: [
            { required: true, message: '交易关闭时间不能为空', trigger: 'blur' }
          ],
          shippingName: [
            { required: true, message: '物流名称不能为空', trigger: 'blur' }
          ],
          shippingCode: [
            { required: true, message: '物流单号不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          buyerMessage: [
            { required: true, message: '买家留言不能为空', trigger: 'blur' }
          ],
          buyerNick: [
            { required: true, message: '买家昵称不能为空', trigger: 'blur' }
          ],
          buyerRate: [
            { required: true, message: '买家是否已经评价不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.orderId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.orderId) {
            this.$http({
              url: this.$http.adornUrl(`/wka/order/info/${this.dataForm.orderId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
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
                this.dataForm.shippingName = data.wkaOrder.shippingName
                this.dataForm.shippingCode = data.wkaOrder.shippingCode
                this.dataForm.userId = data.wkaOrder.userId
                this.dataForm.buyerMessage = data.wkaOrder.buyerMessage
                this.dataForm.buyerNick = data.wkaOrder.buyerNick
                this.dataForm.buyerRate = data.wkaOrder.buyerRate
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/wka/order/${!this.dataForm.orderId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'orderId': this.dataForm.orderId || undefined,
                'payment': this.dataForm.payment,
                'paymentType': this.dataForm.paymentType,
                'postFee': this.dataForm.postFee,
                'status': this.dataForm.status,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
                'paymentTime': this.dataForm.paymentTime,
                'consignTime': this.dataForm.consignTime,
                'endTime': this.dataForm.endTime,
                'closeTime': this.dataForm.closeTime,
                'shippingName': this.dataForm.shippingName,
                'shippingCode': this.dataForm.shippingCode,
                'userId': this.dataForm.userId,
                'buyerMessage': this.dataForm.buyerMessage,
                'buyerNick': this.dataForm.buyerNick,
                'buyerRate': this.dataForm.buyerRate
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
          }
        })
      }
    }
  }
</script>
