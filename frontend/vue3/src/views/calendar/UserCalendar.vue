<template>
  <div class=calendar-main>
    <h2>Calendar!</h2>
    <div class='calendar-calwrap'>
      <FullCalendar
        class="calendar-calendar"
        :options="calendarOptions" />
    </div>
    <div class='calendar-todowrap'>
      <TodoList 
        class="calendar-todolist"/>
    </div>
  </div>
  <teleport to="#destination">
    <!-- 자식 엘리먼트 접근 -->
    <CalendarModal ref="modal" :curModal="curModal">
    </CalendarModal>
  </teleport>
</template>

<script>
// vue
import { ref } from "vue";

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
    // const disableTeleport = ref(false);
    const modal = ref(null);
    function showModal() {
      // VMmodal.vue에 접근하여 show 함수 실행
      modal.value.show();
    }
    return {
      // disableTeleport,
      modal,
      showModal
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
          center: '',
          right: 'dayGridMonth timeGridWeek timeGridDay listWeek'
        },
        initialView: 'dayGridMonth',
        dateClick: this.handleClickDate,
        eventClick: this.handleEventClick,
        events: [
          { title: 'event 1',
            start: '2021-11-01',
            end: '2021-11-07',
            color: 'yellow',
            textColor:'black',
            extendedProps: {
              // status: 'done',
            }
          },
          { title: 'event 2', date: '2021-11-28' },
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
          }
        ],
        eventColor: 'red', // color default?
        timeZone: "local", // local default
        display: 'list-item',
        height: "auto" // height
      },
      currentEvents:[],
    }
  },
  methods: {
    handleClickDate: function (arg) {
      alert('check your schedule!' + arg.dateStr)
    },
    handleEventClick(clickInfo) {
      this.curModal = {
        // 'Calendar': clickInfo.event._def
        'title' : clickInfo.event._def.title
      }
      console.log(this.curModal)
      this.showModal()
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }
    },
    handleEvents(events) {
      this.currentEvents = events
    }
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