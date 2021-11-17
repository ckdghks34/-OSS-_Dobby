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
                  <i v-if="checkPartipants() && state.mData.ModalDate.extendedProps.completed" class="el-icon-refresh-left modalIcon" @click="modalSuccess"></i>
                  <i v-if="checkPartipants() && !state.mData.ModalDate.extendedProps.completed" class="el-icon-check modalIcon" @click="modalSuccess"></i>

                  <i v-if="checkWriter()" class="el-icon-edit modalIcon" @click="modalPut"></i>

                  <i v-if="checkWriter()" class="el-icon-delete modalIcon" @click="state.dialogVisible = true"></i>
                  <i class="el-icon-close modalIcon" @click="hide"></i>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div v-if="!state.isBig">
          <el-row class="modal-content-body-contents-row">
            <div class="modal-content-header" style="width: 100%">
              <i v-if="checkWriter() && state.mData.ModalDate.extendedProps.completed" class="el-icon-refresh-left modalIcon" @click="modalSuccess"></i>
                  <i v-if="checkWriter() && !state.mData.ModalDate.extendedProps.completed" class="el-icon-check modalIcon" @click="modalSuccess"></i>

                  <i v-if="checkWriter()" class="el-icon-edit modalIcon" @click="modalPut"></i>

                  <i v-if="checkWriter()" class="el-icon-delete modalIcon" @click="state.dialogVisible = true"></i>
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
              <el-icon><Location /></el-icon>
            </div>
          </el-col>
          <el-col :span="22" :offset="1">
            <span>{{ state.mData.ModalDate.extendedProps.placeName }}</span>
          </el-col>
        </el-row>

        <el-row class="modal-content-body-contents-row">
          <el-col :span="1">
            <div class="modal-content-body-contents-row-icon-wrap">
              <el-icon><User /></el-icon>
            </div>
          </el-col>
          <el-col :span="22" :offset="1" class="modal-content-body-participant">
            <div v-for="par in state.mData.ModalDate.extendedProps.participant" :key="par.uid" class="modal-content-body-participant-element">
              <el-button v-if="par.completed" size="mini" type="info" plain>
                {{ par.name }}
              </el-button>
              <el-button v-if="!par.completed" size="mini">
                {{ par.name }}
              </el-button>
            </div>
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
          <el-button  v-if="checkWriter()" type="danger" @click="delEvent" >삭제</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed, reactive, ref, onBeforeMount, onUnmounted } from "vue";
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';

//icons
import { Calendar, Location, Document, User } from '@element-plus/icons'


export default {
  components: {
    Calendar,
    Location,
    Document,
    User
  },

  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()


    const fullCalendar = ref(null)
    const isOpen = ref(false);

    onBeforeMount(() => {
      window.addEventListener('resize', handleGroupModalWindowSize)
      handleGroupModalWindowSize()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleGroupModalWindowSize)
    })

    const hide = () => {
      isOpen.value = false;
    };
    const show = () => {
      isOpen.value = true;
    };

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
      if ( !checkWriter() ) {
        alert('일정을 수정할수 있는 권한이 없습니다.')
        router.push({name: 'GroupCalendar', query: { gid: route.query.gid }})
      } else {
        router.push({name: 'GroupCalendarPutSchedule', query: { gid: route.query.gid }})
      }
    }

    const delEvent = () => {
      if ( !checkWriter() ) {
        alert('일정을 삭제할수 있는 권한이 없습니다.')
        router.push({name: 'GroupCalendar', query: { gid: route.query.gid }})
      } else {
        state.dialogVisible = false    
      // 삭제 axios 요청
      axios
        .delete('https://k5d105.p.ssafy.io:3030/groupCalendar/deleteCalendar',
          { 
            data: {
              uid: localStorage.getItem('uid'),
              cid: state.mData.ModalDate.extendedProps.cid,
              gid: route.query.gid,
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
    }

    const modalSuccess = function () {
      if ( !checkPartipants() ) {
        alert('일정을 완료할수 있는 권한이 없습니다.')
        router.push({name: 'GroupCalendar', query: { gid: route.query.gid }})
      } else {
        axios.
        put('https://k5d105.p.ssafy.io:3030/groupCalendar/checkCalendar',
        {
          uid: localStorage.getItem('uid'),
          cid: state.mData.ModalDate.extendedProps.cid,
          gid: route.query.gid,
        },
        {
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        .then((response) => {
          let calendarApi = state.calendar.getApi()
          store.dispatch('deleteGroupCalendarData', state.mData.ModalDate.extendedProps.cid)
          state.mData.ModalDate.remove()
          const r = response.data.calendar
          let checkCompleted = false
          for ( let par of r.participant ) {
            if ( par.uid === localStorage.getItem('uid') ) {
              if ( par.completed ) {
                checkCompleted = true
              }
              break;
            }
          } 
          if ( checkCompleted ) {
            const cal = {
              cid: r.cid,
              gid: r.gid,
              completed: true,
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
              classNames: ['calendar-done'],
              participant: r.participant,
              creator: r.creator
            }
            store.dispatch('pushGroupCalendarData', cal)
            calendarApi.batchRendering(function() {
              calendarApi.addEvent(cal)
            })
          } else {
            const cal = {
              cid: r.cid,
              gid: r.gid,
              completed: false,
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
              participant: r.participant,
              creator: r.creator
            }
            store.dispatch('pushGroupCalendarData', cal)

            calendarApi.batchRendering(function() {
              calendarApi.addEvent(cal)
            })
          }
          store.dispatch('refreshGroupCalendarData', calendarApi.getEvents())
          isOpen.value = false
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }

    const checkWriter = () => {
      if ( state.mData ) {
        if ( localStorage.getItem('uid') === state.mData.ModalDate.extendedProps.creator) {
          return true
        } else {
          return false
        }
      } 
      return false
    }

    const checkPartipants = () => {
      if ( state.mData ) {
        const parts = state.mData.ModalDate.extendedProps.participant
        const res = parts.find((p) => p.uid === localStorage.getItem('uid'))
        if (res === undefined) {
          // 없다
          return false 
        } else {
          return true
        }
      }
      return false
    }

    const state = reactive({
      mData: computed(() => store.getters.getGroupModalDataFormat),
      calendar: computed(() => store.state.groupCalAPI),
      dialogVisible: ref(false),
      isAuthority: computed(() => localStorage.getItem('uid') === state.mData.ModalDate.extendedProps.creator),
      writer: false,
    })

    return { isOpen, hide, show, modalPut, state, delEvent, calData, modalSuccess, checkWriter, checkPartipants};
  },
  data() {
    return {
    }
  },
};
</script>

<style>

.modal-content-body-participant {
  display: flex;
  flex-flow: wrap;
}

.modal-content-body-participant-element {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

</style>
