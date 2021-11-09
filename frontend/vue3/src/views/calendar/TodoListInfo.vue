<template>
  <div>
    {{today}}
  </div>
</template>

<script>
import { computed, inject, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  name: "TodoListInfo",
  setup() {
    const store = useStore()
    const state = reactive({
      mData: computed(() => store.getters.getTodayToDoList)
    })

    const today = inject('todayData')
    return { state, today }
  }
}
</script>

<style>

</style>