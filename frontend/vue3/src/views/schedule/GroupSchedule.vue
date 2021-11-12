<template>
  <div class="schedule-info" v-if="state.size">
    <h1>New Schedule</h1>
    <div class="userCalendar-schedule-row">
      <label class="label" for="scheduleTitle">제목</label>        
      <input class="web-input" id="scheduleTitle" type="text" v-model="state.title">
    </div>
    <br>
    <div class="userCalendar-schedule-row">
      <label class="label" for="date">날짜</label>
      <input class="date-input" type="date" id="date" v-model="state.startDate">~<input class="date-input" type="date" v-model="state.endDate">
    </div>
    <br>
    <div class="userCalendar-schedule-row">
      <label class="label" for="time">시간</label>
      <input class="time-input" type="time" id="time" v-model="state.startTime"> ~ <input class="time-input" type="time" v-model="state.endTime">
    </div>
    <br>
    <div class="userCalendar-schedule-allDay">
      <label for="allDay" class="label">종일</label>
      <input type="checkbox" v-model="state.allDay">
    </div>
    <br>
    <div class="userCalendar-schedule-row">
      <label class="label" for="participant">참가자</label>
      <el-select
        v-model="state.participants"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="참가자를 선택해주세요"
        class="groupCalendar-schedule-participant">
        <el-option
          v-for="member in state.participantsOption"
          :key="member.value"
          :label="member.label"
          :value="member.value">
        </el-option>
      </el-select>
    </div>
    <br>
    <div class="userCalendar-schedule-row">
      <label class="label" for="place">장소</label>
      <input class="web-input" type="text" id="place" v-model="state.placeName">
    </div>
    <br>
    <div class="userCalendar-schedule-category">
      <label class="label" for="category">분류</label>
      <div class="userCalendar-schedule-category-button-wrap">
        <el-radio v-model="state.category" label="공부" border>공부</el-radio>
        <el-radio v-model="state.category" label="운동" border>운동</el-radio>
        <el-radio v-model="state.category" label="업무" border>업무</el-radio>
        <el-radio v-model="state.category" label="취미" border>취미</el-radio>
      </div>
    </div>
    <br>
    <div class="userCalendar-schedule-color-wrap">
      <label class="label" for="radio">중요도</label>
      <div class="userCalendar-schedule-color-box">
        <label class="import-label" v-bind:class="{'red':true}"><input type="radio" value="#FF7C7C" v-model="state.color"></label>
        <label class="import-label" v-bind:class="{'orange':true}"><input type="radio" value="#FECFA3" v-model="state.color"></label>
        <label class="import-label" v-bind:class="{'yellow':true}"><input type="radio" value="#FFF972" v-model="state.color"></label>
        <label class="import-label" v-bind:class="{'green':true}"><input type="radio" value="#B6FB81" v-model="state.color"></label>
        <label class="import-label" v-bind:class="{'blue':true}"><input type="radio" value="#7886FF" v-model="state.color"></label>
      </div>
    </div>
    <br>
    <div class="userCalendar-schedule-row">
      <label class="label">내용</label>
        <input class="web-memo" v-bind:class="{'memo-content':true, 'input':true}" type="text" v-model="state.content">
    </div>
    <br>
    <div>
      <button class="web-button-red" @click="handleCancleSchedule">취소</button> 
      <button class="web-button-blue" style="margin-left:30px" type="button" @click="addGroupSchedule" v-bind:disabled="title==''">추가</button>
    </div> 
  </div>


  <div class="mobile-schedule-main" v-else>
    <h1>New Schedule</h1>
    <div>
      <label class="label" for="scheduleTitle">제목</label>        
      <input class="input" id="scheduleTitle" type="text" v-model="state.title">
    </div>
    <br>
    <div>
      <label class="label" for="date">날짜</label>
      <div>   
        <input class="input" type="date" id="date" v-model="state.startDate">~<input class="input" type="date" v-model="state.endDate">
      </div>         
    </div>
    <br>
    <div>  <!--v-if -->
      <label class="label" for="time">시간</label>
      <input class="input" type="time" id="time" v-model="state.startTime"> ~ <input class="input" type="time" v-model="state.endTime">
    </div>
    <br>
    <div>
      <label for="allDay" class="label">종일</label>
      <input type="checkbox" v-model="state.allDay">
    </div>
    <br>
    <div class="userCalendar-schedule-row">
      <label class="label" for="participant">참가자</label>
      <el-select
        v-model="state.participants"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="참가자를 선택해주세요">
        <el-option
          v-for="member in state.participantsOption"
          :key="member.value"
          :label="member.label"
          :value="member.value">
        </el-option>
      </el-select>
    </div>
    <br>
    <div>
      <label class="label" for="place">장소</label>
      <input class="input" type="text" id="place" v-model="state.placeName">
    </div>
    <br>
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
    <br>
    <div>
      <label class="label" for="radio">중요도</label>
      <label class="import-label" v-bind:class="{'red':true}"><input type="radio" value="#FF7C7C" v-model="state.color"></label>
      <label class="import-label" v-bind:class="{'orange':true}"><input type="radio" value="#FECFA3" v-model="state.color"></label>
      <label class="import-label" v-bind:class="{'yellow':true}"><input type="radio" value="#FFF972" v-model="state.color"></label>
      <label class="import-label" v-bind:class="{'green':true}"><input type="radio" value="#B6FB81" v-model="state.color"></label>
      <label class="import-label" v-bind:class="{'blue':true}"><input type="radio" value="#7886FF" v-model="state.color"></label>
    </div>
    <br>
    <div>
      <label>내용</label>
      <input class="memo" v-bind:class="{'memo-content':true, 'input':true}" type="text" v-model="state.content">
    </div>
    <br>
    <div>
      <button class="redBtn" @click="handleCancleSchedule">취소</button>
      <button class="blueBtn" type="button" @click="addGroupSchedule" v-bind:disabled="title==''">추가</button>
    </div> 
  </div>

