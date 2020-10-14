<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-form-item label="商品标题:" prop="title" :label-width="formLabelWidth">
        <el-input v-model="dataForm.title" placeholder="商品标题"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点:" prop="sellPoint" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 3}"
          placeholder="商品卖点"
          v-model="dataForm.sellPoint">
        </el-input>
      </el-form-item>
      <el-form-item label="商品零售价:" prop="price" :label-width="formLabelWidth">
        <el-input v-model="dataForm.price" placeholder="0.00，单位为：元"></el-input>
      </el-form-item>
      <el-form-item label="商品成本价:" prop="costPrice" :label-width="formLabelWidth">
        <el-input v-model="dataForm.costPrice" placeholder="0.00，单位为：元"></el-input>
      </el-form-item>
      <el-form-item label="库存数量:" prop="num" :label-width="formLabelWidth">
        <el-input v-model="dataForm.num" placeholder="库存数量"></el-input>
      </el-form-item>
      <el-form-item label="规格:" prop="spec" :label-width="formLabelWidth">
        <el-input v-model="dataForm.spec" placeholder="商品规格"></el-input>
      </el-form-item>
      <el-form-item label="商品图片:" prop="image">
        <div class="myhead">
          <el-tooltip content="点击上传Logo" placement="top" :label-width="formLabelWidth">
            <el-image style="width: 300px; height: 150px" :src="dataForm.image" fit="contain" @click="uploadHandle()"
                      alt=""/>
          </el-tooltip>
        </div>
      </el-form-item>
      <el-form-item label="所属类目:" prop="cid" :label-width="formLabelWidth">
        <el-select v-model="dataForm.cid" filterable placeholder="请选择所属类目，可搜索" size="medium" @change="onSelectType">
          <el-option v-for="item in itemsCatList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品描述:" prop="describes" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 3}"
          placeholder="商品描述"
          v-model="dataForm.describes">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    <!-- 弹窗, 上传文件 -->
    <item-upload-image v-if="uploadVisible" ref="itemUploadImage" @refreshDataList="refreshFileUrl"></item-upload-image>
  </el-dialog>
</template>

<script>
  import 'babel-polyfill'
  // 文件上传
  import ItemUploadImage from './item-upload-image'

  export default {
    data() {
      return {
        formLabelWidth: '120px',
        itemsCatList: [],
        visible: false,
        dataForm: {
          id: 0,
          title: '',
          sellPoint: '',
          price: '',
          costPrice: '',
          num: '',
          barcode: '',
          image: 'http://file-dealer.cykonhy.com/sky/goods/default.jpg',
          cid: '',
          cname: '',
          spec: '',
          status: '',
          describes: '',
          created: '',
          updated: ''
        },
        dataRule: {
          title: [
            {required: true, message: '商品标题不能为空', trigger: 'blur'}
          ],
          sellPoint: [
            {required: true, message: '商品卖点不能为空', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '商品价格，单位为：分不能为空', trigger: 'blur'},
          ],
          costPrice: [
            {required: true, message: '商品成本价格，单位为：分不能为空', trigger: 'blur'},
          ],
          num: [
            {required: true, message: '库存数量不能为空', trigger: 'blur'},
          ],
          spec: [
            {required: true, message: '商品规格不能为空', trigger: 'blur'},
          ],
          image: [
            {required: true, message: '商品图片不能为空', trigger: 'blur'}
          ],
          cid: [
            {required: true, message: '所属类目，叶子类目不能为空', trigger: 'blur'}
          ],
          describes: [
            {required: true, message: '商品描述不能为空', trigger: 'blur'}
          ]
        },
        /** 上传单位Logo相关**/
        uploadVisible: false,
      }
    },
    components: {
      ItemUploadImage
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/wka/item/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.title = data.wkaItem.title
                this.dataForm.sellPoint = data.wkaItem.sellPoint
                this.dataForm.price = this.regFenToYuan(data.wkaItem.price)
                this.dataForm.costPrice = this.regFenToYuan(data.wkaItem.costPrice)
                this.dataForm.num = data.wkaItem.num
                this.dataForm.spec = data.wkaItem.spec
                this.dataForm.barcode = data.wkaItem.barcode
                this.dataForm.image = data.wkaItem.image
                this.dataForm.cid = data.wkaItem.cid
                this.dataForm.cname = data.wkaItem.cname
                this.dataForm.status = data.wkaItem.status
                this.dataForm.describes = data.wkaItem.describes
                this.dataForm.created = data.wkaItem.created
                this.dataForm.updated = data.wkaItem.updated
              }
            })
          }
        })
        this.initItemCat()
      },
      initItemCat () {
        this.$http({
          url: this.$http.adornUrl('/wka/item-cat/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': 1,
            'limit': 10000
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.itemsCatList = data.page.list
          }
        })
      },
      // 筛选类型
      onSelectType (val) {
        let obj = this.itemsCatList.find((item) => {
          return item.id === val;
        });
        this.dataForm.cname = obj.name
      },
      // 上传文件
      uploadHandle () {
        this.uploadVisible = true
        this.$nextTick(() => {
          this.$refs.itemUploadImage.init()
        })
      },
      // 上传文件
      refreshFileUrl (filePath) {
        this.dataForm.image = filePath
        this.uploadVisible = false
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let itemPrice = this.regYuanToFen(this.dataForm.price,100)
            let itemCostPrice = this.regYuanToFen(this.dataForm.costPrice,100)
            this.$http({
              url: this.$http.adornUrl(`/wka/item/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'sellPoint': this.dataForm.sellPoint,
                'price': itemPrice,
                'costPrice': itemCostPrice,
                'num': this.dataForm.num,
                'barcode': this.dataForm.barcode,
                'image': this.dataForm.image,
                'cid': this.dataForm.cid,
                'cname': this.dataForm.cname,
                'spec': this.dataForm.spec,
                'status': this.dataForm.status,
                'describes': this.dataForm.describes,
                'created': this.dataForm.created,
                'updated': this.dataForm.updated
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
      },
      /**
       * 分转化为元 - 正则解决精度
       * @param fen
       * @returns {boolean|string}
       */
      regFenToYuan (fen) {
        var num = fen
        num = fen * 0.01
        num += ''
        var reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g
        num = num.replace(reg, '$1')
        num = this.toDecimal2(num)
        return num
      },
      /**
       * 元转分 - 解决精度问题 yuan:要转换的钱，单位元； digit：转换倍数
       * @param yuan
       * @param digit
       * @returns {number}
       */
      regYuanToFen (yuan, digit) {
        var m = 0,
          s1 = yuan.toString(),
          s2 = digit.toString();
        try {
          m += s1.split(".")[1].length
        } catch (e) {
        }
        try {
          m += s2.split(".")[1].length
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
      },
      toDecimal2 (x) {
        var f = parseFloat(x)
        if (isNaN(f)) {
          return false
        }
        var f = Math.round(x * 100) / 100
        var s = f.toString()
        var rs = s.indexOf('.')
        if (rs < 0) {
          rs = s.length
          s += '.'
        }
        while (s.length <= rs + 2) {
          s += '0'
        }
        return s
      },
      /**
       * 判断是否最多两位小数，正负均可
       * @param inputNumber
       * @returns {*|boolean}
       */
      checkTwoPointNum (inputNumber){
        var partten = /^-?\d+\.?\d{0,2}$/;
        return partten.test(inputNumber)
      },
      /**
       * 强制保留2位小数，如：2，会在2后面补上00.即2.00
       * @param x
       * @returns {string|boolean}
       */
      toDecimal2 (x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      }
    }
  }
</script>
