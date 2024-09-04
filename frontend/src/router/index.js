import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import AboutView from '../views/About.vue'
import RegisterView from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },

  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
