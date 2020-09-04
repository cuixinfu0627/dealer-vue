<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-select v-model="dataForm.status" filterable placeholder="状态" @change="selectStatus">
        <el-option
          v-for="item in options"
          :key="item.status"
          :label="item.label"
          :value="item.status">
        </el-option>
      </el-select>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="请输入商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('wka:item:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('wka:item:delete')" type="danger" @click="deleteHandle()"
                   :disabled="dataListSelections.length <= 0">批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        label="名称">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="300"
            trigger="hover"
            :disabled="scope.row.title.length <= 15">
            <div>{{ scope.row.title }}</div>
            <span slot="reference" v-if="scope.row.title.length <= 15">{{scope.row.title}}</span>
            <span slot="reference" v-if="scope.row.title.length > 15">{{scope.row.title.substr(0, 15) + "..."}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="image"
        header-align="center"
        align="center"
        label="图片">
        <template slot-scope="scope">
          <div class="col-sm-3">
            <el-image style="width: 100px; height: 50px" :src="scope.row.image" fit="contain"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="sellPoint"
        header-align="center"
        align="center"
        label="卖点">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="300"
            trigger="hover"
            :disabled="scope.row.sellPoint.length <= 15">
            <div>{{ scope.row.sellPoint }}</div>
            <span slot="reference" v-if="scope.row.sellPoint.length <= 15">{{scope.row.sellPoint}}</span>
            <span slot="reference" v-if="scope.row.sellPoint.length > 15">{{scope.row.sellPoint.substr(0, 15) + "..."}}</span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        :formatter="handlderPrice"
        label="零售价">
      </el-table-column>
      <el-table-column
        prop="costPrice"
        header-align="center"
        align="center"
        :formatter="handlderCostPrice"
        label="成本价">
      </el-table-column>
      <el-table-column
        prop="num"
        header-align="center"
        align="center"
        label="库存量">
      </el-table-column>
      <el-table-column
        prop="spec"
        header-align="center"
        align="center"
        label="规格"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="cname"
        header-align="center"
        align="center"
        label="分类">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status===1">正常</el-tag>
          <el-tag type="warning" v-else-if="scope.row.status===2">下架</el-tag>
          <el-tag type="danger" v-else-if="scope.row.status===3">删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="updated"
        header-align="center"
        align="center"
        label="更新时间"
        width="160">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './item-add-or-update'

  export default {
    data() {
      return {
        options: [{
          status: '',
          label: '全部状态'
        }, {
          status: '1',
          label: '正常'
        }, {
          status: '2',
          label: '下架'
        }, {
          status: '3',
          label: '删除'
        }],
        dataForm: {
          status,
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated() {
      this.getDataList()
    },
    methods: {
      handlderPrice(row, column) {
        var value = this.regFenToYuan(row.price);
        return value + " 元"
      },
      handlderCostPrice(row, column) {
        var value = this.regFenToYuan(row.costPrice);
        return value + " 元"
      },
      selectStatus(value) {
        this.dataForm.status = value
        this.getDataList()
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/wka/item/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'status': this.dataForm.status,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle(id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/wka/item/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      regFenToYuan(fen) {
        var num = fen;
        num = fen * 0.01;
        num += '';
        var reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
        num = num.replace(reg, '$1');
        num = this.toDecimal2(num)
        return num
      },
      regYuanToFen(yuan, digit) {
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
      toDecimal2(x) {
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
      },
      priceUppercase(money) {
        var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
        var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
        var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
        var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
        //var cnInteger = "整"; //整数金额时后面跟的字符
        var cnIntLast = "元"; //整型完以后的单位
        var maxNum = 999999999999999.9999; //最大处理的数字

        var IntegerNum; //金额整数部分
        var DecimalNum; //金额小数部分
        var ChineseStr = ""; //输出的中文金额字符串
        var parts; //分离金额后用的数组，预定义
        if (money == "") {
          return "";
        }
        money = parseFloat(money);
        if (money >= maxNum) {
          // $.alert('超出最大处理数字');
          return "";
        }
        if (money == 0) {
          //ChineseStr = cnNums[0]+cnIntLast+cnInteger;
          ChineseStr = cnNums[0] + cnIntLast
          //document.getElementById("show").value=ChineseStr;
          return ChineseStr;
        }
        money = money.toString(); //转换为字符串
        if (money.indexOf(".") == -1) {
          IntegerNum = money;
          DecimalNum = '';
          cnIntLast = '元整'
        } else {
          parts = money.split(".");
          IntegerNum = parts[0];
          DecimalNum = parts[1].substr(0, 4);
        }
        let zeroCount = 0;
        let IntLen = 0;
        let n;
        let p;
        let m;
        let q;
        let decLen = 0;
        if (parseInt(IntegerNum, 10) > 0) {//获取整型部分转换
          zeroCount = 0;
          IntLen = IntegerNum.length;
          for (var i = 0; i < IntLen; i++) {
            n = IntegerNum.substr(i, 1);
            p = IntLen - i - 1;
            q = p / 4;
            m = p % 4;
            if (n == "0") {
              zeroCount++;
            } else {
              if (zeroCount > 0) {
                ChineseStr += cnNums[0];
              }
              zeroCount = 0; //归零
              ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
              ChineseStr += cnIntUnits[q];
            }
          }
          ChineseStr += cnIntLast;
          //整型部分处理完毕
        }
        if (DecimalNum != '') {//小数部分
          decLen = DecimalNum.length;
          for (i = 0; i < decLen; i++) {
            n = DecimalNum.substr(i, 1);
            if (n != '0') {
              ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
          }
        }
        if (ChineseStr == '') {
          //ChineseStr += cnNums[0]+cnIntLast+cnInteger;
          ChineseStr += cnNums[0] + cnIntLast;
        }/* else if( DecimalNum == '' ){
              ChineseStr += cnInteger;
              ChineseStr += cnInteger;
          } */
        return ChineseStr;
      }
    }
  }
</script>
