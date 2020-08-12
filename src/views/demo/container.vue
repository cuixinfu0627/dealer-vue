<template>
  <div class="container-main">
    <el-container>
      <el-header :height="headerHeight">
        <!--header 上 模块-->
        <index-header></index-header>
      </el-header>
      <el-container>
        <el-aside :width="asideWidth">
        <!--Aside 左 模块-->
          <echarts-bar></echarts-bar>
          <echarts-line></echarts-line>
        </el-aside>
        <el-container>
          <el-main>
            <!--main 地图模块-->
            <baidu-map></baidu-map>
          </el-main>
          <el-footer :height="footerHeight">
            <!--footer 模块-->
            <index-fotter></index-fotter>
          </el-footer>
        </el-container>
        <el-aside :width="asideWidth">
          <!--Aside 右 模块-->
          <echarts-pie></echarts-pie>
          <echarts-scatter></echarts-scatter>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import BaiduMap from './container-modules/baidu-map'
  import IndexHeader from './container-modules/index-header'
  import IndexFotter from './container-modules/index-fotter'
  import EchartsBar from './container-modules/echarts-bar'
  import EchartsBarStatis from './container-modules/echarts-bar-statis'
  import EchartsFunel from './container-modules/echarts-funel'
  import EchartsLine from './container-modules/echarts-line'
  import EchartsPie from './container-modules/echarts-pie'
  import EchartsRadar from './container-modules/echarts-radar'
  import EchartsScatter from './container-modules/echarts-scatter'

  export default {
    components: {
      'baidu-map': BaiduMap,
      'index-header': IndexHeader,
      'index-fotter': IndexFotter,
      'echarts-bar': EchartsBar,
      'echarts-funel': EchartsFunel,
      'echarts-line': EchartsLine,
      'echarts-pie': EchartsPie,
      'echarts-bar-statis': EchartsBarStatis,
      'echarts-radar': EchartsRadar,
      'echarts-scatter': EchartsScatter,
    },
    data () {
      return {
        title: '智慧大数据监控平台',
        headerHeight: '100px',
        footerHeight: '100px',
        asideWidth: '500px',
      }
    },

    computed: {

    },
    methods: {

    }
  }
</script>

<style>
  .el-header {
    /*background-color: #B3C0D1;*/
    background-color: #DDDDDD;
    color: #333;
    text-align: center;
    line-height: 25px;
  }
  .el-footer {
    /*background-color: #CCCCCC;*/
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 100px;
  }
  .el-aside {
    /*background-color: #D3DCE6;*/
    color: #333;
    text-align: center;
    /*line-height: 100px;*/
    margin-top: -9px;
  }
  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
    margin-top: -20px;
  }
</style>
