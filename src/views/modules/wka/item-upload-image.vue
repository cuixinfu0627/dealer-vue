<template>
  <el-dialog :append-to-body="true"
             title="上传文件"
             :close-on-click-modal="false"
             @close="closeHandle"
             :visible.sync="visible">
    <el-upload
      v-loading="loading"
      element-loading-text="上传中..."
      drag
      :action="url"
      :before-upload="beforeUploadHandle"
      :on-success="successHandle"
      multiple
      :file-list="fileList"
      style="text-align: center;">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只支持jpg、png、gif格式的图片！</div>
    </el-upload>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        visible: false,
        url: this.$http.adornUrl(`/wka/item/upload?token=${this.$cookie.get('token')}`),
        num: 0,
        successNum: 0,
        fileList: [],
        filePath: ''
      }
    },
    methods: {
      init (id) {
        this.fileList = []
        this.visible = true
      },
      // 上传之前
      beforeUploadHandle (file) {
        this.loading = true
        if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
          this.$message.error('只支持jpg、png、gif格式的图片！')
          return false
        }
        this.num++
      },
      // 上传成功
      successHandle (response, file, fileList) {
        this.fileList = fileList
        this.successNum++
        this.loading = false
        if (response && response.code === 0) {
          this.$message({
            message: "上传成功！",
            type: 'success',
            duration: 1000,
          })
          this.filePath = response.filePath
          this.$emit('refreshDataList',this.filePath)
        } else {
          this.$message.error(response.msg)
        }
      },
      // 弹窗关闭时
      closeHandle () {
        this.fileList = []
        this.$emit('refreshDataList',this.filePath)
      }
    }
  }
</script>
