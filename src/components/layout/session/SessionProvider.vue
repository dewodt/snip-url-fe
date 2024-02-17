<script setup lang="ts">
import { injectSessionKey } from './session'
import type { Session, SessionProviderProps } from './session'
import { QueryClient, useQuery } from '@tanstack/vue-query'
import { provide } from 'vue'

// Initialize query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
})

// Backend URL
const beURL = import.meta.env.VITE_BE_URL

// Query
const { data, isLoading, refetch } = useQuery(
  {
    queryKey: ['session'],
    queryFn: async () => {
      const res = await fetch(`${beURL}/api/auth/session`, {
        method: 'GET',
        credentials: 'include'
      })

      if (!res.ok) {
        return null
      }

      const resJSON = (await res.json()) as Session
      return resJSON
    }
  },
  queryClient
)

// updateSession
const updateSession = () => refetch()

// provide it to the app
provide<SessionProviderProps>(injectSessionKey, { session: data, isLoading, updateSession })
</script>

<template>
  <slot></slot>
</template>
