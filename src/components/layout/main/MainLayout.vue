<script setup lang="ts">
import FooterBar from '../../ui/footer/FooterBar.vue'
import NavBar from '../../ui/navbar/NavBar.vue'
import { useNavBar } from '../../ui/navbar/navbar'
import { cn } from '@/lib/utils'

const { isNavBarExpanded, toggleNavBarExpanded } = useNavBar()
</script>

<template>
  <div
    :class="cn('flex min-h-screen flex-col bg-background', isNavBarExpanded && 'overflow-hidden')"
  >
    <!-- NavBar (Header) -->
    <NavBar
      :is-nav-bar-expanded="isNavBarExpanded"
      @toggle-nav-bar-expanded="toggleNavBarExpanded"
    />

    <!-- Content -->
    <slot></slot>

    <!-- Footer -->
    <FooterBar />
  </div>
</template>
