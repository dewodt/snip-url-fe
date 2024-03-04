<script setup lang="ts">
import SettingsForm from '@/components/forms/SettingsForm.vue'
import { useSession } from '@/components/layout/session/session'
import SettingsViewLoading from '@/components/loading/SettingsViewLoading.vue'
import { useHead } from '@unhead/vue'

// Add custom metatags for current page
useHead({
  title: 'Settings | Snip URL'
})

// Get session
const { isPending } = useSession()
</script>

<template>
  <main class="w-full">
    <!-- Loading view -->
    <SettingsViewLoading v-if="isPending" />

    <!-- Settings view -->
    <SettingsForm v-else />
  </main>
</template>
