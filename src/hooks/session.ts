import { QueryClient, useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'

export interface Session {
  id: string
  name: string
  email: string
  avatar: string
}

export interface SessionHookResponse {
  session: Ref<Session | null> | Ref<undefined>
  isLoading: Ref<boolean>
  updateSession: () => void
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
})

// useSession hooks retrieve session if available and return null if none
export const useSession = (): SessionHookResponse => {
  const { data, isLoading, refetch } = useQuery(
    {
      queryKey: ['session'],
      queryFn: async () => {
        const beURL = import.meta.env.VITE_BE_URL
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

  return { session: data, isLoading, updateSession: () => refetch() }
}
