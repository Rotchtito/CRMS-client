import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../components/Forgot-Password.vue')
    },
    
    //accomodation related routes
    {
      path: '/accommodations',
      name: 'accommodationList',
      component: () => import('../pages/accomodation/AccommodationList.vue')
    },
    {
      path: '/accommodation/:id',
      name: 'accommodationDetails',
      component: () => import('../pages/accomodation/AccommodationDetails.vue'),
      props: true,
    },
    {
      path: '/booking-form',
      name: 'bookingForm',
      component: () => import('../pages/accomodation/BookingForm.vue')
    },
    
  ]
})

export default router
