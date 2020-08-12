<template>
  <el-dialog title="修改头像" width="20%" :visible.sync="visible" :append-to-body="true">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="20px">
      <el-form-item style="text-align: center">
        <span >账号：{{ userName }}</span>
      </el-form-item>
      <el-form-item>
        <my-upload field="img"
                   @crop-success="cropSuccess"
                   @crop-upload-success="cropUploadSuccess"
                   @crop-upload-fail="cropUploadFail"
                   v-model="show"
                   :url="config.uploadHeader"
                   :params="params"
                   :headers="headers"
                   img-format="png">
        </my-upload>
        <div class="myhead">
          <el-tooltip content="点击更改头像" placement="top">
            <img :src=userAvatar class="img-responsive img-circle center-block" @click="toggleShow">
          </el-tooltip>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">返回</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import 'babel-polyfill'
  import myUpload from 'vue-image-crop-upload'

  export default {
    data () {
      return {
        show: false,
        params: {
          token: this.$cookie.get('token'),
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        imgDataUrl: '',
        visible: false,
        dataForm: {

        },
        dataRule: {

        }
      }
    },
    components: {
      'my-upload': myUpload
    },
    computed: {
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      },
      userAvatar: {
        get () {
          let avatar = this.$store.state.user.avatar
          return this.$http.getFileUrl(avatar)
        },
        set (val) {
          this.$store.commit('user/updateAvatar', val)
        }
      }
    },
    methods: {
      toggleShow () {
        this.show = !this.show
      },
      /**
       * crop success
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess (imgDataUrl, field) {
        //console.log('-------- crop success --------')
        this.imgDataUrl = imgDataUrl
      },
      /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
      cropUploadSuccess (jsonData, field) {
        //console.log('-------- upload success --------')
        //console.log(jsonData)
        //console.log('field: ' + field)
        if (jsonData.code != 0) {
          this.$message({
            message: jsonData.msg,
            type: 'error',
            duration: 3000,
            onClose: () => {
              this.visible = false
            }
          })
        }
        this.imgDataUrl = jsonData.filePath
        this.userAvatar = jsonData.filePath
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail (status, field) {
        //console.log('-------- upload fail --------')
        console.log(status)
        console.log('field: ' + field)
      },
      // 初始化
      init () {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.visible = false
      }
    }
  }
</script>
<style>
  .myhead {
    margin: 0 auto;
    text-align: center;
    cursor: pointer;
  }
  .myhead img {
    width: 180px;
    height: 180px;
    position: relative;
  }
  .center-block {
    display: block;
    margin-right: auto;
    margin-left: auto;
  }
  .img-circle {
    border-radius: 50%;
  }
  .carousel-inner>.item>a>img, .carousel-inner>.item>img, .img-responsive, .thumbnail>img, .thumbnail a>img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  img {
    vertical-align: middle;
  }
</style>
