<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="订单id" prop="orderId">
      <el-input v-model="dataForm.orderId" placeholder="订单id"></el-input>
    </el-form-item>
    <el-form-item label="用户id" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="dataForm.nickname" placeholder="用户昵称"></el-input>
    </el-form-item>
    <el-form-item label="用户标签" prop="userTag">
      <el-input v-model="dataForm.userTag" placeholder="用户标签"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="联系电话"></el-input>
    </el-form-item>
    <el-form-item label="联系人" prop="buyerNick">
      <el-input v-model="dataForm.buyerNick" placeholder="联系人"></el-input>
    </el-form-item>
    <el-form-item label="配送地址" prop="shippingAddress">
      <el-input v-model="dataForm.shippingAddress" placeholder="配送地址"></el-input>
    </el-form-item>
    <el-form-item label="商品id" prop="itemId">
      <el-input v-model="dataForm.itemId" placeholder="商品id"></el-input>
    </el-form-item>
    <el-form-item label="商品购买数量" prop="num">
      <el-input v-model="dataForm.num" placeholder="商品购买数量"></el-input>
    </el-form-item>
    <el-form-item label="商品标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="商品标题"></el-input>
    </el-form-item>
    <el-form-item label="商品单价" prop="price">
      <el-input v-model="dataForm.price" placeholder="商品单价"></el-input>
    </el-form-item>
    <el-form-item label="商品总金额" prop="totalFee">
      <el-input v-model="dataForm.totalFee" placeholder="商品总金额"></el-input>
    </el-form-item>
    <el-form-item label="单个商品成本价" prop="costPrice">
      <el-input v-model="dataForm.costPrice" placeholder="单个商品成本价"></el-input>
    </el-form-item>
    <el-form-item label="商品图片地址" prop="picPath">
      <el-input v-model="dataForm.picPath" placeholder="商品图片地址"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
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
          id: 0,
          orderId: '',
          userId: '',
          nickname: '',
          userTag: '',
          mobile: '',
          buyerNick: '',
          shippingAddress: '',
          itemId: '',
          num: '',
          title: '',
          price: '',
          totalFee: '',
          costPrice: '',
          picPath: '',
          createTime: ''
        },
        dataRule: {
          orderId: [
            { required: true, message: '订单id不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '用户昵称不能为空', trigger: 'blur' }
          ],
          userTag: [
            { required: true, message: '用户标签不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '联系电话不能为空', trigger: 'blur' }
          ],
          buyerNick: [
            { required: true, message: '联系人不能为空', trigger: 'blur' }
          ],
          shippingAddress: [
            { required: true, message: '配送地址不能为空', trigger: 'blur' }
          ],
          itemId: [
            { required: true, message: '商品id不能为空', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '商品购买数量不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '商品标题不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '商品单价不能为空', trigger: 'blur' }
          ],
          totalFee: [
            { required: true, message: '商品总金额不能为空', trigger: 'blur' }
          ],
          costPrice: [
            { required: true, message: '单个商品成本价不能为空', trigger: 'blur' }
          ],
          picPath: [
            { required: true, message: '商品图片地址不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/userorderitem/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderId = data.userOrderItem.orderId
                this.dataForm.userId = data.userOrderItem.userId
                this.dataForm.nickname = data.userOrderItem.nickname
                this.dataForm.userTag = data.userOrderItem.userTag
                this.dataForm.mobile = data.userOrderItem.mobile
                this.dataForm.buyerNick = data.userOrderItem.buyerNick
                this.dataForm.shippingAddress = data.userOrderItem.shippingAddress
                this.dataForm.itemId = data.userOrderItem.itemId
                this.dataForm.num = data.userOrderItem.num
                this.dataForm.title = data.userOrderItem.title
                this.dataForm.price = data.userOrderItem.price
                this.dataForm.totalFee = data.userOrderItem.totalFee
                this.dataForm.costPrice = data.userOrderItem.costPrice
                this.dataForm.picPath = data.userOrderItem.picPath
                this.dataForm.createTime = data.userOrderItem.createTime
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
              url: this.$http.adornUrl(`/sys/userorderitem/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'orderId': this.dataForm.orderId,
                'userId': this.dataForm.userId,
                'nickname': this.dataForm.nickname,
                'userTag': this.dataForm.userTag,
                'mobile': this.dataForm.mobile,
                'buyerNick': this.dataForm.buyerNick,
                'shippingAddress': this.dataForm.shippingAddress,
                'itemId': this.dataForm.itemId,
                'num': this.dataForm.num,
                'title': this.dataForm.title,
                'price': this.dataForm.price,
                'totalFee': this.dataForm.totalFee,
                'costPrice': this.dataForm.costPrice,
                'picPath': this.dataForm.picPath,
                'createTime': this.dataForm.createTime
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
