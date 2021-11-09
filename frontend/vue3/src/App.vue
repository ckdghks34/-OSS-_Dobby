<template>
  <div class="icon-bar" v-if="info.size"> 
  <!-- id="nav" -->
    <div>{{ info.userId }} 님</div>
    <router-link to="/main">Login</router-link> 
    <router-link to="/newgroup">New Group</router-link> 
    <router-link to="/group" >Group</router-link>
    <i class="bi bi-gear-fill"></i>
      <div>
        <ul>
          <li v-for="groupList in info.groupLists" :key="groupList.gid">
            <a class="dropdown-item" href="#">{{ groupList.name }}
            
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    <router-link to="/calendar">Calendar</router-link> 
    <router-link to="/schedule">Schedule</router-link> 
    <router-link to="/chart">chart</router-link> 
    <button @click="logout" class="logoutButton">logout</button> 
  </div>

  <div v-else>
    <el-dropdown class="list-button" >
      <el-button btn-sm icon="el-icon-notebook-2">
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item><router-link to="/main">Login</router-link> </el-dropdown-item>
          <el-dropdown-item><router-link to="/newgroup">New Group</router-link> </el-dropdown-item>
          <el-dropdown-item><router-link to="/group">Group</router-link> </el-dropdown-item>
          <el-dropdown-item><router-link to="/calendar">Calendar</router-link> </el-dropdown-item>
          <el-dropdown-item><router-link to="/schedule">Schedule</router-link> </el-dropdown-item>
          <el-dropdown-item><router-link to="/chart">chart</router-link>  </el-dropdown-item>
          <el-dropdown-item><button @click="logout">logout</button>  </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
 
  <div class="teleport-modal">
    <teleportExample />
  </div>
  <div class="routerView">
    <router-view />
  </div>
</template>

<script>
// teleport
import teleportExample from '@/components/teleport/teleportExample'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { reactive, onBeforeMount} from 'vue'

export default {
  components: {
    teleportExample,
  },
  setup() {
    const router = useRouter()

// user 정보 
    const info = reactive({
      userId: '',
      size: true,
      groupLists: [],
    })
    
    onBeforeMount(() => {
      axios.get('https://k5d105.p.ssafy.io:3030/users/getUserInfo',{params: {
          uid : localStorage.getItem('uid')
      } })
        .then((response) => {
            console.log(response)
            info.userId = response.data.user.nickname        
            })
        .catch((error) => {console.log(error)})
      
      // axios.get('https://k5d105.p.ssafy.io:3030/groupCalendar/getGroup', {params: {
      //     uid :localStorage.getItem('uid')
      // } })
      //   .then((response) => {
      //       console.log(response)
      //   })
      //   .catch((error) => {console.log(error)})

// groupLists
      axios.get('https://k5d105.p.ssafy.io:3030/groupCalendar/getGroup', {params: {
          uid :localStorage.getItem('uid')
      } },
      {
          headers: {
            authorization: localStorage.getItem('token')
          }
      }
      )
        .then((response) => {
            console.log(response)
            info.groupLists = response.data.group
        })
        .catch((error) => {console.log(error)})

    })

    window.addEventListener(
        'resize',
        function() {
            if (window.innerWidth < 730) {
            info.size = false
            } else {
            info.size = true
            }
        },
        true
    )


// 로그아웃
    const logout = function() {
      axios
        .post('https://k5d105.p.ssafy.io:3030/users/logout', {
          idToken: localStorage.getItem('token'),
        })
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('uid')
          router.push({ name: 'main' })
        })
    }
    return { logout ,info}

  },
}
</script>

<style>
html,
body,
#app {
  height: 100vh;
  margin: 0;
}

#app {
  font-family: 'Gowun Batang', serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.routerView {
  display: table-cell;
  width: 85vw;
  /* float: left; */
  height: 90vh;
  vertical-align: middle;
  text-align: center;
}

* {
  font-family: 'Gowun Batang', serif !important;
}

.logoutButton {
  position:fixed;
  bottom: 0;
  left: 0;
}


/* 사이드바 */
.icon-bar {
  height: 100%;
  width: 15vw;
  float: left;
  background-color: #A9C9DE;
  /* position: fixed;  */
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

/* .icon-bar { fontSize: 1rem !important; } */

.icon-bar a:hover {
  background-color: #DEB4B4;
}

.active {
  background-color: #5eaf13;
}

.list-button {
  float: left;
  position: relative;
}

.el-icon-notebook-2 {
  font-size: 1.5rem;
}



/* @media screen and (max-width: 730px) {
  .icon-bar {
    display: none;
  }
} */

</style>
