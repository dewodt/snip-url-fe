import { ref } from 'vue'

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
  const defaultTheme = 'light'

  // State theme
  const theme = ref<Theme>((localStorage.getItem(localStorageKey) as Theme) ?? defaultTheme)

  // Update theme
  const updateTheme = () => {
    // Get new value
    const newTheme = theme.value === 'light' ? 'dark' : 'light'

    // Update root
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)

    // Update local storage
    localStorage.setItem(localStorageKey, newTheme)

    // Update theme state
    theme.value = newTheme
  }

  return {
    theme,
    updateTheme
  }
}
