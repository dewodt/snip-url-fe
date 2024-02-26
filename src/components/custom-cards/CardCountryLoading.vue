<script setup lang="ts">
import { Skeleton } from '../ui/skeleton'
import { CardContainer, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CardLocationProps {
  class: string
}

const props = withDefaults(defineProps<CardLocationProps>(), { class: '' })
</script>
<template>
  <CardContainer :class="cn('shadow-lg', props.class)">
    <CardHeader class="px-6 pb-2 pt-6">
      <h3 class="text-base font-semibold text-primary">Locations</h3>
    </CardHeader>
    <CardContent>
      <table class="w-full table-auto">
        <thead class="text-left">
          <tr>
            <th class="py-2 pr-2 font-semibold">Rank</th>
            <th class="px-2 py-2 font-semibold">Country</th>
            <th class="hidden px-2 py-2 font-semibold sm:block"></th>
            <th class="px-2 py-2 text-center font-semibold">Engagements</th>
            <th class="py-2 pl-2 font-semibold">%</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 6" :key="i">
            <td class="py-2 pr-2"><Skeleton class="h-6 w-8" /></td>
            <td class="px-2 py-2"><Skeleton class="h-6 w-12" /></td>
            <td class="hidden px-2 py-2 sm:block"><Skeleton class="h-4 w-64 rounded-full" /></td>
            <td class="px-2 py-2"><Skeleton class="mx-auto h-6 w-8" /></td>
            <td class="py-2 pl-2"><Skeleton class="h-6 w-8" /></td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </CardContainer>
</template>
