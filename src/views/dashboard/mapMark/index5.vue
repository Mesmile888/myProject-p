<template>
    <div class="box" >
        <div>
            <a-button @click="resetMap">重置到中国地图</a-button>
            <a-button @click="handleBack">返回到省级</a-button>
        </div>
        <div ref="container" style="width: 100%; flex: 1"></div>
    </div>
    <a-drawer v-model:open="open" class="custom-class" root-class-name="root-class-name" :root-style="{ color: 'blue' }"
        style="color: red" title="Basic Drawer" placement="right">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-drawer>
    <!-- <map></map> -->
</template>

<script setup>
import * as echarts from "echarts";
import { nextTick, onMounted, onUnmounted, ref, reactive } from "vue";
// import getData from "./api";
import mapImg from '../../../assets/map.jpg'

import axios from 'axios'
const base = 'https://geo.datav.aliyun.com/areas_v3/bound/';
const domImg = new Image()
domImg.src = mapImg
const container = ref(null);
const chartInstance = ref(null);
const featuresData = ref([])
const returnArray = ref([])
const open = ref(false);
//     const afterOpenChange = (bool: boolean) => {
//   console.log('open', bool);
// };

const showDrawer = () => {
    open.value = true;
};
const setOption = (options) => {
    chartInstance.value.setOption(options);
};
const place = ref("china"); //要获取哪个地区的地图数据
const pro = ref("china"); //上一级地区
// 重置地图到中国
const resetMap = () => {
    place.value = "china";
    pro.value = "china";
    returnArray.value = []
    getOptions(place.value);
    returnArray.value.push({
        adcode: 100000,
        regionName: "china",
    });
};
// 返回上一级
const handleBack = () => {
    returnArray.value.pop()
    let tempObj = returnArray.value.slice(-1)
    console.log(returnArray.value)

    if (returnArray.value && returnArray.value.length > 0) {
        let tempName = tempObj[0].regionName
        let tempAdcode = tempObj[0].adcode
        getOptions(tempName, tempAdcode);
    }
};
// 点击地图区域时触发的事件，参数 params 包含当前点击的地图区域的信息
const handleMapClick = (params) => {
    //过滤 这里是es6语法 filter函数可以看成是一个过滤函数，返回符合条件的元素的数组
    var chooseName = mapJson.filter((item) => {
    //我们根据名字来判断是否选择一种
    return item.name == params.name;
    });
    //这里的chooseName是一个数组，我们需要获取到json 有兴趣可以打印
    //{name: "新疆维吾尔自治区", json: "json/新疆维吾尔自治区.json"}
    mapname = chooseName[0].json;
    getOptions(params.name);
    // console.log('params===', params)
    // pro.value = place.value; //记录上一级地区
    // place.value = params.name;
    // //  通过点击获取adcode调取地标JSON接口
    // let adcode = null;
    // const filterArray = featuresData.value.filter((item) => {
    //     return item.properties.name === params.name;
    // });
    // if (filterArray && filterArray.length > 0) {
    //     adcode = filterArray[0].properties.adcode;
    // }
    // // 如果下设区域为0，点击弹出表格弹框
    // if (!params.data) {
    //     return
    // }
    // if (params.data.value == 0) {
    //     // alert("表格弹框")
    //     showDrawer()
    //     return
    // }
    // if (adcode) {
    //     returnArray.value.push({
    //         adcode: adcode,
    //         regionName: params.name,
    //     });
    // }
    // getOptions(place.value, adcode);
};
// 获取地图JSON数据接口
const getData = (params, city) => {
    city = city + '_full.json';
    if (params.includes('china')) {
        city = '100000_full.json';
    }
    return axios.get(base + city);
}
var dataList = []



