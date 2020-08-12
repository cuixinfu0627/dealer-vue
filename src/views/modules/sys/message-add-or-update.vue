<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="发送端用户类型" prop="fromType">
      <el-input v-model="dataForm.fromType" placeholder="发送端用户类型"></el-input>
    </el-form-item>
    <el-form-item label="发送用户id" prop="fromUserId">
      <el-input v-model="dataForm.fromUserId" placeholder="发送用户id"></el-input>
    </el-form-item>
    <el-form-item label="发送人昵称" prop="fromNickName">
      <el-input v-model="dataForm.fromNickName" placeholder="发送人昵称"></el-input>
    </el-form-item>
    <el-form-item label="发送用户组: 1所有人，2,其他用户" prop="groupType">
      <el-input v-model="dataForm.groupType" placeholder="发送用户组: 1所有人，2,其他用户"></el-input>
    </el-form-item>
    <el-form-item label="消息大类型，0.系统通知，其它属于业务消息  1.系统消息，2.服务提醒，3.交易提醒" prop="type">
      <el-input v-model="dataForm.type" placeholder="消息大类型，0.系统通知，其它属于业务消息  1.系统消息，2.服务提醒，3.交易提醒"></el-input>
    </el-form-item>
    <el-form-item label="消息类型" prop="messageType">
      <el-input v-model="dataForm.messageType" placeholder="消息类型"></el-input>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="内容"></el-input>
    </el-form-item>
    <el-form-item label="相关数据id" prop="referenceId">
      <el-input v-model="dataForm.referenceId" placeholder="相关数据id"></el-input>
    </el-form-item>
    <el-form-item label="删除状态" prop="deleted">
      <el-input v-model="dataForm.deleted" placeholder="删除状态"></el-input>
    </el-form-item>
    <el-form-item label="通知流水号" prop="notifyCode">
      <el-input v-model="dataForm.notifyCode" placeholder="通知流水号"></el-input>
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
          fromType: '',
          fromUserId: '',
          fromNickName: '',
          groupType: '',
          type: '',
          messageType: '',
          title: '',
          content: '',
          referenceId: '',
          deleted: '',
          notifyCode: '',
          createTime: '',
          updateTime: '',
          status: ''
        },
        dataRule: {
          fromType: [
            { required: true, message: '发送端用户类型不能为空', trigger: 'blur' }
          ],
          fromUserId: [
            { required: true, message: '发送用户id不能为空', trigger: 'blur' }
          ],
          fromNickName: [
            { required: true, message: '发送人昵称不能为空', trigger: 'blur' }
          ],
          groupType: [
            { required: true, message: '发送用户组: 1所有人，2,其他用户不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '消息大类型，0.系统通知，其它属于业务消息  1.系统消息，2.服务提醒，3.交易提醒不能为空', trigger: 'blur' }
          ],
          messageType: [
            { required: true, message: '消息类型不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          referenceId: [
            { required: true, message: '相关数据id不能为空', trigger: 'blur' }
          ],
          deleted: [
            { required: true, message: '删除状态不能为空', trigger: 'blur' }
          ],
          notifyCode: [
            { required: true, message: '通知流水号不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sys/message/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.fromType = data.sysMessage.fromType
                this.dataForm.fromUserId = data.sysMessage.fromUserId
                this.dataForm.fromNickName = data.sysMessage.fromNickName
                this.dataForm.groupType = data.sysMessage.groupType
                this.dataForm.type = data.sysMessage.type
                this.dataForm.messageType = data.sysMessage.messageType
                this.dataForm.title = data.sysMessage.title
                this.dataForm.content = data.sysMessage.content
                this.dataForm.referenceId = data.sysMessage.referenceId
                this.dataForm.deleted = data.sysMessage.deleted
                this.dataForm.notifyCode = data.sysMessage.notifyCode
                this.dataForm.createTime = data.sysMessage.createTime
                this.dataForm.updateTime = data.sysMessage.updateTime
                this.dataForm.status = data.sysMessage.status
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
              url: this.$http.adornUrl(`/sys/message/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'fromType': this.dataForm.fromType,
                'fromUserId': this.dataForm.fromUserId,
                'fromNickName': this.dataForm.fromNickName,
                'groupType': this.dataForm.groupType,
                'type': this.dataForm.type,
                'messageType': this.dataForm.messageType,
                'title': this.dataForm.title,
                'content': this.dataForm.content,
                'referenceId': this.dataForm.referenceId,
                'deleted': this.dataForm.deleted,
                'notifyCode': this.dataForm.notifyCode,
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
