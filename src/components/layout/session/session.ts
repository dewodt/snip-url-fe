import { type Ref, inject } from 'vue'

// Injection key
export const injectSessionKey = Symbol()

// Session type
export interface Session {
  id: string
  name: string
  email: string
  avatar: string
}

// Provider props
export interface SessionProviderProps {
  session: Ref<Session | null> | Ref<undefined>
  isLoading: Ref<boolean>
  updateSession: () => void
}

// Get value from provider with injection
export function useSession() {
  const value = inject(injectSessionKey) as SessionProviderProps

  return value
}
