<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户id" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="dataForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="用户名称" prop="nickname">
      <el-input v-model="dataForm.nickname" placeholder="用户名称"></el-input>
    </el-form-item>
    <el-form-item label="登录设备：1、PC登录,2,App登录" prop="type">
      <el-input v-model="dataForm.type" placeholder="登录设备：1、PC登录,2,App登录"></el-input>
    </el-form-item>
    <el-form-item label="登录设备：1、登录,2,注销" prop="operationType">
      <el-input v-model="dataForm.operationType" placeholder="登录设备：1、登录,2,注销"></el-input>
    </el-form-item>
    <el-form-item label="国家" prop="country">
      <el-input v-model="dataForm.country" placeholder="国家"></el-input>
    </el-form-item>
    <el-form-item label="地区" prop="area">
      <el-input v-model="dataForm.area" placeholder="地区"></el-input>
    </el-form-item>
    <el-form-item label="登录IP地址" prop="ip">
      <el-input v-model="dataForm.ip" placeholder="登录IP地址"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="最后一次更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="最后一次更新时间"></el-input>
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
          userId: '',
          username: '',
          nickname: '',
          type: '',
          operationType: '',
          country: '',
          area: '',
          ip: '',
          status: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '用户名称不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '登录设备：1、PC登录,2,App登录不能为空', trigger: 'blur' }
          ],
          operationType: [
            { required: true, message: '登录设备：1、登录,2,注销不能为空', trigger: 'blur' }
          ],
          country: [
            { required: true, message: '国家不能为空', trigger: 'blur' }
          ],
          area: [
            { required: true, message: '地区不能为空', trigger: 'blur' }
          ],
          ip: [
            { required: true, message: '登录IP地址不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '最后一次更新时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sys/loginlog/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.sysLoginLog.userId
                this.dataForm.username = data.sysLoginLog.username
                this.dataForm.nickname = data.sysLoginLog.nickname
                this.dataForm.type = data.sysLoginLog.type
                this.dataForm.operationType = data.sysLoginLog.operationType
                this.dataForm.country = data.sysLoginLog.country
                this.dataForm.area = data.sysLoginLog.area
                this.dataForm.ip = data.sysLoginLog.ip
                this.dataForm.status = data.sysLoginLog.status
                this.dataForm.createTime = data.sysLoginLog.createTime
                this.dataForm.updateTime = data.sysLoginLog.updateTime
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
              url: this.$http.adornUrl(`/sys/loginlog/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'username': this.dataForm.username,
                'nickname': this.dataForm.nickname,
                'type': this.dataForm.type,
                'operationType': this.dataForm.operationType,
                'country': this.dataForm.country,
                'area': this.dataForm.area,
                'ip': this.dataForm.ip,
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
