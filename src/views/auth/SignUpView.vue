<script setup lang="ts">
import SignUpForm from '@/components/forms/SignUpForm.vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useHead } from '@unhead/vue'

// Add custom metatags for current page
useHead({
  title: 'Sign Up | Snip URL',
  meta: [
    {
      name: 'og:title',
      content: 'Sign Up | Snip URL'
    },
    {
      name: 'twitter:title',
      content: 'Sign Up | Snip URL'
    }
  ]
})
</script>

<template>
  <main class="flex flex-auto items-center justify-center p-6 py-12 sm:p-12 lg:p-24">
    <Card class="w-full max-w-sm shadow-lg">
      <!-- Title -->
      <CardHeader>
        <h1 class="text-center text-3xl font-bold text-primary">Sign Up</h1>
      </CardHeader>

      <!-- Sign up Form & with Google Option -->
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  </main>
</template>
