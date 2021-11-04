import  { createStore } from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://k5d105.p.ssafy.io:3000';


function changeDateFormat(date, allDay) {
  // 날짜 정리하기
  // Fri Nov 26 2021 18:00:00 GMT+0900 (한국 표준시)

  console.log(date)

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
    return `${date[3]}년 ${month}월 ${date[2]}일 ${dow}요일 ${time}`
    
  }
  return `${date[3]}년 ${month}월 ${date[2]}일 ${dow}요일`
}

export default createStore({
  state: {
    isData: false,
    calendarData: [],
    modalData: {},
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
    }
  },
  actions: {
    getCalendarData( {commit} ) {
      console.log('store axios')
      axios.
        // get(`${BASE_URL}+/calendar/personal`)
        get(`${BASE_URL}/get`)
        .then( response => {
          console.log('getCalendar Response')
          console.log(response)
          commit('setCalendarData', response)
          commit('checkCalendarData')
        }
        )
        .catch( error => {
          console.log('getCalendar Error')
          console.log(error)
          
          const test = [
            { title: 'event 1',
              start: '2021-11-01',
              end: '2021-11-07',
              color: 'yellow',
              textColor:'black',
              extendedProps: {
                // status: 'done',
              }
            },
            { title: 'event 2', start: '2021-11-28' },
            {
              title: 'event 3 add time',
              start: '2021-11-26T18:00:00',
              end: '2021-11-30T18:00:00',
              color: '#156452',
              textColor: 'black',
            },
            {
              title: 'event 4 today',
              start: '2021-11-03T18:00:00',
              end: '2021-11-03T21:00:00',
              color: 'blue', // 당일 일정은 textColor 를 먹지 않는다.
            },
            {
              title: 'test1',
              start: '2021-11-14T12:00:00',
              end: '2021-11-14T18:00:00',
              color: '#785235',
            },
            {
              title: 'test2',
              start: '2021-11-15T12:00:00',
              end: '2021-11-15T18:00:00',
              color: '#546122',
            },
            {
              title: 'test3',
              start: '2021-11-16T12:00:00',
              end: '2021-11-16T18:00:00',
              color: '#442236',
            },
            {
              title: 'test4',
              start: '2021-11-17T12:00:00',
              end: '2021-11-17T18:00:00',
              color: '#665532',
            },
            {
              title: 'test5',
              allDay: true,
              start: '2021-11-18',
              end: '2021-11-18',
              color: '#337898',
            },
            {
              title: 'test6',
              start: '2021-11-19T12:00:00',
              end: '2021-11-19T18:00:00',
              color: '#995522',
            },
            {
              title: 'test7',
              start: '2021-11-20T12:00:00',
              end: '2021-11-20T18:00:00',
              color: '#119955',
            },
            {
              title: 'test8',
              start: '2021-01-14',
              color: '#785235',
            },
            {
              title: 'test9',
              start: '2021-02-14',
              color: '#785235',
            },
            {
              title: 'test10',
              start: '2021-03-14',
              color: '#785235',
            },
            {
              title: 'test11',
              start: '2021-04-14',
              color: '#785235',
            },
            {
              title: 'test12',
              start: '2021-05-14',
              color: '#785235',
            },
            {
              title: 'test13',
              start: '2021-06-14',
              color: '#785235',
            },
            {
              title: 'test14',
              start: '2021-07-14',
              color: '#785235',
            },
            {
              title: 'test15',
              start: '2021-08-14',
              color: '#785235',
            },
            {
              title: 'test16',
              start: '2021-09-14',
              color: '#785235',
            },
            {
              title: 'test17',
              start: '2021-10-14',
              color: '#785235',
            },
            {
              title: 'test18',
              start: '2021-12-14',
              color: '#785235',
            },
            {
              title: 'test19',
              start: '2021-11-10',
              color: '#335566',
              allDay: true,
            }
          ]
          commit('setCalendarData', test)
          commit('checkCalendarData')
        })
    },
    setModal( { commit }, payload ) {
      commit('setModalData', payload)
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
          'title' : ModalDate.title,
          'startDate': startDay,
          'endDate': startDay,
          'bgColor': ModalDate.backgroundColor,
          'borderColor': ModalDate.borderColor,
          'textColor': ModalDate.textColor,
          'allDay' : ModalDate.allDay
        }
      }

      const end = ModalDate.end.toString().split(' ')
      const endDay = changeDateFormat(end, ModalDate.allDay)
      return {
        'title' : ModalDate.title,
        'startDate': startDay,
        'endDate': endDay,
        'bgColor': ModalDate.backgroundColor,
        'borderColor': ModalDate.borderColor,
        'textColor': ModalDate.textColor,
        'allDay' : ModalDate.allDay,
      }
    }
  }
})