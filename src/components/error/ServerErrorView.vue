<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useHead } from '@unhead/vue'

// Add custom metatags for current page
useHead({
  title: 'Error 500 | Snip URL'
})

const handleReset = () => {
  window.location.reload()
}
</script>

<template>
  <main class="flex flex-auto items-center justify-center p-6 py-12 sm:p-12 lg:p-24">
    <section class="max-w-xl">
      <Card class="flex flex-col gap-2 p-8 shadow-lg lg:gap-5 lg:p-10">
        <CardHeader class="p-0">
          <h1
            class="text-center text-2xl font-bold leading-none tracking-tight lg:text-4xl lg:leading-none"
          >
            Error 500: Server Error
          </h1>
        </CardHeader>
        <CardContent class="flex flex-col items-center gap-5 p-0">
          <p class="text-center text-base lg:text-xl">
            Something went wrong while you&apos;re requesting this page. Please try again!
          </p>
          <Button size="lg" @click="handleReset"> Try again </Button>
        </CardContent>
      </Card>
    </section>
  </main>
</template>
