<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
    <el-form-item label="请上级父类" prop="parentId" :label-width="formLabelWidth">
      <el-select v-model="dataForm.parentId" filterable placeholder="请选择上级类目" size="medium" @change="onSelectType">
        <el-option v-for="item in itemsCatList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="类目名称" prop="name" :label-width="formLabelWidth">
      <el-input v-model="dataForm.name" placeholder="类目名称"></el-input>
    </el-form-item>
    <el-form-item label="排列序号" prop="sortOrder" :label-width="formLabelWidth">
      <el-input v-model="dataForm.sortOrder" placeholder="排列序号，表示同级类目的展现次序，如数值相等则按名称次序排列。取值范围:大于零的整数"></el-input>
    </el-form-item>
    <el-form-item label="是否父类:" prop="isParent" :label-width="formLabelWidth">
      <el-radio v-model="dataForm.isParent" label="1">是</el-radio>
      <el-radio v-model="dataForm.isParent" label="2">否</el-radio>
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
        formLabelWidth: '120px',
        itemsCatList: [],
        visible: false,
        dataForm: {
          id: 0,
          parentId: '',
          name: '',
          sortOrder: '',
          isParent: '1'
        },
        dataRule: {
          parentId: [
            { required: true, message: '父类目ID=0时，代表的是一级的类目不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '类目名称不能为空', trigger: 'blur' }
          ],
          sortOrder: [
            { required: true, message: '排列序号，表示同级类目的展现次序，如数值相等则按名称次序排列。取值范围:大于零的整数不能为空', trigger: 'blur' }
          ],
          isParent: [
            { required: true, message: '该类目是否为父类目，1为true，0为false不能为空', trigger: 'blur' }
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
                this.dataForm.parentId = data.wkaItemsCat.parentId
                this.dataForm.name = data.wkaItemsCat.name
                this.dataForm.status = data.wkaItemsCat.status
                this.dataForm.sortOrder = data.wkaItemsCat.sortOrder
                this.dataForm.isParent = data.wkaItemsCat.isParent
              }
            })
          }
        })
        this.initItemCat()
      },
      initItemCat () {
        var parentId = this.dataForm.parentId;
        if (parentId === ''){
          parentId = 0 ;
        }
        this.$http({
          url: this.$http.adornUrl(`/wka/item-cat/listParent`),
          method: 'get',
          params: this.$http.adornParams({
            'parentId': parentId
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.itemsCatList = data.data
          }
        })
      },
      // 筛选类型
      onSelectType (event, item) {
        console.log(item)
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
