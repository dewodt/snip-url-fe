<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useHead } from '@unhead/vue'

// Add custom metatags for current page
useHead({
  title: 'Verify Request | Snip URL'
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
            Verify Request
          </h1>
        </CardHeader>
        <CardContent class="p-0">
          <p class="text-justify text-base lg:text-xl">
            To complete the verification process, please check your email inbox for a verification
            link from us. If you don&apos;t see the email in your inbox, please also check your spam
            folder.
          </p>
        </CardContent>
      </Card>
    </section>
  </main>
</template>
