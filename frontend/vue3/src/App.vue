<template>
  <div id="nav">
    <router-link to="/main">main</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/newgroup">newGroup</router-link> |
    <router-link to="/group">Group</router-link> |
    <router-link to="/calendar">Calendar</router-link> |
    <router-link to="/schedule">Schedule</router-link>
  </div>
  <div class ="teleport-modal">
    <teleportExample />
  </div>
  <router-view />
</template>

<script>
// teleport
import teleportExample from '@/components/teleport/teleportExample'

export default {
  components: {
    teleportExample
  }
}
</script>

<style>
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
</style>
