<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="目标id" prop="targetId">
      <el-input v-model="dataForm.targetId" placeholder="目标id"></el-input>
    </el-form-item>
    <el-form-item label="目标类型" prop="targetType">
      <el-input v-model="dataForm.targetType" placeholder="目标类型"></el-input>
    </el-form-item>
    <el-form-item label="审核人id" prop="reviewUserId">
      <el-input v-model="dataForm.reviewUserId" placeholder="审核人id"></el-input>
    </el-form-item>
    <el-form-item label="审核备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="审核备注"></el-input>
    </el-form-item>
    <el-form-item label="审核状态 1.通过  2.未通过" prop="reviewStatus">
      <el-input v-model="dataForm.reviewStatus" placeholder="审核状态 1.通过  2.未通过"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
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
          targetId: '',
          targetType: '',
          reviewUserId: '',
          remark: '',
          reviewStatus: '',
          createTime: '',
          updateTime: '',
          status: ''
        },
        dataRule: {
          targetId: [
            { required: true, message: '目标id不能为空', trigger: 'blur' }
          ],
          targetType: [
            { required: true, message: '目标类型不能为空', trigger: 'blur' }
          ],
          reviewUserId: [
            { required: true, message: '审核人id不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '审核备注不能为空', trigger: 'blur' }
          ],
          reviewStatus: [
            { required: true, message: '审核状态 1.通过  2.未通过不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sys/wkareviewlog/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.targetId = data.wkaReviewLog.targetId
                this.dataForm.targetType = data.wkaReviewLog.targetType
                this.dataForm.reviewUserId = data.wkaReviewLog.reviewUserId
                this.dataForm.remark = data.wkaReviewLog.remark
                this.dataForm.reviewStatus = data.wkaReviewLog.reviewStatus
                this.dataForm.createTime = data.wkaReviewLog.createTime
                this.dataForm.updateTime = data.wkaReviewLog.updateTime
                this.dataForm.status = data.wkaReviewLog.status
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
              url: this.$http.adornUrl(`/sys/wkareviewlog/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'targetId': this.dataForm.targetId,
                'targetType': this.dataForm.targetType,
                'reviewUserId': this.dataForm.reviewUserId,
                'remark': this.dataForm.remark,
                'reviewStatus': this.dataForm.reviewStatus,
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
