<script setup lang="ts">
import Skeleton from '../ui/skeleton/Skeleton.vue'
import ScnSeparator from '@/components/ui/separator/ScnSeparator.vue'
import { cn } from '@/lib/utils'

// Props
const props = withDefaults(defineProps<{ class: string }>(), {
  class: ''
})
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col gap-4 rounded-lg border bg-card p-4 lg:flex-row lg:justify-between lg:p-5',
        props.class
      )
    "
  >
    <div class="flex flex-row gap-3">
      <!-- Icon -->
      <div class="hidden sm:block">
        <Skeleton class="size-12 rounded-full" />
      </div>

      <!-- Texts -->
      <div class="flex flex-col gap-3">
        <!-- Title, Urls -->
        <div class="flex flex-col gap-3">
          <!-- Title -->
          <Skeleton class="h-7 w-36" />

          <!-- Shortened url -->
          <div class="flex gap-2">
            <Skeleton class="h-6 w-52" />
          </div>

          <!-- Destination URL -->
          <Skeleton class="h-6 w-52" />
        </div>

        <!-- Stats, Date -->
        <div class="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <div class="flex gap-1">
            <Skeleton class="h-5 w-32" />
          </div>
          <div class="flex gap-1">
            <Skeleton class="h-5 w-36" />
          </div>
        </div>
      </div>
    </div>

    <!-- Separator -->
    <ScnSeparator class="lg:hidden" />

    <!-- Actions -->
    <div class="flex flex-row gap-3 sm:justify-end">
      <!-- Copy -->
      <Skeleton class="h-10 w-24 rounded-md" />

      <!-- Edit -->
      <Skeleton class="h-10 w-10 rounded-md" />

      <!-- More -->
      <Skeleton class="h-10 w-10 rounded-md" />
    </div>
  </div>
</template>
