<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <div class="modal-content-header">
        <span v-if="state.mData.ModalDate.title.length <= 10" style="fontSize: 2rem">{{ state.mData.ModalDate.title }}</span>
        <span v-else style="fontSize: 1.5rem">{{ state.mData.ModalDate.title }}</span>
        <div>
          <i v-if="state.mData.ModalDate.extendedProps.completed" class="el-icon-refresh-left modalIcon" @click="modalSuccess"></i>
          <i v-if="!state.mData.ModalDate.extendedProps.completed" class="el-icon-check modalIcon" @click="modalSuccess"></i>
          <i class="el-icon-edit modalIcon" @click="modalPut"></i>
          <i class="el-icon-delete modalIcon" @click="state.dialogVisible = true"></i>
          <i class="el-icon-close modalIcon" @click="hide"></i>
        </div>
      </div>
      <div class="modal-content-body">
        <div class="modal-content-body-1">
          <div class="modal-content-body-1-color">
            <span class="modal-content-body-1-color-box" v-bind:style="{backgroundColor: state.mData.ModalDate.backgroundColor}"></span>
          </div>
          <ul class="modal-content-body-1-title">
            <li class="modal-content-body-1-title-day">
              <span style="width: 30%">일시</span>
              <span v-if="state.mData.allDay">{{ state.mData.startDay }}</span>
              <span v-if="!state.mData.allDay" style="fontSize: 0.9rem">{{ state.mData.startDay }} - {{ state.mData.endDay }}</span>
            </li>
            <li>
              <span style="width: 30%">장소</span>
              <span>{{ state.mData.ModalDate.extendedProps.placeName }}</span>
            </li>
            <li class="modal-content-body-1-memo">
              <span style="width: 30% display: inline-block">메모</span>
              <span style="width: 70%">
                {{ state.mData.ModalDate.extendedProps.content }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="state.dialogVisible"
      width="30%">
      <span>일정을 삭제할까요?</span>  
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialogVisible = false">취소</el-button>
          <el-button type="danger" @click="delEvent" >삭제</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios';


export default {
  props: {
    curModal : { type: Object }
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const isOpen = ref(false);

    const hide = () => {
      isOpen.value = false;
    };

    const show = () => {
      isOpen.value = true;
    };

    const fullCalendar = ref(null)

    const calData = function (cal) {
      fullCalendar.value = cal
    }

    const modalPut = () => {
      router.push({name: 'PutSchedule'})
    }

    const delEvent = () => {
      state.dialogVisible = false    
      // 삭제 axios 요청
      axios
        .delete('https://k5d105.p.ssafy.io:3030/calendar/deleteCalendar',
          { 
            data: {
              uid: localStorage.getItem('uid'),
              cid: state.mData.ModalDate.extendedProps.cid
            }
          },
          {
            headers: {
              authorization: localStorage.getItem('token')
            }
          })
          .then(() => {
            state.mData.ModalDate.remove()
            isOpen.value = false;
          })
          .catch((error) => {
            console.log(error)
          })
    }

    const modalSuccess = function () {
      axios.
        put('https://k5d105.p.ssafy.io:3030/calendar/checkCalendar',
        {
          uid: localStorage.getItem('uid'),
          cid: state.mData.ModalDate.extendedProps.cid,
        },
        {
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        .then((response) => {
          let calendarApi = state.calendar.getApi()

          store.dispatch('deleteCalendarData', state.mData.ModalDate.extendedProps.cid)
          state.mData.ModalDate.remove()
          const r = response.data.calendar
          if ( r.completed ) {
            const cal = {
              cid: r.cid,
              completed: r.completed,
              title: r.title,
              content: r.content,
              start: r.startDate+'T'+r.startTime,
              end: r.endDate+'T'+r.endTime,
              color: r.color,
              placeName: r.placeName,
              placeLat: r.placeLat,
              placeLng: r.placeLng,
              startDate: r.startDate,
              endDate: r.endDate,
              classNames: ['calendar-done']
            }
            store.dispatch('pushCalendarData', cal)
            calendarApi.batchRendering(function() {
              calendarApi.addEvent(cal)
            })
          } else {
            const cal = {
              cid: r.cid,
              completed: r.completed,
              title: r.title,
              content: r.content,
              start: r.startDate+'T'+r.startTime,
              end: r.endDate+'T'+r.endTime,
              color: r.color,
              placeName: r.placeName,
              placeLat: r.placeLat,
              placeLng: r.placeLng,
              startDate: r.startDate,
              endDate: r.endDate
            }
            store.dispatch('pushCalendarData', cal)

            calendarApi.batchRendering(function() {
              calendarApi.addEvent(cal)
            })
          }
          isOpen.value = false
        })
        .catch((error) => {
          console.log(error)
        })
    }


    const state = reactive({
      mData: computed(() => store.getters.getModalDataFormat),
      calendar: computed(() => store.state.calAPI),
      dialogVisible: ref(false),
    })
    return { isOpen, hide, show, modalPut, state, delEvent, calData, modalSuccess };
  },
  data() {
    return {
    }
  },
};
</script>

<style>
.modal {
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 1000vh;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal-content {
  background-color: #ffffff;
  margin: 15% auto;
  padding: 20px;
  width: 500px;
  border: 1px solid #888;
}

.modal-content-header {
  margin-bottom: 1rem;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E6E6E6;
}

.modal-content-body-1 {
  display: flex;
}

.modal-content-body-1-color {
  margin-right: 1rem;
}

.modal-content-body-1-color-box {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 20%;
}

.modal-content-body-1-title {
  list-style: none;
  margin-top: 0;
  padding: 0;
  width: 100%;
}

.modal-content-body-1-title > li {
  margin-bottom: 1rem;
}

.modal-content-body-1-title > li :first-child {
  margin-right: 1rem;
}

.modal-content-body-1-title > li > span {
  color:#7E8183;
}

.modal-content-body-1-title-title {
  margin-bottom: 1rem;
}

.modal-content-body-1-memo {
  display: flex;
}

.modal-content-body-1-title-title > span {
  font-size: 1.5rem;
}

.modalIcon {
  padding: 10px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
