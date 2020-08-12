<template>
  <div class="mod-demo-echarts">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartLinefunel" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // 引入 ECharts 主模块
  import echarts from 'echarts'
  export default {
    data () {
      return {
        chartFunel: null,
      }
    },
    mounted () {
      this.initChartFunel()
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.chartFunel) {
        this.chartFunel.resize()
      }
    },
    methods: {
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
    }
  }
</script>

<style lang="scss">
  .mod-demo-echarts {
    > .el-row {
      margin-top: -2px;
      margin-bottom: -2px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      min-height: 400px;
    }
  }
</style>
