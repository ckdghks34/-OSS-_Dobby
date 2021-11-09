<template>
  <div class="todoList">
    <TodoListInfo />
  </div>
</template>

<script>
import { computed, provide, reactive } from 'vue'
import { useStore } from 'vuex'

import TodoListInfo from '@/views/calendar/TodoListInfo'

export default {
  name: "TodoList",
  components: {
    TodoListInfo
  },
  setup() {
    const store = useStore()
    const state = reactive({
      mData: computed(() => store.getters.getTodayToDoList)
    })

    provide( 'todayData',
      computed(() => store.getters.getTodayToDoList)
    )

    return { state }
  }
}
</script>

<style>
.todoList {
  padding: 0 10%;
}

</style>