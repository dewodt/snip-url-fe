<script setup lang="ts">
import MainLayout from './components/layout/main/MainLayout.vue'
import ThemeProvider from './components/layout/theme/ThemeProvider.vue'
import { RouterView } from 'vue-router'
</script>

<!-- Layout -->
<template>
  <ThemeProvider>
    <MainLayout>
      <RouterView />
    </MainLayout>
  </ThemeProvider>
</template>
