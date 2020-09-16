<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="150px">
      <el-form-item label="头像:" prop="avatar">
        <div class="col-sm-3">
          <el-image style="width: 100px; height: 50px" :src="dataForm.avatar" fit="contain"/>
        </div>
      </el-form-item>
      <el-form-item label="姓名:" prop="username">
        <span>{{dataForm.username}}</span>
      </el-form-item>
      <el-form-item label="昵称:" prop="nickname">
        <span>{{dataForm.nickname}}</span>
      </el-form-item>
      <el-form-item label="审核状态" prop="reviewStatus">
        <el-select v-model="dataForm.reviewStatus" filterable placeholder="审核状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核说明" prop="reviewContent">
        <el-input
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 1}"
          placeholder="请输入说明"
          v-model="dataForm.reviewContent">
        </el-input>
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
    data() {
      return {
        options: [{
          value: 1,
          label: '审核通过'
        }, {
          value: 3,
          label: '待审核'
        }, {
          value: 2,
          label: '审核不通过'
        }],
        visible: false,
        dataForm: {
          id: 0,
          username: '',
          nickname: '',
          password: '',
          avatar: '',
          status: '',
          createTime: '',
          reviewStatus: 1,
          reviewId: '',
          reviewName: '',
          reviewContent: '',
          reviewTime: ''
        },
        dataRule: {
          reviewStatus: [
            {required: true, message: '审核状态:1审核通过,2审核未通过,3待审核不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      init(id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/wka/review/info/${this.dataForm.id}`),
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
                this.dataForm.reviewId = data.wkaDealer.reviewId
                this.dataForm.reviewName = data.wkaDealer.reviewName
                this.dataForm.reviewContent = data.wkaDealer.reviewContent
                this.dataForm.reviewTime = data.wkaDealer.reviewTime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/wka/review/update`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'username': this.dataForm.username,
                'nickname': this.dataForm.nickname,
                'reviewStatus': this.dataForm.reviewStatus,
                'reviewId': this.dataForm.reviewId,
                'reviewName': this.dataForm.reviewName,
                'reviewContent': this.dataForm.reviewContent,
                'reviewTime': this.dataForm.reviewTime
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
