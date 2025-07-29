<template>
    <div style="position: relative; width: 100%; height: 100%">
        <div id="map" ref="mapRef" style="width: 100%; height: 400px" />
        <span v-if="isBack" class="go-back" @click="gotoParent">返回</span>
    </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount } from "vue";

const mapRef = ref(null);
let mapJsonData = ref({});
let mapChart = ref(null);
let isBack = ref(false); // 加标记，是否返回上一级

// 根据地理编号请求json数据
async function fetchMapJson(adcode) {
    let city = adcode + '_full.json'
    // 使用 fetch 加载 JSON 文件
    const response = await fetch("https://geo.datav.aliyun.com/areas_v3/bound/" + city);
    mapJsonData.value = await response.json();
}

// 注册地图数据
function handleRegisterMap(regionName) {
    mapChart.value = echarts.init(mapRef.value); // 初始化地图
    echarts.registerMap(regionName, mapJsonData.value);
    const option = {
        geo: {
            map: regionName,
            aspectScale: 0.75,
            layoutCenter: ["50%", "80.5%"], //地图位置
            layoutSize: '200%',
            roam: false, //关闭缩放
            label: {
                normal: { show: true },
                emphasis: { show: true },
            },
            data: mapJsonData.value.features.map((item) => ({
                name: item.properties.name, // 地图区域的名称
                value: item.properties.childrenNum, // 地图区域的数据值
            })),
            itemStyle: {
                normal: {
                    borderColor: 'rgba(147, 235, 248, 1)',
                    borderWidth: 0.5,
                    color: {
                        type: 'linear-gradient',
                        x: 0,
                        y: 1500,
                        x2: 2500,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#009DA1' // 0% 处的颜色

                        }, {
                            offset: 1,
                            color: '#005B9E' // 50% 处的颜色

                        }],
                        global: true, // 缺省为 false
                        

                    },
                    show: true,
                    opacity: 0.5,
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            },
            regions: [{
                name: '南海诸岛',
                itemStyle: {
                    areaColor: 'rgba(0, 10, 52, 1)',
                    borderColor: 'rgba(0, 10, 52, 1)'
                },
                emphasis: {
                    areaColor: 'rgba(0, 10, 52, 1)',
                    borderColor: 'rgba(0, 10, 52, 1)'
                }
            }],
            z: 2
        },
        // geo: {
        //     map: regionName,
        //     roam: true,
        //     label: {
        //         normal: { show: true },
        //         emphasis: { show: true },
        //     },
        //     data: mapJsonData.value.features.map((item) => ({
        //         name: item.properties.name, // 地图区域的名称
        //         value: item.properties.childrenNum, // 地图区域的数据值
        //     })),
        //     layoutCenter: ["50%", "51.5%"], //地图位置
        //     aspectScale: 0.75,
        //     itemStyle: {
        //         normal: {
        //             areaColor: "#2B91B7",
        //             borderColor: "#111",
        //         },
        //         emphasis: {
        //             areaColor: "#0489d6",
        //         },
        //     },
        // },
        visualMap: {
                top: 'center',
                left: 'left',
                min: 0,
                max: 40,
                show: false,
                calculable: false, //是否显示拖拽用的手柄，设置成true后可以拖拽数据
                realTime: true, //拖拽时，是否实时更新
                inRange: {
                    color: ["#FFFFE0", "#E6E6FA", "lightskyblue", "#90EE90", "#ff6363"],
                },
            },
        // series: [
        //     {
        //         type: "scatter",
        //         coordinateSystem: "geo",
        //         map: regionName,
        //        // 添加 data 属性，并为每个区域指定数据值
        //        data: mapJsonData.value.features.map((item) => ({
        //                 name: item.properties.name, // 地图区域的名称
        //                 value: item.properties.childrenNum, // 地图区域的数据值
        //             })),
        //             label: {
        //                 show: true,
        //             },
        //     },
        // ],
    };

    mapChart.value.setOption(option);
}

// 添加省份点击事件
let returnArray = ref([]);
const handleClickMap = async (params) => {
    if (params.componentType === "geo" && params.name !== "") {
        // 查找地理编码
        let adcode = null;
        const features = mapJsonData.value.features;
        const filterArray = features.filter((item) => {
            return item.properties.name === params.name;
        });
        if (filterArray && filterArray.length > 0) {
            adcode = filterArray[0].id;
        }
        const regionName = params.name;
        if (adcode) {
            isBack.value = true;
            await fetchMapJson(adcode);
            returnArray.value.push({
                adcode: adcode,
                regionName: regionName,
                mapJsonData: JSON.stringify(mapJsonData.value),
            });
            // 清除当前地图选项
            mapChart.value.clear();
            // 刷新地图实例
            mapChart.value.resize();

            handleRegisterMap(regionName);
        }
    } else if (params.componentType === "series") {
        // 点击的数据
        const data = params.data;
        console.log("data", data);
    }
};

// 返回上级
async function gotoParent() {
    if (isBack.value) {
        if (returnArray.value.length > 0) {
            returnArray.value.pop();
            let backMap = returnArray.value.slice(-1);
            if (backMap && backMap.length > 0) {
                mapJsonData.value = JSON.parse(backMap[0].mapJsonData);
                // 清除当前地图选项
                mapChart.value.clear();
                // 刷新地图实例
                mapChart.value.resize();
                handleRegisterMap(backMap[0].regionName);
                if (backMap[0].adcode == 100000) {
                    isBack.value = false;
                    returnArray.value = [
                        {
                            adcode: 100000,
                            regionName: "china",
                            mapJsonData: JSON.stringify(chinaJsonData.value),
                        },
                    ];
                }
            }
        } else {
            isBack.value = false;
        }
    }
}

let chinaJsonData = ref({}); // 中国地图数据
onMounted(async () => {
    // 使用 fetch 加载 JSON 文件
    await fetchMapJson(100000);
    chinaJsonData.value = mapJsonData.value; // 先保留中国地图json
    handleRegisterMap("china");
    isBack.value = false;
    returnArray.value.push({
        adcode: 100000,
        regionName: "china",
        mapJsonData: JSON.stringify(chinaJsonData.value),
    });
    mapChart.value.on("click", handleClickMap);
    window.addEventListener("resize", () => {
        mapChart.value.resize();
    });
});
onBeforeUnmount(() => {
    // 移除地图点击事件监听器
    mapChart.value.off("click", handleClickMap);
});
</script>

<style scoped>
#map {
    width: 100%;
    height: 100vh;
}

.go-back {
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 9999;
    cursor: pointer;
    color: #36cfff;
}
</style>