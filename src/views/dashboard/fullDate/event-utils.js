
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
export const INITIAL_EVENTS = [
  // {
  //   id: createEventId(),
  //   title: 'All-day event',
  //   start: todayStr
  // },
  // {
  //   id: createEventId(),
  //   title: 'Timed event',
  //   start: todayStr + 'T12:00:00'
  // },
  {
    id: '0',
    title: '没有节',
    start: '2024-04-27 11:20:24',
    end: '2024-04-26 12:29:24',
    color: '#E8E8E8',
    textColor: '#6B7280',
  },
  {
    id: '1',
    title: '情人节',
    start: '2024-11-06 13:22:24',
    allDay: true,
    color: '#fcdefa',
    textColor: '#6B7280'
  },
  {
    id: '11',
    title: '愚人节',
    start: '2024-11-16 13:22:24',
    allDay: true,
    color: '#ff5c93'
  },
  {
    id: '13',
    title: '劳动节',
    start: '2024-11-01 00:00:00',
    allDay: true,
    color: '#F59E0B',
    editable: false
  },
  {
    id: '2',
    title: '第五个任务',
    start: '2024-11-27 13:22:24',
    end: '2024-04-27 23:22:24',
    allDay: true,
    color: '#c45656'
  },
  {
    id: '4',
    title: '特定节日',
    start: '2024-11-08 13:22:24',
    end: '2024-11-12 23:22:24',
    allDay: true,
    color: '#5172dc'
  },
  {
    id: '88',
    title: '国庆节',
    start: '2024-10-01 13:22:24',
    end: '2024-10-07 23:22:24',
    allDay: true,
    color: '#fcdefa',
    textColor: '#6B7280'
  }
]

export function createEventId() {
  return String(eventGuid++)
}
