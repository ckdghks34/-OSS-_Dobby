<template>
  <div>
    <el-space wrap direction="vertical">
      <el-card v-for="i in today" :key="i" class="box-card todoList-card" @click="changeTodo(i)">
        <el-row>
          <el-col :span="14">
            {{ i.start }}
          </el-col>
          <el-col :span="10">
            {{ i.title }}
          </el-col>
        </el-row>
      </el-card>
    </el-space>
  </div>
</template>

<script>
import { computed, inject, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  name: "TodoListInfo",
  setup() {
    const store = useStore()
    const today = inject('todayData')

    const changeTodo = function(todo) {
      store.dispatch('setTodo', todo)
    }

    const state = reactive({
      mData: computed(() => store.getters.getTodayToDoList)
    })

    return { state, today, changeTodo }
  },
}
</script>

<style>
  .todoList-card {
    cursor: pointer;
  }

  @media screen and (min-width: 1200px) {
    .todoList-card {
      width: 460px;
    }
  }

  @media screen and (max-width: 1199px) and (min-width: 993px) {
    .todoList-card {
      width: 380px;
    }
  }

  @media screen and (max-width: 992px) and (min-width: 768px) {
    .todoList-card {
      width: 272px;
    }
  }

  @media screen and (max-width: 767px) and (min-width: 500px) {
    .todoList-card {
      width: 188px;
    }
  }

  /* @media screen and (max-width: 499px) {
    .todoList-card {
      width: 300px;
    }
  } */

</style>