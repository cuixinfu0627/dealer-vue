<template>
  <div>
    <baidu-map class="map"
               :center="center"
               :zoom="zoom"
               :scroll-wheel-zoom="true"
               :mapStyle="mapStyle"
               :mapType="mapType"
               @ready="handler"
               @click="getPoint"
               @moving="syncCenterAndZoom"
               @moveend="syncCenterAndZoom"
               @zoomend="syncCenterAndZoom">
      <!-- 比例尺-右上角 -->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <!-- 地图类型-左上角 -->
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
      <!-- 定位控件-右下角 -->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!-- 热力图 -->
      <bml-heatmap :data="data" :max="100" :radius="20"></bml-heatmap>

      <!-- 添加一个自定义图标的点 -->
      <bm-marker :position="markerPoint" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"></bm-marker>

    </baidu-map>
    <!--<canvas id="canvas"></canvas>-->
  </div>
</template>
<script>
  import {BmlHeatmap} from 'vue-baidu-map'
  import {baiduMapLayer,DataSet} from 'mapv';

  export default {
    components: {
      BmlHeatmap
    },
    data () {
      return {
        center:{lng: 0, lat: 0},
        zoom:6,
        mapType:'BMAP_NORMAL_MAP',
        mapStyle:{
          styleJson: [{
            "featureType": "water",
            "elementType": "all",
            "stylers": {
              "color": "#044161"
            }
          }, {
            "featureType": "land",
            "elementType": "all",
            "stylers": {
              "color": "#091934"
            }
          }, {
            "featureType": "boundary",
            "elementType": "geometry",
            "stylers": {
              "color": "#064f85"
            }
          }, {
            "featureType": "railway",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          }, {
            "featureType": "highway",
            "elementType": "geometry",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "highway",
            "elementType": "geometry.fill",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "highway",
            "elementType": "labels",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "arterial",
            "elementType": "geometry",
            "stylers": {
              "color": "#004981",
              "lightness": -39
            }
          }, {
            "featureType": "arterial",
            "elementType": "geometry.fill",
            "stylers": {
              "color": "#00508b"
            }
          }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          }, {
            "featureType": "green",
            "elementType": "all",
            "stylers": {
              "color": "#056197",
              "visibility": "on"
            }
          }, {
            "featureType": "subway",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          }, {
            "featureType": "manmade",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "local",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "arterial",
            "elementType": "labels",
            "stylers": {
              "visibility": "off"
            }
          }, {
            "featureType": "boundary",
            "elementType": "geometry.fill",
            "stylers": {
              "color": "#029fd4"
            }
          }, {
            "featureType": "building",
            "elementType": "all",
            "stylers": {
              "color": "#1a5787"
            }
          }, {
            "featureType": "label",
            "elementType": "all",
            "stylers": {
              "visibility": "on"
            }
          }, {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": {
              "color": "#ffffff"
            }
          }, {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": {
              "color": "#1e1c1c"
            }
          }, {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": {
              "visibility": "on"
            }
          }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": {
              "visibility": "off"
            }
          }]
        },
        data: [
          {lng: 116.418261, lat: 39.921984, count: 50},
          {lng: 116.423332, lat: 39.916532, count: 51},
          {lng: 116.419787, lat: 39.930658, count: 15},
          {"lng":116.418261,"lat":39.921984,"count":50},
          {"lng":116.423332,"lat":39.916532,"count":51},
          {"lng":116.419787,"lat":39.930658,"count":15},
          {"lng":116.418455,"lat":39.920921,"count":40},
          {"lng":116.418843,"lat":39.915516,"count":100},
          {"lng":116.42546,"lat":39.918503,"count":6},
          {"lng":116.423289,"lat":39.919989,"count":18},
          {"lng":116.418162,"lat":39.915051,"count":80},
          {"lng":116.422039,"lat":39.91782,"count":11},
          {"lng":116.41387,"lat":39.917253,"count":7},
          {"lng":116.41773,"lat":39.919426,"count":42},
          {"lng":116.421107,"lat":39.916445,"count":4},
          {"lng":116.417521,"lat":39.917943,"count":27},
          {"lng":116.419812,"lat":39.920836,"count":23},
          {"lng":116.420682,"lat":39.91463,"count":60},
          {"lng":116.415424,"lat":39.924675,"count":8},
          {"lng":116.419242,"lat":39.914509,"count":15},
          {"lng":116.422766,"lat":39.921408,"count":25},
          {"lng":116.421674,"lat":39.924396,"count":21},
          {"lng":116.427268,"lat":39.92267,"count":1},
          {"lng":116.417721,"lat":39.920034,"count":51},
          {"lng":116.412456,"lat":39.92667,"count":7},
          {"lng":116.420432,"lat":39.919114,"count":11},
          {"lng":116.425013,"lat":39.921611,"count":35},
          {"lng":116.418733,"lat":39.931037,"count":22},
          {"lng":116.419336,"lat":39.931134,"count":4},
          {"lng":116.413557,"lat":39.923254,"count":5},
          {"lng":116.418367,"lat":39.92943,"count":3},
          {"lng":116.424312,"lat":39.919621,"count":100},
          {"lng":116.423874,"lat":39.919447,"count":87},
          {"lng":116.424225,"lat":39.923091,"count":32},
          {"lng":116.417801,"lat":39.921854,"count":44},
          {"lng":116.417129,"lat":39.928227,"count":21},
          {"lng":116.426426,"lat":39.922286,"count":80},
          {"lng":116.421597,"lat":39.91948,"count":32},
          {"lng":116.423895,"lat":39.920787,"count":26},
          {"lng":116.423563,"lat":39.921197,"count":17},
          {"lng":116.417982,"lat":39.922547,"count":17},
          {"lng":116.426126,"lat":39.921938,"count":25},
          {"lng":116.42326,"lat":39.915782,"count":100},
          {"lng":116.419239,"lat":39.916759,"count":39},
          {"lng":116.417185,"lat":39.929123,"count":11},
          {"lng":116.417237,"lat":39.927518,"count":9},
          {"lng":116.417784,"lat":39.915754,"count":47},
          {"lng":116.420193,"lat":39.917061,"count":520},
          {"lng":116.422735,"lat":39.915619,"count":1000},
          {"lng":116.418495,"lat":39.915958,"count":46},
          {"lng":116.416292,"lat":39.931166,"count":9},
          {"lng":116.419916,"lat":39.924055,"count":8},
          {"lng":116.42189,"lat":39.921308,"count":11},
          {"lng":116.413765,"lat":39.929376,"count":3},
          {"lng":116.418232,"lat":39.920348,"count":50},
          {"lng":116.417554,"lat":39.930511,"count":15},
          {"lng":116.418568,"lat":39.918161,"count":23},
          {"lng":116.413461,"lat":39.926306,"count":3},
          {"lng":116.42232,"lat":39.92161,"count":13},
          {"lng":116.4174,"lat":39.928616,"count":6},
          {"lng":116.424679,"lat":39.915499,"count":21},
          {"lng":116.42171,"lat":39.915738,"count":29},
          {"lng":116.417836,"lat":39.916998,"count":99},
          {"lng":116.420755,"lat":39.928001,"count":10},
          {"lng":116.414077,"lat":39.930655,"count":14},
          {"lng":116.426092,"lat":39.922995,"count":16},
          {"lng":116.41535,"lat":39.931054,"count":15},
          {"lng":116.413022,"lat":39.921895,"count":13},
          {"lng":116.415551,"lat":39.913373,"count":17},
          {"lng":116.421191,"lat":39.926572,"count":1},
          {"lng":116.419612,"lat":39.917119,"count":9},
          {"lng":116.418237,"lat":39.921337,"count":54},
          {"lng":116.423776,"lat":39.921919,"count":26},
          {"lng":116.417694,"lat":39.92536,"count":17},
          {"lng":116.415377,"lat":39.914137,"count":19},
          {"lng":116.417434,"lat":39.914394,"count":43},
          {"lng":116.42588,"lat":39.922622,"count":27},
          {"lng":116.418345,"lat":39.919467,"count":8},
          {"lng":116.426883,"lat":39.917171,"count":3},
          {"lng":116.423877,"lat":39.916659,"count":34},
          {"lng":116.415712,"lat":39.915613,"count":14},
          {"lng":116.419869,"lat":39.931416,"count":12},
          {"lng":116.416956,"lat":39.925377,"count":11},
          {"lng":116.42066,"lat":39.925017,"count":38},
          {"lng":116.416244,"lat":39.920215,"count":91},
          {"lng":116.41929,"lat":39.915908,"count":54},
          {"lng":116.422116,"lat":39.919658,"count":21},
          {"lng":116.4183,"lat":39.925015,"count":15},
          {"lng":116.421969,"lat":39.913527,"count":3},
          {"lng":116.422936,"lat":39.921854,"count":24},
          {"lng":116.41905,"lat":39.929217,"count":12},
          {"lng":116.424579,"lat":39.914987,"count":57},
          {"lng":116.42076,"lat":39.915251,"count":70},
          {"lng":116.425867,"lat":39.918989,"count":80},
          {"lng":121.680201,"lat":29.78392,"count":100},
          {"lng":121.555134,"lat":29.80363,"count":60},
          {"lng":121.609405,"lat":29.912858,"count":100},
          {"lng":121.579006,"lat":29.885259,"count":100},
          {"lng":121.635028,"lat":29.924854,"count":100},
          {"lng":121.603217,"lat":29.870361,"count":70},
          {"lng":121.579006,"lat":29.885259,"count":420},
          {"lng":121.545331,"lat":29.877311,"count":40},
          {"1ng":116.418261,"lat":39.921984,"count":50},
          {"1ng":116.423332,"lat":39.916532,"count":51},
          {"1ng":116.419787,"lat":39.930658,"count":15},
          {"1ng":116.418455,"lat":39.920921,"count":40},
          {"1ng":116.418843,"lat":39.915516,"count":180},
          {"1ng":116.42546,"lat":39.918583,"count":6},
          {"lng":116.423289,"lat":39.919989,"count":18},
          {"1ng":116.422039,"lat":39.91782,"count":11},
          {"1ng":116.41387,"lat":39.917253,"count":7},
          {"1ng":116.41773,"lat":39.919426,"count":42},
          {"1ng":116.421107,"lat":39.916445,"count":4},
          {"1ng":116.417521,"lat":39.917943,"count":27},
          {"1ng":116.419812,"lat":39.920836,"count":23},
          { "lng": 108.960637, "lat": 34.355135, "count": 100 },
          { "lng": 107.203695, "lat": 34.416147, "count": 100 },
          { "lng": 109.080219, "lat": 32.768743, "count": 100 },
          { "lng": 107.019722, "lat": 33.07907, "count": 100},
          { "lng": 109.889701, "lat": 33.942135, "count": 100 },
          { "lng": 109.448165, "lat": 36.61208, "count": 100 },
          { "lng": 108.933041, "lat": 34.940506, "count": 100 },
          { "lng": 109.515431, "lat": 34.506629, "count": 100 },
          { "lng": 108.704512, "lat": 34.339637, "count": 100},
          { "lng": 109.730161, "lat": 38.305673, "count": 100 }
        ],
        markerPoint: {lng: 105.237543, lat: 33.286582},
        scatterPoint:[[101.8828, 56.2836], [101.8828, 56.2836], [6.7667000000000002, 51.216700000000003], [139.75139999999999, 35.685000000000002], [-54.75, -28.149999999999999], [30.064299999999999, -1.9571400000000001], [-93.2667, 44.9833], [114.188, 22.264299999999999], [-82.389300000000006, 28.035299999999999], [-104.7919, 38.6858], [-1.67571, 48.113500000000002], [145.0667, -37.9833], [113.11360000000001, 28.179200000000002], [-77.539000000000001, 39.018000000000001], [-76.485600000000005, 38.210799999999999], [-2.5229200000000001, 53.423299999999998], [139.77799999999999, 35.700699999999998], [117.6186, 26.2486], [-82.769300000000001, 39.954799999999999], [37.615600000000001, 55.752200000000002], [128.68109999999999, 35.228099999999998], [-105.0166, 39.613300000000002], [-93.511899999999997, 47.243200000000002], [-122.2568, 37.867199999999997], [2.35222, 48.8566], [-74.171199999999999, 40.375399999999999], [-74.172399999999996, 40.735700000000001], [-58.381599999999999, -34.603700000000003], [28.810400000000001, 40.982999999999997], [106.5528, 29.562799999999999],[75.059,38.445],[75.234,37.753],[75.278,39.707],[75.85,39.368],[75.938,39.47],[75.938,39.164],[75.938,39.13],[76.025,39.504],[76.025,39.436],[76.025,39.402],[76.025,39.3],[76.069,39.504],[76.069,39.402],[80.991,43.993],[81.035,44.996],[81.035,44.965],[81.035,43.961],[81.079,44.465],[81.079,43.835],[81.123,44.497],[81.123,43.835],[81.123,32.399],[81.167,44.497],[81.167,40.313],[100.239,25.404],[100.283,36.633],[100.283,29.075],[100.283,28.613],[83.276,43.453],[101.997,23.685],[102.041,38.376],[102.041,35.925],[102.041,35.568],[102.041,35.532],[102.041,31.466],[83.276,43.421],[83.32,43.517],[83.364,43.421],[83.584,45.951],[83.584,45.921],[83.628,39.028],[83.936,43.229],[84.023,43.293],[84.023,29.764],[84.067,32.287],[86.133,41.804],[86.133,41.673],[86.133,41.607],[86.177,44.245],[86.177,41.804],[86.221,41.771],[86.221,41.739],[86.265,44.245],[86.265,42.682],[86.265,41.706],[86.265,41.344],[87.803,43.803],[87.803,43.676],[87.847,47.369],[87.847,47.339],[87.847,44.119],[87.891,43.549],[87.891,42.844],[87.935,43.549],[87.979,44.214],[87.979,29.075],[88.022,44.151],[99.272,24.046],[99.272,24.006],[99.272,23.161],[99.316,36.668],[99.316,25.364],[99.36,25.879],[99.404,28.266],[99.404,26.471],[99.404,26.431],[99.404,23.524],[99.448,24.886],[100.986,25.324],[100.986,22.837],[100.986,22.594],[100.986,22.431],[100.986,22.35],[100.986,22.065],[101.03,41.804],[101.03,23.039],[101.03,22.918],[101.03,21.902],[101.074,41.935],[101.953,26.628],[101.953,26.549],[101.953,26.195],[101.953,23.966],[101.953,23.645],[101.997,38.273],[101.997,38.238],[101.997,35.532],[101.997,35.496],[101.997,29.917],[104.414,31.653],[104.414,31.616],[104.414,31.466],[104.414,31.316],[104.414,31.241],[104.414,31.203],[104.414,31.015],[104.414,30.978],[104.414,30.827],[104.414,30.751],[104.414,30.524],[104.414,30.487],[104.414,29.114],[104.414,29.075],[104.414,28.652],[104.414,25.642],[104.414,25.006],[104.414,24.966],[104.414,23.039],[104.458,35.066],[104.458,34.85],[111.929,23.443],[111.929,23.282],[111.929,22.756],[111.929,22.675],[111.929,22.513],[111.929,22.472],[111.929,22.025],[111.929,21.902],[111.929,21.821],[111.929,21.78],[117.905,37.51],[117.905,37.37],[117.905,37.055],[117.905,36.844],[117.905,36.809],[117.905,36.774],[117.905,36.739],[117.905,36.704],[117.905,36.598],[117.905,36.563],[118.389,35.102],[118.389,34.994],[118.389,34.958],[118.389,34.886],[118.389,34.597],[118.389,34.416],[118.389,34.38],[118.389,34.343],[118.389,34.089],[118.389,33.87],[119.136,33.358],[119.136,32.621],[119.136,32.399],[119.136,32.25],[119.136,32.213],[103.799,30.069],[103.799,30.031],[103.799,29.993],[103.799,29.573],[119.136,31.989],[119.136,31.728],[119.136,31.691],[119.136,31.616],[119.136,31.316],[119.355,29.114],[119.355,28.999],[119.355,28.613],[119.355,28.072],[119.355,26.942],[119.355,26.234],[119.355,26.195],[119.355,26.116],[119.355,25.958],[119.399,43.961],[119.399,43.93],[120.366,30.183],[120.366,30.069],[120.366,29.955],[120.366,29.612],[120.366,29.42],[120.366,29.344],[120.366,29.191],[120.366,29.037],[120.366,28.96],[120.366,28.845],[121.685,29.688],[121.685,29.612],[121.685,29.497],[121.685,29.229],[121.685,28.999],[121.685,28.845],[121.685,25.125],[121.685,25.086],[121.685,24.727],[121.685,24.207],[121.729,42.033],[132.715,45.614],[132.759,46.225],[132.847,47.931],[132.935,46.043],[132.935,45.768],[133.022,46.529],[133.066,47.369],[133.066,46.195],[133.11,47.547],[133.154,47.961],[133.33,45.706],[133.506,47.577],[133.682,46.012],[133.682,45.982],[133.857,47.369],[133.901,47.606],[134.033,46.8]]
      }
    },
    mounted () {
    },
    activated () {
    },
    methods: {
      handler ({BMap, map}) {
        console.log(BMap, map)
        this.center.lng = 105.403119
        this.center.lat = 38.028658
        this.zoom = 5
        //设置地图其他参数：
        // let mapStyle={style:"midnight"}
        // map.setMapStyle(mapStyle);

        //  画遮蔽层只显示中国地图
        this.$nextTick(function(){  //页面加载完成后执行
          let time=Math.ceil(Math.random()*1000);
          setTimeout(() => {
            this.drawBoundary(map);
          }, time);
        })

        //添加地图散点
        //this.drawScatterchart(map);
      },
      /**
       * 点击点击事件
       */
      getPoint(e){
        let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
        geocoder.getLocation(e.point,rs=>{
          console.log(rs.point)
          console.log(rs.address)
          //地址描述(string)=
          // console.log(rs.address);    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
          // console.log(rs.addressComponents);//结构化的地址描述(object)
          // console.log(rs.addressComponents.province); //省
          // console.log(rs.addressComponents.city); //城市
          // console.log(rs.addressComponents.district); //区县
          // console.log(rs.addressComponents.street); //街道
          // console.log(rs.addressComponents.streetNumber); //门牌号
          // console.log(rs.surroundingPois); //附近的POI点(array)
          // console.log(rs.business); //商圈字段，代表此点所属的商圈(string)
        });
      },
      /**
       * 滚轮缩放事件
       */
      syncCenterAndZoom (e) {
        const {lng, lat} = e.target.getCenter()
        const zoom = e.target.getZoom()
      },
      /**
       * 画遮蔽层的相关方法
       */
      drawBoundary(map) {
        /*画遮蔽层的相关方法
        *思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。
        *      这样就做出了一个经过多次西北角的闭合多边形*/
        //定义中国东南西北端点，作为第一层
        //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
        var pStart = new BMap.Point(180,90);
        var pEnd = new BMap.Point(0,-90);
        var pArray = [
          new BMap.Point(pStart.lng,pStart.lat),
          new BMap.Point(pEnd.lng,pStart.lat),
          new BMap.Point(pEnd.lng,pEnd.lat),
          new BMap.Point(pStart.lng,pEnd.lat)];
        //循环添加各闭合区域
        pArray.push(new BMap.Point(135.077218,48.544352));
        pArray.push(new BMap.Point(134.92218,48.584352))
        pArray.push(new BMap.Point(134.827218,48.534352))
        pArray.push(new BMap.Point(134.727669,48.495377));
        pArray.push(new BMap.Point(134.304531,48.394091));
        pArray.push(new BMap.Point(133.513447,48.177476));
        pArray.push(new BMap.Point(132.832747,48.054205));
        pArray.push(new BMap.Point(132.519993,47.789172));
        pArray.push(new BMap.Point(131.765704,47.813962));
        pArray.push(new BMap.Point(131.103402,47.776772));
        pArray.push(new BMap.Point(130.919429,48.331824));
        pArray.push(new BMap.Point(130.77225,48.868729));
        pArray.push(new BMap.Point(129.907577,49.351849));
        pArray.push(new BMap.Point(128.73015,49.699156));
        pArray.push(new BMap.Point(127.791888,49.85404));
        pArray.push(new BMap.Point(127.791888,50.492084));
        pArray.push(new BMap.Point(126.927215,51.616759));
        pArray.push(new BMap.Point(126.467283,52.579818));
        pArray.push(new BMap.Point(125.952158,53.059077));
        pArray.push(new BMap.Point(124.701142,53.313247));
        pArray.push(new BMap.Point(123.56051,53.664362));
        pArray.push(new BMap.Point(121.555204,53.46722));
        pArray.push(new BMap.Point(120.340983,53.125528));
        pArray.push(new BMap.Point(119.95464,52.579818));
        pArray.push(new BMap.Point(120.616942,52.523746));
        pArray.push(new BMap.Point(120.506559,52.095236));
        pArray.push(new BMap.Point(119.862653,51.616759));
        pArray.push(new BMap.Point(119.365926,50.959196));
        pArray.push(new BMap.Point(119.089967,50.362806));
        pArray.push(new BMap.Point(119.108364,50.05583));
        pArray.push(new BMap.Point(118.133307,49.925357));
        pArray.push(new BMap.Point(117.471005,49.794528));
        pArray.push(new BMap.Point(116.808702,49.889712));
        pArray.push(new BMap.Point(116.385564,49.758785));
        pArray.push(new BMap.Point(115.962426,48.953617));
        pArray.push(new BMap.Point(115.520891,48.147476));
        pArray.push(new BMap.Point(115.796851,47.677465));
        pArray.push(new BMap.Point(116.27518,47.652609));
        pArray.push(new BMap.Point(117.103059,47.652609));
        pArray.push(new BMap.Point(118.004526,47.801568));
        pArray.push(new BMap.Point(118.887596,47.577968));
        pArray.push(new BMap.Point(119.402721,47.127871));
        pArray.push(new BMap.Point(119.402721,46.800397));
        pArray.push(new BMap.Point(118.464459,46.825659));
        pArray.push(new BMap.Point(117.103059,46.648575));
        pArray.push(new BMap.Point(115.980824,46.088213));
        pArray.push(new BMap.Point(115.226534,45.702829));
        pArray.push(new BMap.Point(114.159491,45.275796));
        pArray.push(new BMap.Point(112.761297,45.171782));
        pArray.push(new BMap.Point(111.639061,45.132727));
        pArray.push(new BMap.Point(111.436691,44.55683));
        pArray.push(new BMap.Point(111.51028,44.001703));
        pArray.push(new BMap.Point(110.682402,43.387647));
        pArray.push(new BMap.Point(108.897864,42.658724));
        pArray.push(new BMap.Point(106.892559,42.522781));
        pArray.push(new BMap.Point(103.82021,42.140555));
        pArray.push(new BMap.Point(102.422016,42.536389));
        pArray.push(new BMap.Point(101.336575,42.82146));
        pArray.push(new BMap.Point(99.478448,42.929712));
        pArray.push(new BMap.Point(97.601924,42.997272));
        pArray.push(new BMap.Point(96.019756,43.815487));
        pArray.push(new BMap.Point(92.72664,45.288784));
        pArray.push(new BMap.Point(91.144473,45.599605));
        pArray.push(new BMap.Point(91.457227,46.483616));
        pArray.push(new BMap.Point(90.794924,47.553064));
        pArray.push(new BMap.Point(89.562305,48.221295));
        pArray.push(new BMap.Point(88.2377,48.953617));
        pArray.push(new BMap.Point(87.722576,49.279683));
        pArray.push(new BMap.Point(87.097067,49.255604));
        pArray.push(new BMap.Point(86.60034,49.122957));
        pArray.push(new BMap.Point(86.177203,48.710696));
        pArray.push(new BMap.Point(85.533297,48.344091));
        pArray.push(new BMap.Point(85.404516,47.875888));
        pArray.push(new BMap.Point(85.349324,47.390897));
        pArray.push(new BMap.Point(84.926186,47.215692));
        pArray.push(new BMap.Point(83.233635,47.315881));
        pArray.push(new BMap.Point(82.865689,47.328391));
        pArray.push(new BMap.Point(82.258578,45.844449));
        pArray.push(new BMap.Point(82.368962,45.366651));
        pArray.push(new BMap.Point(82.093003,45.30177));
        pArray.push(new BMap.Point(80.989165,45.275796));
        pArray.push(new BMap.Point(79.903724,45.015402));
        pArray.push(new BMap.Point(80.326862,44.332772));
        pArray.push(new BMap.Point(80.510835,43.642047));
        pArray.push(new BMap.Point(80.621219,43.186043));
        pArray.push(new BMap.Point(80.27167,43.010775));
        pArray.push(new BMap.Point(79.885327,42.304653));
        pArray.push(new BMap.Point(79.259819,41.838593));
        pArray.push(new BMap.Point(78.487133,41.576647));
        pArray.push(new BMap.Point(77.916816,41.341363));
        pArray.push(new BMap.Point(77.272911,41.16086));
        pArray.push(new BMap.Point(76.739389,41.02167));
        pArray.push(new BMap.Point(76.26106,40.546202));
        pArray.push(new BMap.Point(75.672346,40.75639));
        pArray.push(new BMap.Point(74.881262,40.630357));
        pArray.push(new BMap.Point(74.255754,40.293095));
        pArray.push(new BMap.Point(73.777425,39.939968));
        pArray.push(new BMap.Point(73.74063,39.556517));
        pArray.push(new BMap.Point(73.53826,39.34256));
        pArray.push(new BMap.Point(73.685438,38.725549));
        pArray.push(new BMap.Point(74.034987,38.407771));
        pArray.push(new BMap.Point(74.458125,38.335352));
        pArray.push(new BMap.Point(74.734084,38.074036));
        pArray.push(new BMap.Point(74.844468,37.577865));
        pArray.push(new BMap.Point(74.678892,37.21089));
        pArray.push(new BMap.Point(74.6237,36.975076));
        pArray.push(new BMap.Point(75.414784,36.501232));
        pArray.push(new BMap.Point(75.801127,35.934721));
        pArray.push(new BMap.Point(76.518622,35.379154));
        pArray.push(new BMap.Point(77.309706,35.137703));
        pArray.push(new BMap.Point(77.972008,34.758986));
        pArray.push(new BMap.Point(78.376749,34.241106));
        pArray.push(new BMap.Point(78.523927,33.473647));
        pArray.push(new BMap.Point(78.7079,32.978834));
        pArray.push(new BMap.Point(78.450338,32.745921));
        pArray.push(new BMap.Point(78.30316,32.340745));
        pArray.push(new BMap.Point(78.431941,32.04349));
        pArray.push(new BMap.Point(78.671106,31.572152));
        pArray.push(new BMap.Point(78.855079,31.145879));
        pArray.push(new BMap.Point(79.425395,30.797108));
        pArray.push(new BMap.Point(80.087697,30.447053));
        pArray.push(new BMap.Point(81.301919,29.855455));
        pArray.push(new BMap.Point(81.90903,30.0157));
        pArray.push(new BMap.Point(82.7921,29.485907));
        pArray.push(new BMap.Point(84.539843,28.661613));
        pArray.push(new BMap.Point(85.71727,28.124721));
        pArray.push(new BMap.Point(86.821108,27.732537));
        pArray.push(new BMap.Point(87.998535,27.69979));
        pArray.push(new BMap.Point(88.568851,27.716165));
        pArray.push(new BMap.Point(88.863208,27.108656));
        pArray.push(new BMap.Point(89.580703,27.190949));
        pArray.push(new BMap.Point(89.654292,27.765274));
        pArray.push(new BMap.Point(90.923705,27.650651));
        pArray.push(new BMap.Point(91.751584,27.223849));
        pArray.push(new BMap.Point(92.04594,26.778874));
        pArray.push(new BMap.Point(92.965805,26.646689));
        pArray.push(new BMap.Point(93.830478,26.960375));
        pArray.push(new BMap.Point(94.860727,27.453873));
        pArray.push(new BMap.Point(96.185332,27.798001));
        pArray.push(new BMap.Point(97.123594,27.503101));
        pArray.push(new BMap.Point(97.620321,27.896122));
        pArray.push(new BMap.Point(97.675513,28.059457));
        pArray.push(new BMap.Point(98.080254,27.306056));
        pArray.push(new BMap.Point(98.595378,27.009824));
        pArray.push(new BMap.Point(98.393008,26.066566));
        pArray.push(new BMap.Point(97.804294,25.483523));
        pArray.push(new BMap.Point(97.528335,24.847254));
        pArray.push(new BMap.Point(97.417951,24.10637));
        pArray.push(new BMap.Point(97.804294,23.717348));
        pArray.push(new BMap.Point(98.595378,23.886634));
        pArray.push(new BMap.Point(98.834543,23.123105));
        pArray.push(new BMap.Point(99.239283,22.697005));
        pArray.push(new BMap.Point(99.165694,22.303805));
        pArray.push(new BMap.Point(99.386462,21.857966));
        pArray.push(new BMap.Point(100.251135,21.445169));
        pArray.push(new BMap.Point(100.839848,21.290063));
        pArray.push(new BMap.Point(101.704521,21.031186));
        pArray.push(new BMap.Point(102.05407,21.152053));
        pArray.push(new BMap.Point(101.998878,21.582901));
        pArray.push(new BMap.Point(101.962083,22.132497));
        pArray.push(new BMap.Point(102.587591,22.355156));
        pArray.push(new BMap.Point(103.599443,22.338041));
        pArray.push(new BMap.Point(104.482513,22.560368));
        pArray.push(new BMap.Point(105.383981,22.799392));
        pArray.push(new BMap.Point(106.083078,22.59454));
        pArray.push(new BMap.Point(106.469421,22.286683));
        pArray.push(new BMap.Point(106.874162,21.754879));
        pArray.push(new BMap.Point(107.315697,21.514051));
        pArray.push(new BMap.Point(107.812424,21.410715));
        pArray.push(new BMap.Point(107.775629,21.134792));
        pArray.push(new BMap.Point(106.929353,20.269201));
        pArray.push(new BMap.Point(106.175064,19.17158));
        pArray.push(new BMap.Point(106.377435,18.470789));
        pArray.push(new BMap.Point(107.297299,17.23746));
        pArray.push(new BMap.Point(109.008248,15.675143));
        pArray.push(new BMap.Point(109.688948,13.705222));
        pArray.push(new BMap.Point(109.652153,11.664031));
        pArray.push(new BMap.Point(108.750686,9.571001));
        pArray.push(new BMap.Point(108.198767,6.876803));
        pArray.push(new BMap.Point(108.493124,5.090099));
        pArray.push(new BMap.Point(109.817729,3.612656));
        pArray.push(new BMap.Point(111.10554,3.298351));
        pArray.push(new BMap.Point(114.71141,5.514272));
        pArray.push(new BMap.Point(116.256783,7.556636));
        pArray.push(new BMap.Point(118.758815,10.883133));
        pArray.push(new BMap.Point(119.531502,13.669242));
        pArray.push(new BMap.Point(119.494707,16.617614));
        pArray.push(new BMap.Point(120.414572,18.961654));
        pArray.push(new BMap.Point(121.51841,20.633358));
        pArray.push(new BMap.Point(122.751029,22.303805));
        pArray.push(new BMap.Point(123.247756,23.378111));
        pArray.push(new BMap.Point(124.811526,25.68375));
        pArray.push(new BMap.Point(126.577667,25.900278));
        pArray.push(new BMap.Point(127.479134,26.67975));
        pArray.push(new BMap.Point(128.454191,28.189945));
        pArray.push(new BMap.Point(128.766945,29.93561));
        pArray.push(new BMap.Point(128.73015,31.650877));
        pArray.push(new BMap.Point(127.957464,32.153119));
        pArray.push(new BMap.Point(127.221572,32.745921));
        pArray.push(new BMap.Point(127.019202,33.596907));
        pArray.push(new BMap.Point(125.988953,33.827543));
        pArray.push(new BMap.Point(125.731391,34.546135));
        pArray.push(new BMap.Point(125.878569,35.454458));
        pArray.push(new BMap.Point(125.731391,36.634799));
        pArray.push(new BMap.Point(125.80498,37.51927));
        pArray.push(new BMap.Point(124.425183,37.972159));
        pArray.push(new BMap.Point(124.498772,38.58128));
        pArray.push(new BMap.Point(125.013896,39.242487));
        pArray.push(new BMap.Point(124.590758,39.471014));
        pArray.push(new BMap.Point(124.296402,39.840762));
        pArray.push(new BMap.Point(124.388388,40.081441));
        pArray.push(new BMap.Point(124.940307,40.335346));
        pArray.push(new BMap.Point(125.731391,40.630357));
        pArray.push(new BMap.Point(126.448885,40.96591));
        pArray.push(new BMap.Point(126.798434,41.493704));
        pArray.push(new BMap.Point(127.111188,41.410654));
        pArray.push(new BMap.Point(127.883875,41.271998));
        pArray.push(new BMap.Point(128.490985,41.452192));
        pArray.push(new BMap.Point(128.307012,41.879854));
        pArray.push(new BMap.Point(128.950918,41.921089));
        pArray.push(new BMap.Point(129.484439,42.12686));
        pArray.push(new BMap.Point(129.999564,42.549994));
        pArray.push(new BMap.Point(130.073153,42.807915));
        pArray.push(new BMap.Point(130.404304,42.495557));
        pArray.push(new BMap.Point(130.77225,42.359256));
        pArray.push(new BMap.Point(130.698661,42.726583));
        pArray.push(new BMap.Point(131.195388,42.848541));
        pArray.push(new BMap.Point(131.360964,43.494895));
        pArray.push(new BMap.Point(131.342566,44.491021));
        pArray.push(new BMap.Point(131.820896,45.002351));
        pArray.push(new BMap.Point(132.998323,44.976239));
        pArray.push(new BMap.Point(133.623831,45.599605));
        pArray.push(new BMap.Point(134.102161,46.394582));
        pArray.push(new BMap.Point(134.37812,47.228226));
        pArray.push(new BMap.Point(134.874847,47.851127));
        pArray.push(new BMap.Point(134.985231,48.233588));
        pArray.push(new BMap.Point(135.13241,48.454352));
        pArray.push(new BMap.Point(135.077218,48.474352));

        //添加遮蔽层
        var plyall = new BMap.Polygon(pArray,
          { strokeOpacity: 1, strokeColor: "#091934",
            strokeWeight: 1, fillColor: "#091934",fillOpacity: 1 }); //建立多边形覆盖物
        map.addOverlay(plyall);

        pStart = new BMap.Point(180,90);
        pEnd = new BMap.Point(0,-90);
        pArray = [
          new BMap.Point(135.077218,48.454352),
          new BMap.Point(pStart.lng,pStart.lat),
          new BMap.Point(pStart.lng,pEnd.lat),
          new BMap.Point(135.077218,48.454352)];
        var sanjiaoxing = new BMap.Polygon(pArray,
          { strokeOpacity: 1, strokeColor: "#091934",
            strokeWeight: 1, fillColor: "#091934",fillOpacity: 1}); //建立多边形覆盖物
        map.addOverlay(sanjiaoxing);
      },
      /**
       * 构建散点图
       * @param dt
       * @param roomGroup
       */
      drawScatterchart(map){
        let options = {
          fillStyle: 'rgba(255, 250, 50, 0.6)',
          //shadowColor: 'rgba(255, 250, 50, 0.5)',
          //shadowBlur: 3,
          // updateCallback: function (time) {
          //     time = time.toFixed(2);
          //     $('#time').html('时间' + time);
          // },
          size: 3,
          draw: 'simple',
          bigData: 'Point',
          animation: {
            type: 'time',
            stepsRange: {
              start: 0,
              end: 10
            },
            trails: 1,
            duration: 6,
          },
          //mapv层绑定方法
          methods : {
            //可以绑定点击方法（不限于点击点，点击其他位置也触发）
            click : function(item){
              //item:点的信息，点中点的时候有值，否则为空
              //item的内容是散点数据中全部内容
              if(item){
                //console.log(item);
              }
            }
          }
        }
        let dataPoint = this.refreshPageData(this.scatterPoint)
        let dataPointSet = new DataSet(dataPoint,options);
        let mapvPointLayer = new baiduMapLayer(map, dataPointSet, options);
        let mapvShineLayer = new baiduMapLayer(map, dataPointSet, options);
      },
      /**
       * 获取散点数据
       */
      refreshPageData(scatterPoint) {
        var data = [];
        for (var i = 0; i <scatterPoint.length; i++) {
          var geoCoord = scatterPoint[i];
          data.push({
            geometry: {
              type: 'Point',
              coordinates: geoCoord
            },
            time: Math.random() * 10
          });
        }
        return data
      },
    }
  }
</script>
<style>
  .map {
    width: 100%;
    height: 800px;
  }
</style>
