<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户id" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
      </el-form-item>
      <el-form-item label="第三方来源:1微信，2腾讯QQ，3新浪微博" prop="origin">
        <el-input v-model="dataForm.origin" placeholder="第三方来源:1微信，2腾讯QQ，3新浪微博"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="dataForm.avatar" placeholder="头像"></el-input>
      </el-form-item>
      <el-form-item label="性别：1男，2女" prop="gender">
        <el-input v-model="dataForm.gender" placeholder="性别：1男，2女"></el-input>
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-input v-model="dataForm.province" placeholder="省份"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input v-model="dataForm.city" placeholder="城市"></el-input>
      </el-form-item>
      <el-form-item label="微信标识" prop="unionId">
        <el-input v-model="dataForm.unionId" placeholder="微信标识"></el-input>
      </el-form-item>
      <el-form-item label="公众号openid" prop="openId">
        <el-input v-model="dataForm.openId" placeholder="公众号openid"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-input v-model="dataForm.status" placeholder="状态"></el-input>
      </el-form-item>
      <el-form-item label="绑定时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="绑定时间"></el-input>
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
          userId: '',
          origin: '',
          nickname: '',
          avatar: '',
          gender: '',
          province: '',
          city: '',
          unionId: '',
          openId: '',
          status: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          origin: [
            { required: true, message: '第三方来源:1微信，2腾讯QQ，3新浪微博不能为空', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '昵称不能为空', trigger: 'blur' }
          ],
          avatar: [
            { required: true, message: '头像不能为空', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '性别：1男，2女不能为空', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '省份不能为空', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '城市不能为空', trigger: 'blur' }
          ],
          unionId: [
            { required: true, message: '微信标识不能为空', trigger: 'blur' }
          ],
          openId: [
            { required: true, message: '公众号openid不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '绑定时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sys/thirduser/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.thirdUser.userId
                this.dataForm.origin = data.thirdUser.origin
                this.dataForm.nickname = data.thirdUser.nickname
                this.dataForm.avatar = data.thirdUser.avatar
                this.dataForm.gender = data.thirdUser.gender
                this.dataForm.province = data.thirdUser.province
                this.dataForm.city = data.thirdUser.city
                this.dataForm.unionId = data.thirdUser.unionId
                this.dataForm.openId = data.thirdUser.openId
                this.dataForm.status = data.thirdUser.status
                this.dataForm.createTime = data.thirdUser.createTime
                this.dataForm.updateTime = data.thirdUser.updateTime
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
              url: this.$http.adornUrl(`/sys/thirduser/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'origin': this.dataForm.origin,
                'nickname': this.dataForm.nickname,
                'avatar': this.dataForm.avatar,
                'gender': this.dataForm.gender,
                'province': this.dataForm.province,
                'city': this.dataForm.city,
                'unionId': this.dataForm.unionId,
                'openId': this.dataForm.openId,
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
