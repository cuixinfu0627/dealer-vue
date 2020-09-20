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
      <!--<el-date-picker size="medium" v-model="dateValue" type="daterange" class="margin-right-20" unlink-panels
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                          :picker-options="pickerOptions" @change="chooseTimeRange" format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd">
          </el-date-picker>-->
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="请输入用户标签" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="order"
        header-align="center"
        align="center"
        width="180px"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="userTag"
        header-align="center"
        align="center"
        label="标签">
        <template slot-scope="scope">
          <el-tag :key="scope.row.tag" type="success">{{scope.row.userTag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalMoney"
        header-align="center"
        align="center"
        :formatter="handlderPrice"
        label="总金额">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './order-tag-add-or-update'

  export default {
    data() {
      return {
        options: [{
          status: '',
          label: '全部状态'
        }, {
          status: '1',
          label: '待确认'
        }, {
          status: '2',
          label: '已确认'
        }, {
          status: '3',
          label: '已取消'
        }],
        dateValue: '',
        pickerOptions: {
          shortcuts: [{
            text: '今日',
            onClick(picker) {
              const end = new Date()
              const begin = new Date()
              picker.$emit('pick', [begin, end])
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const begin = new Date()
              begin.setTime(begin.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [begin, end])
            }
          },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const begin = new Date()
                begin.setTime(begin.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [begin, end])
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const begin = new Date()
                begin.setTime(begin.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [begin, end])
              }
            }
          ]
        },
        dataForm: {
          status:'2',
          key: '',
          starTime: '',
          endTime: ''
        },
        dataList: [],
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        userTagForm: {
          order: '',
          userTag: '',
          totalMoney: '',
          status: '',
          key: '',
          starTime: '',
          endTime: ''
        },
      }
    },
    components: {
      AddOrUpdate
    },
    activated() {
      this.getDataList()
    },
    methods: {
      selectStatus(value) {
        this.dataForm.status = value
        this.getDataList()
      },
      handlderPrice(row, column) {
        var value = this.regFenToYuan(row.totalMoney);
        return value + " 元"
      },
      chooseTimeRange(t) {
        if (t === null || t === '') {
          this.dataForm.starTime = ''
          this.dataForm.endTime = ''
          return
        }
        this.dateValue = t
        var starTime = this.dateValue[0]
        var endTime = this.dateValue[1]
        if (starTime === endTime) {
          this.dataForm.endTime = endTime + ' 23:59:00'
        } else {
          this.dataForm.endTime = endTime + ' 00:00:00'
        }
        this.dataForm.starTime = starTime + ' 00:00:00'
        this.getDataList()
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/wka/order-tag/groupByTag'),
          method: 'get',
          params: this.$http.adornParams({
            'page': 1,
            'limit': 100000,
            'status': this.dataForm.status,
            'key': this.dataForm.key,
            'starTime': this.dataForm.starTime,
            'endTime': this.dataForm.endTime
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.orderTagList
          } else {
            this.dataList = []
          }
          this.dataListLoading = false
        })
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle(orderTag) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.userTagForm.userTag = orderTag.userTag
          this.userTagForm.totalMoney = orderTag.totalMoney
          this.userTagForm.status = this.dataForm.status
          this.userTagForm.starTime = this.dataForm.starTime
          this.userTagForm.endTime = this.dataForm.endTime
          this.$refs.addOrUpdate.init(this.userTagForm)
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
    }
  }
</script>
