import  { createStore } from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://k5d105.p.ssafy.io:3000';

export default createStore({
  state: {
    calendarData: [],
  },
  mutations: {
    setCalendarData( state, payload ) {
      state.calendarData = payload
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
        }
        )
        .catch( error => {
          console.log('getCalendar Error')
          console.log(error)
        })
    }
  },
  modules: {}
})