</template>

<script>
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { reactive, onBeforeMount, onUnmounted } from 'vue'
import { useStore } from 'vuex';

export default {
  name: 'Schedule',
  components : {
        
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const state = reactive({
      uid: localStorage.getItem('uid'),
      title:'',
      content:'',
      startDate:'',
      endDate:'',
      startTime:'',
      endTime:'',
      placeName: '',
      placeLat: 38.5000,
      placeLng: 0.00022,
      allDay: false,
      color: '#FF7C7C',
      category: '',
      size: true,
      participantsOption: [],
      groupMember: [],
      participants: [],
    })

    onBeforeMount(() => {
      findGroupMember()
      handleGroupCalendarCreateSchedule()
      window.addEventListener('resize', handleGroupCalendarCreateSchedule)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', handleGroupCalendarCreateSchedule)
      })

    const handleGroupCalendarCreateSchedule = () => {
      if (window.innerWidth < 730) {
        state.size = false
        } else {
        state.size = true
        }
    }

    const handleCancleSchedule = () => {
        router.push({name: 'Calendar'})
    }

    const findGroupMember = () => {
      axios.post('https://k5d105.p.ssafy.io:3030/group/GetGroupMember',
      {
        gid : route.query.gid
      },
      {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then( (response) => {
          const res = response.data.members
          const userUid = localStorage.getItem('uid')
          state.groupMember = res
          state.participantsOption = res.map( (m) => {
            return {
              value: m.uid,
              label: m.nickname,
            }
          })
          const user = res.filter((r) => {
            return r.uid === userUid
          })
          state.participants.push(user[0].uid) 
        })
        .catch( (error) => {
          console.log(error)
        })
      }

    const addGroupSchedule = function() {
      const parList = state.participants.map((par) => {
        let parInfo = state.groupMember.find( (p) => {
          return par === p.uid
        })
        if (parInfo) {
          return {
            uid: parInfo.uid,
            name: parInfo.name,
            completed: false,
          }
        }
      })

      if ( state.allDay ) {
        const aDay = {
          uid : state.uid,
          gid: route.query.gid,
          title : state.title,
          content : state.content,
          startDate : state.startDate,
          endDate : state.endDate,
          startTime : '00:00',
          endTime : '24:00',
          placeName : state.placeName,
          placeLat : state.placeLat,
          placeLng : state.placeLng,
          allDay : state.allDay,
          color : state.color,
          category: state.category,
          participant: parList,
        }            
        axios
          .post(`https://k5d105.p.ssafy.io:3030/groupCalendar/createCalendar`,
            aDay,
            {
              headers: {
                authorization : localStorage.getItem('token')
              }
            })
            .then( ( response ) => {
              const res = response.data.calendar
              const d = {
                cid : res.cid,
                gid: route.query.gid,
                title : res.title,
                content : res.content,
                start: res.startDate+'T'+res.startTime,
                end: res.endDate+'T'+res.endTime,
                color : res.color,
                placeName : res.placeName,
                placeLat : res.placeLat,
                placeLng : res.placeLng,
                startDate : res.startDate,
                endDate : res.endDate,
                category: res.category,
                allDay : res.allDay,
                participant : res.participant
                }
              
              store.dispatch('pushGroupCalendarData', d)
              router.push({name: 'GroupCalendar', query : {gid: route.query.gid}})
            })
            .catch( (error) => {
                console.log(error)
            })
        }
        else {
          const day = {
            uid : state.uid,
            gid: route.query.gid,
            title : state.title,
            content : state.content,
            startDate : state.startDate,
            endDate : state.endDate,
            startTime : state.startTime,
            endTime : state.endTime,
            placeName : state.placeName,
            placeLat : state.placeLat,
            placeLng : state.placeLng,
            allDay : state.allDay,
            color : state.color,
            category : state.category,
            participant: parList,
          }
          axios
            .post(`https://k5d105.p.ssafy.io:3030/groupCalendar/createCalendar`,
              day,
              {
                headers: {
                  authorization : localStorage.getItem('token')
              }}
            )
            .then( (response) => {
                const res = response.data.calendar
                const day = {
                  cid : res.cid,
                  completed: res.completed,
                  title : res.title,
                  content : res.content,
                  start: res.startDate+'T'+res.startTime,
                  end: res.endDate+'T'+res.endTime,
                  color : res.color,
                  placeName : res.placeName,
                  placeLat : res.placeLat,
                  placeLng : res.placeLng,
                  startDate : res.startDate,
                  endDate : res.endDate,
                  category: res.category,
                  allDay : res.allDay,
                  participant : res.participant
                  }

                store.dispatch('pushGroupCalendarData', day)
                router.push({name: 'GroupCalendar', query : {gid: route.query.gid}})
              })
              .catch( (error) => {
                  console.log(error)
              })
        }
      }

      return {
        state,
        addGroupSchedule,
        handleCancleSchedule,
      }
    }
}
</script>

<style>
  .groupCalendar-schedule-participant {
    width: 400px;
  }
</style>