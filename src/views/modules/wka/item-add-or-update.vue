<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="商品标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="商品标题"></el-input>
    </el-form-item>
    <el-form-item label="商品卖点" prop="sellPoint">
      <el-input v-model="dataForm.sellPoint" placeholder="商品卖点"></el-input>
    </el-form-item>
    <el-form-item label="商品价格，单位为：分" prop="price">
      <el-input v-model="dataForm.price" placeholder="商品价格，单位为：分"></el-input>
    </el-form-item>
    <el-form-item label="库存数量" prop="num">
      <el-input v-model="dataForm.num" placeholder="库存数量"></el-input>
    </el-form-item>
    <el-form-item label="商品条形码" prop="barcode">
      <el-input v-model="dataForm.barcode" placeholder="商品条形码"></el-input>
    </el-form-item>
    <el-form-item label="商品图片" prop="image">
      <el-input v-model="dataForm.image" placeholder="商品图片"></el-input>
    </el-form-item>
    <el-form-item label="所属类目，叶子类目" prop="cid">
      <el-input v-model="dataForm.cid" placeholder="所属类目，叶子类目"></el-input>
    </el-form-item>
    <el-form-item label="商品状态，1-正常，2-下架，3-删除" prop="status">
      <el-input v-model="dataForm.status" placeholder="商品状态，1-正常，2-下架，3-删除"></el-input>
    </el-form-item>
    <el-form-item label="商品描述" prop="desc">
      <el-input v-model="dataForm.desc" placeholder="商品描述"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="created">
      <el-input v-model="dataForm.created" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updated">
      <el-input v-model="dataForm.updated" placeholder="更新时间"></el-input>
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
          title: '',
          sellPoint: '',
          price: '',
          num: '',
          barcode: '',
          image: '',
          cid: '',
          status: '',
          desc: '',
          created: '',
          updated: ''
        },
        dataRule: {
          title: [
            { required: true, message: '商品标题不能为空', trigger: 'blur' }
          ],
          sellPoint: [
            { required: true, message: '商品卖点不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '商品价格，单位为：分不能为空', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '库存数量不能为空', trigger: 'blur' }
          ],
          barcode: [
            { required: true, message: '商品条形码不能为空', trigger: 'blur' }
          ],
          image: [
            { required: true, message: '商品图片不能为空', trigger: 'blur' }
          ],
          cid: [
            { required: true, message: '所属类目，叶子类目不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '商品状态，1-正常，2-下架，3-删除不能为空', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '商品描述不能为空', trigger: 'blur' }
          ],
          created: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updated: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/wka/item/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.title = data.wkaGoods.title
                this.dataForm.sellPoint = data.wkaGoods.sellPoint
                this.dataForm.price = data.wkaGoods.price
                this.dataForm.num = data.wkaGoods.num
                this.dataForm.barcode = data.wkaGoods.barcode
                this.dataForm.image = data.wkaGoods.image
                this.dataForm.cid = data.wkaGoods.cid
                this.dataForm.status = data.wkaGoods.status
                this.dataForm.desc = data.wkaGoods.desc
                this.dataForm.created = data.wkaGoods.created
                this.dataForm.updated = data.wkaGoods.updated
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
              url: this.$http.adornUrl(`/wka/item/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'sellPoint': this.dataForm.sellPoint,
                'price': this.dataForm.price,
                'num': this.dataForm.num,
                'barcode': this.dataForm.barcode,
                'image': this.dataForm.image,
                'cid': this.dataForm.cid,
                'status': this.dataForm.status,
                'desc': this.dataForm.desc,
                'created': this.dataForm.created,
                'updated': this.dataForm.updated
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
