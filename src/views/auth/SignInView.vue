<script setup lang="ts">
import SignInForm from '@/components/forms/SignInForm.vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useHead } from '@unhead/vue'

// Add custom metatags for current page
useHead({
  title: 'Sign In | Snip URL',
  meta: [
    {
      name: 'og:title',
      content: 'Sign In | Snip URL'
    },
    {
      name: 'twitter:title',
      content: 'Sign In | Snip URL'
    }
  ]
})
</script>

<template>
  <main class="flex flex-auto items-center justify-center p-6 py-12 sm:p-12 lg:p-24">
    <Card class="w-full max-w-sm shadow-lg">
      <!-- Title -->
      <CardHeader>
        <h1 class="text-center text-3xl font-bold text-primary">Sign In</h1>
      </CardHeader>

      <!-- Sign in Form & with Google Option -->
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  </main>
</template>
