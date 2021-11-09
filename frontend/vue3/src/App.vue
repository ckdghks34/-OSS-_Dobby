<template>
  <div id="nav">
    <router-link to="/main">main</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/newgroup">newGroup</router-link> |
    <!-- <router-link to="/group">Group</router-link> | -->
    <button @click="toGroup">Group</button> |
    <router-link to="/calendar">Calendar</router-link> |
    <router-link to="/schedule">Schedule</router-link> |
    <router-link to="/chart">chart</router-link> |
    <button @click="logout">logout</button> |
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
import { reactive } from '@vue/reactivity'

export default {
  components: {
    teleportExample,
  },
  setup() {
    const router = useRouter()

    const info = reactive({
      gid: 'PqoDELK06r3jKL9wP5ts',
    })

    const logout = function() {
      axios
        .post(
          'https://k5d105.p.ssafy.io:3030/users/logout',
          {
            idToken: localStorage.getItem('token'),
          },
          {
            headers: {
              authorization: localStorage.getItem('token'),
            },
          }
        )
        .then((res) => {
          console.log(res)
          localStorage.removeItem('token')
          localStorage.removeItem('uid')
          router.push({ name: 'main' })
        })
        .catch((err) => {
          console.log(err.response.status)
          if (err.response.status === 403) {
            alert('로그인이 만료되었습니다')
            router.push({ name: 'main' })
            localStorage.removeItem('token')
            localStorage.removeItem('uid')
          }
        })
    }

    const toGroup = function() {
      console.log(info.email)
      router.push({
        name: 'GroupInfo',
        params: { gid: info.gid },
      })
    }
    return { info, logout, toGroup }
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
  width: 100vw;
  height: 90vh;
  vertical-align: middle;
  text-align: center;
}

* {
  font-family: 'Gowun Batang', serif !important;
}
</style>
