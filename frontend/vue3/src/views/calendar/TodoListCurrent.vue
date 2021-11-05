<template>
  <div v-if="!state.isTodoItem">
    <el-space wrap>
      <el-card class="box-card">
        <div>
          <span>
          {{ todayItem }}
          </span>
        </div>
      </el-card>
    </el-space>
  </div>
  <div v-else>
    <el-space wrap>
      <el-card class="box-card">
        <div>
          <span>
            {{ state.toDo }}
          </span>
        </div>
      </el-card>
    </el-space>
  </div>
</template>

<script>
import { computed, inject, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  name: "TodoListCurrent",
  setup() {
    const store = useStore()
    const today = inject('todayData')
    const todayItem = inject('toDoItem')

    const state = reactive({
      toDo: computed(() => store.state.toDo),
      isTodoItem: computed(() => store.state.isTodoItem)
    })
    return { state, today, todayItem }
  },
}
</script>

<style>

</style>