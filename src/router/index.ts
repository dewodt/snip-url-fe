import HomeView from '../views/HomeView.vue'
import LinksView from '../views/dashboard/LinksView.vue'
import AboutView from '@/views/AboutView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import ErrorView from '@/views/auth/ErrorView.vue'
import SignInView from '@/views/auth/SignInView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import VerifyRequestView from '@/views/auth/VerifyRequestView.vue'
import CreateNewView from '@/views/dashboard/CreateNewView.vue'
import SettingsView from '@/views/dashboard/SettingsView.vue'
import LinksDetailView from '@/views/dashboard/links/LinksDetailView.vue'
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
      path: '/auth/sign-up',
      name: 'auth-sign-up',
      component: SignUpView
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
      path: '/dashboard/links/:id',
      name: 'dashboard-links-detail',
      component: LinksDetailView,
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
