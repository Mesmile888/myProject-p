<template>
    <div class="calendar">
        <a-modal v-model:open="openfull" :title="tempTitle" width="60%" height="80%">
            <full-calendar class="demo-app-calendar" :options="calendarOptions">
                <template v-slot:eventContent="arg">
                    <b>{{ arg.timeText }}</b>
                    <i>{{ arg.event.title }}</i>
                </template>
            </full-calendar>
            <div class="footer">
                <div>
                    <div class="already"></div>
                    <span>已值班</span>
                </div>
                <div>
                    <div class="antemeridian"></div>
                    <span>上午时段</span>
                </div>
                <div>
                    <div class="afternoon"></div>
                    <span>下午时段</span>
                </div>
            </div>
            <!-- 新增 -->
            <a-modal v-model:open="openAddModal" :centered = "true" @cancel="handleCancel" :title="modalTitle">
                <a-input v-model:value="fullValue"></a-input>
                <a-input v-model:value="colorBox" disabled style="margin-top: 10px;"></a-input>
                <div class="colorBox">
                    <div @click="colorActive('#E8E8E8')" class="already">已值班</div>
                    <div @click="colorActive('#1890FF')" class="antemeridian">上午时段</div>
                    <div @click="colorActive('#FFA048')" class="afternoon">下午时段</div>
                </div>
                <template #footer>
                    <a-button key="back" @click="handleCancel">取 消</a-button>
                    <a-button key="submit" type="primary" @click="handleOk">确 定</a-button>
                </template>
            </a-modal>
            <template #footer>
                    <a-button @click="openfull = false">取消</a-button>
                    <a-button type="primary" @click="handleClick">确认</a-button>
            </template>
        </a-modal>
    </div>
  </template>
