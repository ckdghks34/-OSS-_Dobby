<template>
  <el-space wrap>
    <el-card class="box-card todoitem-card" v-if="state.isTodoItem && state.toDo">
      <el-row :gutter="10">
        <el-col :span="13" :offset="1" class="todoitem-card-header-title">
          <span>
            {{ state.toDo.title }}
          </span>
        </el-col>
        <el-col :span="10" class="todoitem-card-header-time">
          <span>
            {{ 
              ((state.toDo.start.toString().split(' ')[4].substring(3, 5) === '00') ? (`${state.toDo.start.toString().split(' ')[4].substring(0, 2)}시`) : `${state.toDo.start.toString().split(' ')[4].substring(0, 2)}시 ${state.toDo.start.toString().split(' ')[4].substring(3, 5)}분`)   
            }}
          </span>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div class="todoitem-card-body">
        <el-row class="todoitem-card-body-place">
          <el-col :span="10" :offset="1">
            <span>
              {{ state.toDo.extendedProps.placeName }}
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="1" class="todoitem-card-body-content">
            <span>
              {{ state.toDo.extendedProps.content }}
            </span>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </el-space>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: "TodoListCurrentCheck",
  setup() {
    const store = useStore()

    const state = reactive({
      toDo: computed(() => store.state.toDo),
      isTodoItem: computed(() => store.state.isTodoItem)
    })
    return { state }
  }
}
</script>

<style>

</style>