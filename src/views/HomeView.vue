<script setup lang="ts">
import { ScnButton } from '@/components/ui/button'
import { useHead } from '@unhead/vue'
import { ArrowRightCircle } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

// Add custom metatags for current page
useHead({
  title: 'Snip URL',
  meta: [
    {
      name: 'og:title',
      content: 'Snip URL'
    },
    {
      name: 'twitter:title',
      content: 'Snip URL'
    }
  ]
})
</script>

<template>
  <main class="flex flex-auto flex-col">
    <!-- Hero Section -->
    <section
      class="flex min-h-[calc(100vh-90px)] w-full items-center justify-center px-6 py-16 sm:p-12 lg:p-24"
    >
      <div class="flex max-w-7xl flex-col-reverse items-center gap-6 sm:flex-row lg:gap-16">
        <!-- Hero Texts -->
        <div class="flex flex-col items-start gap-3 lg:gap-6">
          <h1 data-cy="hero-title" class="text-4xl font-bold lg:text-6xl">Shorten URL Easily.</h1>
          <p
            data-cy="hero-description"
            class="text-base font-normal text-muted-foreground lg:text-xl"
          >
            With Snip URL we help you shortern your URL easily and quickly so it is easier to share
            and remember.
          </p>
          <RouterLink to="/dashboard/create-new" data-cy="hero-link">
            <ScnButton size="lg">
              Try Now
              <ArrowRightCircle class="ml-2 h-5 w-5" />
            </ScnButton>
          </RouterLink>
        </div>

        <!-- Hero Image -->
        <img
          src="/logo-cropped.png"
          alt="Snip URL Logo"
          data-cy="hero-image"
          class="w-[250px] lg:w-[420px]"
        />
      </div>
    </section>
  </main>
</template>
