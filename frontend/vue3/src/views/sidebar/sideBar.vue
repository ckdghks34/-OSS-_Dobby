<template>
    <div class="icon-bar">
        
        <div>{{ info.userId }}님</div>

        <router-link to="/find">MY_INFO</router-link> 
        <router-link to="/calendar">Calendar</router-link> 
        <router-link to="/schedule">Schedule</router-link>
        <router-link to="/group">Group</router-link> 
        <router-view />
    </div>
</template>

    

<script>
import { reactive, onBeforeMount} from 'vue'
import axios from 'axios'


export default {
  name: 'sideBar',

  setup() {

    const info = reactive({
      userId: '',
    })
    
    onBeforeMount(() => {
      axios.get('http://k5d105.p.ssafy.io:3000/users/getUserInfo',{params: {
          uid : localStorage.getItem('uid')
      } })
        .then(response =>
            this.userId = response.uid)
        .error(error => console.log(error))
    })
    return {
      info
    }
  

  },

  
        // axios.
        // post(`${BASE_URL}get`,{
        //     uid: localStorage.getItem('uid')
        // })
        // .then( response => {
        //     console.log('getCalendar Response')
        //     console.log(response)
        
        // })
        // .catch( error => {
        //     console.log(error)
        // })

}
</script>


<style scoped>
    .icon-bar {
    height: 100%;
    width: 200px;
    background-color: #A9C9DE;
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    /*z-index: 1;*/ /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 0;
    }

    .icon-bar a {
    display: block;
    text-align: center;
    padding: 16px;
    transition: all 0.3s ease;
    color: white;
    font-size: 20px;

    }

    .icon-bar a:hover {
    background-color: #DEB4B4;
    }

    .active {
    background-color: #5eaf13;
    }

</style>
