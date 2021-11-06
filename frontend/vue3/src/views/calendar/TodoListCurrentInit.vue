<template>
  <el-space wrap>
    <el-card class="box-card todoitem-card">
      <el-row :gutter="10">
        <el-col :span="13" :offset="1" class="todoitem-card-header-title">
          <span>
            {{ todayItem.title }}
          </span>
        </el-col>
        <el-col :span="10" class="todoitem-card-header-time">
          <span>
            {{ 
              ((todayItem.start.toString().split(' ')[4].substring(3, 5) === '00') ? (`${todayItem.start.toString().split(' ')[4].substring(0, 2)}시`) : `${todayItem.start.toString().split(' ')[4].substring(0, 2)}시 ${todayItem.start.toString().split(' ')[4].substring(3, 5)}분`)   
            }}
          </span>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div class="todoitem-card-body">
        <el-row class="todoitem-card-body-place">
          <el-col :span="10" :offset="1">
            <span>
              {{ todayItem.extendedProps.placeName }}
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="1" class="todoitem-card-body-content">
            <span>
              {{ todayItem.extendedProps.content }}
            </span>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </el-space>
</template>

<script>
import { computed, inject, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  name: "TodoListCurrentInit",
  setup() {
    const store = useStore()
    const today = inject('todayData')
    const todayItem = inject('toDoItem')

    const state = reactive({
      toDo: computed(() => store.state.toDo),
      isTodoItem: computed(() => store.state.isTodoItem)
    })
    return { state, today, todayItem }
  }
}
</script>

<style>

  @media screen and (min-width: 1200px) {
    .todoitem-card {
      width: 460px;
      height: 460px;
    }
    .todoitem-card-header-title {
      /* el-col 기본속성 무시 */
      display: flex !important; 
      justify-content: flex-start;
      align-items: center;
    }

    /* 제목 */
    .todoitem-card-header-title > span {
      font-size: 2rem;
    }

    .todoitem-card-header-time {
      display: flex !important;
      justify-content: flex-start;
      align-items: flex-end;
    }

    .todoitem-card-body-place {
      margin-bottom: 10px;
    }


    .todoitem-card-header-time > span {
      font-size: 1rem;
    }


    .todoitem-card-body-content {
      height: 300px;
      border: 1px solid #ededed;
      border-radius: 0.5em;
      display: flex !important;
      padding: 1rem;
    }

  }

  @media screen and (max-width: 1199px) and (min-width: 993px) {
    .todoitem-card {
      width: 380px;
      height: 460px;
    }
  }

  @media screen and (max-width: 992px) and (min-width: 768px) {
    .todoitem-card {
      width: 272px;
    }
  }

  @media screen and (max-width: 767px) and (min-width: 500px) {
    .todoitem-card {
      width: 188px;
      height: 460px;
    }
  }
    /* @media screen and (max-width: 499px) {
    .todoitem-card {
      width: 300px;
    }
  } */
</style>