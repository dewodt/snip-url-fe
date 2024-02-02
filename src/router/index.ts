import LinksView from '../views/DashboardView/LinksView.vue'
import HomeView from '../views/HomeView.vue'
import AnalyticsView from '@/views/DashboardView/AnalyticsView.vue'
import CreateNewView from '@/views/DashboardView/CreateNewView.vue'
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
    }
  ]
})

export default router
