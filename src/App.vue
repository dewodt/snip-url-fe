<script setup lang="ts">
import SessionProvider from './components/layout/session/SessionProvider.vue'
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout.vue'
import MainLayout from '@/components/layout/main/MainLayout.vue'
import ThemeProvider from '@/components/layout/theme/ThemeProvider.vue'
import { RouterView, useRoute } from 'vue-router'

// Route
const route = useRoute()
</script>

<!-- Layout -->
<template>
  <SessionProvider>
    <ThemeProvider>
      <MainLayout>
        <!-- /dashboard/foo Layout -->
        <template v-if="route.meta.layout == 'dashboard'">
          <DashboardLayout>
            <RouterView />
          </DashboardLayout>
        </template>

        <!-- default layout -->
        <template v-else>
          <RouterView />
        </template>
      </MainLayout>
    </ThemeProvider>
  </SessionProvider>
</template>
