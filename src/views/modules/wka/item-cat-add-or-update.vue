<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="父类目ID=0时，代表的是一级的类目" prop="parentId">
      <el-input v-model="dataForm.parentId" placeholder="父类目ID=0时，代表的是一级的类目"></el-input>
    </el-form-item>
    <el-form-item label="类目名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="类目名称"></el-input>
    </el-form-item>
    <el-form-item label="状态。可选值:1(正常),2(删除)" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态。可选值:1(正常),2(删除)"></el-input>
    </el-form-item>
    <el-form-item label="排列序号，表示同级类目的展现次序，如数值相等则按名称次序排列。取值范围:大于零的整数" prop="sortOrder">
      <el-input v-model="dataForm.sortOrder" placeholder="排列序号，表示同级类目的展现次序，如数值相等则按名称次序排列。取值范围:大于零的整数"></el-input>
    </el-form-item>
    <el-form-item label="该类目是否为父类目，1为true，0为false" prop="isParent">
      <el-input v-model="dataForm.isParent" placeholder="该类目是否为父类目，1为true，0为false"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="created">
      <el-input v-model="dataForm.created" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="updated">
      <el-input v-model="dataForm.updated" placeholder="创建时间"></el-input>
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
          parentId: '',
          name: '',
          status: '',
          sortOrder: '',
          isParent: '',
          created: '',
          updated: ''
        },
        dataRule: {
          parentId: [
            { required: true, message: '父类目ID=0时，代表的是一级的类目不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '类目名称不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态。可选值:1(正常),2(删除)不能为空', trigger: 'blur' }
          ],
          sortOrder: [
            { required: true, message: '排列序号，表示同级类目的展现次序，如数值相等则按名称次序排列。取值范围:大于零的整数不能为空', trigger: 'blur' }
          ],
          isParent: [
            { required: true, message: '该类目是否为父类目，1为true，0为false不能为空', trigger: 'blur' }
          ],
          created: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updated: [
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
              url: this.$http.adornUrl(`/wka/item-cat/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.parentId = data.wkaGoodsCat.parentId
                this.dataForm.name = data.wkaGoodsCat.name
                this.dataForm.status = data.wkaGoodsCat.status
                this.dataForm.sortOrder = data.wkaGoodsCat.sortOrder
                this.dataForm.isParent = data.wkaGoodsCat.isParent
                this.dataForm.created = data.wkaGoodsCat.created
                this.dataForm.updated = data.wkaGoodsCat.updated
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
              url: this.$http.adornUrl(`/wka/item-cat/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'parentId': this.dataForm.parentId,
                'name': this.dataForm.name,
                'status': this.dataForm.status,
                'sortOrder': this.dataForm.sortOrder,
                'isParent': this.dataForm.isParent,
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
