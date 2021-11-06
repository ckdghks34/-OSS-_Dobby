<template>
  <div class="todoList" v-if="state.isTodayData">
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <TodoListInfo />
        </div>
      </el-col>
      <!-- <el-col :span="2"></el-col> -->
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <TodoListCurrent />
        </div>
      </el-col>
    </el-row>
  </div>
  <div v-else>
  </div>
</template>

<script>
import { computed, provide, reactive } from 'vue'
import { useStore } from 'vuex'

import TodoListInfo from '@/views/calendar/TodoListInfo'
import TodoListCurrent from '@/views/calendar/TodoListCurrent'

export default {
  name: "TodoList",
  components: {
    TodoListInfo,
    TodoListCurrent,
  },
  setup() {
    const store = useStore()
    const state = reactive({
      mData: computed(() => store.getters.getTodayToDoList),
      isTodayData: computed(() => {
        return (store.getters.getTodayToDoList.length > 0) ? true : false
      })
    })

    provide( 'todayData',
      computed(() => state.mData)
    )
    provide('toDoItem',
      computed(() => state.mData[0])
    )

    return { state }
  }
}
</script>

<style>
  .todoList{
    border-radius: 1rem;
    padding :10px 0;
    background-color: #EDEDED;
  }
</style>