<template>
  <div class="mod-demo-echarts">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartBarStatisBox" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        chartBarStatis: null,
      }
    },
    mounted () {
      this.initChartBarStatis()
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.chartBarStatis) {
        this.chartBarStatis.resize()
      }
    },
    methods: {
      // 柱状图-统计图
      initChartBarStatis(){
        var weatherIcons = {
          'Sunny': 'https://www.echartsjs.com/examples/data/asset/img/weather/sunny_128.png',
          'Cloudy': 'https://www.echartsjs.com/examples/data/asset/img/weather/cloudy_128.png',
          'Showers': 'https://www.echartsjs.com/examples/data/asset/img/weather/showers_128.png'
        };
        var seriesLabel = {
          normal: {
            show: true,
            textBorderColor: '#333',
            textBorderWidth: 2
          }
        }

        var option = {
          title: {
            text: 'Weather Statistics'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['City Alpha', 'City Beta', 'City Gamma']
          },
          grid: {
            left: 100
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'value',
            name: 'Days',
            axisLabel: {
              formatter: '{value}'
            }
          },
          yAxis: {
            type: 'category',
            inverse: true,
            data: ['Sunny', 'Cloudy', 'Showers'],
            axisLabel: {
              formatter: function (value) {
                return '{' + value + '| }\n{value|' + value + '}';
              },
              margin: 20,
              rich: {
                value: {
                  lineHeight: 30,
                  align: 'center'
                },
                Sunny: {
                  height: 40,
                  align: 'center',
                  backgroundColor: {
                    image: weatherIcons.Sunny
                  }
                },
                Cloudy: {
                  height: 40,
                  align: 'center',
                  backgroundColor: {
                    image: weatherIcons.Cloudy
                  }
                },
                Showers: {
                  height: 40,
                  align: 'center',
                  backgroundColor: {
                    image: weatherIcons.Showers
                  }
                }
              }
            }
          },
          series: [
            {
              name: 'City Alpha',
              type: 'bar',
              data: [165, 170, 30],
              label: seriesLabel,
              markPoint: {
                symbolSize: 1,
                symbolOffset: [0, '50%'],
                label: {
                  formatter: '{a|{a}\n}{b|{b} }{c|{c}}',
                  backgroundColor: 'rgb(242,242,242)',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  padding: [4, 10],
                  lineHeight: 26,
                  // shadowBlur: 5,
                  // shadowColor: '#000',
                  // shadowOffsetX: 0,
                  // shadowOffsetY: 1,
                  position: 'right',
                  distance: 20,
                  rich: {
                    a: {
                      align: 'center',
                      color: '#fff',
                      fontSize: 18,
                      textShadowBlur: 2,
                      textShadowColor: '#000',
                      textShadowOffsetX: 0,
                      textShadowOffsetY: 1,
                      textBorderColor: '#333',
                      textBorderWidth: 2
                    },
                    b: {
                      color: '#333'
                    },
                    c: {
                      color: '#ff8811',
                      textBorderColor: '#000',
                      textBorderWidth: 1,
                      fontSize: 22
                    }
                  }
                },
                data: [
                  {type: 'max', name: 'max days: '},
                  {type: 'min', name: 'min days: '}
                ]
              }
            },
            {
              name: 'City Beta',
              type: 'bar',
              label: seriesLabel,
              data: [150, 105, 110]
            },
            {
              name: 'City Gamma',
              type: 'bar',
              label: seriesLabel,
              data: [220, 82, 63]
            }
          ]
        };
        this.chartBarStatis = echarts.init(document.getElementById('J_chartBarStatisBox'))
        this.chartBarStatis.setOption(option)
        window.addEventListener('resize', () => {
          this.chartBarStatis.resize()
        })
      }
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
