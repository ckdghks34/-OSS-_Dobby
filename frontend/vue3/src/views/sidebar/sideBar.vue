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
      axios.get('https://k5d105.p.ssafy.io:3030/users/getUserInfo',{params: {
          uid : localStorage.getItem('uid')
      } })
        .then((response) => {
            info.userId = response.data.user.nickname
            })
        .catch((error) => {console.log(error)})
      
      axios.get('https://k5d105.p.ssafy.io:3030/groupCalendar/getGroup', {params: {
          uid :localStorage.getItem('uid')
      } })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {console.log(error)})
    })

    
    return {
      info
    }
  }
}
</script>


<style scoped>
    .icon-bar {
    height: 100%;
    width: 200px;
    background-color: #A9C9DE;
    position: fixed; 
    top: 0; 
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
