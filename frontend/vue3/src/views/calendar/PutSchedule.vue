<template>
  <div class="schedule-info" v-if="state.isBig">
    <h1>Put Schedule</h1>
    <div class="userCalendar-schedule-row">
      <label class="label" for="scheduleTitle">제목</label>
      <input
        class="web-input"
        id="scheduleTitle"
        type="text"
        v-model="state.title"
      />
    </div>
    <br />
    <div class="userCalendar-schedule-row">
      <label class="label" for="date">날짜</label>
      <div class="scheduleDate">
        <div class="block">
          <el-date-picker
            class="datePicker"
            v-model="state.date"
            type="daterange"
            value-format="YYYY-MM-DD"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- <input
        class="date-input"
        type="date"
        id="date"
        v-model="state.startDay"
      />~<input class="date-input" type="date" v-model="state.endDay" /> -->
    </div>
    <br />
    <div class="userCalendar-schedule-row">
      <label class="label" for="time">시간</label>
      <input
        class="time-input"
        type="time"
        id="time"
        v-model="state.startTime"
      />
      ~ <input class="time-input" type="time" v-model="state.endTime" />
    </div>
    <br />
    <div class="userCalendar-schedule-allDay">
      <label for="allDay" class="label">종일</label>
      <input type="checkbox" v-model="state.allDay" />
    </div>
    <br />
    <div class="userCalendar-schedule-row">
      <label class="label" for="place">장소</label>
      <input
        class="web-input"
        type="text"
        id="place"
        v-model="state.placeName"
      />
    </div>
    <br />
    <div class="userCalendar-schedule-category">
      <label class="label" for="category">분류</label>
      <div class="userCalendar-schedule-category-button-wrap">
        <el-radio v-model="state.category" label="공부" border size="medium"
          >공부</el-radio
        >
        <el-radio v-model="state.category" label="운동" border>운동</el-radio>
        <el-radio v-model="state.category" label="업무" border>업무</el-radio>
        <el-radio v-model="state.category" label="취미" border>취미</el-radio>
      </div>
    </div>
    <br />
    <div class="userCalendar-schedule-color-wrap">
      <label class="label" for="radio">중요도</label>
      <div class="userCalendar-schedule-color-box">
        <label class="import-label" v-bind:class="{ red: true }"
          ><input type="radio" value="#FF7C7C" v-model="state.color"
        /></label>
        <label class="import-label" v-bind:class="{ orange: true }"
          ><input type="radio" value="#FECFA3" v-model="state.color"
        /></label>
        <label class="import-label" v-bind:class="{ yellow: true }"
          ><input type="radio" value="#FFF972" v-model="state.color"
        /></label>
        <label class="import-label" v-bind:class="{ green: true }"
          ><input type="radio" value="#B6FB81" v-model="state.color"
        /></label>
        <label class="import-label" v-bind:class="{ blue: true }"
          ><input type="radio" value="#7886FF" v-model="state.color"
        /></label>
      </div>
    </div>
    <br />
    <div class="userCalendar-schedule-row">
      <label class="label">내용</label>
      <input
        class="web-memo"
        v-bind:class="{ 'memo-content': true, input: true }"
        type="text"
        v-model="state.content"
      />
    </div>
    <br />
    <div>
      <button class="web-button-red" @click="handleCancle">취소</button>
      <button
        class="web-button-blue"
        style="margin-left:30px"
        type="button"
        @click="putSchedule"
        v-bind:disabled="title == ''"
      >
        수정
      </button>
    </div>
  </div>

  <div class="mobile-schedule-main" v-else>
    <h1>New Schedule</h1>
    <div>
      <label class="label" for="scheduleTitle">제목</label>
      <input
        class="input"
        id="scheduleTitle"
        type="text"
        v-model="state.title"
      />
    </div>
    <br />
    <div>
      <label class="label" for="date">날짜</label>
      <div>
        <input
          class="input"
          type="date"
          id="date"
          v-model="state.startDate"
        />~<input class="input" type="date" v-model="state.endDate" />
      </div>
    </div>
    <br />
    <div>
      <!--v-if -->
      <label class="label" for="time">시간</label>
      <input class="input" type="time" id="time" v-model="state.startTime" /> ~
      <input class="input" type="time" v-model="state.endTime" />
    </div>
    <br />
    <div>
      <label for="allDay" class="label">종일</label>
      <input type="checkbox" v-model="state.allDay" />
    </div>
    <br />
    <div>
      <label class="label" for="place">장소</label>
      <input class="input" type="text" id="place" v-model="state.placeName" />
    </div>
    <br />
    <div>
      <label class="label" for="category">분류</label>
      <!-- <span class="label">분류</span> -->
      <div>
        <el-radio v-model="state.category" label="공부" border>공부</el-radio>
        <el-radio v-model="state.category" label="운동" border>운동</el-radio>
        <el-radio v-model="state.category" label="업무" border>업무</el-radio>
        <el-radio v-model="state.category" label="취미" border>취미</el-radio>
      </div>
    </div>
    <br />
    <div>
      <label class="label" for="radio">중요도</label>
      <label class="import-label" v-bind:class="{ red: true }"
        ><input type="radio" value="#FF7C7C" v-model="state.color"
      /></label>
      <label class="import-label" v-bind:class="{ orange: true }"
        ><input type="radio" value="#FECFA3" v-model="state.color"
      /></label>
      <label class="import-label" v-bind:class="{ yellow: true }"
        ><input type="radio" value="#FFF972" v-model="state.color"
      /></label>
      <label class="import-label" v-bind:class="{ green: true }"
        ><input type="radio" value="#B6FB81" v-model="state.color"
      /></label>
      <label class="import-label" v-bind:class="{ blue: true }"
        ><input type="radio" value="#7886FF" v-model="state.color"
      /></label>
    </div>
    <br />
    <div>
      <label>내용</label>
      <input
        class="memo"
        v-bind:class="{ 'memo-content': true, input: true }"
        type="text"
        v-model="state.content"
      />
    </div>
    <br />
    <div>
      <button class="redBtn" @click="handleCancle">취소</button>
      <button
        class="blueBtn"
        type="button"
        @click="putSchedule"
        v-bind:disabled="title == ''"
      >
        수정
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { computed, reactive, onBeforeMount, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Schedule',
  components: {},
  setup() {
    const store = useStore()
    const router = useRouter()

    const initData = computed(() => store.getters.getModalDataFormat)

    onBeforeMount(() => {
      window.addEventListener('resize', handleUserCalendarPutWindowSize)
      handleUserCalendarPutWindowSize()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleUserCalendarPutWindowSize)
    })

    const handleUserCalendarPutWindowSize = () => {
      if (window.innerWidth > 730) {
        state.isBig = true
      } else {
        state.isBig = false
      }
    }

    const handleCancle = function() {
      router.push({ name: 'Calendar' })
    }

    const putSchedule = function() {
      let startDay = state.date[0]
      let endDay = state.date[1]
      axios
        .put(
          `https://k5d105.p.ssafy.io:3030/calendar/updateCalendar`,
          {
            cid: state.cid,
            uid: localStorage.getItem('uid'),
            title: state.title,
            content: state.content,
            startDate: startDay,
            endDate: endDay,
            startTime: state.startTime,
            endTime: state.endTime,
            placeName: state.placeName,
            category: state.category,
            placeLat: state.placeLat,
            placeLng: state.placeLng,
            allDay: state.allDay,
            color: state.color,
            completed: initData.value.ModalDate.extendedProps.completed,
          },
          {
            headers: {
              FCMtoken: localStorage.getItem('FCMtoken'),
              authorization: localStorage.getItem('token'),
            },
          }
        )
        .then((response) => {
          store.dispatch(
            'deleteCalendarData',
            initData.value.ModalDate.extendedProps.cid
          )

          const res = response.data.calendar

          if (res.completed) {
            store.dispatch('pushCalendarData', {
              cid: res.cid,
              completed: res.completed,
              title: res.title,
              content: res.content,
              start: `${res.startDate}T${res.startTime}`,
              end: `${res.endDate}T${res.endTime}`,
              color: res.color,
              placeName: res.placeName,
              placeLat: res.placeLat,
              placeLng: res.placeLng,
              startDate: res.startDay,
              endDate: res.endDay,
              category: res.category,
              classNames: ['calendar-done'],
              allDay: res.allDay,
            })
          } else {
            store.dispatch('pushCalendarData', {
              cid: res.cid,
              completed: res.completed,
              title: res.title,
              content: res.content,
              start: `${res.startDate}T${res.startTime}`,
              end: `${res.endDate}T${res.endTime}`,
              color: res.color,
              placeName: res.placeName,
              placeLat: res.placeLat,
              placeLng: res.placeLng,
              startDate: res.startDay,
              endDate: res.endDay,
              category: res.category,
              allDay: res.allDay,
            })
          }
          router.push({ name: 'Calendar' })
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const state = reactive({
      title: initData.value.ModalDate.title,
      start: initData.value.ModalDate.start,
      end: initData.value.ModalDate.end,
      color: initData.value.ModalDate.backgroundColor,
      cid: initData.value.ModalDate.extendedProps.cid,
      content: initData.value.ModalDate.extendedProps.content,
      placeName: initData.value.ModalDate.extendedProps.placeName,
      placeLat: initData.value.ModalDate.extendedProps.placeLat,
      placeLng: initData.value.ModalDate.extendedProps.placeLng,
      date: [
        initData.value.ModalDate.extendedProps.startDate,
        initData.value.ModalDate.extendedProps.endDate,
      ],

      startTime: initData.value.ModalDate.start
        .toString()
        .split(' ')[4]
        .substring(0, 5),

      endTime: '',
      allDay: initData.value.ModalDate.allDay,
      category: initData.value.ModalDate.extendedProps.category,
      isBig: false,
    })
    if (initData.value.ModalDate.end) {
      state.endTime = initData.value.ModalDate.end
        .toString()
        .split(' ')[4]
        .substring(0, 5)
    } else {
      state.endTime = '23:59'
    }
    console.log(state.endTime)

    return {
      state,
      putSchedule,
      handleCancle,
      initData,
    }
  },
}
</script>

<style></style>
