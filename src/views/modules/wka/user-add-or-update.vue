<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="头像:" prop="avatar">
        <div class="col-sm-3">
          <el-image style="width: 100px; height: 50px" :src="dataForm.avatar" fit="contain"/>
        </div>
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model="dataForm.username" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="用户标签" prop="tag">
        <el-input v-model="dataForm.tag" placeholder="用户标签,多个用逗号[,]分隔"></el-input>
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
          username: '',
          nickname: '',
          password: '',
          salt: '',
          avatar: '',
          status: '',
          createTime: '',
          reviewStatus: '',
          reviewId: '',
          reviewName: '',
          reviewContent: '',
          reviewTime: '',
          tag: ''
        },
        dataRule: {
          username: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '昵称不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          salt: [
            { required: true, message: '盐不能为空', trigger: 'blur' }
          ],
          avatar: [
            { required: true, message: '头像不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态  0：正常 1：禁用不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          reviewStatus: [
            { required: true, message: '审核状态:1审核通过,2审核未通过,3待审核不能为空', trigger: 'blur' }
          ],
          reviewId: [
            { required: true, message: '审核人ID不能为空', trigger: 'blur' }
          ],
          reviewName: [
            { required: true, message: '审核人姓名不能为空', trigger: 'blur' }
          ],
          reviewContent: [
            { required: true, message: '审核内容不能为空', trigger: 'blur' }
          ],
          reviewTime: [
            { required: true, message: '审核时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/wka/user/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.username = data.wkaDealer.username
                this.dataForm.nickname = data.wkaDealer.nickname
                this.dataForm.password = data.wkaDealer.password
                this.dataForm.salt = data.wkaDealer.salt
                this.dataForm.avatar = data.wkaDealer.avatar
                this.dataForm.status = data.wkaDealer.status
                this.dataForm.createTime = data.wkaDealer.createTime
                this.dataForm.reviewStatus = data.wkaDealer.reviewStatus
                this.dataForm.reviewId = data.wkaDealer.reviewId
                this.dataForm.reviewName = data.wkaDealer.reviewName
                this.dataForm.reviewContent = data.wkaDealer.reviewContent
                this.dataForm.reviewTime = data.wkaDealer.reviewTime
                this.dataForm.tag = data.wkaDealer.tag
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
              url: this.$http.adornUrl(`/wka/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'username': this.dataForm.username,
                'nickname': this.dataForm.nickname,
                'avatar': this.dataForm.avatar,
                'tag': this.dataForm.tag
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
