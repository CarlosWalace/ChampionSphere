import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import AboutView from '../views/About.vue'
import RegisterView from '../views/Register.vue'
import LoginView from '../views/Login.vue'
import ProfileView from '../views/Profile.vue'
import DashboardView from '../views/Dashboard.vue'
import NewEventView from '../views/NewEvent.vue'
import EditEventView from '../views/EditEvent.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/newevent',
    name: 'NewEvent',
    component: NewEventView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editevent/:id',
    name: 'EditEvent',
    component: EditEventView,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)) {

    if(store.getters.authenticated === false) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      })
    } else {
      next()
    }

  } else {
    next()
  }

});

export default router
