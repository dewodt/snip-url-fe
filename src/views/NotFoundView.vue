<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router'

// Add custom metatags for current page
useHead({
  title: 'Error 404 | Snip URL',
  meta: [
    {
      name: 'og:title',
      content: 'Error 404 | Snip URL'
    },
    {
      name: 'twitter:title',
      content: 'Error 404 | Snip URL'
    }
  ]
})
</script>

<template>
  <main class="flex flex-auto items-center justify-center p-6 py-12 sm:p-12 lg:p-24">
    <section class="max-w-xl">
      <Card class="flex flex-col gap-2 p-8 shadow-lg lg:gap-5 lg:p-10">
        <CardHeader class="p-0">
          <h1
            class="text-center text-2xl font-bold leading-none tracking-tight lg:text-4xl lg:leading-none"
          >
            Error 404: Page Not Found
          </h1>
        </CardHeader>
        <CardContent class="flex flex-col items-center gap-5 p-0">
          <p class="text-center text-base lg:text-xl">
            The page you are looking for doesn&apos;t exists. Click the button bellow to go to the
            home page!
          </p>
          <RouterLink to="/">
            <Button :tabIndex="-1" size="lg"> Return Home </Button>
          </RouterLink>
        </CardContent>
      </Card>
    </section>
  </main>
</template>
