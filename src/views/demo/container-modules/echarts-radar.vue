<template>
  <div class="mod-demo-echarts">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartRadarBox" class="chart-box"></div>
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
        chartRadar: null,
      }
    },
    mounted () {
      this.initChartRadar()
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.chartRadar) {
        this.chartRadar.resize()
      }
    },
    methods: {
      // 雷达图
      initChartRadar () {
        var option = {
          'title': {
            'text': '游客爱好',
            'textStyle':{
              'color': '#ccc'
            }
          },
          'radar': {
            'radius':'52%',
            'startAngle': 60,
            'splitNumber': 0,
            'splitArea': {
              'areaStyle': {
                'color': '#1f2736'
              }
            },
            'axisLine': {
             'lineStyle': {
               'color': '#ccc',
               'width': 1,
               'opacity': 0.3
               }
            },
           'shape': 'circle',
            'indicator': [
              { 'name': '美食', 'max': 6500},
              { 'name': '户外运动', 'max': 16000},
              { 'name': '宠物', 'max': 30000},
              { 'name': '外卖', 'max': 38000},
              { 'name': '电影', 'max': 52000},
              { 'name': '旅行', 'max': 25000},
              { 'name': '阅读', 'max': 25000},
              { 'name': '投资理财', 'max': 21000}
            ]
          },
          'series': [{
            'name': '预算 vs 开销（Budget vs spending）',
            'type': 'radar',
            'label': {
              'normal': {
                'show': true,
                'textStyle': {
                  'color': '#fff'
                },
                'formatter': '{b}: {c}'
              }
            },
            'lineStyle': {
              'normal': {
                'width': 1,
                'opacity': 0.6
              }
            },
            'itemStyle': {
             'normal': {
               'color': '#fff'
               }
             },
            'areaStyle': {
              'normal': {
                'color': 'rgba(213, 58, 53, 0.3)',
              }
            },
            'data' : [
              {
                'value' : [60, 20, 9, 35, 45, 21,19,20,3],
                'name' : '预算分配（Allocated Budget）'
              }
            ]
          }]
        }
        this.chartRadar = echarts.init(document.getElementById('J_chartRadarBox'))
        this.chartRadar.setOption(option)
        window.addEventListener('resize', () => {
          this.chartRadar.resize()
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
