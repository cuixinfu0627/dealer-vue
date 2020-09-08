<template>
  <el-dialog
    :title="'发送消息'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="发送至" prop="groupType">
        <el-select v-model="dataForm.groupType" filterable placeholder="发送用户" @change="selectGroupTypes">
          <el-option
            v-for="item in groupTypes"
            :key="item.status"
            :label="item.label"
            :value="item.status">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="type">
        <el-select v-model="dataForm.type" filterable placeholder="消息分类" @change="selectTypes">
          <el-option
            v-for="item in types"
            :key="item.status"
            :label="item.label"
            :value="item.status">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="内容:" prop="content">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 3}"
          placeholder="消息内容"
          v-model="dataForm.content">
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
        groupTypes: [{
          status: 1,
          label: '后台用户'
        }, {
          status: 2,
          label: '前台用户'
        }, {
          status: 3,
          label: '所有用户'
        }],
        types: [{
          status: 1,
          label: '系统通知'
        }, {
          status: 2,
          label: '系统公告'
        }, {
          status: 3,
          label: '服务提醒'
        }, {
          status: 4,
          label: '交易提醒'
        }],
        visible: false,
        dataForm: {
          groupType: 2,
          type: 2,
          title: '',
          content: ''
        },
        dataRule: {
          groupType: [
            {required: true, message: '发送用户不能为空', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '消息分类不能为空', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '内容不能为空', trigger: 'blur'},
            {min: 3, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      init() {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      },
      selectTypes(value) {
        this.dataForm.type = value
      },
      selectGroupTypes(value) {
        this.dataForm.groupType = value
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/message/send`),
              method: 'post',
              data: this.$http.adornData({
                'type': this.dataForm.type,
                'groupType': this.dataForm.groupType,
                'title': this.dataForm.title,
                'content': this.dataForm.content
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '发送成功',
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
