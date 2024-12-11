import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import AboutView from '../views/About.vue'
import RegisterView from '../views/Register.vue'
import LoginView from '../views/Login.vue'
import ProfileView from '../views/Profile.vue'
import DashboardView from '../views/Dashboard.vue'
import NewEventView from '../views/NewEvent.vue'
import EditEventView from '../views/EditEvent.vue'
import EventView from '../views/Event.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: false,
      title: "ChampionSphere"
    }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: {
      requiresAuth: false,
      title: "About"
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: {
      requiresAuth: false,
      title: "Regitro"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      requiresAuth: false,
      title: "Login"
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: {
      requiresAuth: true,
      title: "Perfil"
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true,
      title: "Painel"
    }
  },
  {
    path: '/newevent',
    name: 'NewEvent',
    component: NewEventView,
    meta: {
      requiresAuth: true,
      title: "NovoEvento"
    }
  },
  {
    path: '/editevent/:id',
    name: 'EditEvent',
    component: EditEventView,
    meta: {
      requiresAuth: true,
      title: "EditarEvento"
    }
  },
  {
    path: '/event/:id',
    name: 'Event',
    component: EventView,
    meta: {
      title: "Evento"
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
})

router.beforeEach((to, from) =>{
  document.title = to.meta?.title ?? 'Default Title'
})

export default router
