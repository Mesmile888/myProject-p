<template>
    <div class="box" :style="{backgroundImage: 'url('+ mapImg +')'}">
        <div>
            <a-button @click="resetMap">重置到中国地图</a-button>
            <a-button @click="handleBack">返回到省级</a-button>
        </div>
        <div ref="container" style="width: 100%; flex: 1"></div>
    </div>
    <a-drawer
        v-model:open="open"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        style="color: red"
        title="Basic Drawer"
        placement="right"
    >
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
        getOptions(tempName,tempAdcode);
    }
};
// 点击地图区域时触发的事件，参数 params 包含当前点击的地图区域的信息
const handleMapClick = (params) => {
    console.log('params===',params)
    pro.value = place.value; //记录上一级地区
    place.value = params.name;
    //  通过点击获取adcode调取地标JSON接口
    let adcode = null;
    const filterArray = featuresData.value.filter((item) => {
        return item.properties.name === params.name;
    });
    if (filterArray && filterArray.length > 0) {
        adcode = filterArray[0].properties.adcode;
    }
    // 如果下设区域为0，点击弹出表格弹框
    if (!params.data) {
        return
    }
    if (params.data.value == 0) {
        // alert("表格弹框")
        showDrawer()
        return
    }
    if (adcode) {
        returnArray.value.push({
            adcode: adcode,
            regionName: params.name,
        });
    }
    getOptions(place.value,adcode);
};
// 获取地图JSON数据接口
const getData = (params, city) => {
    city = city + '_full.json';
    if (params.includes('china')) {
        city = '100000_full.json';
    }
    return axios.get(base + city);
}
var dataList=[]

