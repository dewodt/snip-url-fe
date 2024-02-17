import { inject } from 'vue'

// Local storage key
export const localStorageKey = 'ui-theme'

// Injection key
export const injectThemeKey = Symbol()

// Types
export type Theme = 'light' | 'dark'
export type ThemeProviderProps = {
  theme: Theme
  updateTheme: () => void
}

export function useTheme() {
  const value = inject(injectThemeKey) as ThemeProviderProps

  return value
}
