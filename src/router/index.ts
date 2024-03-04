import { beURL } from '@/lib/url'
import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const LinksView = () => import('@/views/dashboard/LinksView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')
const PrivacyPolicyView = () => import('@/views/PrivacyPolicyView.vue')
const ErrorView = () => import('@/views/auth/ErrorView.vue')
const SignInView = () => import('@/views/auth/SignInView.vue')
const SignUpView = () => import('@/views/auth/SignUpView.vue')
const VerifyRequestView = () => import('@/views/auth/VerifyRequestView.vue')
const CreateNewView = () => import('@/views/dashboard/CreateNewView.vue')
const SettingsView = () => import('@/views/dashboard/SettingsView.vue')
const LinksDetailView = () => import('@/views/dashboard/links/LinksDetailView.vue')

// Router definition
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
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView
    }
  ]
})

// Auth
router.beforeEach(async (to) => {
  // Authentication Route Only
  const authenticatedOnlyRouteStartsWith = ['/dashboard']
  if (authenticatedOnlyRouteStartsWith.some((route) => to.path.startsWith(route))) {
    // Check if user is authenticated
    const res = await fetch(`${beURL}/api/auth/session`, {
      method: 'GET',
      credentials: 'include'
    })

    if (!res.ok) {
      // Redirect to sign-in
      router.push('/auth/sign-in')
      return
    }
  }

  // Non-Authentication Route Only
  const nonAuthenticatedOnlyRouteStartsWith = ['/auth']
  if (nonAuthenticatedOnlyRouteStartsWith.some((route) => to.path.startsWith(route))) {
    // Check if user is authenticated
    const res = await fetch(`${beURL}/api/auth/session`, {
      method: 'GET',
      credentials: 'include'
    })

    if (res.ok) {
      // Redirect to dashboard
      router.push('/dashboard')
      return
    }
  }
})

export default router
