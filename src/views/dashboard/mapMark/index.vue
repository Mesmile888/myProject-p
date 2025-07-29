<template style="height: 100%">
    <div class="box" >
        <div>
            <a-button @click="resetMap">重置到中国地图</a-button>
            <!-- <a-button @click="handleBack">返回到省级</a-button> -->
        </div>
        <div ref="container" style="width: 100%; flex: 1"></div>
        <el-button @click="scrollToTop">按钮</el-button>
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
import mapImg from '../../../assets/image.png'
import china from '../../../../public/json/china.json'
import hainan from '../../../../public/json/haiNan.json'
import taiWan from '../../../../public/json/taiWan.json'
import anHui from '../../../../public/json/anHui.json'
import jiangXi from '../../../../public/json/jiangXi.json'
import huNan from '../../../../public/json/huNan.json'
import yunNan from '../../../../public/json/yunNan.json'
import guiZhou from '../../../../public/json/guiZhou.json'
import guangDong from '../../../../public/json/guangDong.json'
import fuJian from '../../../../public/json/fuJian.json'
import jiangSu from '../../../../public/json/jiangSu.json'
import siChuan from '../../../../public/json/siChuan.json'
import chongQing from '../../../../public/json/chongQing.json'
import huBei from '../../../../public/json/huBei.json'
import heNan from '../../../../public/json/heNan.json'
import shanDong from '../../../../public/json/shanDong.json'
import jiLin from '../../../../public/json/jiLin.json'
import liaoNing from '../../../../public/json/liaoNing.json'
import tianJin from '../../../../public/json/tianJin.json'
import beiJing from '../../../../public/json/beiJing.json'
import heBei from '../../../../public/json/heBei.json'
import shanXi from '../../../../public/json/shanXi.json'
import shanXi2 from '../../../../public/json/shanXi2.json'
import ningXia from '../../../../public/json/ningXia.json'
import qingHai from '../../../../public/json/qingHai.json'
import xiZang from '../../../../public/json/xiZang.json'
import heiLongJiang from '../../../../public/json/heiLongJiang.json'
import neimengGu from '../../../../public/json/neimengGu.json'
import ganSu from '../../../../public/json/ganSu.json'
import xinJiang from '../../../../public/json/xinJiang.json'
import guangxi from '../../../../public/json/guangxi.json'
import zheJiang from '../../../../public/json/zheJiang.json'
import axios from 'axios'
// const base = 'https://geo.datav.aliyun.com/areas_v3/bound/';
const base = 'https://api.ppmark.cn/chart-assets';
const domImg = new Image()
domImg.src = mapImg
const container = ref(null);
const chartInstance = ref(null);
const featuresData = ref([])
const returnArray = ref([])
const open = ref(false);
const scrollToTop = (e) => {
    console.log(222,e.target.scrollTop)
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth'
//   });
};
console.log(111111,china)
// const getJson = () => {
//     axios.get('src/views/dashboard/mapMark/china.json').then(res => {
//         console.log(res)
//     })
// }
// getJson()
//     const afterOpenChange = (bool: boolean) => {
//   console.log('open', bool);
// };

