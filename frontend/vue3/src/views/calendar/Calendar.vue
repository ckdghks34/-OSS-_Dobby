<template>
  <div>
    <user-calendar />
  </div>
</template>

<script>
// vue
import { mapActions } from 'vuex'
import UserCalendar from '@/views/calendar/UserCalendar'

// import { onBeforeMount } from 'vue'


export default {
  name: 'Calendar',
  components : {
    UserCalendar,
  },
  setup() {
    // const store = useStore()

    const test = 1

    return {
      test,
      // store
    }
  },
  methods: {
    ...mapActions([
      'getCalendarData',
    ]),
  },
  beforeMount() {
    console.log('hi created')
    this.getCalendarData()
  },

}
</script>

<style>

</style>