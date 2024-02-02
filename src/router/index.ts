import HomeView from '../views/HomeView.vue'
import LinksView from '../views/dashboard-view/LinksView.vue'
import AboutView from '@/views/AboutView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import ErrorView from '@/views/auth-view/ErrorView.vue'
import SignInView from '@/views/auth-view/SignInView.vue'
import VerifyRequestView from '@/views/auth-view/VerifyRequestView.vue'
import AnalyticsView from '@/views/dashboard-view/AnalyticsView.vue'
import CreateNewView from '@/views/dashboard-view/CreateNewView.vue'
import SettingsView from '@/views/dashboard-view/SettingsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/auth',
      redirect: '/auth/sign-in'
    },
    {
      path: '/auth/sign-in',
      name: 'auth-sign-in',
      component: SignInView
    },
    {
      path: '/auth/verify-request',
      name: 'auth-verify-request',
      component: VerifyRequestView
    },
    {
      path: '/auth/error',
      name: 'auth-error',
      component: ErrorView
    },
    {
      path: '/dashboard',
      redirect: '/dashboard/links'
    },
    {
      path: '/dashboard/links',
      name: 'dashboard-links',
      component: LinksView,
      meta: { layout: 'dashboard' }
    },
    {
      path: '/dashboard/analytics',
      name: 'dashboard-analytics',
      component: AnalyticsView,
      meta: { layout: 'dashboard' }
    },
    {
      path: '/dashboard/create-new',
      name: 'dashboard-create-new',
      component: CreateNewView,
      meta: { layout: 'dashboard' }
    },
    {
      path: '/dashboard/settings',
      name: 'dashboard-settings',
      component: SettingsView,
      meta: { layout: 'dashboard' }
    }
  ]
})

export default router
