<template>
    <div ref="wordCloud" style="width: 100%; height: 400px;"></div>
  </template>
   
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
  import 'echarts-wordcloud'
   
  const wordCloud = ref(null);
   
  onMounted(() => {
    const chart = echarts.init(wordCloud.value);
    const option = {
      series: [
        {
          type: 'wordCloud',
          gridSize: 20,
          sizeRange: [12, 50],
          rotationRange: [-90, 90],
          textStyle: {
            normal: {
              color: function () {
                return (
                  'rgb(' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ')'
                );
              },
            },
          },
          data: [
            { name: '上海', value: 100 },
            { name: '北京', value: 200 },
            { name: '南京', value: 300 },
            { name: '黑龙江', value: 400 },
            // ...更多数据
          ],
        },
      ],
    };
   
    chart.setOption(option);
  });
  </script>