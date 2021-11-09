<template>
  <div class="calendar-main">
    <div class="calendar-headerwrap">
      <!-- <CalendarButton ref="calButton">
        {{ state.currentMonth }}
      </CalendarButton> -->
    </div>
    <div class='calendar-calwrap'>
      <FullCalendar
            class="calendar-calendar"
            ref="groupfullCalendar"
            :options="calendarOptions" />
    </div>
    <div class='calendar-todowrap'>
      <!-- <TodoList
        class="calendar-todolist"/> -->
    </div>
  </div>
  <teleport to="#destination">
    <!-- <CalendarModal ref="modal">
    </CalendarModal> -->
    <GroupCalendarModal ref="groupModal" />
  </teleport>
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
import { computed, onMounted, ref } from 'vue'

// modal
import GroupCalendarModal from '@/components/teleport/GroupCalendarModal'

export default {
  name: 'GCalendar',
  components: {
    FullCalendar,
    GroupCalendarModal,
  },

  setup() {

    const store = useStore()
    const router = useRouter()

    const gCData = computed(() => store.state.groupCalendarData)
    const groupfullCalendar = ref(null)
    const groupModal = ref(null)

    const showGroupModal = function() {
      groupModal.value.show()
    }

    onMounted(() => {
      store.dispatch('setGroupCalendarApi', groupfullCalendar.value)
      initData()
    })


    const handleClickDate =  function () {
      if ( confirm('일정을 추가하시겠습니까?') ) {
        router.push({name: 'Schedule'})
      }
    }

    const handleEventClick = (clickInfo) => {
      // vuex 상태전환
      store.dispatch('setGroupModal', clickInfo.event)
      showGroupModal()
    }

    const initData = function () {
      // console.log('init data')
      let calendarApi = groupfullCalendar.value.getApi()
      const data = calendarApi.getEvents()

      // 중복을 방지하기 위해서!
      if (data.length) {
        data.map(
          d => d.remove()
        )
      }

      // state 와 동기화 해주기
      calendarApi.batchRendering(function() {
        gCData.value.map(
        (c) => {
          if (c.completed) {
            calendarApi.addEvent({
              cid: c.cid,
              gid: c.gid,
              completed: c.completed,
              title: c.title,
              content: c.content,
              start: c.start,
              end: c.end,
              color: c.color,
              placeName: c.placeName,
              placeLat: c.placeLat,
              placeLng: c.placeLng,
              startDate: c.startDate,
              endDate: c.endDate,
              classNames: ['calendar-done'],
              participant: c.participant,
              creator: c.creator
            })
          }
          else {
            calendarApi.addEvent(c)
          }
        })
      })
      // store.dispatch('refreshCalendarData', calendarApi.getEvents())
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
      calendarOptions,
      gCData,
      groupfullCalendar,
      groupModal,
      showGroupModal,
    }
  }
}
</script>

<style>

</style>