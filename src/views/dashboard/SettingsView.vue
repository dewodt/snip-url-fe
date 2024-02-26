<script setup lang="ts">
import SettingsForm from '@/components/forms/SettingsForm.vue'
import { useSession } from '@/components/layout/session/session'
import SettingsViewLoading from '@/components/loading/SettingsViewLoading.vue'
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

// Get session
const { isLoading } = useSession()
</script>

<template>
  <main className="w-full">
    <!-- Loading view -->
    <SettingsViewLoading v-if="isLoading" />

    <!-- Settings view -->
    <SettingsForm v-else />
  </main>
</template>
