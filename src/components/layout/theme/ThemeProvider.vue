<script setup lang="ts">
import { injectThemeKey, useTheme } from './theme'
import { onMounted, provide } from 'vue'

// Initialize theme state
const { theme, updateTheme } = useTheme()

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
