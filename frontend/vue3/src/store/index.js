import  { createStore } from 'vuex'
import axios from 'axios'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

const BASE_URL = 'https://k5d105.p.ssafy.io:3030/';


export default createStore({
  state: {
    isData: false,
    isTodoItem: false,
    calendarData: [],
    modalData: {},
    refreshData: [],
    todayToDoList: [],
    toDo: {}
  },
  mutations: {
    setCalendarData( state, payload ) {
      // set calendar Data
      state.calendarData = payload
    },
    checkCalendarData ( state ) {
      // check calendar loading state
      if ( state.calendarData.length )
      state.isData = true
    },
    setModalData ( state, payload ) {
      state.modalData = payload
    },
    refreshCalData ( state, payload ) {
      //todoList 뽑기...
      state.refreshData = payload
    },
    SETTODO( state, payload) {
      state.toDo = payload
      state.isTodoItem = true
    }
  },
  actions: {
    getCalendarData( {commit} ) {
      // console.log('store axios')
      
      axios.
        post(`${BASE_URL}calendar/getCalendar`,{
        // post(`${BASE_URL}get`,{
          uid: localStorage.getItem('uid')
        })
        .then( response => {
          const res = response.data.calendar.map((r) => {
            return {
              cid: r.cid,
              completed: r.completed,
              title: r.title,
              content: r.content,
              start: r.startDate+'T'+r.startTime,
              end: r.endDate+'T'+r.endTime,
              color: r.color,
              placeName: r.placeName,
              placeLat: r.placeLat,
              placeLng: r.placeLng,
              startDate: r.startDate,
              endDate: r.endDate
            }
          })
          commit('setCalendarData', res)
          commit('checkCalendarData')
        }
        )
        .catch( error => {
          console.log(error)
        })
    },
    setModal( { commit }, payload ) {
      commit('setModalData', payload)
    },
    refreshCalendarData ( { commit }, payload ) {
      commit('refreshCalData', payload)
    },
    setTodo( {commit}, payload) {
      commit('SETTODO', payload)
    }
  },
  modules: {},
  getters: {
    getModalDataFormat ( state ) {
      // 날짜 정리하기
      // Fri Nov 26 2021 18:00:00 GMT+0900 (한국 표준시)
      const ModalDate = state.modalData
      const start = ModalDate.start.toString().split(' ')
      // 시작하는 날
      const startDay = changeDateFormat(start, ModalDate.allDay)
      // 끝나는 날
      if (ModalDate.allDay) {
        return {
        'ModalDate' : ModalDate,
        'startDay' : startDay,
        'endDay' : startDay
        }
      }
      const end = ModalDate.end.toString().split(' ')
      const endDay = changeDateFormat(end, ModalDate.allDay)
      return {
        'ModalDate' : ModalDate,
        'startDay' : startDay,
        'endDay' : endDay
      }
    },
    getTodayToDoList ( state ) {

      const calData =  state.refreshData
      let date = dayjs()
      dayjs.extend(isBetween)

      const todayList = calData.filter((day) => {
        /* 
          today 조건
          1. 오늘이 시작과 끝 사이다
          2. 끝나는 날이 오늘이다
          3. 시작하는 날이 오늘이다
          ( allday )
          4. 종일일정이 오늘이다1
          5. 하루 시작과 끝이 오늘이다.
        */
        if (date.isBetween(day.startStr, day.endStr)) {
          return day
        }
        if (date.isSame(day.startStr, 'day')) {
          return day
        }
        if (date.isSame(day.endStr, 'day')) {
          return day
        }
      })

      return todayList.sort(daySort)
    }
  }
})

function daySort(a, b) {
  /*
    요구사항
    1. 당일 시간순서대로 정렬한다.
    2. 종일 일정이라면 맨 뒤로 놓는다.
    2-1. 시작한 날에 따라서 정렬한다.
    절차
    1. a 와 b의 시작날짜가 오늘인지 체크 ( allDay 도 체크해야한다.)
    1-1. 둘 다 오늘이면 정렬한다.
    1-2. 둘 중 하나라도 오늘이 아니면 뒤로 밀어버린다.
    1-3. 둘 다 오늘이 아니면 정렬한다. 시작하는 날짜 기준으로
  */
  /* 
    삼항연산자
      (dateA > dateB) ? 1 : -1
      () 조건식
      ? 1 true
      : -1 false
    sort 시 1 이면 뒤로 -1 이면 그대로 인 듯하다.
  */
  let today = dayjs()
  let dateA = new Date(a.start).getTime()
  let dateB = new Date(b.start).getTime()
  // 둘 다 오늘이면 비교
  if (today.isSame(a.startStr, 'day') && today.isSame(b.startStr, 'day')) {
    return dateA > dateB ? 1 : -1
  }
  if (!today.isSame(a.startStr, 'day') && today.isSame(b.startStr, 'day')) {
    return 1
  }
  if (today.isSame(a.startStr, 'day') && !today.isSame(b.startStr, 'day')) {
    return -1
  }
  if (!today.isSame(a.startStr, 'day') && !today.isSame(b.startStr, 'day')) {
    return dateA > dateB ? 1 : -1
  }
}

function changeDateFormat(date, allDay) {
  // 날짜 정리하기
  // Fri Nov 26 2021 18:00:00 GMT+0900 (한국 표준시)

  let month = '';
  let dow = '';
  let time = '';

  // 월 변환
  switch(date[1]) {
    case 'Jan':
      month = '1';
      break;
    case 'Feb':
      month = '2';
      break;
    case 'Mar':
      month = '3';
      break;
    case 'Apr':
      month = '4';
      break;
    case 'May':
      month = '5';
      break;
    case 'Jun':
      month = '6';
      break;
    case 'Jul':
      month = '7';
      break;
    case 'Aug':
      month = '8';
      break;
    case 'Sep':
      month = '9';
      break;
    case 'Oct':
      month = '10';
      break;
    case 'Nov':
      month = '11';
      break;
    case 'Dec':
      month = '12';
      break;
  }
  
  // 요일 변환
  switch(date[0]) {
    case 'Mon':
      dow = '월';
      break;
    case 'Tue':
      dow = '화';
      break;
    case 'Wed':
      dow = '수';
      break;
    case 'Thu':
      dow = '목';
      break;
    case 'Fri':
      dow = '금';
      break;
    case 'Sat':
      dow = '토';
      break;
    case 'Sun':
      dow = '일';
      break;
  }

  // 시간
  if( !allDay ) {
    time = date[4].slice(0,5)
    return `${date[3]}년 ${month}월 ${date[2]}일 (${dow}) ${time}`
    
  }
  return `${date[3]}년 ${month}월 ${date[2]}일 (${dow})`
}

