import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ForgotPassword from './components/Forgot-Password.vue';
import Profile from './pages/Profile.vue';
import Dashboard from './pages/dashboard/Dashboard.vue';
import Suspects from './pages/suspects/Suspects.vue';
import Complainants from './pages/complainants/Complainants.vue';
import Complaints from './pages/complaints/Complaints.vue';
import Police from './pages/admin/Police.vue';
import AddPolice from './pages/admin/AddPolice.vue';

import AddCase from './pages/police/AddCase.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: { requiresAuth:false }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: { requiresAuth: false}
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true } // Update to false if authentication is required
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true } // Update to true if authentication is required
    },
    {
      path: '/police',
      name: 'police',
      component:Police,
      meta: { requiresAuth: true } // Update to true if authentication is required
    },
    {
      path: '/add/police',
      name: 'addPolice',
      component: AddPolice,
      meta: { requiresAuth: true } // Update to true if authentication is required
    },
    {
      path: '/suspects',
      name: 'suspects',
      component: Suspects,
      meta: { requiresAuth: true } // Update to true if authentication is required
    },
 
    {
      path: '/add/case',
      name: 'addcase',
      component: AddCase,
      meta: { requiresAuth: true } // Update to true if authentication is required
    },
    {
      path: '/complainants',
      name: 'complainants',
      component: Complainants,
      meta: { requiresAuth: true } // Update to false if authentication is required
    },
    {
      path: '/complaints',
      name: 'complaints',
      component: Complaints,
      meta: { requiresAuth: true } // Update to false if authentication is required
    },
    ]
});

// Global before guard for authentication
router.beforeEach((to, from, next) => {
  // Check if user and tokens are in local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const isAuthenticated = user && token;

  // Check if there are matched routes and if the meta field exists
  const requiresAuth = to.matched.length > 0 ? to.matched[0].meta.requiresAuth : false;

  console.log('Navigation to', to.path, 'requiresAuth:', requiresAuth, 'isAuthenticated:', isAuthenticated);

  if (requiresAuth && !isAuthenticated) {
    // Redirect to the login page if authentication is required and the user is not authenticated
    console.log('Redirecting to /login');
    next('/');
  } else {
    // Continue with the navigation
    console.log('Continuing with navigation');
    next();
  }
});

export default router;
