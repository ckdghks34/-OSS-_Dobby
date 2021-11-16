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
          <label class="label" for="place">장소</label>
          <!-- <input class="web-input" type="text" id="place" v-model="state.placeName"> -->
          <GMapAutocomplete
              placeholder="장소를 입력해주세요"
              @place_changed="setPlace"
              class="web-input"
              ref="mapAutoComplete">
          </GMapAutocomplete>
      </div>
      <br>
      <div class="userCalendar-schedule-row">
        <el-button v-if="state.placeName" round @click="showMapModal">경로탐색</el-button>
        <el-button v-else disabled round @click="showMapModal">경로탐색</el-button>
        <div class="userCalendar-schedule-map" v-if="falTest">
          <CalendarMap style="height: 75vh; width: 50vw;"/>
        </div>
      </div>
      <br>
      <div class="userCalendar-schedule-category">
          <label class="label" for="category">분류</label>
          <div class="userCalendar-schedule-category-button-wrap">
              <el-radio v-model="state.category" label="공부" border size="medium">공부</el-radio>
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
          <button class="web-button-blue" style="margin-left:30px" type="button" @click="addSchedule" v-bind:disabled="title==''">추가</button>
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
      <div>
          <label class="label" for="place">장소</label>
          <!-- <input class="input" type="text" id="place" v-model="state.placeName"> -->
          <GMapAutocomplete
              placeholder="장소를 입력해주세요"
              @place_changed="setPlace"
              class="web-input"
              ref="mapAutoComplete">
          </GMapAutocomplete>
      </div>
      <br>
      <div>
          <label class="label" for="category">분류</label>
          <!-- <span class="label">분류</span> -->
          <div>
              <el-radio v-model="staet.category" label="공부" border>공부</el-radio>
              <el-radio v-model="staet.category" label="운동" border>운동</el-radio>
              <el-radio v-model="staet.category" label="업무" border>업무</el-radio>
              <el-radio v-model="staet.category" label="취미" border>취미</el-radio>
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
          <button class="blueBtn" type="button" @click="addSchedule" v-bind:disabled="title==''">추가</button>
      </div> 
  </div>
  <teleport to="#destination">
    <CalendarMapModal ref="mapModal" />
  </teleport>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { reactive, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex';

// component
import CalendarMap from'@/components/map/CalendarMap'
import CalendarMapModal from'@/components/teleport/CalendarMapModal'

// map
// import { LMap, LGeoJson } from "@vue-leaflet/vue-leaflet";
// import "leaflet/dist/leaflet.css"
// import L from 'leaflet'

export default {
    name: 'Schedule',
    components : {
      CalendarMap,
        // LMap,
        // LGeoJson,
      CalendarMapModal,
    },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useStore()

        const mapAutoComplete = ref(null)
        const mapModal = ref(null)

        const state = reactive({
            uid: localStorage.getItem('uid'),
            title:'',
            content:'',
            startDate: route.query.start,
            endDate:'',
            startTime:'',
            endTime:'',
            placeName: '',
            placeLat: '',
            placeLng: '',
            allDay: false,
            color: '#FF7C7C',
            category: '',
            size: true,
            latitude: 1.1,
            longitude: 1.1,
            falTest: false,
        })

        onBeforeMount(async () => {
            if (window.innerWidth < 730) {
                state.size = false
            }
            startMap()
        })

        window.addEventListener(
            'resize',
            function() {
                if (window.innerWidth < 730) {
                state.size = false
                } else {
                state.size = true
                }
            },
            true
        )

    const showMapModal = function() {
      mapModal.value.show()
    }

    const setPlace = (e) => {
        state.placeName = e.name
        state.placeLat = e.geometry.location.lat()
        state.placeLng = e.geometry.location.lng()

        findWay()

        store.dispatch('setCalendarMapGoal', {
          Lat: state.placeLat,
          Lng: state.placeLng
        })

        // provide('plcaeLat', state.placeLat)
        // provide('placeLng', state.placeLng)
    }

    const findWay = () => {
      axios.get(`http://k5d105.p.ssafy.io:5000/route/v1/driving/${state.longitude},${state.latitude};${state.placeLng},${state.placeLat}?steps=true`)
        .then((response) => {
          console.log(response.data.routes)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const startMap = () => {
        if ("geolocation" in navigator) {	/* geolocation 사용 가능 */
        navigator.geolocation.getCurrentPosition(function(data) {
        
          var latitude = data.coords.latitude;
          var longitude = data.coords.longitude;
          
          // $('#latitude').text(latitude);
          state.latitude = latitude
          // $('#longitude').text(longitude);
          state.longitude = longitude

        }, function(error) {
          alert(error);
        }, {
          enableHighAccuracy: true,
          timeout: Infinity,
          maximumAge: 0
        });
      } else {	/* geolocation 사용 불가능 */
        alert('geolocation 사용 불가능');
      }
      }








    const handleCancleSchedule = () => {
        router.push({ name: 'Calendar' })
    }

    const addSchedule = function() {
        if (state.allDay) {
            if (
                state.title &&
                state.content &&
                state.startDate &&
                state.endDate &&
                state.placeName) {
                const aDay = {
                    uid: state.uid,
                    title: state.title,
                    content: state.content,
                    startDate: state.startDate,
                    endDate: state.endDate,
                    startTime: '00:00',
                    endTime: '24:00',
                    placeName: state.placeName,
                    placeLat: state.placeLat,
                    placeLng: state.placeLng,
                    allDay: state.allDay,
                    color: state.color,
                    category: state.category,
                }
                axios
                    .post(
                        `https://k5d105.p.ssafy.io:3030/calendar/createCalendar`,
                        aDay,
                        {
                            headers: {
                                FCMtoken: localStorage.getItem('FCMtoken'),
                                authorization: localStorage.getItem('token'),
                            },
                        }
                    )
                .then((response) => {
                    const res = response.data.calendar

                    const d = {
                        cid: res.cid,
                        completed: res.completed,
                        title: res.title,
                        content: res.content,
                        start: res.startDate + 'T' + res.startTime,
                        end: res.endDate + 'T' + res.endTime,
                        color: res.color,
                        placeName: res.placeName,
                        placeLat: res.placeLat,
                        placeLng: res.placeLng,
                        startDate: res.startDate,
                        endDate: res.endDate,
                        category: res.category,
                        allDay: res.allDay,
                    }

                    store.dispatch('pushCalendarData', d)
                    router.push({ name: 'Calendar' })
                })
                .catch((error) => {
                    console.log(error)
                })
            } else {
                alert('시간을 제외한 모든 항목을 입력해 주세요')}
        } else {
            if (
                state.title &&
                state.content &&
                state.startDate &&
                state.endDate &&
                state.placeName &&
                state.startTime &&
                state.endTime) {
                const day = {
                    uid: state.uid,
                    title: state.title,
                    content: state.content,
                    startDate: state.startDate,
                    endDate: state.endDate,
                    startTime: state.startTime,
                    endTime: state.endTime,
                    placeName: state.placeName,
                    placeLat: state.placeLat,
                    placeLng: state.placeLng,
                    allDay: state.allDay,
                    color: state.color,
                    category: state.category,
            }
            axios
            .post(
                `https://k5d105.p.ssafy.io:3030/calendar/createCalendar`,
                day,
                {
                headers: {
                    FCMtoken: localStorage.getItem('FCMtoken'),
                    authorization: localStorage.getItem('token'),
                },
            }
            )
            .then((response) => {
                const res = response.data.calendar

                const day = {
                    cid: res.cid,
                    completed: res.completed,
                    title: res.title,
                    content: res.content,
                    start: res.startDate + 'T' + res.startTime,
                    end: res.endDate + 'T' + res.endTime,
                    color: res.color,
                    placeName: res.placeName,
                    placeLat: res.placeLat,
                    placeLng: res.placeLng,
                    startDate: res.startDate,
                    endDate: res.endDate,
                    category: res.category,
                    allDay: res.allDay,
                }

                store.dispatch('pushCalendarData', day)
                router.push({ name: 'Calendar' })
            })
            .catch((error) => {
                console.log(error)
            })
            } else {
                alert('모든 항목을 입력해 주세요')
            }
        }
    }

    return {
        state,
        addSchedule,
        handleCancleSchedule,
        setPlace,
        mapAutoComplete,
        showMapModal,
        mapModal,
        // geojson,
        // geojsonOptions
    }}
}
</script>

<style>
.tt1 { 
  width: 500px;
}

.tt2 {
  width: 100%;
  height: 100%;
}

.schedule-info {
  /* 500 */
  width: 500px;
  margin: 0 auto;
}

.mobile-schedule-main {
  /* width: 100%;
    height: 100%; */

  margin: 0 auto;
  width: 300px;
  padding: 50px;
  border-radius: 30px;
  background-color: #f6f6f6;
}

.memo {
  width: 300px;
  height: 200px;
}

.memo-content {
  /* background-color: #F6F6F6; */
  font-size: 20px;
}

.import-label {
  border-radius: 50%;
  height: 20px;
  width: 20px;
}

.label {
  width: 70px;
  height: 30px;
  font-weight: 100;
  padding: 0px 12px 0px 0px;
}

.red {
  background-color: #ff7c7c;
}
.orange {
  background-color: #fecfa3;
}
.yellow {
  background-color: #fff972;
}
.green {
  background-color: #b6fb81;
}
.blue {
  background-color: #7886ff;
}

/* 웹화면 */
.userCalendar-schedule-row {
  display: flex;
  align-items: center;
}

.userCalendar-schedule-map {
  display: flex;
  justify-content: center;
}

.web-input {
  width: 400px;
  height: 30px;
  outline: none;
  border: 2px solid #a9c9de;
  border-radius: 4px;
}

.date-input {
  width: 195px;
  height: 30px;
  outline: none;
  border: 2px solid #a9c9de;
  border-radius: 4px;
}

.time-input {
  width: 190px;
  height: 30px;
  outline: none;
  border: 2px solid #a9c9de;
  border-radius: 4px;
}

.web-memo {
  width: 400px;
  height: 200px;
}

.web-button-red {
  background-color: rgb(255, 155, 155);
  color: white;
  border: none;
  border-radius: 4px;
  width: 80px;
  height: 40px;
}

.web-button-red:hover {
  box-shadow: 0 0 10px rgb(255, 155, 155);
}

.web-button-blue {
  background-color: #a9c9de;
  color: white;
  border: none;
  border-radius: 4px;
  width: 80px;
  height: 40px;
}

.web-button-blue:hover {
  box-shadow: 0 0 10px #a9c9de;
}

.userCalendar-schedule-color-box {
  width: 400px;
  display: flex;
  justify-content: space-evenly;
}

.userCalendar-schedule-color-wrap {
  display: flex;
}

.userCalendar-schedule-allDay {
  display: flex;
  align-items: center;
}

.userCalendar-schedule-allDay > input {
  width: 15px;
  height: 15px;
}

.userCalendar-schedule-category {
  display: flex;
}

.userCalendar-schedule-category .el-radio {
  margin-right: 10px;
}

.userCalendar-schedule-category-button-wrap {
  width: 400px;
}
</style>
