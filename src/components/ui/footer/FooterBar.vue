<script setup lang="ts">
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>

<template>
  <footer
    className="flex flex-col items-center gap-4 border-t-2 border-t-border bg-background px-8 py-7 font-inter text-base sm:flex-row-reverse sm:justify-between lg:px-16 xl:text-lg"
  >
    <div className="flex flex-row gap-8 sm:gap-12">
      <!-- About -->
      <RouterLink
        data-cy="footer-about"
        to="/about"
        className="font-medium text-muted-foreground xl:hover:text-foreground"
      >
        About
      </RouterLink>

      <!-- Privacy policy -->
      <RouterLink
        data-cy="footer-privacy-policy"
        to="/privacy-policy"
        className="font-medium text-muted-foreground xl:hover:text-foreground"
      >
        Privacy Policy
      </RouterLink>
    </div>

    <!-- Copyright -->
    <p data-cy="footer-copyright" className="text-center font-medium text-muted-foreground">
      Copyright © {{ year }} Snip URL
    </p>
  </footer>
</template>
