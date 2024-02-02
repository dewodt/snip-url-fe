import LinksView from '../views/DashboardView/LinksView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import AnalyticsView from '@/views/DashboardView/AnalyticsView.vue'
import CreateNewView from '@/views/DashboardView/CreateNewView.vue'
import SettingsView from '@/views/DashboardView/SettingsView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
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
