<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router'

// Add custom metatags for current page
useHead({
  title: 'About | Snip URL',
  meta: [
    {
      name: 'og:title',
      content: 'About | Snip URL'
    },
    {
      name: 'twitter:title',
      content: 'About | Snip URL'
    }
  ]
})
</script>

<template>
  <main
    class="flex flex-auto flex-col items-center justify-center gap-10 p-6 py-12 sm:p-12 lg:gap-16 lg:p-24"
  >
    <section class="max-w-2xl">
      <Card class="flex flex-col gap-2 p-8 shadow-lg lg:gap-5 lg:p-10">
        <CardHeader class="p-0">
          <h1
            data-cy="contact-title"
            class="text-center text-2xl font-bold leading-none tracking-tight lg:text-4xl lg:leading-none"
          >
            Contact
          </h1>
        </CardHeader>
        <CardContent class="p-0">
          <p data-cy="contact-description" class="text-justify text-base lg:text-xl">
            This app is open source
            <RouterLink to="https://github.com/dewodt/snip-url-fe" target="_blank">
              <Button variant="link" class="h-fit p-0 text-base lg:text-xl">front end</Button>
            </RouterLink>
            and
            <RouterLink to="https://github.com/dewodt/snip-url-be" target="_blank">
              <Button variant="link" class="h-fit p-0 text-base lg:text-xl"> back end. </Button>
            </RouterLink>
            If you have any feedback, suggestion, inquiries, or anything you want to tell me, please
            feel free to contact me at
            <RouterLink to="mailto:dewantorotriatmojo@gmail.com" target="_blank">
              <Button variant="link" class="h-fit p-0 text-base lg:text-xl"> this email. </Button>
            </RouterLink>
          </p>
        </CardContent>
      </Card>
    </section>
  </main>
</template>
