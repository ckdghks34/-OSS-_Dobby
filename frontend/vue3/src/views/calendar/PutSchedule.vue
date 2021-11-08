<template>
  <div class="schedule-main">
      <h1>일정 추가</h1>
      <div>
          <span>제목 : </span>
          <input type="text" v-model="state.title">
      </div>
      <br>
      <div>
          <span>날짜</span>
          <div>   
              <input type="date" v-model="state.startDay"> ~ <input type="date" v-model="state.endDay">
          </div>         
      </div>
      <br>
      <div>
          <span>시간: </span>
          <input type="time" v-model="state.startTime"> ~ <input type="time" v-model="state.endTime">
      </div>
      <br>
      <div>
          <span>장소 : </span>
          <input type="text" v-model="state.placeName">
      </div>
      <br>
      <div>
          <span>중요도</span>
          <label class="import-label" v-bind:class="{'red':true}"><input type="radio" value="red" v-model="state.color"></label>
          <label class="import-label" v-bind:class="{'orange':true}"><input type="radio" value="orange" v-model="state.color"></label>
          <label class="import-label" v-bind:class="{'yellow':true}"><input type="radio" value="yellow" v-model="state.color"></label>
          <label class="import-label" v-bind:class="{'green':true}"><input type="radio" value="green" v-model="state.color"></label>
          <label class="import-label" v-bind:class="{'blue':true}"><input type="radio" value="blue" v-model="state.color"></label>
      </div>
      <div>
          <p>메모장</p>
          <input class="memo" v-bind:class="{'memo-content':true}" type="text" v-model="state.content">
      </div>
      <div>
          <button @click="handleCancle">취소</button>
          <button type="button" @click="putSchedule">수정</button>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { computed, reactive } from 'vue'
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  export default {
    name: 'Schedule',
    components : {  
    },
    setup() {
      const store = useStore()
      const router = useRouter()

      const initData = computed(() => store.getters.getModalDataFormat)

      const handleCancle = function (){
        router.push({name : 'Calendar'})
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
          startDay: initData.value.ModalDate.extendedProps.startDate,
          startTime: initData.value.ModalDate.start.toString().split(' ')[4].substring(0,5),
          endDay: initData.value.ModalDate.extendedProps.endDate,
          endTime: initData.value.ModalDate.end.toString().split(' ')[4].substring(0,5),
          completed: false,
      })
      const putSchedule = function() {
        axios
          .put(`https://k5d105.p.ssafy.io:3030/calendar/updateCalendar`,
          {
            cid: state.cid,
            uid: localStorage.getItem('uid'),
            title : state.title,
            content: state.content,
            startDate: state.startDay,
            endDate: state.endDay,
            startTime: state.startTime,
            endTime: state.endTime,
            placeName: state.placeName,
            placeLat: state.placeLat,
            placeLng: state.placeLng,
            allDay: false,
            color: state.color,
            completed: false,
          },
          {
            headers: {
              authorization: localStorage.getItem('token')
            }
          })
          .then( () => {  
            store.dispatch('deleteCalendarData', initData.value.ModalDate.extendedProps.cid)
            store.dispatch('pushCalendarData', {
              cid: state.cid,
              completed: state.completed,
              title: state.title,
              content: state.content,
              start: `${state.startDay}T${state.startTime}`,
              end: `${state.endDay}T${state.endTime}`,
              color: state.color,
              placeName: state.placeName,
              placeLat: state.placeLat,
              placeLng: state.placeLng,
              startDate: state.startDay,
              endDate: state.endDay
            })
            router.push({name: 'Calendar'})
            }
          )
          .catch( (error) => {
            console.log(error)
          })
      }
        return {
            state,
            putSchedule,
            handleCancle,
            initData,
        }
    }
  }
</script>



<style scoped>
.schedule-main {
  width: 100%;
  height: 100%;
}

.memo {
    width: 300px;
    height: 200px;
}

.memo-content {
    background-color: #F6F6F6;
    font-size: 20px;
}

.import-label {
    border-radius: 50%; 
    height: 20px; 
    width: 20px; 
}

.red {
    background-color: #FF7C7C;
}
.orange {
    background-color: #FECFA3;
}
.yellow {
    background-color: #FFF972;
}
.green {
    background-color: #B6FB81;
}
.blue {
    background-color: #7886FF;
}

</style>