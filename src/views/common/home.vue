<template>
  <div class="mod-demo-echarts">
    <div>
      <el-row :gutter="12" class="margin-bottom-20">
        <el-col :xs="12" :sm="12" :md="4">
          <el-tooltip class="item" effect="light" content="点击查看审核用户列表" placement="top">
            <el-card shadow="never" @click.native="firmList('1')">
              <div slot="header">
                <h3 class="text-info">已审核用户 <i class="el-icon-star-on"/></h3>
              </div>
              <h1 class="h1 text-primary">{{statisticInfo.totaluser}} 位</h1>
            </el-card>
          </el-tooltip>
        </el-col>
        <el-col :xs="12" :sm="12" :md="4">
          <el-card shadow="never" @click.native="firmList('2')">
            <div slot="header">
              <h3 class="text-info">未审核用户<i class="el-icon-s-help"/></h3>
            </div>
            <h1 class="h1 text-black">{{statisticInfo.reviewUser}} 位</h1>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :md="4">
          <el-card shadow="never" @click.native="firmList('3')">
            <div slot="header">
              <h3 class="text-info">今日订单数量<i class="el-icon-s-cooperation"/></h3>
            </div>
            <h1 class="h1 text-primary">{{statisticInfo.todayOrder}} 个</h1>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :md="4">
          <el-card shadow="never" @click.native="firmList('3')">
            <div slot="header">
              <h3 class="text-info">累计订单数量<i class="el-icon-s-opportunity"/></h3>
            </div>
            <h1 class="h1 text-success">{{statisticInfo.totalOrder}} 个</h1>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :md="4">
          <el-card shadow="never" @click.native="firmList('3')">
            <div slot="header">
              <h3 class="text-info">今日利润<i class="el-icon-s-flag"/></h3>
            </div>
            <h1 class="h1 text-warning">{{regFenToYuan(statisticInfo.todayInterest)}} 元</h1>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :md="4">
          <el-card shadow="never" @click.native="firmList('3')">
            <div slot="header">
              <h3 class="text-info">总利润<i class="el-icon-s-data"/></h3>
            </div>
            <h1 class="h1 text-danger">{{regFenToYuan(statisticInfo.totalInterest)}} 元</h1>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- echarts图标展示 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartLineBox" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 上部系统消息 -->
    <el-row :gutter="20" class="margin-top-20">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card shadow="never" body-style="padding:6px 15px;">
          <h3 slot="header" class="text-gray"><i class="el-icon-time font-size-20 margin-right-10"></i>系统概况</h3>
          <el-form ref="form" class="details-form" label-width="120px" label-position="left">
            <template>
              <el-form-item label="用户头像">
                <div class="demo-type">
                  <el-avatar :size="60" @error="errorHandler">
                    <img :src="systemInfo.avatar"/>
                  </el-avatar>
                </div>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="当前用户" key="当前用户">
                <span>{{systemInfo.nickname}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="系统名称" key="系统名称">
                <span>高波配送管理系统</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="服务器IP" key="服务器IP">
                <span>{{systemInfo.serverIp}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="操作系统" key="操作系统">
                <span>{{systemInfo.serverOS}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="当前时间" key="当前时间">
                <span>{{systemInfo.currentDate}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="登录次数" key="登录次数">
                <span>-</span>
              </el-form-item>
            </template>
          </el-form>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <el-card shadow="never" body-style="padding:0; overflow: hidden;">
          <h3 slot="header" class="text-gray"><i class="el-icon-bell font-size-20 margin-right-10"></i>最新消息
            <router-link to="/sys-message" style="float:right;"><a type="primary">查看更多<i
              class="el-icon-d-arrow-right"></i></a></router-link>
          </h3>
          <el-table :data="tableData" height="365">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column label="分类" width="180">
              <template slot-scope="scope">
                <el-tag size="small" type="success">
                  <span class="col-cont" v-html="messageTypeformatter(scope.row)"></span>
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="title" header-align="center" align="center" label="标题">
            </el-table-column>
            <el-table-column label="内容">
              <template slot-scope="scope">
                <a href="javascript:void(0)" @click="toMessageDetails(scope.row)"><span class="router-link">{{scope.row.content !=null ? scope.row.content:'无内容'}}</span></a>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        errorHandler() {
          return true
        },
        statisticInfo: {
          totaluser: 0,
          reviewUser: 0,
          totalOrder: 0,
          todayOrder: 0,
          totalInterest: 0,
          todayInterest: 0
        },
        sunnyImg: require("../../assets/img/weather/cloudy_128.png"),
        cloudyImg: require("../../assets/img/weather/cloudy_128.png"),
        showersImg: require("../../assets/img/weather/cloudy_128.png"),
        systemInfo: {
          "id": 1051,
          "createTime": 1586410687669,
          "updateTime": 1586410687669,
          "status": 1,
          "userId": 18,
          "username": "cuixinfu",
          "nickname": "崔辛福",
          "type": 1,
          "operationType": 1,
          "country": null,
          "area": null,
          "ip": "175.0.39.201",
          "loginLastTime": "2020-04-01 15:00:21",
          "currentDate": "2020-04-01 15:00:21",
          "loginLastIp": "1.119.148.124",
          "serverIp": "127.0.0.1",
          "serverOS": "Linux amd64",
          "loginCount": "暂为统计"
        },
        tableData: [
          {
            "id": 1,
            "createTime": "2020-04-01 15:00:21",
            "updateTime": null,
            "status": 1,
            "fromType": null,
            "fromUserId": null,
            "fromNickName": "",
            "type": 1,
            "groupType": 0,
            "messageType": 221,
            "title": "任务报警",
            "content": "有新的任务报警21586409846925446已提交，请前往审核。",
            "referenceId": 374,
            "deleted": null,
            "notifyCode": "3a4cbded5d2a4dc0af6713c0c220476b",
            "count": null,
            "types": null,
            "readTime": null,
            "readStatus": 1,
            "keyword": null,
            "beginTime": null,
            "endTime": null,
            "messageUserId": 5366,
            "toNickName": ""
          }
        ],
        messageTypeEnum: {
          1: {
            name: '系统通知',
            link: '/sys-messagee'
          },
          2: {
            name: '系统公告',
            link: '/sys-message'
          },
          3: {
            name: '服务提醒',
            link: '/sys-message'
          },
          4: {
            name: '交易提醒',
            link: '/sys-message'
          }
        },
        readMsgParams: {
          id: '',
          messageUserId: ''
        },
        chartLine: null,
      }
    },
    mounted() {
      this.initHomestatistics()
      this.initHomeEcharts()
      this.initMessage()
    },
    activated() {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.chartLine) {
        this.chartLine.resize()
      }
    },
    methods: {
      initHomestatistics() {
        this.$http({
          url: this.$http.adornUrl('/home/statis'),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.statisticInfo.totaluser = data.data.totaluser
            this.statisticInfo.reviewUser = data.data.reviewUser
            this.statisticInfo.totalOrder = data.data.totalOrder
            this.statisticInfo.todayOrder = data.data.todayOrder
            this.statisticInfo.totalInterest = data.data.totalInterest
            this.statisticInfo.todayInterest = data.data.todayInterest
          } else {

          }
        })
      },
      initHomeEcharts() {
        this.$http({
          url: this.$http.adornUrl('/home/echarts'),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
            var lineDate = data.lineDate
            var userData = data.userData
            var orderData = data.orderData
            this.initChartLine(lineDate, userData, orderData)
          } else {

          }
        })
      },
      initMessage() {
        this.$http({
          url: this.$http.adornUrl('/sys/message/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': 1,
            'limit': 4,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.tableData = data.page.list
          }
        })
        this.$http({
          url: this.$http.adornUrl('/home/systemInfo'),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.systemInfo = data.systemInfo
          }
        })
      },
      firmList(type) {
        if (type === '1') {
          this.$router.push({path: `/home`})
        } else if (type === '2') {
          this.$router.push({path: `/home`})
        } else if (type === '3') {
          this.$router.push({path: `/home`})
        } else {
          this.$router.push({path: `/home`})
        }
      },
      messageTypeformatter(row) {
        let messageTypeName = this.messageTypeEnum[row.type]
        if (messageTypeName === null || messageTypeName === '' || messageTypeName === undefined) {
          return row.title
        }
        return messageTypeName.name
      },
      toMessageDetails(row) {
        console.log("==========查看消息详情==========")
      },
      // 折线图
      initChartLine(lineDate, userData, orderData) {
        var userLineData = userData.lineCount
        var orderLineData = orderData.lineCount
        var option = {
          'title': {
            'text': '统计图表',
          },
          'tooltip': {
            'trigger': 'axis'
          },
          'legend': {
            'data': ['用户数量', '订单数量']
          },
          'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '3%',
            'containLabel': true
          },
          'toolbox': {
            'feature': {
              'saveAsImage': {}
            }
          },
          'xAxis': {
            'type': 'category',
            'boundaryGap': false,
            'data': lineDate
          },
          'yAxis': {
            'type': 'value'
          },
          'series': [
            {
              'name': '用户数量',
              'type': 'line',
              'stack': '总量',
              'data': userLineData
            },
            {
              'name': '订单数量',
              'type': 'line',
              'stack': '总量',
              'data': orderLineData
            }
          ]
        }
        this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
        this.chartLine.setOption(option)
        window.addEventListener('resize', () => {
          this.chartLine.resize()
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
    },
  }
</script>
<style lang="scss">
  .mod-home {
    line-height: 1.5;
  }

  .mod-demo-echarts {
    > .el-alert {
      margin-bottom: 10px;
    }

    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;

      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }

    .chart-box {
      min-height: 400px;
    }
  }

  .el-form-item {
    margin-bottom: 4px;
  }

  .el-card__header {
    padding: 0px 20px !important;
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>