<script lang="ts" setup>
    import { nextTick, ref, computed } from 'vue'
    import $ from 'jquery';
    import FullCalendar from '@fullcalendar/vue3';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import { INITIAL_EVENTS, createEventId } from './event-utils.js';
    import zhLocale from "@fullcalendar/core/locales/zh-cn";
    import { message } from 'ant-design-vue';
     //封装组件
    const props = defineProps({
        openfull: {
            type: Boolean,
            default: false
        },
        tempTitle: {
            type: String,
            default: ''
        },
        tempId: {
            type: String,
            defauf: ''
        }
    })
    const emit = defineEmits(['update:openfull'])
    const openfull = computed({
        get() {
            return props.openfull
        },
        set(value) {
            emit('update:openfull', value)
        }
    })
    
    const tempTitle = computed(() => {
        return props.tempTitle
    })
    const tempId = computed(() => {
        return props.tempId
    })
    console.log(tempId.value)
    const handleClick = () => {
        emit('update:openfull', false)
    }
    // FullCalendar使用方法
    // 1: 安装FullCalendar
    // yarn add @fullcalendar/core  
    // yarn add @fullcalendar/vue3  
    // yarn add @fullcalendar/daygrid  
    // yarn add @fullcalendar/interaction  
    // yarn add @fullcalendar/timegrid  
    // yarn add @fullcalendar/list
    // 2: 导入
    // export default defineComponent({
    // const openfull = ref(false)
    const openAddModal = ref(false)
    const fullValue =ref("")
    const fullContent = ref("")
    const selectInfoValue = ref("")
    const modalType = ref("")
    const modalTitle = ref("")
    const colorBox = ref("")
    const styBorTop = ref<number>(0);
    const styBorBot = ref<number>(0);
    const isTwoCol = ref(false)
    const dateMinStr = ref('')
    const dateMinEnd = ref('')
    const dateHouStrSty = ref('')
    const dateHouEndSty = ref('')
    const trHeight = ref(0)
    const eventId = ref('')
    const calendarOptions = {
        // 引入的插件，比如fullcalendar/daygrid，fullcalendar/timegrid引入后才可显示月，周，日
        plugins: [
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin // needed for dateClick
        ],
        locales: [zhLocale],
        locale: "zh-cn", // 切换语言，当前为中文
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek',
        },
        initialView: 'timeGridDay', // 默认为那个视图（月：dayGridMonth，周：timeGridWeek，日：timeGridDay）
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: false, // 是否允许拖拽
        selectable: true, // 是否可以选中日历格
        aspectRatio: 2.8, //设置日历单元格宽度与高度的比例。
        moreLinkContent: "+ 更多", //当一块区域内容太多以"+2 more"格式显示时，这个more的名称自定义
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        eventStartEditable: false,
        slotEventOverlap: false, // 相同时间段的多个日程视觉上是否允许重叠，默认true允许
        eventDurationEditable: false, // Event日程的开始结束时间距离是否可以改变，默认true，如果是false则表示开始结束时间范围不能拉伸，只能拖拽
        handleWindowResize: true, // 是否随浏览器窗口大小变化而自动变化。
        eventLimit: true, // 事件太多时, 折叠展示
        eventClick: clickInfo => { // 点击备忘录事件
            modalTitle.value = "修改"
            modalType.value = "edit"
            selectInfoValue.value = clickInfo
            fullValue.value = clickInfo.event.title
            openAddModal.value = true
        },
        dayClick: info => {
            console.log("天====》", info)
        },
        // eventDrop: dropInfo => { // 拖拽结束事件
        //     console.log(dropInfo)
        // },
        select: selectInfo => { // 点击单元格触发事件
            let flag = true
            dateHouStrSty.value = formatDateHou(selectInfo.startStr).slice(0,2)
            dateHouEndSty.value = formatDateHou(selectInfo.endStr).slice(0,2)
            dateMinStr.value = formatDateHou(selectInfo.startStr).slice(3,4)
            dateMinEnd.value = formatDateHou(selectInfo.endStr).slice(3,4)
            trHeight.value = $(".fc-timegrid-slots tr")[0].offsetHeight // 动态获取单元格高度
            if ((Number(dateHouEndSty.value) <= 12 && dateMinEnd.value == "0") && Number(dateHouStrSty.value) < 12) { // 上午时段颜色控制
                colorBox.value = "#1890FF"
                flag = false
            } else if (Number(dateHouStrSty.value) >= 12) { // 下午时段颜色控制
                colorBox.value = "#FFA048"
            }
            if ((Number(dateHouStrSty.value) < 12 && dateMinStr.value != "0") && (Number(dateHouEndSty.value) >= 12 && dateMinEnd.value != "0")) { // 是否包含在上下午之间 11:30 - 12:30
                isTwoSty()
                isTwoCol.value = true
            } else if (Number(dateHouStrSty.value) < 12 && Number(dateHouEndSty.value) >= 12 && flag) { // 是否包含在上下午之间
                isTwoSty()
                isTwoCol.value = true
            } else {
                isTwoCol.value = false
            }
            modalTitle.value = "新增"
            modalType.value = "add"
            openAddModal.value = true
            selectInfoValue.value = selectInfo
            fullContent.value = selectInfo.view.calendar
            fullContent.value.unselect()
        }
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
    }
    const isTwoSty = () => {
        if (dateMinStr.value != "0") { // 上午时段
            styBorTop.value = ((12 - Number(dateHouStrSty.value))*2-1) * trHeight.value
        } else {
            styBorTop.value = (12 - Number(dateHouStrSty.value)) * 2 * trHeight.value
        }
        if (dateMinEnd.value != "0") { // 下午时段
            styBorBot.value = ((Number(dateHouEndSty.value) - 12)*2+1) * trHeight.value
        } else {
            styBorBot.value = (Number(dateHouEndSty.value) - 12) * 2 * trHeight.value
        }
    }
    let numArr = []
    if (JSON.parse(localStorage.getItem("numArr")) != null) {
        numArr = JSON.parse(localStorage.getItem("numArr"))
    }
    nextTick(() => {
            // trHeight.value = $(".fc-timegrid-slots tr")[0].offsetHeight // 动态获取单元格高度
        $(".fc-prev-button").removeAttr("title")
        $(".fc-next-button").removeAttr("title")
        $(".fc-prev-button").click(function() { // 上 按钮
            prenexBtn()
        })
        $(".fc-next-button").click(function() { // 下 按钮
            prenexBtn()
        })
        $(".fc-timeGridWeek-button").click(function() { // 周 按钮
            prenexBtn()
        })
        $(".fc-today-button").click(function() { // 今天 按钮
            prenexBtn()
        })
        console.log(getMaxValue(INITIAL_EVENTS, 'id'),11111)
        INITIAL_EVENTS.map(item => { // 如果事件结束时间小于当前时间用#E8E8E8代表
            if (new Date(item.end).getTime() < new Date().getTime()) {
                delete item.className
                item.color = '#E8E8E8'
            }
        })
        let tempArr = JSON.parse(localStorage.getItem("numArr"))
        if(tempArr != null) {
            tempArr.map(item => {
                INITIAL_EVENTS.map(item1 => {
                    // console.log(item1.id)
                    if (item.eventId == item1.id) {
                        $(`.${item.eventId}borderSty`).css({ "border": "none", "border-top": `${item.top}px solid #1890FF`,"border-bottom": `${item.bot}px solid #FFA048` })
                    }
                })
            })
        }
        
    })
    // 取对象数组最大值
    const getMaxValue = (arr, item) => {
        let maxValue = arr[0][item]; // 初始化为数组的第一个对象的对应项的值
        for (let i = 1; i < arr.length; i++) { // 从数组的第二个对象开始比较
            const currentValue = arr[i][item]; 
            if (currentValue > maxValue) {
                maxValue = currentValue;
            }
        }
        return maxValue;    
    }
    const prenexBtn = () => { // 点击切换后重新赋值颜色
        numArr.map(item => {
            $(`.${item.eventId}borderSty`).css({ "border": "none", "border-top": `${item.top}px solid #1890FF`,"border-bottom": `${item.bot}px solid #FFA048` })
        })
    }
    const handleOk = () => { // 弹窗
        if (fullValue.value != "" && modalType.value == "add") { // 新增备忘录
            eventId.value = createEventId()
            let tempObj = {
                id: eventId.value,
                title: fullValue.value,
                start: selectInfoValue.value.startStr,
                end: selectInfoValue.value.endStr,
                allDay: selectInfoValue.value.allDay,
                color: colorBox.value,
                className: ''
            }
            if (isTwoCol.value == true) {
                tempObj.className = `${eventId.value}borderSty`
                nextTick(() => {
                    numArr.push({
                        eventId: eventId.value,
                        top: styBorTop.value,
                        bot: styBorBot.value
                    })
                    $(`.${eventId.value}borderSty`).css({ "border": "none", "border-top": `${styBorTop.value}px solid #1890FF`, "border-bottom": `${styBorBot.value}px solid #FFA048` })
                    localStorage.setItem("numArr", JSON.stringify(numArr))
                })
            } else {
                tempObj.className = ''
            }
            // console.log(INITIAL_EVENTS)
            INITIAL_EVENTS.push(tempObj)
            fullContent.value.addEvent(tempObj)
            message.success('新增成功！');
        } else if (modalType.value == "edit") {  // 修改备忘录
            selectInfoValue.value.event.setProp("title", fullValue.value)
            selectInfoValue.value.event.setProp("color", colorBox.value)
            message.success('修改成功！');
        } else { // input为空提示
            message.info('请填写新增内容！');
        }
        openAddModal.value = false
        fullValue.value = ""
        colorBox.value = ""
    }
    // 取消
    const handleCancel = () => {
        openAddModal.value = false
        fullValue.value = ""
    }
    // 颜色控制
    const colorActive = (type) => {
        colorBox.value = type
    }
    // 日期格式 转换 时分秒
    const formatDateHou = (cellValue) => { 
        if (cellValue == null || cellValue == "") return "";  //空值直接返回空
        var date = new Date(cellValue)
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return hours + ':' + minutes + ':' + seconds
    }
    // 日期格式 转换 年月日 时分秒
    const formatDate = (cellValue) => { 
        if (cellValue == null || cellValue == "") return "";  //空值直接返回空
        var date = new Date(cellValue)
        var year = date.getFullYear()
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return year +  '-'  + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    }
</script>
<style lang='css'>
    h2 {
        margin: 0;
        font-size: 16px;
    }

    ul {
        margin: 0;
        padding: 0 0 0 1.5em;
    }

    li {
        margin: 1.5em 0;
        padding: 0;
    }

    b {
        /* used for event dates/times */
        margin-right: 3px;
    }

    .demo-app {
        display: flex;
        min-height: 100%;
        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
        font-size: 14px;
    }

    .demo-app-sidebar {
        width: 300px;
        line-height: 1.5;
        background: #eaf9ff;
        border-right: 1px solid #d3e2e8;
    }

    .demo-app-sidebar-section {
        padding: 2em;
    }

    .demo-app-main {
        flex-grow: 1;
        padding: 3em;
    }

    .fc {
    /* the calendar root */
        /* max-width: 1100px; */
        margin: 0 auto;
    }
    .fc .fc-popover {
        z-index: 22;
    }
    .footer {
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .colorBox {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
    }
    .colorBox>div {
        width: 70px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
        cursor: pointer;
    }
    .footer>div {
        display: flex;
        margin-right: 30px;
        align-items: center;
    }
    .footer>div>div {
        margin-right: 10px;
        width: 40px;
        height: 25px;
    }
    .already {
        background: #E8E8E8;
    }
    .antemeridian {
        background: #1890FF;
    }
    .afternoon {
        background: #FFA048;
    }
</style>
