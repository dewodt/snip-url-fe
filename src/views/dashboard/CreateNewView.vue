<script setup lang="ts">
import CreateNewForm from '@/components/forms/CreateNewForm.vue'
import { useHead } from '@unhead/vue'

// Add custom metatags for current page
useHead({
  title: 'Create New | Snip URL'
})
</script>

<template>
  <main class="w-full">
    <CreateNewForm />
  </main>
</template>
