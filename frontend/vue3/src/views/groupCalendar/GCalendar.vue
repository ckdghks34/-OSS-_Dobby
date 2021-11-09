<template>
  <FullCalendar
        class="calendar-calendar"
        ref="fullCalendar"
        :options="calendarOptions" />
</template>

<script>

// Calendar
import '@fullcalendar/core/vdom' // solves problem with Vite
// import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/vue3'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export default {
  name: 'GCalendar',
  components: {
    FullCalendar
  },

  setup() {

    const store = useStore()
    const router = useRouter()


    const handleClickDate =  function () {
      if ( confirm('일정을 추가하시겠습니까?') ) {
        router.push({name: 'Schedule'})
      }
    }

    const handleEventClick = (clickInfo) => {
      // vuex 상태전환
      store.dispatch('setModal', clickInfo.event)
      // modal open
      // showModal()
    }

    const calendarOptions = {
        plugins: [ 
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin
        ],
        headerToolbar: {
          left: '',
          center: '',
          right: ''
        },
        initialView: 'dayGridMonth',
        dateClick: handleClickDate,
        eventClick: handleEventClick,
        events: [],
        eventColor: 'red', // color default?
        timeZone: "local", // local default
        display: 'list-item',
        height: "auto", // height
    }

    return {
      calendarOptions
    }
  }
}
</script>

<style>

</style>