//定义一个全局变量，用来统计每个省有几个市
let num = 0;
//1.中国地图
var chinaMap = "/asset/get/s/data-1621947890604-aSx9ZxNx1.json";
//2.台湾省地图
var taiWanMap = "/asset/get/s/data-1621947975053-R-8DyOg0e.json";
//3.海南省地图
var haiNanMap = "/asset/get/s/data-1621948145271-68eCc32D3.json";
//4.安徽省地图
var anHuiMap = "/asset/get/s/data-1621948188732-TXl0sSFuy.json";
//5.江西省地图
var jiangXiMap = "/asset/get/s/data-1621948233209--fwwE8_l7.json";
//6.湖南省地图
var huNanMap = "/asset/get/s/data-1621948319356-HrpXRrJ6l.json";
//7.云南省地图
var yunNanMap = "/asset/get/s/data-1621948345350-4CVpSWQSK.json";
//8.贵州省地图
var guiZhouMap = "/asset/get/s/data-1621948396733-Udi6XAEgw.json";
//9.广东省地图
var guangDongMap = "/asset/get/s/data-1621948441031-pLiWmoZet.json";
//10.福建省地图
var fuJianMap = "/asset/get/s/data-1621948490541-XH7VxL7oj.json";
//11.浙江省地图
var zheJiangMap = "/asset/get/s/data-1621948532095-VbosDul6I.json";
//12.江苏省地图
var jiangSuMap = "/asset/get/s/data-1621948565021-s3yTJP3Zl.json";
//13.四川省地图
var siChuanMap = "/asset/get/s/data-1621948609883-izF8OEpk9.json";
//14.重庆市市地图
var chongQingMap = "/asset/get/s/data-1621948631044-2W6Sgh1H-.json";
//15.湖北省地图
var huBeiMap = "/asset/get/s/data-1621948649243-GxqNlvJU5.json";
//16.河南省地图
var heNanMap = "/asset/get/s/data-1621948703170-imaQv84Cd.json";
//17.山东省地图
var shanDongMap = "/asset/get/s/data-1621948716835-cOtdSmaJo.json";
//18.吉林省地图
var jiLinMap = "/asset/get/s/data-1621948723748-c4ZOa5KTk.json";
//19.辽宁省地图
var liaoNingMap = "/asset/get/s/data-1621948731460-_efUVEzY0.json";
//20.天津市市地图
var tianJinMap = "/asset/get/s/data-1621948739174-L2C2t_F5t.json";
//21.北京市市地图
var beiJingMap = "/asset/get/s/data-1621948858020-sL_9-nzvY.json";
//22.河北省地图
var heBeiMap = "/asset/get/s/data-1621948873563-JNgr5paiY.json";
//23.山西省地图
var shanXiMap = "/asset/get/s/data-1621948883641-gFXuKdbe9.json";
//24.陕西省地图
var shanXi2Map = "/asset/get/s/data-1621948892136-f9xS_1lzo.json";
//25.宁夏回族自治区省地图
var ningXiaMap = "/asset/get/s/data-1621948903314-2dSyFDeNM.json";
//26.青海省地图
var qingHaiMap = "/asset/get/s/data-1621948912616-JofrNyZIQ.json";
//27.西藏自治区地图
var xiZangMap = "/asset/get/s/data-1621948923877-Gr55e-l4V.json";
//28.黑龙江省地图
var heiLongJiangMap = "/asset/get/s/data-1621948931666-7RFUheW7w.json";
//29.内蒙古自治区地图
var neimengGuMap = "/asset/get/s/data-1621948941132-gcGpDlAy3.json";
//30.甘肃省地图
var ganSuMap = "/asset/get/s/data-1621948952287-fhag8An8k.json";
//31.新疆维吾尔自治区省地图
var xinJiangMap = "/asset/get/s/data-1621948963218-CwFnOzi4B.json";
//32.广西壮族自治区地图
var guangxiMap = "/asset/get/s/data-1621948972207-pHKfjk3Zs.json";
//设置初始地图
var mapname = chinaMap;
//设置省份的json 这里注意名字要和中国地图上的名字一致
var mapJson = [
    {
        name: "台湾省",
        json: taiWanMap,
    },
    {
        name: "海南省",
        json: haiNanMap,
    },
    {
        name: "安徽省",
        json: anHuiMap,
    },
    {
        name: "江西省",
        json: jiangXiMap,
    },
    {
        name: "湖南省",
        json: huNanMap,
    },
    {
        name: "云南省",
        json: yunNanMap,
    },
    {
        name: "贵州省",
        json: guiZhouMap,
    },
    {
        name: "广东省",
        json: guangDongMap,
    },
    {
        name: "福建省",
        json: fuJianMap,
    },
    {
        name: "浙江省",
        json: zheJiangMap,
    },
    {
        name: "江苏省",
        json: jiangSuMap,
    },
    {
        name: "四川省",
        json: siChuanMap,
    },
    {
        name: "重庆市",
        json: chongQingMap,
    },
    {
        name: "湖北省",
        json: huBeiMap,
    },
    {
        name: "河南省",
        json: heNanMap,
    },
    {
        name: "山东省",
        json: shanDongMap,
    },
    {
        name: "吉林省",
        json: jiLinMap,
    },
    {
        name: "辽宁省",
        json: liaoNingMap,
    },
    {
        name: "天津市",
        json: tianJinMap,
    },
    {
        name: "北京市",
        json: beiJingMap,
    },
    {
        name: "河北省",
        json: heBeiMap,
    },
    {
        name: "山西省",
        json: shanXiMap,
    },
    {
        name: "陕西省",
        json: shanXi2Map,
    },
    {
        name: "宁夏回族自治区",
        json: ningXiaMap,
    },
    {
        name: "青海省",
        json: qingHaiMap,
    },
    {
        name: "西藏自治区",
        json: xiZangMap,
    },
    {
        name: "黑龙江省",
        json: heiLongJiangMap,
    },
    {
        name: "内蒙古自治区",
        json: neimengGuMap,
    },
    {
        name: "甘肃省",
        json: ganSuMap,
    },
    {
        name: "新疆维吾尔自治区",
        json: xinJiangMap,
    },
    {
        name: "广西壮族自治区",
        json: guangxiMap,
    },
];
// 获取并设置图表配置项
const getOptions = (val, city) => {
    chartInstance.value.showLoading();
    axios.get('https://api.ppmark.cn/chart-assets' + mapname).then((res) => {
        console.log(res.data)
        chartInstance.value.hideLoading();
        // chartInstance.value.clear()
        echarts.registerMap(val, res.data);
        featuresData.value = res.data.features.map(item => {
            if (item.properties.name == '香港特别行政区') {
                item.properties.name = '香港'
            }
            if (item.properties.name == '澳门特别行政区') {
                item.properties.name = '澳门'
            }
            return item
        })
        //判断是否为祖国地图
        if (mapname === chinaMap) {
            //设置小黄点
            var geoCoordMap = {
            台湾: [122, 23],
            黑龙江: [129, 51],
            内蒙古: [110.3467, 41.4899],
            吉林: [125.8154, 44.2584],
            北京市: [116.4551, 40.2539],
            辽宁: [123.1238, 42.1216],
            河北: [114.4995, 38.1006],
            天津: [117.4219, 39.4189],
            山西: [112.3352, 37.9413],
            陕西: [109.1162, 34.2004],
            甘肃: [103.5901, 36.3043],
            宁夏: [106.3586, 38.1775],
            青海: [101.4038, 36.8207],
            新疆: [87.9236, 43.5883],
            西藏: [88.388277, 31.56375],
            四川: [103.9526, 30.7617],
            重庆: [108.384366, 30.439702],
            山东: [117.1582, 36.8701],
            河南: [113.4668, 34.6234],
            江苏: [118.8062, 31.9208],
            安徽: [117.29, 32.0581],
            湖北: [114.3896, 30.6628],
            浙江: [119.5313, 29.8773],
            福建: [119.4543, 25.9222],
            江西: [116.0046, 28.6633],
            湖南: [113.0823, 28.2568],
            贵州: [106.6992, 26.7682],
            云南: [102.9199, 25.4663],
            广东: [113.12244, 23.009505],
            广西: [108.479, 23.1152],
            海南: [110.3893, 19.8516],
            上海: [121.4648, 31.2891],
            };
            //设置每个区域的值
            var data = [
            { name: "台湾", value: 1 },
            { name: "北京", value: 2 },
            { name: "天津", value: 3 },
            { name: "河北", value: 4 },
            { name: "山西", value: 5 },
            { name: "内蒙古", value: 6 },
            { name: "辽宁", value: 7 },
            { name: "吉林", value: 8 },
            { name: "黑龙江", value: 9 },
            { name: "上海", value: 10 },
            { name: "江苏", value: 11 },
            { name: "浙江", value: 12 },
            { name: "安徽", value: 13 },
            { name: "福建", value: 14 },
            { name: "江西", value: 15 },
            { name: "山东", value: 16 },
            { name: "河南", value: 17 },
            { name: "湖北", value: 18 },
            { name: "湖南", value: 19 },
            { name: "重庆", value: 200 },
            { name: "四川", value: 21 },
            { name: "贵州", value: 22 },
            { name: "云南", value: 23 },
            { name: "西藏", value: 24 },
            { name: "陕西", value: 25 },
            { name: "甘肃", value: 26 },
            { name: "青海", value: 27 },
            { name: "宁夏", value: 28 },
            { name: "新疆", value: 29 },
            { name: "广东", value: 30 },
            { name: "广西", value: 31 },
            { name: "海南", value: 32 },
            ];
            console.log("data3333",data)
            convertData(data)
            // //给每个地区赋值
            // var convertData = function (data) {
            // //定义一个数组
            // var res = [];
            // //循环遍历每个区域值
            // for (var i = 0; i < data.length; i++) {
            //     //获取坐标
            //     var geoCoord = geoCoordMap[data[i].name];
            //     //判断是否有坐标
            //     if (geoCoord) {
            //     //往数组里设置值
            //     res.push({
            //         name: data[i].name,
            //         value: geoCoord.concat(data[i].value),
            //     });
            //     }
            // }
            // return res;
            // };
        } else {
            //这里不为中国地图所以先不设置（后面需要对市区进行标记在设置）
    
            //设置小黄点
            var geoCoordMap = {};
            //设置每个区域的值
            var data = [];
            convertData(data)
            console.log("data444444",data)
            //给每个地区赋值
            // convertData = function (data) {
            // var res = [];
            // for (var i = 0; i < data.length; i++) {
            //     var geoCoord = geoCoordMap[data[i].name];
            //     if (geoCoord) {
            //     res.push({
            //         name: data[i].name,
            //         value: geoCoord.concat(data[i].value),
            //     });
            //     }
            // }
            // return res;
            // };
        }
        let option = {
            // legend: {
            //     orient: "vertical",
            //     y: "bottom",
            //     x: "right",
            //     data: ["pm2.5"],
            //     textStyle: {
            //         color: "#fff",
            //     },
            // },
            backgroundColor: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "#0f378f", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "#00091a", // 100% 处的颜色
                    },
                ],
                globalCoord: false, // 缺省为 false
            },
            title: {
                text: "中国地图",
                left: "left",
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap: {
                top: 'center',
                left: 'left',
                min: 0,
                max: 40,
                // show: false,
                text: ["高", "低"],
                textStyle: {
                    color: '#fff'
                },
                calculable: false, //是否显示拖拽用的手柄，设置成true后可以拖拽数据
                realTime: true, //拖拽时，是否实时更新
                inRange: {
                    color: ["#FFFFE0", "#E6E6FA", "lightskyblue", "#90EE90", "#ff6363"],
                },
            },
            // 提示框组件配置项
            tooltip: {
                trigger: "item", //触发类型
                formatter: function (params) {
                    console.log(params)
                    if (params.data && params.value) {
                        //提示内容【省份名称】以及其下有多少个市区
                        return `${params.name}<br/>下设区域：${params.data.value}`;
                    }
                },
            },
            // geo: {
		    //     map: val, //地图为刚刚设置的China
		    //     aspectScale: 0.75, //长宽比
		    //     zoom: 1.1, //当前视角的缩放比例
		    //     roam: false, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
		    //     itemStyle: {
		    //       //地图区域的多边形 图形样式
		    //       normal: {
		    //         areaColor: "#013C62", //地区颜色
		    //         shadowColor: "#182f68", //阴影颜色
		    //         shadowOffsetX: 0, //阴影偏移量
		    //         shadowOffsetY: 25, //阴影偏移量
		    //       },
		    //       emphasis: {
		    //         areaColor: "#2AB8FF", //地区颜色
		    //         label: {
		    //           show: false, //是否在高亮状态下显示标签
		    //         },
		    //       },
		    //     },
		    //   },
            series: [
		        //数据系列
		        {
		          type: "map", //地图类型
		          //地图上文字
		          label: {
		            normal: {
		              show: true, //是否显示标签
		              textStyle: {
		                color: "#fff",
		              },
		            },
		            emphasis: {
		              textStyle: {
		                color: "#fff",
		              },
		            },
                    },
                    // layoutSize: '70%',
		          //地图区域的多边形 图形样式
		          itemStyle: {
		            normal: {
		              borderColor: "#2ab8ff",
		              borderWidth: 1.5,
		              areaColor: "#12235c",
		            },
		            emphasis: {
		              areaColor: "#2AB8FF",
		              borderWidth: 0,
		            },
		          },
		          zoom: 1.2, //当前视角的缩放比例
		          //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
		          roam: true,
		          map: val, //使用中国地图
		        },
		        {
		          //设置为分散点
		          type: "scatter",
		          //series坐标系类型
		          coordinateSystem: "geo",
		          //设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
		          symbol: "pin",
		          // //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
		          symbolSize: [40, 40],
		          //气泡字体设置
		          label: {
		            normal: {
		              show: true, //是否显示
		              textStyle: {
		                color: "#fff", //字体颜色
		                fontSize: 8, //字体大小
		              },
		              //返回气泡数据
		              formatter(value) {
		                return value.data.value[2];
		              },
		            },
		          },
		          itemStyle: {
		            normal: {
		              color: "#1E90FF", //标志颜色
		            },
		          },
		          //给区域赋值
		          data: convertData(data),
		          showEffectOn: "render", //配置何时显示特效。可选：'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
		          rippleEffect: {
		            //涟漪特效相关配置。
		            brushType: "stroke", //波纹的绘制方式，可选 'stroke' 和 'fill'
		          },
		          hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果。
		          zlevel: 1, //所属图形的 zlevel 值
		        },
		      ],
        };
        option.title.text = val === "china" ? "中国地图" : val;
        // console.log("val", val)
        if (val == '海南省') {
            option.series[0].zoom = 1.2
            option.series[0].top = 400
            // option.series[0].layoutSize = 1800
            // option.series[0].layoutCenter = ['50%', '80%']

        } else if (val == 'china') {

            option.series[0].layoutCenter = ['50%', '45%']
        } else {
            // option.series[0].zoom = 1
            // option.series[0].top = 100
            // option.series[0].left = 400
            // option.series[0].layoutSize = '70%'
            option.series[0].layoutCenter = ['50%', '45%']
        }
        console.log(option)
        setOption(option);
    });
};
var geoCoordMap = {
    台湾: [121.5135, 25.0308],
    黑龙江: [127.9688, 45.368],
    内蒙古: [110.3467, 41.4899],
    吉林: [125.8154, 44.2584],
    北京市: [116.4551, 40.2539],
    辽宁: [123.1238, 42.1216],
    河北: [114.4995, 38.1006],
    天津: [117.4219, 39.4189],
    山西: [112.3352, 37.9413],
    陕西: [109.1162, 34.2004],
    甘肃: [103.5901, 36.3043],
    宁夏: [106.3586, 38.1775],
    青海: [101.4038, 36.8207],
    新疆: [87.9236, 43.5883],
    西藏: [91.11, 29.97],
    四川: [103.9526, 30.7617],
    重庆: [108.384366, 30.439702],
    山东: [117.1582, 36.8701],
    河南: [113.4668, 34.6234],
    江苏: [118.8062, 31.9208],
    安徽: [117.29, 32.0581],
    湖北: [114.3896, 30.6628],
    浙江: [119.5313, 29.8773],
    福建: [119.4543, 25.9222],
    江西: [116.0046, 28.6633],
    湖南: [113.0823, 28.2568],
    贵州: [106.6992, 26.7682],
    云南: [102.9199, 25.4663],
    广东: [113.12244, 23.009505],
    广西: [108.479, 23.1152],
    海南: [110.3893, 19.8516],
    上海: [121.4648, 31.2891],
};
var convertData = (data) => {
    console.log(data, 444)
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        console.log("geoCoord", geoCoord)
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    console.log(1111222, res)
    return res;
};
onMounted(() => {
    dataList.value = [
        { name: '北京市', value: 290 },
        { name: '天津市', value: 320 },
        { name: '河北省', value: 240 },
        { name: '山西省', value: 520 },
        { name: '内蒙古自治区', value: 120 },
        { name: '辽宁省', value: 210 },
        { name: '吉林省', value: 620 },
        { name: '黑龙江省', value: 20 },
        { name: '上海市', value: 220 },
        { name: '江苏省', value: 820 },
        { name: '浙江省', value: 320 },
        { name: '安徽省', value: 520 },
        { name: '福建省', value: 120 },
        { name: '江西省', value: 620 },
        { name: '山东省', value: 920 },
        { name: '河南省', value: 220 },
        { name: '湖北省', value: 720 },
        { name: '湖南省', value: 210 },
        { name: '广东省', value: 20 },
        { name: '广西壮族自治区', value: 20 },
        { name: '海南省', value: 240 },
        { name: '重庆市', value: 20 },
        { name: '四川省', value: 240 },
        { name: '贵州省', value: 420 },
        { name: '云南省', value: 320 },
        { name: '西藏自治区', value: 20 },
        { name: '陕西省', value: 240 },
        { name: '甘肃省', value: 920 },
        { name: '青海省', value: 720 },
        { name: '宁夏回族自治区', value: 120 },
        { name: '新疆维吾尔自治区', value: 420 },
        { name: '台湾省', value: 230 },
        { name: '香港特别行政区', value: 420 },
        { name: '澳门特别行政区', value: 210 },
    ]
    chartInstance.value = echarts.init(container.value);
    console.log("chartInstance.value", echarts)
    returnArray.value.push({
        adcode: 100000,
        regionName: "china",
    });
    chartInstance.value.showLoading();
    getOptions(place.value);
    // 添加点击事件监听器
    chartInstance.value.on("click", handleMapClick);
    window.onresize = () => {
        chartInstance.value.resize();
    };
});
onUnmounted(() => {
    // 页面销毁的时候，让地图实例也销毁
    if (chartInstance.value) {
        chartInstance.value.dispose();
    }
});
</script>
<style scoped>
.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 1200px;
    text-align: right;
    background-size: 100% 100%;
}

.mapStyle {
    /* background-image: mapImg; */
    /* background: #ccc; */
}

/* button {
    padding: 0 10px;
    width: fit-content;
    height: 50px;
    border-radius: 20px;
} */
</style>