//定义一个全局变量，用来统计每个省有几个市
let num = 0;
//1.中国地图
// var chinaMap = "/asset/get/s/data-1621947890604-aSx9ZxNx1.json";
var chinaMap = china;
//2.台湾省地图
// var taiWanMap = "/asset/get/s/data-1621947975053-R-8DyOg0e.json";
var taiWanMap = taiWan;
//3.海南省地图
// var haiNanMap = "/asset/get/s/data-1621948145271-68eCc32D3.json";
var haiNanMap = hainan;
//4.安徽省地图
// var anHuiMap = "/asset/get/s/data-1621948188732-TXl0sSFuy.json";
var anHuiMap = anHui;
//5.江西省地图
// var jiangXiMap = "/asset/get/s/data-1621948233209--fwwE8_l7.json";
var jiangXiMap = jiangXi;
//6.湖南省地图
// var huNanMap = "/asset/get/s/data-1621948319356-HrpXRrJ6l.json";
var huNanMap = huNan;
//7.云南省地图
// var yunNanMap = "/asset/get/s/data-1621948345350-4CVpSWQSK.json";
var yunNanMap = yunNan;
//8.贵州省地图
// var guiZhouMap = "/asset/get/s/data-1621948396733-Udi6XAEgw.json";
var guiZhouMap = guiZhou;
//9.广东省地图
// var guangDongMap = "/asset/get/s/data-1621948441031-pLiWmoZet.json";
var guangDongMap = guangDong;
//10.福建省地图
// var fuJianMap = "/asset/get/s/data-1621948490541-XH7VxL7oj.json";
var fuJianMap = fuJian;
//11.浙江省地图
// var zheJiangMap = "/asset/get/s/data-1621948532095-VbosDul6I.json";
var zheJiangMap = zheJiang;
//12.江苏省地图
// var jiangSuMap = "/asset/get/s/data-1621948565021-s3yTJP3Zl.json";
var jiangSuMap = jiangSu;
//13.四川省地图
// var siChuanMap = "/asset/get/s/data-1621948609883-izF8OEpk9.json";
var siChuanMap = siChuan;
//14.重庆市市地图
// var chongQingMap = "/asset/get/s/data-1621948631044-2W6Sgh1H-.json";
var chongQingMap = chongQing;
//15.湖北省地图
// var huBeiMap = "/asset/get/s/data-1621948649243-GxqNlvJU5.json";
var huBeiMap = huBei;
//16.河南省地图
// var heNanMap = "/asset/get/s/data-1621948703170-imaQv84Cd.json";
var heNanMap = heNan;
//17.山东省地图
// var shanDongMap = "/asset/get/s/data-1621948716835-cOtdSmaJo.json";
var shanDongMap = shanDong;
//18.吉林省地图
// var jiLinMap = "/asset/get/s/data-1621948723748-c4ZOa5KTk.json";
var jiLinMap = jiLin;
//19.辽宁省地图
// var liaoNingMap = "/asset/get/s/data-1621948731460-_efUVEzY0.json";
var liaoNingMap = liaoNing;
//20.天津市市地图
// var tianJinMap = "/asset/get/s/data-1621948739174-L2C2t_F5t.json";
var tianJinMap = tianJin;
//21.北京市市地图
// var beiJingMap = "/asset/get/s/data-1621948858020-sL_9-nzvY.json";
var beiJingMap = beiJing;
//22.河北省地图
// var heBeiMap = "/asset/get/s/data-1621948873563-JNgr5paiY.json";
var heBeiMap = heBei;
//23.山西省地图
// var shanXiMap = "/asset/get/s/data-1621948883641-gFXuKdbe9.json";
var shanXiMap = shanXi;
//24.陕西省地图
// var shanXi2Map = "/asset/get/s/data-1621948892136-f9xS_1lzo.json";
var shanXi2Map = shanXi2;
//25.宁夏回族自治区省地图
// var ningXiaMap = "/asset/get/s/data-1621948903314-2dSyFDeNM.json";
var ningXiaMap = ningXia;
//26.青海省地图
// var qingHaiMap = "/asset/get/s/data-1621948912616-JofrNyZIQ.json";
var qingHaiMap = qingHai;
//27.西藏自治区地图
// var xiZangMap = "/asset/get/s/data-1621948923877-Gr55e-l4V.json";
var xiZangMap = xiZang;
//28.黑龙江省地图
// var heiLongJiangMap = "/asset/get/s/data-1621948931666-7RFUheW7w.json";
var heiLongJiangMap = heiLongJiang;
//29.内蒙古自治区地图
// var neimengGuMap = "/asset/get/s/data-1621948941132-gcGpDlAy3.json";
var neimengGuMap = neimengGu;
//30.甘肃省地图
// var ganSuMap = "/asset/get/s/data-1621948952287-fhag8An8k.json";
var ganSuMap = ganSu;
//31.新疆维吾尔自治区省地图
// var xinJiangMap = "/asset/get/s/data-1621948963218-CwFnOzi4B.json";
var xinJiangMap = xinJiang;
//32.广西壮族自治区地图
// var guangxiMap = "/asset/get/s/data-1621948972207-pHKfjk3Zs.json";
var guangxiMap = guangxi;
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
    getOptions(place.value,chinaMap);
    // returnArray.value.push({
    //     adcode: 100000,
    //     regionName: "china",
    // });
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
    // pro.value = place.value; //记录上一级地区
    // place.value = params.name;
    // //  通过点击获取adcode调取地标JSON接口
    let adcode = null;
    const filterArray = featuresData.value.filter((item) => {
        return item.properties.name === params.name;
    });
    // console.log("filterArray",filterArray)
    if (filterArray && filterArray.length > 0) {
        adcode = filterArray[0].properties.adcode;
    }
    console.log(adcode)
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
    // getOptions(place.value,adcode);
    var chooseName = mapJson.filter((item) => {
    //我们根据名字来判断是否选择一种
        return item.name == params.name;
    });
    //这里的chooseName是一个数组，我们需要获取到json 有兴趣可以打印
    console.log("chooseName",chooseName)
    if (chooseName.length == 0 || chooseName[0].name == '台湾省') {
        showDrawer()
        return
    }
    //{name: "新疆维吾尔自治区", json: "json/新疆维吾尔自治区.json"}
    mapname = chooseName[0].json;
    getOptions(params.name,mapname);
};
// 获取地图JSON数据接口
const getData = (params, city) => {
    // city = city + '_full.json';
    // if (params.includes('china')) {
    //     city = '100000_full.json';
    // }
    // return axios.get(base + city);
}
var dataList=[]

