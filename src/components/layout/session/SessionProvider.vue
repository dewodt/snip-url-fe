<script setup lang="ts">
import { injectSessionKey } from './session'
import type { Session, SessionProviderProps } from './session'
import { queryClient } from '@/lib/query'
import { beURL } from '@/lib/url'
import { useQuery } from '@tanstack/vue-query'
import { provide } from 'vue'

// Query
const { data, isPending, refetch } = useQuery(
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
provide<SessionProviderProps>(injectSessionKey, { session: data, isPending, updateSession })
</script>

<template>
  <slot></slot>
</template>
