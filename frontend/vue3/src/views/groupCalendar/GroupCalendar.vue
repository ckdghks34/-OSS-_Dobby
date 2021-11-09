<template>
  <div>
    <GCalendar />
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

// component
import GCalendar from '@/views/groupCalendar/GCalendar'


export default {
  name: 'GroupCalendar',
  components:{
    GCalendar
  },

  setup() {
    const route = useRoute()
    const store = useStore()

    const { gid } = route.query

    onBeforeMount(() => {
      store.dispatch('getGroupCalendarData', gid)
    })




  }

}
</script>

<style>

</style>