<template>
  <el-dialog :append-to-body="true"
    :title="!dataForm.id ? '新增' : '修改订单商品'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="商品标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="商品标题" :disabled="isDisabled" :label-width="formLabelWidth"></el-input>
      </el-form-item>
    <el-form-item label="购买数量" prop="num">
      <el-input v-model="dataForm.num" placeholder="商品购买数量" :label-width="formLabelWidth"></el-input>
    </el-form-item>
    <el-form-item label="商品单价" prop="price">
      <el-input v-model="dataForm.price" placeholder="商品单价" :disabled="isDisabled" :label-width="formLabelWidth"></el-input>
    </el-form-item>
    <el-form-item label="商品总价" prop="totalFee">
      <el-input v-model="dataForm.totalFee" placeholder="商品总金额" :disabled="isDisabled" :label-width="formLabelWidth"></el-input>
    </el-form-item>
    <el-form-item label="商品图片" prop="picPath">
      <div class="col-sm-3">
        <el-image style="width: 100px; height: 50px" :src="dataForm.picPath" fit="contain"/>
      </div>
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
        formLabelWidth: '100px',
        isDisabled: true,
        visible: false,
        dataForm: {
          id: 0,
          itemId: '',
          orderId: '',
          num: '',
          title: '',
          price: '',
          totalFee: '',
          picPath: ''
        },
        dataRule: {
          itemId: [
            { required: true, message: '商品id不能为空', trigger: 'blur' }
          ],
          orderId: [
            { required: true, message: '订单id不能为空', trigger: 'blur' }
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
          picPath: [
            { required: true, message: '商品图片地址不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/wka/order-item/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.itemId = data.wkaOrderItem.itemId
                this.dataForm.orderId = data.wkaOrderItem.orderId
                this.dataForm.num = data.wkaOrderItem.num
                this.dataForm.title = data.wkaOrderItem.title
                this.dataForm.price = this.regFenToYuan(data.wkaOrderItem.price)
                this.dataForm.totalFee = this.regFenToYuan(data.wkaOrderItem.totalFee)
                this.dataForm.picPath = data.wkaOrderItem.picPath
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
              url: this.$http.adornUrl(`/wka/order-item/updateOrderItem`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'itemId': this.dataForm.itemId,
                'orderId': this.dataForm.orderId,
                'num': this.dataForm.num,
                'title': this.dataForm.title,
                /* 'price': this.dataForm.price,
                'totalFee': this.dataForm.totalFee,*/
                'picPath': this.dataForm.picPath
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
