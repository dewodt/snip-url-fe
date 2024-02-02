<script setup lang="ts">
import SideBar from './SideBar.vue'
</script>

<template>
  <div class="flex flex-auto justify-center p-6 py-12 sm:p-12">
    <div class="flex w-full max-w-5xl flex-col gap-6 md:flex-row">
      <SideBar />

      <slot>
        <!-- Main content -->
      </slot>
    </div>
  </div>
</template>
