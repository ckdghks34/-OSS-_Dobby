<template>
  <div class=calendar-main>
    <h2>Calendar!</h2>
    <div class='calendar-calwrap'>
      <FullCalendar
        class="calendar-calendar"
        ref="fullCalendar"
        :options="calendarOptions" />
    </div>

    <div class='calendar-todowrap'>
      <TodoList 
        class="calendar-todolist"/>
    </div>
  </div>
  <teleport to="#destination">
    <!-- 자식 엘리먼트 접근 -->
    <!-- <CalendarModal ref="modal" :curModal="curModal"> -->
    <CalendarModal ref="modal">
    </CalendarModal>
  </teleport>
</template>

<script>
// vue
import { computed, ref } from "vue";
import {  useStore, mapActions } from "vuex" 

// Calendar
import '@fullcalendar/core/vdom' // solves problem with Vite
// import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/vue3'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

// Component
import TodoList from '@/views/calendar/TodoList'

// modal
import CalendarModal from '@/components/teleport/CalendarModal'

export default {
  name: "UserCalendar",
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    TodoList,
    CalendarModal
  },

  setup() {
    const store = useStore()
    const cData = computed(() => store.state.calendarData)

    const modal = ref(null);
    function showModal() {
      // VMmodal.vue에 접근하여 show 함수 실행
      modal.value.show();
    }


    return {
      // disableTeleport,
      modal,
      showModal,
      cData
    };
  },

  data() {
    return {
      curModal:{},
      calendarOptions: {
        plugins: [ 
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin
        ],
        headerToolbar: {
          left: 'today prev,next',
          center: 'title',
          right: 'dayGridMonth timeGridWeek timeGridDay listWeek'
        },
        initialView: 'dayGridMonth',
        dateClick: this.handleClickDate,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        events: [],
        eventColor: 'red', // color default?
        timeZone: "local", // local default
        display: 'list-item',
        height: "auto", // height
      },
    }
  },

  mounted() { 
    // calendar 초기화
    this.initData()
  },

  methods: {
    ...mapActions(['setModal']),

    handleClickDate: function (arg) {
      alert('check your schedule!' + arg.dateStr)
    },

    handleEventClick(clickInfo) {

      // vuex 상태전환
      this.setModal(clickInfo.event)

      // modal open
      this.showModal()
    },

    handleEvents(events) {
      this.currentEvents = events
    },

    initData() {
      console.log('init data')
      let calendarApi = this.$refs.fullCalendar.getApi()
      const data = calendarApi.getEvents()
      // 중복을 방지하기 위해서!
      if (data.length) {
        data.map(
          d => d.remove()
        )
      }
      // state 와 동기화 해주기
      this.cData.map(
        c => calendarApi.addEvent({
          title: c.title,
          start: c.start,
          end: c.end,
          color: c.color,
          textColor: 'black',
        })
      )
    },
  }
}
</script>

<style>

  /* calendar 크기는 width 를 통해서 조절한다. %, px 둘 다 된다.*/
  .calendar-calwrap {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .calendar-calendar {
    height: 100%;
    width: 900px;
  }

</style>