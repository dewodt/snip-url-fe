<script setup lang="ts">
import { injectThemeKey, localStorageKey, type Theme } from './theme'
import { onMounted, provide, ref } from 'vue'

// Initialize theme state
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

// Set the theme class on the html element onMount
onMounted(() => {
  document.documentElement.classList.add(theme.value)
})

// provide it to the app
provide(injectThemeKey, { theme, updateTheme })
</script>

<template>
  <slot></slot>
</template>