// 获取并设置图表配置项
const getOptions = (val, city) => {
    chartInstance.value.showLoading();
    // getData(val,city).then((res) => {
        chartInstance.value.hideLoading();
    chartInstance.value.clear()
        console.log(city)
        echarts.registerMap(val, city);
        featuresData.value = city.features.map(item => {
            if (item.properties.name == '香港特别行政区') {
                item.properties.name = '香港'
            }
            if (item.properties.name == '澳门特别行政区') {
                item.properties.name = '澳门'
            }
            return item
        })
        let option = {
            title: {
                text: "中国地图",
                left: "left",
                textStyle: {
                    // color: '#fff'
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
                    // color: '#fff'
                },
                calculable: true, //是否显示拖拽用的手柄，设置成true后可以拖拽数据
                realTime: true, //拖拽时，是否实时更新
                inRange: {
                    color: ["#FFFFE0", "#E6E6FA", "lightskyblue", "#90EE90", "#ff6363"],
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
            // backgroundColor: 'red',
            series: [
                {
                    title: {
                        text: '中国地图',
                    },
                    symbol: "pin",
                    symbolSize: [40, 40],
                    name: "中国地图",
                    coordinateSystem: "geo",
                    type: "map",
                    // aspectScale: 1,
                    layoutSize: 750,
                    layoutCenter: ['50%', '60%'],
                    // center: [115.97, '30%'],
                    // top: '20%',
                    // left: '30%',
                    // // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
                    // layoutSize: '100%',
                    map: val,
                    roam: true,//是否开启鼠标缩放和平移漫游
                    zoom: 1,//地图缩放比例,默认为1
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: { readOnly: false },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    label: {
                        formatter: params =>{
                            if (params.value) {
                                return `${params.name}`;
                            }
                        },
                        show: true,
                        fontSize: 10,
                        align: 'bottom',
                        verticalAlign: 'bottom'
                        // offSet: [1300, 5400],
                        // position: 'insideBottom',
                        // color: '#fff',
                        // lineHeight: 560,
                        // padding: [3, 4, 5, 6]
                    },
                    itemStyle: {
                        areaColor: '#fff',
                        normal: {
                            // areaColor: '#000',
                            borderColor: '#a18a3a',
                            borderWidth: 1,
                            // areaColor: {
                            //     type: 'image',
                            //     image: domImg,
                            //     repeat: "repeat-x"
                            // },
                        },
                        
                        emphasis: {
                            show: true,
                            areaColor: null,
                            // areaColor: {
                            //     image: domImg,
                            //     repeat: "repeat-x"
                            // },
                        }
                    },
                    // data:dataList.value
                    // 添加 data 属性，并为每个区域指定数据值
                    data: city.features.map((item) => ({
                        name: item.properties.name, // 地图区域的名称
                        value: item.properties.childrenNum, // 地图区域的数据值
                    })),
                },
                // {
		        //   //设置为分散点
		        //   type: "scatter",
		        //   //series坐标系类型
		        //   coordinateSystem: "geo",
		        //   //设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
		        //   symbol: "pin",
		        //   // //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
		        //   symbolSize: [40, 40],
		        //   //气泡字体设置
		        //   label: {
		        //     normal: {
		        //       show: true, //是否显示
		        //       textStyle: {
		        //         color: "#fff", //字体颜色
		        //         fontSize: 8, //字体大小
		        //       },
		        //       //返回气泡数据
		        //       formatter(value) {
		        //         return value.data.value[2];
		        //       },
		        //     },
		        //   },
		        //   itemStyle: {
		        //     normal: {
		        //       color: "#1E90FF", //标志颜色
		        //     },
		        //   },
		        //   //给区域赋值
		        //   data: city.features.map((item) => ({
                //         name: item.properties.name, // 地图区域的名称
                //         value: item.properties.childrenNum, // 地图区域的数据值
                //     })),
		        //   showEffectOn: "render", //配置何时显示特效。可选：'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
		        //   rippleEffect: {
		        //     //涟漪特效相关配置。
		        //     brushType: "stroke", //波纹的绘制方式，可选 'stroke' 和 'fill'
		        //   },
		        //   hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果。
		        //   zlevel: 1, //所属图形的 zlevel 值
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
    // });
};

onMounted(() => {
    document.addEventListener('scroll', scrollToTop);
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
    getOptions(place.value,mapname);
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
    /* height: 1200px; */
    height: 66%;
    text-align: right;
    background-image: url("../../../assets/image.png");
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