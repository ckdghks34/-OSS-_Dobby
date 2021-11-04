<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <div class="modal-content-header">
        <span style="fontSize: 2rem">{{ state.mData.title }}</span>
        <div>
          <i class="el-icon-edit modalIcon"></i>
          <i class="el-icon-delete modalIcon" @click="delEvent"></i>
          <i class="el-icon-close modalIcon" @click="hide"></i>
        </div>
      </div>
      <div class="modal-content-body">
        <div class="modal-content-body-1">
          <div class="modal-content-body-1-color">
            <span class="modal-content-body-1-color-box" v-bind:style="{backgroundColor: state.mData.bgColor}"></span>
          </div>
          <ul class="modal-content-body-1-title">
            <li class="modal-content-body-1-title-day">
              <span style="width: 30%">일시</span>
              <span v-if="state.mData.allDay">{{ state.mData.startDate }}</span>
              <span v-if="!state.mData.allDay">{{ state.mData.startDate }} - {{ state.mData.endDate }}</span>
            </li>
            <li>
              <span style="width: 30%">장소</span>
              <span>구글???!</span>
            </li>
            <li class="modal-content-body-1-memo">
              <span style="width: 30% display: inline-block">메모</span>
              <span style="width: 70%">
                메모가 들어가면 되는 곳!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, cum. Praesentium fugiat eaque similique molestiae, provident qui eius repellat maxime eveniet minima nihil officiis, ex consectetur libero voluptatibus nobis nesciunt!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quo voluptates laborum ad! Fugiat recusandae accusamus culpa, nam dolorem odio iusto ex nostrum beatae nisi, a unde deserunt voluptatibus explicabo.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
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

    const delEvent = () => {
      if (confirm(" 해당 일정을 정말로 삭제하시겠습니까? ")) {
        console.log('삭제')

        // 삭제 axios 요청
        axios
          .delete('https://k5d105.p.ssafy.io:3030/calendar/deleteCalendar',
            {
              uid: 'uuu',
              cid: 'ccc'
            })
            .then(() => {
              router.go(router.currentRoute)
            })
      } else {
        console.log('x')
      }
    }


    const state = reactive({
      mData: computed(() => store.getters.getModalDataFormat),
    })

  

    return { isOpen, hide, show, state, delEvent };
  },
  data() {
    return {
    }
  },
  
  method: {
    dddd: function() {
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
    }
  }
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
