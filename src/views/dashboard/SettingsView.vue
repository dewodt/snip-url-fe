<script setup lang="ts">
import SettingsForm from '@/components/forms/SettingsForm.vue'
import { useHead } from '@unhead/vue'

// Add custom metatags for current page
useHead({
  title: 'Settings | Snip URL',
  meta: [
    {
      name: 'og:title',
      content: 'Settings | Snip URL'
    },
    {
      name: 'twitter:title',
      content: 'Settings | Snip URL'
    }
  ]
})
</script>

<template>
  <main className="w-full">
    <SettingsForm />
  </main>
</template>
