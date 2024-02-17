<script setup lang="ts">
import SettingsForm from '@/components/forms/SettingsForm.vue'
import SettingsLoading from '@/components/loading/SettingsLoading.vue'
import { useSession } from '@/hooks/session'
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
const session = useSession()
</script>

<template>
  <main className="w-full">
    <SettingsForm v-if="!session.isLoading.value" v-bind="session" />
    <SettingsLoading v-else />
  </main>
</template>
