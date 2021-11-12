<template>
  <div class="modal" v-if="isOpen">
    <el-card class="box-card modal-content">
      <template #header>
        <div v-if="state.isBig">
          <el-row>
            <el-col :span="1" >
              <div class="modal-content-color">
                <span class="modal-content-color-box" v-bind:style="{backgroundColor: state.mData.ModalDate.backgroundColor}"></span>
              </div>
            </el-col>
            <el-col :span="22" :offset="1">
              <div class="modal-content-header">
                <div>
                  <span v-if="state.mData.ModalDate.title.length <= 10" style="fontSize: 2rem">{{ state.mData.ModalDate.title }}</span>
                  <span v-else style="fontSize: 1.5rem">{{ state.mData.ModalDate.title }}</span>
                </div>
                <div>
                  <i v-if="state.mData.ModalDate.extendedProps.completed" class="el-icon-refresh-left modalIcon" @click="modalSuccess"></i>
                  <i v-if="!state.mData.ModalDate.extendedProps.completed" class="el-icon-check modalIcon" @click="modalSuccess"></i>
                  <i class="el-icon-edit modalIcon" @click="modalPut"></i>
                  <i class="el-icon-delete modalIcon" @click="state.dialogVisible = true"></i>
                  <i class="el-icon-close modalIcon" @click="hide"></i>
                </div>
              </div>
            </el-col>
          </el-row>
        
        </div>
        <div v-if="!state.isBig">
          <el-row class="modal-content-body-contents-row">
            <div class="modal-content-header" style="width: 100%">
              <i v-if="state.mData.ModalDate.extendedProps.completed" class="el-icon-refresh-left modalIcon" @click="modalSuccess"></i>
              <i v-if="!state.mData.ModalDate.extendedProps.completed" class="el-icon-check modalIcon" @click="modalSuccess"></i>
              <i class="el-icon-edit modalIcon" @click="modalPut"></i>
              <i class="el-icon-delete modalIcon" @click="state.dialogVisible = true"></i>
              <i class="el-icon-close modalIcon" @click="hide"></i>
            </div>
          </el-row>

          <el-row class="modal-content-body-contents-row">
            <span class="modal-content-small-color-box" :style="{backgroundColor: state.mData.ModalDate.backgroundColor}"></span>
          </el-row>

          <el-row>
            <div class="modal-content-header">
              <span v-if="state.mData.ModalDate.title.length <= 10" style="fontSize: 2rem">{{ state.mData.ModalDate.title }}</span>
              <span v-else style="fontSize: 1.5rem">{{ state.mData.ModalDate.title }}</span>
            </div>
          </el-row>

        </div>
      </template>
      <div class="modal-content-body">
        <el-row class="modal-content-body-contents-row">
          <el-col :span="1">
            <div class="modal-content-body-contents-row-icon-wrap">
              <el-icon><Calendar /></el-icon>
            </div>
          </el-col>
          <el-col :span="22" :offset="1">
            <span v-if="state.mData.allDay">{{ state.mData.startDay }}</span>
            <span v-if="!state.mData.allDay" style="fontSize: 0.9rem">{{ state.mData.startDay }} - {{ state.mData.endDay }}</span>
          </el-col>
        </el-row>

        <el-row class="modal-content-body-contents-row">
          <el-col :span="1">
            <div class="modal-content-body-contents-row-icon-wrap">
              <el-icon><FolderOpened /></el-icon>
            </div>
          </el-col>
          <el-col :span="22" :offset="1">
            <el-button plain>
              {{ state.mData.ModalDate.extendedProps.category }}
            </el-button>
          </el-col>
        </el-row>
        
        <el-row class="modal-content-body-contents-row">
          <el-col :span="1">
            <div class="modal-content-body-contents-row-icon-wrap">
              <el-icon><Location /></el-icon>
            </div>
          </el-col>
          <el-col :span="22" :offset="1">
            <span>{{ state.mData.ModalDate.extendedProps.placeName }}</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="1">
            <div class="modal-content-body-contents-document-icon-wrap">
              <el-icon><Document /></el-icon>
            </div>
          </el-col>
          <el-col :span="22" :offset="1">
            <span>
              {{ state.mData.ModalDate.extendedProps.content }}
            </span>
          </el-col>
        </el-row>
      </div>
    </el-card>

    
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
import { computed, reactive, ref, onBeforeMount, onUnmounted } from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios';

//icons
import { Calendar, Location, Document, FolderOpened } from '@element-plus/icons'


export default {
  props: {
    curModal : { type: Object }
  },
  components: {
    Calendar,
    Location,
    Document,
    FolderOpened,
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

    onBeforeMount(() => {
      window.addEventListener('resize', handleGroupModalWindowSize)
      handleGroupModalWindowSize()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleGroupModalWindowSize)
    })


    const calData = function (cal) {
      fullCalendar.value = cal
    }

    // windowSize
    const handleGroupModalWindowSize = () => {
      if (window.innerWidth > 767) {
        state.isBig = true
      } else {
        state.isBig = false
      }
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
      isBig: true,
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
  border: 1px solid #888;
}

.modal-content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-content-color {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content-body > span {
  color:#7E8183;
}

.modal-content-color-box {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 20%;
}

.modal-content-body-contents-row {
  margin-bottom: 1rem;
}

.modal-content-body-contents-row-icon-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content-body-contents-document-icon-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.modal-content-small-color-box {
  height: 30px;
  width: 100%;
  border-radius: 0.5rem;
}

.modalIcon {
  padding: 10px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.5rem;
  font-weight: bold;
}

  @media screen and (min-width: 1200px) {
    .modal-content {
      width: 900px;
    }
  }

  @media screen and (max-width: 1199px) and (min-width: 993px) {
    .modal-content {
      width: 900px;
    }
  }

  @media screen and (max-width: 992px) and (min-width: 768px) {
    .modal-content {
      width: 700px;
    }
  }

  @media screen and (max-width: 767px) and (min-width: 500px) {
    .modal-content {
      width: 450px;
    }
  }

  @media screen and (max-width: 499px) {
    .modal-content {
      width: 380px;
    }
  }
</style>
