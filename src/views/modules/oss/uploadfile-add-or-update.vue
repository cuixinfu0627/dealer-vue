<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="文件名" prop="name">
      <el-input v-model="dataForm.name" placeholder="文件名"></el-input>
    </el-form-item>
    <el-form-item label="源文件名" prop="originalName">
      <el-input v-model="dataForm.originalName" placeholder="源文件名"></el-input>
    </el-form-item>
    <el-form-item label="文件URL" prop="url">
      <el-input v-model="dataForm.url" placeholder="文件URL"></el-input>
    </el-form-item>
    <el-form-item label="文件类型" prop="type">
      <el-input v-model="dataForm.type" placeholder="文件类型"></el-input>
    </el-form-item>
    <el-form-item label="文件大小" prop="size">
      <el-input v-model="dataForm.size" placeholder="文件大小"></el-input>
    </el-form-item>
    <el-form-item label="状态：1 封面，0不是" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态：1 封面，0不是"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
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
          name: '',
          originalName: '',
          url: '',
          type: '',
          size: '',
          status: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          name: [
            { required: true, message: '文件名不能为空', trigger: 'blur' }
          ],
          originalName: [
            { required: true, message: '源文件名不能为空', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '文件URL不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '文件类型不能为空', trigger: 'blur' }
          ],
          size: [
            { required: true, message: '文件大小不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态：1 封面，0不是不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
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
              url: this.$http.adornUrl(`/oss/uploadfile/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.uploadFile.name
                this.dataForm.originalName = data.uploadFile.originalName
                this.dataForm.url = data.uploadFile.url
                this.dataForm.type = data.uploadFile.type
                this.dataForm.size = data.uploadFile.size
                this.dataForm.status = data.uploadFile.status
                this.dataForm.createTime = data.uploadFile.createTime
                this.dataForm.updateTime = data.uploadFile.updateTime
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
              url: this.$http.adornUrl(`/oss/uploadfile/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'originalName': this.dataForm.originalName,
                'url': this.dataForm.url,
                'type': this.dataForm.type,
                'size': this.dataForm.size,
                'status': this.dataForm.status,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime
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
