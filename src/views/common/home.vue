
<template>
  <div class="mod-demo-echarts">
    <!-- 上部系统消息 -->
    <el-row :gutter="20" class="margin-top-20">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card shadow="never" body-style="padding:6px 15px;">
          <h3 slot="header" class="text-gray"><i class="el-icon-time font-size-20 margin-right-10"></i>系统概况</h3>
          <el-form ref="form" class="details-form" label-width="120px" label-position="left">
            <template>
              <el-form-item label="系统名称" key="系统名称">
                <span>经销商-管理系统</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="服务器IP" key="服务器IP">
                <span>{{loginLog.serverIp}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="操作系统" key="操作系统">
                <span>{{loginLog.serverOS}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="当前用户" key="当前用户">
                <span>{{loginLog.nickname}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="上次登录IP" key="上次登录IP">
                <span>{{loginLog.loginLastIp}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="上次登录时间" key="上次登录时间">
                <span>{{loginLog.loginLastTime}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="本次登录IP" key="本次登录IP">
                <span>{{loginLog.ip}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="登录次数" key="登录次数">
                <span>{{loginLog.loginCount}} 次</span>
              </el-form-item>
            </template>
          </el-form>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <el-card shadow="never" body-style="padding:0; overflow: hidden;">
          <h3 slot="header" class="text-gray"><i class="el-icon-bell font-size-20 margin-right-10"></i>最新消息<router-link to="/sys-message-user" style="float:right;"><a type="primary">查看更多<i class="el-icon-d-arrow-right"></i></a></router-link></h3>
          <el-table :data="tableData" height="365">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column label="类型" width="180">
              <template slot-scope="scope">
                <el-tag size="small" type="success">
                  <span class="col-cont" v-html="messageTypeformatter(scope.row)"></span>
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="内容">
              <template slot-scope="scope">
                <a href="javascript:void(0)" @click="toMessageDetails(scope.row)"><span class="router-link">{{scope.row.content !=null ? scope.row.content:'无内容'}}</span></a>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="180">
              <template slot-scope="scope">
                <el-tag type="warning" v-if="scope.row.readStatus===1">未读</el-tag>
                <el-tag type="info" v-else-if="scope.row.readStatus===2">已读</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- echarts图标展示 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartLineBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div id="J_chartBarBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartGauge" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartScatterBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartLinefunel" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartPieBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <!--      <el-col :span="12">-->
      <!--        <el-card>-->
      <!--          <div id="J_chartRadarBox" class="chart-box"></div>-->
      <!--        </el-card>-->
      <!--      </el-col>-->
    </el-row>

  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data () {
      return {
        sunnyImg: require("../../assets/img/weather/cloudy_128.png"),
        cloudyImg: require("../../assets/img/weather/cloudy_128.png"),
        showersImg: require("../../assets/img/weather/cloudy_128.png"),
        loginLog: {
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
          "loginLastIp": "1.119.148.124",
          "serverIp": "127.0.0.1",
          "serverOS": "Linux amd64",
          "loginCount": 25
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
          },
          {
            "id": 2,
            "createTime": "2020-04-01 15:00:21",
            "updateTime": null,
            "status": 1,
            "fromType": null,
            "fromUserId": null,
            "fromNickName": "",
            "type": 2,
            "groupType": 0,
            "messageType": 221,
            "title": "设备告警",
            "content": "有新的设备告警请及时查看。",
            "referenceId": 339,
            "deleted": null,
            "notifyCode": "0cd6cacb139846219fb0287c7c46b2a4",
            "count": null,
            "types": null,
            "readTime": null,
            "readStatus": 1,
            "keyword": null,
            "beginTime": null,
            "endTime": null,
            "messageUserId": 5029,
            "toNickName": ""
          },
          {
            "id": 3,
            "createTime": "2020-04-01 15:00:21",
            "updateTime": null,
            "status": 1,
            "fromType": null,
            "fromUserId": null,
            "fromNickName": "",
            "type": 3,
            "groupType": 0,
            "messageType": 221,
            "title": "超时告警",
            "content": "有新的超时告警，请前往审核。",
            "referenceId": 339,
            "deleted": null,
            "notifyCode": "0cd6cacb139846219fb0287c7c46b2a4",
            "count": null,
            "types": null,
            "readTime": null,
            "readStatus": 1,
            "keyword": null,
            "beginTime": null,
            "endTime": null,
            "messageUserId": 5029,
            "toNickName": ""
          },
          {
            "id": 4,
            "createTime": "2020-04-01 15:00:21",
            "updateTime": null,
            "status": 1,
            "fromType": null,
            "fromUserId": null,
            "fromNickName": "",
            "type": 3,
            "groupType": 0,
            "messageType": 221,
            "title": "任务事故",
            "content": "有新的超时告警，请前往审核。",
            "referenceId": 339,
            "deleted": null,
            "notifyCode": "0cd6cacb139846219fb0287c7c46b2a4",
            "count": null,
            "types": null,
            "readTime": null,
            "readStatus": 1,
            "keyword": null,
            "beginTime": null,
            "endTime": null,
            "messageUserId": 5029,
            "toNickName": ""
          }
        ],
        messageTypeEnum: {
          1: {
            name: '任务报警',
            link: '/user/enterprise'
          },
          2: {
            name: '设备告警',
            link: '/user/designer'
          },
          3: {
            name: '超时告警',
            link: '/project/demand'
          },
          4: {
            name: '超时告警',
            link: '/project/demand'
          }
        },
        readMsgParams: {
          id: '',
          messageUserId: ''
        },

        chartLine: null,
        chartBar: null,
        chartPie: null,
        chartScatter: null,
        chartFunel: null,
        chartRadar: null,
        chartGauge: null,
      }
    },
    mounted () {
      this.initChartLine()
      this.initChartBar()
      this.initChartPie()
      this.initChartScatter()
      this.initChartFunel()
      // this.initChartRadar()
      this.initChartGauge()
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.chartLine) {
        this.chartLine.resize()
      }
      if (this.chartBar) {
        this.chartBar.resize()
      }
      if (this.chartPie) {
        this.chartPie.resize()
      }
      if (this.chartScatter) {
        this.chartScatter.resize()
      }
      if (this.chartFunel) {
        this.chartFunel.resize()
      }
      if (this.chartRadar) {
        this.chartRadar.resize()
      }
      if (this.chartGauge) {
        this.chartGauge.resize()
      }
    },
    methods: {
      messageTypeformatter (row) {
        let messageTypeName = this.messageTypeEnum[row.messageType]
        if (messageTypeName === null || messageTypeName === '' || messageTypeName === undefined) {
          return row.title
        }
        return messageTypeName.name
      },
      toMessageDetails (row) {
        console.log("==========查看消息详情==========")
      },
      // 折线图
      initChartLine () {
        var option = {
          'title': {
            'text': '设备报警故障',
            'subtext': '纯属虚构'
          },
          'tooltip': {
            'trigger': 'axis'
          },
          'legend': {
            'data': [ '设备接入', '设备报警', '设备故障', '设备离线', '设备在线' ]
          },
          'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '3%',
            'containLabel': true
          },
          'toolbox': {
            'feature': {
              'saveAsImage': { }
            }
          },
          'xAxis': {
            'type': 'category',
            'boundaryGap': false,
            'data': [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
          },
          'yAxis': {
            'type': 'value'
          },
          'series': [
            {
              'name': '设备接入',
              'type': 'line',
              'stack': '总量',
              'data': [ 120, 132, 101, 134, 90, 230, 210 ]
            },
            {
              'name': '设备报警',
              'type': 'line',
              'stack': '总量',
              'data': [ 220, 182, 191, 234, 290, 330, 310 ]
            },
            {
              'name': '设备故障',
              'type': 'line',
              'stack': '总量',
              'data': [ 150, 232, 201, 154, 190, 330, 410 ]
            },
            {
              'name': '设备离线',
              'type': 'line',
              'stack': '总量',
              'data': [ 320, 332, 301, 334, 390, 330, 320 ]
            },
            {
              'name': '设备在线',
              'type': 'line',
              'stack': '总量',
              'data': [ 820, 932, 901, 934, 1290, 1330, 1320 ]
            }
          ]
        }
        this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
        this.chartLine.setOption(option)
        window.addEventListener('resize', () => {
          this.chartLine.resize()
        })
      },
      // 柱状图
      initChartBar () {
        var option = {
          title: {
            text: '设备报警故障',
            subtext: '纯属虚构'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
          },
          legend: {
            data: ['报警', '故障', '危险品', '隐患', '搜索引擎', '百度', '谷歌', '必应', '其他']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: { }
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '报警',
              type: 'bar',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '故障',
              type: 'bar',
              stack: '广告',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '危险品',
              type: 'bar',
              stack: '广告',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '隐患',
              type: 'bar',
              stack: '广告',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '搜索引擎',
              type: 'bar',
              data: [862, 1018, 964, 1026, 1679, 1600, 1570],
              markLine: {
                lineStyle: {
                  normal: {
                    type: 'dashed'
                  }
                },
                data: [
                  [{ type: 'min' }, { type: 'max' }]
                ]
              }
            },
            {
              name: '百度',
              type: 'bar',
              barWidth: 5,
              stack: '搜索引擎',
              data: [620, 732, 701, 734, 1090, 1130, 1120]
            },
            {
              name: '谷歌',
              type: 'bar',
              stack: '搜索引擎',
              data: [120, 132, 101, 134, 290, 230, 220]
            },
            {
              name: '必应',
              type: 'bar',
              stack: '搜索引擎',
              data: [60, 72, 71, 74, 190, 130, 110]
            },
            {
              name: '其他',
              type: 'bar',
              stack: '搜索引擎',
              data: [62, 82, 91, 84, 109, 110, 120]
            }
          ]
        }
        this.chartBar = echarts.init(document.getElementById('J_chartBarBox'))
        this.chartBar.setOption(option)
        window.addEventListener('resize', () => {
          this.chartBar.resize()
        })
      },
      // 饼状图
      initChartPie () {
        var weatherIcons = {
          'Sunny': this.sunnyImg, //'../../assets/img/weather/cloudy_128.png',
          'Cloudy': this.cloudyImg, //'../../assets/img/weather/cloudy_128.png',
          'Showers': this.showersImg, //'../../assets/img/weather/showers_128.png'
        };

        var option = {
          title: {
            text: '天气情况统计',
            subtext: '虚构数据',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          toolbox: {
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['西凉', '益州', '兖州', '荆州', '幽州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {
                  value: 1548,
                  name: '幽州',
                  label: {
                    formatter: [
                      '{title|{b}}{abg|}',
                      '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                      '{hr|}',
                      '  {Sunny|}{value|202}{rate|55.3%}',
                      '  {Cloudy|}{value|142}{rate|38.9%}',
                      '  {Showers|}{value|21}{rate|5.8%}'
                    ].join('\n'),
                    backgroundColor: '#eee',
                    borderColor: '#777',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                      title: {
                        color: '#eee',
                        align: 'center'
                      },
                      abg: {
                        backgroundColor: '#333',
                        width: '100%',
                        align: 'right',
                        height: 25,
                        borderRadius: [4, 4, 0, 0]
                      },
                      Sunny: {
                        height: 30,
                        align: 'left',
                        backgroundColor: {
                          image: weatherIcons.Sunny
                        }
                      },
                      Cloudy: {
                        height: 30,
                        align: 'left',
                        backgroundColor: {
                          image: weatherIcons.Cloudy
                        }
                      },
                      Showers: {
                        height: 30,
                        align: 'left',
                        backgroundColor: {
                          image: weatherIcons.Showers
                        }
                      },
                      weatherHead: {
                        color: '#333',
                        height: 24,
                        align: 'left'
                      },
                      hr: {
                        borderColor: '#777',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                      },
                      value: {
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: 'left'
                      },
                      valueHead: {
                        color: '#333',
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: 'center'
                      },
                      rate: {
                        width: 40,
                        align: 'right',
                        padding: [0, 10, 0, 0]
                      },
                      rateHead: {
                        color: '#333',
                        width: 40,
                        align: 'center',
                        padding: [0, 10, 0, 0]
                      }
                    }
                  }
                },
                {value: 535, name: '荆州'},
                {value: 510, name: '兖州'},
                {value: 634, name: '益州'},
                {value: 735, name: '西凉'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        this.chartPie = echarts.init(document.getElementById('J_chartPieBox'))
        this.chartPie.setOption(option)
        window.addEventListener('resize', () => {
          this.chartPie.resize()
        })
      },
      // 散点图
      initChartScatter () {
        var option = {
          backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
            { offset: 0, color: '#f7f8fa' },
            { offset: 1, color: '#cdd0d5' }
          ]),
          title: {
            text: '1990 与 2015 年各国家人均寿命与 GDP'
          },
          legend: {
            right: 10,
            data: ['1990', '2015']
          },
          xAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          yAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            scale: true
          },
          series: [
            {
              name: '1990',
              data: [
                [28604, 77, 17096869, 'Australia', 1990],
                [31163, 77.4, 27662440, 'Canada', 1990],
                [1516, 68, 1154605773, 'China', 1990],
                [13670, 74.7, 10582082, 'Cuba', 1990],
                [28599, 75, 4986705, 'Finland', 1990],
                [29476, 77.1, 56943299, 'France', 1990],
                [31476, 75.4, 78958237, 'Germany', 1990],
                [28666, 78.1, 254830, 'Iceland', 1990],
                [1777, 57.7, 870601776, 'India', 1990],
                [29550, 79.1, 122249285, 'Japan', 1990],
                [2076, 67.9, 20194354, 'North Korea', 1990],
                [12087, 72, 42972254, 'South Korea', 1990],
                [24021, 75.4, 3397534, 'New Zealand', 1990],
                [43296, 76.8, 4240375, 'Norway', 1990],
                [10088, 70.8, 38195258, 'Poland', 1990],
                [19349, 69.6, 147568552, 'Russia', 1990],
                [10670, 67.3, 53994605, 'Turkey', 1990],
                [26424, 75.7, 57110117, 'United Kingdom', 1990],
                [37062, 75.4, 252847810, 'United States', 1990]
              ],
              type: 'scatter',
              symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2
              },
              label: {
                emphasis: {
                  show: true,
                  formatter: function (param) {
                    return param.data[3]
                  },
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(120, 36, 50, 0.5)',
                  shadowOffsetY: 5,
                  color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                    { offset: 0, color: 'rgb(251, 118, 123)' },
                    { offset: 1, color: 'rgb(204, 46, 72)' }
                  ])
                }
              }
            },
            {
              name: '2015',
              data: [
                [44056, 81.8, 23968973, 'Australia', 2015],
                [43294, 81.7, 35939927, 'Canada', 2015],
                [13334, 76.9, 1376048943, 'China', 2015],
                [21291, 78.5, 11389562, 'Cuba', 2015],
                [38923, 80.8, 5503457, 'Finland', 2015],
                [37599, 81.9, 64395345, 'France', 2015],
                [44053, 81.1, 80688545, 'Germany', 2015],
                [42182, 82.8, 329425, 'Iceland', 2015],
                [5903, 66.8, 1311050527, 'India', 2015],
                [36162, 83.5, 126573481, 'Japan', 2015],
                [1390, 71.4, 25155317, 'North Korea', 2015],
                [34644, 80.7, 50293439, 'South Korea', 2015],
                [34186, 80.6, 4528526, 'New Zealand', 2015],
                [64304, 81.6, 5210967, 'Norway', 2015],
                [24787, 77.3, 38611794, 'Poland', 2015],
                [23038, 73.13, 143456918, 'Russia', 2015],
                [19360, 76.5, 78665830, 'Turkey', 2015],
                [38225, 81.4, 64715810, 'United Kingdom', 2015],
                [53354, 79.1, 321773631, 'United States', 2015]
              ],
              type: 'scatter',
              symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2
              },
              label: {
                emphasis: {
                  show: true,
                  formatter: function (param) {
                    return param.data[3]
                  },
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(25, 100, 150, 0.5)',
                  shadowOffsetY: 5,
                  color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                    { offset: 0, color: 'rgb(129, 227, 238)' },
                    { offset: 1, color: 'rgb(25, 183, 207)' }
                  ])
                }
              }
            }
          ]
        }
        this.chartPie = echarts.init(document.getElementById('J_chartScatterBox'))
        this.chartPie.setOption(option)
        window.addEventListener('resize', () => {
          this.chartPie.resize()
        })
      },
      // 漏斗图
      initChartFunel () {
        var option = {
          title: {
            text: '漏斗图',
            subtext: '纯属虚构'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          legend: {
            data: ['展现','点击','访问','咨询','订单']
          },
          series: [
            {
              name: '预期',
              type: 'funnel',
              left: '10%',
              width: '80%',
              label: {
                formatter: '{b}预期'
              },
              labelLine: {
                show: false
              },
              itemStyle: {
                opacity: 0.7
              },
              emphasis: {
                label: {
                  position: 'inside',
                  formatter: '{b}预期: {c}%'
                }
              },
              data: [
                {value: 60, name: '访问'},
                {value: 40, name: '咨询'},
                {value: 20, name: '订单'},
                {value: 80, name: '点击'},
                {value: 100, name: '展现'}
              ]
            },
            {
              name: '实际',
              type: 'funnel',
              left: '10%',
              width: '80%',
              maxSize: '80%',
              label: {
                position: 'inside',
                formatter: '{c}%',
                color: '#fff'
              },
              itemStyle: {
                opacity: 0.5,
                borderColor: '#fff',
                borderWidth: 2
              },
              emphasis: {
                label: {
                  position: 'inside',
                  formatter: '{b}实际: {c}%'
                }
              },
              data: [
                {value: 30, name: '访问'},
                {value: 10, name: '咨询'},
                {value: 5, name: '订单'},
                {value: 50, name: '点击'},
                {value: 80, name: '展现'}
              ]
            }
          ]
        }
        this.chartFunel = echarts.init(document.getElementById('J_chartLinefunel'))
        this.chartFunel.setOption(option)
        window.addEventListener('resize', () => {
          this.chartFunel.resize()
        })
      },
      // 雷达图
      initChartRadar () {
        var option = {
          title: {
            text: '游客爱好',
            subtext: '纯属虚构',
            top: 10,
            left: 10
          },
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,250,0.2)'
          },
          toolbox: {
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          legend: {
            type: 'scroll',
            bottom: 10,
            data: ['美食','户外运动','宠物','外卖','电影','旅行','阅读','投资理财']
          },
          visualMap: {
            top: 'middle',
            right: 10,
            color: ['red', 'yellow'],
            calculable: true
          },
          radar: {
            indicator: [
              { text: 'IE8-', max: 400},
              { text: 'IE9+', max: 400},
              { text: 'Safari', max: 400},
              { text: 'Firefox', max: 400},
              { text: 'Chrome', max: 400}
            ]
          },
          series: (function (){
            var series = [];
            var name = ['美食','户外运动','宠物','外卖','电影','旅行','阅读','投资理财']
            for (var i = 1; i <= name.length; i++) {
              series.push({
                name: '游客爱好（数据纯属虚构）',
                type: 'radar',
                symbol: 'none',
                lineStyle: {
                  width: 1
                },
                emphasis: {
                  areaStyle: {
                    color: 'rgba(0,250,0,0.3)'
                  }
                },
                data: [{
                  name: name[i],
                  value: [
                    (40 - i) * 10,
                    (38 - i) * 4 + 60,
                    i * 9 + 10,
                    i * 6+10,
                    i * 3+10
                  ]
                }]
              });
            }
            return series;
          })()
        };
        this.chartRadar = echarts.init(document.getElementById('J_chartRadarBox'))
        this.chartRadar.setOption(option)
        window.addEventListener('resize', () => {
          this.chartRadar.resize()
        })
      },
      // 刻度盘
      initChartGauge () {
        var option = {
          title: {
            text: '刻度盘',
            subtext: '纯属虚构',
            top: 10,
            left: 10
          },
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [
            {
              name: '业务指标',
              type: 'gauge',
              detail: {formatter: '{value}%'},
              data: [{value: 50, name: '完成率'}]
            }
          ]
        };
        this.chartRadar = echarts.init(document.getElementById('J_chartGauge'))
        this.chartRadar.setOption(option)
        window.addEventListener('resize', () => {
          this.chartRadar.resize()
        })
        // setInterval(function () {
        //   option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        //   this.chartRadar = echarts.init(document.getElementById('J_chartGauge'))
        //   this.chartRadar.setOption(option)
        // },2000);
      }
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


