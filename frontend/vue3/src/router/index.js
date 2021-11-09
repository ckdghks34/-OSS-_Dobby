import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/main/main'
import SelectSignup from '@/views/main/select-signup'
import Signup from '@/views/main/signup'
import SuccessSignup from '@/views/main/success-signup'
import FindInfo from '@/views/main/findInfo'
import NewGroup from '@/views/group/new-group'
import GroupInfo from '@/views/group/group-info'
import Calendar from '@/views/calendar/Calendar'
import Schedule from '@/views/schedule/Schedule'
import Chart from '@/views/chart/chart'

const routes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
  },
  {
    path: '/selectsignup',
    name: 'SelectSignup',
    component: SelectSignup,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/welcome',
    name: 'SuccessSignup',
    component: SuccessSignup,
  },
  {
    path: '/find',
    name: 'FindInfo',
    component: FindInfo,
  },
  {
    path: '/newgroup',
    name: 'NewGroup',
    component: NewGroup,
  },
  {
    path: '/:gid',
    name: 'GroupInfo',
    component: GroupInfo,
    props: true,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
  },
  {
    path: '/chart',
    name: 'Chart',
    component: Chart,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
