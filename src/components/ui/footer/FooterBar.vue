<script setup lang="ts">
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="flex flex-col items-center gap-4 border-t-2 border-t-border bg-background px-8 py-7 font-inter text-base sm:flex-row-reverse sm:justify-between lg:px-16 xl:text-lg"
  >
    <div class="flex flex-row gap-8 sm:gap-12">
      <!-- About -->
      <RouterLink to="/about" class="font-medium text-muted-foreground xl:hover:text-foreground">
        About
      </RouterLink>

      <!-- Privacy policy -->
      <RouterLink
        to="/privacy-policy"
        class="font-medium text-muted-foreground xl:hover:text-foreground"
      >
        Privacy Policy
      </RouterLink>
    </div>

    <!-- Copyright -->
    <p class="text-center font-medium text-muted-foreground">Copyright © {{ year }} Snip URL</p>
  </footer>
</template>
