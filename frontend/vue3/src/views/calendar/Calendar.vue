<template>
  <div>
    <user-calendar v-if="state.waitData"/>
  </div>
</template>

<script>
// vue
import { mapActions, useStore } from 'vuex'
import UserCalendar from '@/views/calendar/UserCalendar'
import { computed, reactive } from 'vue'

export default {
  name: 'Calendar',
  components : {
    UserCalendar,
  },
  setup() {
    const store = useStore()

    const state = reactive({
      waitData: computed(() => store.state.isData)
    })

    return {
      state
    }
  },
  methods: {
    ...mapActions([
      'getCalendarData',
    ]),
  },
  beforeMount() {
    this.getCalendarData()
  },

}
</script>

<style>

</style>