// 获取并设置图表配置项
const getOptions = (val, city) => {
    chartInstance.value.showLoading();
    getData(val,city).then((res) => {
        chartInstance.value.hideLoading();
        chartInstance.value.clear()
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
        let option = {
            legend: {
		      orient: "vertical",
		      y: "bottom",
		      x: "right",
		      data: ["pm2.5"],
		      textStyle: {
		        color: "#fff",
		      },
            },
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
                    // color: ["#FFFFE0", "#E6E6FA", "lightskyblue", "#90EE90", "#ff6363"],
                },
            },
            // 提示框组件配置项
            tooltip: {
                trigger: "item", //触发类型
                formatter: function (params) {
                    if (params.data && params.value) {
                        //提示内容【省份名称】以及其下有多少个市区
                        return `${params.name}<br/>下设区域：${params.data.value}`;
                    }
                },
            },
            geo: {
		      map: "china",
		      show: true,
		      roam: true,
		      label: {
		        normal: {
		          show: true,
		        },
		        emphasis: {
		          show: true,
		        },
                },
		      itemStyle: {
		        normal: {
		          areaColor: "#3a7fd5",
		          borderColor: "#0a53e9", //线
		          shadowColor: "#092f8f", //外发光
		          shadowBlur: 20,
		        },
		        emphasis: {
		          areaColor: "#0a2dae", //悬浮区背景
		        },
		      },
		    },
            // backgroundColor: 'red',
            series: [
                {
                    symbolSize: 5,
                    label: {
                    normal: {
                        formatter: "{b}",
                        position: "right",
                        show: true,
                    },
                    emphasis: {
                        show: true,
                    },
                    },
                    itemStyle: {
                    normal: {
                        color: "#fff",
                    },
                    },
                    name: "light",
                    type: "scatter",
                    coordinateSystem: "geo",
                    data: convertData(dataList.value)
                    // data: res.data.features.map((item) => ({
                    //     name: item.properties.name, // 地图区域的名称
                    //     value: item.properties.childrenNum, // 地图区域的数据值
                    // })),
                },
                {
                    type: "map",
                    map: "china",
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                    normal: {
                        show: true,
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                        color: "#fff",
                        },
                    },
                    },
                    roam: true,
                    itemStyle: {
                    normal: {
                        areaColor: "#031525",
                        borderColor: "#FFFFFF",
                    },
                    emphasis: {
                        areaColor: "#2B91B7",
                    },
                    },
                    animation: false,
                    data: dataList.value
                    // data: res.data.features.map((item) => ({
                    //     name: item.properties.name, // 地图区域的名称
                    //     value: item.properties.childrenNum, // 地图区域的数据值
                    // })),
                },
                {
                    name: "Top 5",
                    type: "scatter",
                    coordinateSystem: "geo",
                    symbol: "pin",
                    symbolSize: [50, 50],
                    label: {
                    normal: {
                        show: true,
                        textStyle: {
                        color: "#fff",
                        fontSize: 9,
                        },
                        formatter(value) {
                        return value.data.value[2];
                        },
                    },
                    },
                    itemStyle: {
                    normal: {
                        color: "#D8BC37", //标志颜色
                    },
                    },
                    data: convertData(dataList.value),
                    // data: res.data.features.map((item) => ({
                    //     name: item.properties.name, // 地图区域的名称
                    //     value: item.properties.childrenNum, // 地图区域的数据值
                    // })),
                    showEffectOn: "render",
                    rippleEffect: {
                    brushType: "stroke",
                    },
                    hoverAnimation: true,
                    zlevel: 1,
                },
                // {
                //     title: {
                //         text: '中国地图',
                //     },
                //     name: "中国地图",
                //     coordinateSystem: "geo",
                //     type: "map",
                //     // aspectScale: 1,//长宽比
                //     layoutSize: 750,
                //     layoutCenter: ['50%', '60%'],
                //     // center: [115.97, '30%'],
                //     // top: '20%',
                //     // left: '30%',
                //     // // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
                //     // layoutSize: '100%',
                //     map: val,
                //     roam: true,//是否开启鼠标缩放和平移漫游
                //     zoom: 1,//地图缩放比例,默认为1
                //     toolbox: {
                //         show: true,
                //         orient: 'vertical',
                //         left: 'right',
                //         top: 'center',
                //         feature: {
                //             dataView: { readOnly: false },
                //             restore: {},
                //             saveAsImage: {}
                //         }
                //     },
                //     label: {
                //         normal: {
                //             formatter: "{b}",
                //             position: "left",
                //             show: true,
                //         },
                //         emphasis: {
                //             show: true,
                //         },
                //         formatter: params =>{
                //             if (params.value) {
                //                 return `${params.name}-${params.value}`;
                //             }
                //         },
                //         show: true,
                //         fontSize: 10,
                //         // offSet: [1300, 5400],
                //         // position: 'insideBottom',
                //         // color: '#fff',
                //         lineHeight: 56,
                //         // padding: [3, 4, 5, 6]
                //     },
                //     itemStyle: {
                //         areaColor: '#fff',
                //         normal: {
                //             // areaColor: '#000',
                //             borderColor: '#a18a3a',
                //             borderWidth: 1,
                //             // areaColor: {
                //             //     type: 'image',
                //             //     image: domImg,
                //             //     repeat: "repeat-x"
                //             // },
                //         },
                        
                //         emphasis: {
                //             show: true,
                //             areaColor: null,
                //             // areaColor: {
                //             //     image: domImg,
                //             //     repeat: "repeat-x"
                //             // },
                //         }
                //     },
                //     // data:dataList.value
                //     // 添加 data 属性，并为每个区域指定数据值
                //     data: res.data.features.map((item) => ({
                //         name: item.properties.name, // 地图区域的名称
                //         value: item.properties.childrenNum, // 地图区域的数据值
                //     })),
                // },
            ],
        };
        option.title.text = val === "china" ? "中国地图" : val;
        console.log("val",val)
        if (val == '海南省') {
            // option.series[0].zoom = 2
            // option.series[0].top = 400
            option.series[0].layoutSize = 1800
            option.series[0].layoutCenter = ['50%', '80%']

        } else if (val == 'china') {
            
            option.series[0].layoutCenter = ['50%', '45%']
        } else {
            // option.series[0].zoom = 1
            // option.series[0].top = 100
            // option.series[0].left = 400
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
    console.log(data,444)
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        console.log("geoCoord",geoCoord)
        if (geoCoord) {
        res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
        });
        }
    }
    console.log(1111222,res)
    return res;
};
onMounted(() => {
    dataList.value = [
            {name:'北京市',value:290},
            {name:'天津市',value:320},
            {name:'河北省',value:240},
            {name:'山西省',value:520},
            {name:'内蒙古自治区',value:120},
            {name:'辽宁省',value:210},
            {name:'吉林省',value:620},
            {name:'黑龙江省',value:20},
            {name:'上海市',value:220},
            {name:'江苏省',value:820},
            {name:'浙江省',value:320},
            {name:'安徽省',value:520},
            {name:'福建省',value:120},
            {name:'江西省',value:620},
            {name:'山东省',value:920},
            {name:'河南省',value:220},
            {name:'湖北省',value:720},
            {name:'湖南省',value:210},
            {name:'广东省',value:20},
            {name:'广西壮族自治区',value:20},
            {name:'海南省',value:240},
            {name:'重庆市',value:20},
            {name:'四川省',value:240},
            {name:'贵州省',value:420},
            {name:'云南省',value:320},
            {name:'西藏自治区',value:20},
            {name:'陕西省',value:240},
            {name:'甘肃省',value:920},
            {name:'青海省',value:720},
            {name:'宁夏回族自治区',value:120},
            {name:'新疆维吾尔自治区',value:420},
            {name:'台湾省',value:230},
            {name:'香港特别行政区',value:420},
            {name:'澳门特别行政区',value:210},
        ]
    chartInstance.value = echarts.init(container.value);
    console.log("chartInstance.value",echarts)
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