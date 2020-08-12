<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="消息id" prop="messageId">
      <el-input v-model="dataForm.messageId" placeholder="消息id"></el-input>
    </el-form-item>
    <el-form-item label="消息大类型冗余字段" prop="messageType">
      <el-input v-model="dataForm.messageType" placeholder="消息大类型冗余字段"></el-input>
    </el-form-item>
    <el-form-item label="接收人类型" prop="toType">
      <el-input v-model="dataForm.toType" placeholder="接收人类型"></el-input>
    </el-form-item>
    <el-form-item label="接收人用户id" prop="toUserId">
      <el-input v-model="dataForm.toUserId" placeholder="接收人用户id"></el-input>
    </el-form-item>
    <el-form-item label="接收人昵称" prop="toNickName">
      <el-input v-model="dataForm.toNickName" placeholder="接收人昵称"></el-input>
    </el-form-item>
    <el-form-item label="读取时间" prop="readTime">
      <el-input v-model="dataForm.readTime" placeholder="读取时间"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="修改时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="修改时间"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态"></el-input>
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
          messageId: '',
          messageType: '',
          toType: '',
          toUserId: '',
          toNickName: '',
          readTime: '',
          createTime: '',
          updateTime: '',
          status: ''
        },
        dataRule: {
          messageId: [
            { required: true, message: '消息id不能为空', trigger: 'blur' }
          ],
          messageType: [
            { required: true, message: '消息大类型冗余字段不能为空', trigger: 'blur' }
          ],
          toType: [
            { required: true, message: '接收人类型不能为空', trigger: 'blur' }
          ],
          toUserId: [
            { required: true, message: '接收人用户id不能为空', trigger: 'blur' }
          ],
          toNickName: [
            { required: true, message: '接收人昵称不能为空', trigger: 'blur' }
          ],
          readTime: [
            { required: true, message: '读取时间不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sys/message-user/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.messageId = data.sysMessageUser.messageId
                this.dataForm.messageType = data.sysMessageUser.messageType
                this.dataForm.toType = data.sysMessageUser.toType
                this.dataForm.toUserId = data.sysMessageUser.toUserId
                this.dataForm.toNickName = data.sysMessageUser.toNickName
                this.dataForm.readTime = data.sysMessageUser.readTime
                this.dataForm.createTime = data.sysMessageUser.createTime
                this.dataForm.updateTime = data.sysMessageUser.updateTime
                this.dataForm.status = data.sysMessageUser.status
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
              url: this.$http.adornUrl(`/sys/message-user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'messageId': this.dataForm.messageId,
                'messageType': this.dataForm.messageType,
                'toType': this.dataForm.toType,
                'toUserId': this.dataForm.toUserId,
                'toNickName': this.dataForm.toNickName,
                'readTime': this.dataForm.readTime,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
                'status': this.dataForm.status
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
