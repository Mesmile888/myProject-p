<template>
    <!-- 放置地图容器 -->
    <div class="map" ref="map"></div>
  </template>
   
  <script setup>
import { ref,nextTick, onMounted } from 'vue'
   
  // 引入echarts
import * as echarts from "echarts";
import axios from 'axios'
  
   
  // 引入中国地图json数据
//   import chinaJSON from "./china.json";
   
  // 获取地图DOM元素
let map = ref();
let dataList = []
const base = 'https://geo.datav.aliyun.com/areas_v3/bound/';
  

const mapEcharts = () => { 
    getData('china').then(res => { 
        dataList = res.data
        echarts.registerMap("china", dataList );
        // echarts.registerMap("china", res.data as any);
    })
}
const getData = (params, city) => {
    city = city + '_full.json';
    if (params.includes('china')) {
        city = '100000_full.json';
    }
    return axios.get(base + city);
}
mapEcharts()

  // 注册中国地图

  onMounted(() => {
    let myMap = echarts.init(map.value);
    //设置配置项
    myMap.setOption({
      geo: {
        map: "china",
        roam: true, //鼠标缩放
        //地图位置
        left: 40,
        top: 80,
        bottom: 20,
        right: 20,
        // 地图文字设置
        label: {
          show: true,
          color: "white",
          fontSize: 14,
        },
        itemStyle: {
          color:
            // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
            {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              // 渐变效果
              colorStops: [
                {
                  offset: 0,
                  color: "#022960", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#023481", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          // 边框设置样式
          borderColor: "#179FCB",
          shadowColor: "rgba(23,159,203, 0.5)",
          shadowBlur: 17,
        },
        //   地图高亮效果
        emphasis: {
          itemStyle: {
            color: "#1369CD",
          },
          label: {
            color: "#82B9F8",
          },
        },
      },
      series: [
        // 添加航线
        {
          type: "lines",
          // 动画特效设置
          effect: {
            show: true,
            // 飞线标记图形
            // symbol:'arrow',
            // 下面使用的是小飞机图标
            symbol:
              "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
            //飞机的速度  这里是s单位
            period: 6,
            trailLength: 0,
            // 飞机大小
            symbolSize: 16,
            color: "#ff8800",
          },
          data: [
            {
              coords: [
                // 模拟数据
                [116.405285, 39.904989], //终点  北京
                [119.306239, 26.075302], //起点  福建
              ],
              // 统一的样式设置
              lineStyle: {
                color: "white",
                type: "dashed", //设置虚线
                curveness: 0.1, // 弯曲度
              },
            },
          ],
        },
      //   给航线起始点添加效果
        {
          type: "effectScatter",//涟漪特效动画的散点（气泡）图
          coordinateSystem: "geo",
          zlevel: 2,
          //涟漪特效相关配置
          rippleEffect: {
            //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: "stroke", //波纹绘制方式 stroke, fill
            scale: 4, //波纹圆环最大限制，值越大波纹越大
          },
          label: {
            normal: {
              show: false,
              position: "right", //显示位置
              offset: [5, 0], //偏移设置
            },
          },
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            normal: {
              // 设置圆环颜色
              color: "#E0C896",
            },
          },
          data: [{
              // name:'北京',
              value:[116.405285, 39.904989]
          }],
        },
        //终点
      {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
              period: 4,
              brushType: 'stroke',
              scale: 4
          },
          label: {
              normal: {
                  show: false,
                  position: 'right', //显示位置
                  offset: [5, 0], //偏移设置
                  formatter: '', //圆环显示文字
              },
              emphasis: {
                  show: true
              }
          },
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
              normal: {
              // 设置圆环颜色
                  color: '#63FF00',
              }
          },
          data: [{
              // name:'福建',
              value:[119.306239, 26.075302]
          }],
      }
      ],
    });
  });
  </script>
   
  <style scoped lang="scss"></style>