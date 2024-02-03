<script setup lang="ts">
import CreateNewForm from '@/components/forms/CreateNewForm.vue'
import { useHead } from '@unhead/vue'

// Add custom metatags for current page
useHead({
  title: 'Create New | Snip URL',
  meta: [
    {
      name: 'og:title',
      content: 'Create New | Snip URL'
    },
    {
      name: 'twitter:title',
      content: 'Create New | Snip URL'
    }
  ]
})
</script>

<template>
  <main className="w-full">
    <CreateNewForm />
  </main>
</template>
