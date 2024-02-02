<script setup lang="ts">
import { ScnButton } from '@/components/ui/button'
import { CardContainer, CardContent, CardHeader } from '@/components/ui/card'
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router'

// Add custom metatags for current page
useHead({
  title: 'Authentication Error | Snip URL',
  meta: [
    {
      name: 'og:title',
      content: 'Authentication Error | Snip URL'
    },
    {
      name: 'twitter:title',
      content: 'Authentication Error | Snip URL'
    }
  ]
})
</script>

<template>
  <main class="flex flex-auto items-center justify-center p-6 py-12 sm:p-12 lg:p-24">
    <section class="max-w-xl">
      <CardContainer class="flex flex-col gap-2 p-8 shadow-lg lg:gap-5 lg:p-10">
        <CardHeader class="p-0">
          <h1
            class="text-center text-2xl font-bold leading-none tracking-tight lg:text-4xl lg:leading-none"
          >
            Authentication Error
          </h1>
        </CardHeader>
        <CardContent class="flex flex-col items-center gap-5 p-0">
          <p class="text-center text-base lg:text-xl">
            We ran into an issue while signing you in, please take a break and try again soon.
          </p>
          <RouterLink to="/auth/sign-in">
            <ScnButton size="lg">Try Again</ScnButton>
          </RouterLink>
        </CardContent>
      </CardContainer>
    </section>
  </main>
</template>
