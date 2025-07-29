<template>
    <div class="box">
        <a-input @focus="onFocus" v-model:value="calendarData" placeholder="请选择日期">
            <template #suffix>
                <CalendarOutlined />
            </template>
        </a-input>
        <a-calendar v-if="isShowCalendar" :fullscreen="false" v-model:value="date" @select="selectDate">
            <template #headerRender="{ value, type, onChange, onTypeChange }">
                <div class="header">
                    <span @click="prevMonth(value, onChange)">
                        <LeftOutlined />
                    </span>
                    {{ format(value) }}
                    <div>
                        <span @click="nextMonth(value, onChange)">
                            <RightOutlined />
                        </span>
                        <span @click="isShowCalendar = false">
                            <CloseOutlined />
                        </span>
                    </div>
                </div>
            </template>
            <template #dateFullCellRender="{ current: value }">
                <div :class="getDateCss(value)">
                    {{ value.date() }}
                </div>
            </template>
        </a-calendar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
const calendarData = ref('')
const isShowCalendar = ref(false)
const onFocus = () => {
    isShowCalendar.value = true
}
const tempFlag = ref(false)
const prevMonth = (value, onChange) => {
    console.log(33333333)
    tempFlag.value = true
    let newMonth = dayjs(value).subtract(1, 'months');
    onChange(newMonth);
}
const nextMonth = (value, onChange) => {
    tempFlag.value = true
    console.log(7777)
    let newMonth = dayjs(value).add(1, 'months');
    onChange(newMonth);
}
const date = ref();
const tempList = ref([])
const selectDate = (val) => {
    console.log(tempFlag.value)
    if (!tempFlag.value) {
        console.log(2222222)
        const newVal = dayjs(val).format("YYYY-MM-DD");
        let flag = false
        tempList.value.map((item, index) => {
            if (newVal == item) {
                tempList.value.splice(index, 1)
                flag = true
            }
        })
        if (!flag) {
            tempList.value.push(newVal)
        }
        date.value = val;
        calendarData.value = tempList.value.join(",")
        console.log(calendarData.value)
        console.log(5555, tempList.value)
    }
};
// 自定义日历头
const format = (val) => {
    const newVal = dayjs(val).format("YYYY-MM");
    return newVal;
};
// 日期样式设置
const getDateCss = (val) => {
    console.log(44444444444)
    let flag = false
    tempList.value.map(item => {
        if (dayjs(val).format("YYYY-MM-DD") == item) {
            flag = true
        }
    })
    if (flag) {
        tempFlag.value = false
        return "date work";
    } else {
        tempFlag.value = false
        return "date";
    }
};
</script>

<style scoped lang="less">
.box {
    .header {
        padding: 12px;
        text-align: center;
        display: flex;
        justify-content: space-between;
    }

    span {
        cursor: pointer;
    }

    .date {
        position: relative;
        z-index: 2;
        display: inline-block;
        min-width: 24px;
        height: 24px;
        line-height: 24px;
        border-radius: 2px;
        transition: background 0.3s, border 0.3s;

        &.work {
            background-color: rgb(20, 134, 228);
        }

        &.week {
            background-color: rgb(193, 240, 97);
        }
    }
}
</style>