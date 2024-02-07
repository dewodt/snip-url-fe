<script setup lang="ts">
import type { CustomCardLocationStatsProps } from '.'
import { Progress } from '../progress'
import { CardContainer, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<CustomCardLocationStatsProps>(), { class: '' })
</script>
<template>
  <CardContainer :class="cn('shadow-lg', props.class)">
    <CardHeader class="px-6 pb-2 pt-6">
      <h3 class="text-base font-semibold text-primary">Locations</h3>
    </CardHeader>
    <CardContent>
      <ScrollArea class="w-full">
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
            <tr v-for="(item, index) in props.data" :key="item.id">
              <td class="py-2 pr-2">{{ index + 1 }}</td>
              <td class="px-2 py-2">{{ item.country }}</td>
              <td class="hidden px-2 py-2 sm:block">
                <Progress class="w-64" :model-value="item.percentage" />
              </td>
              <td class="px-2 py-2 text-center">{{ item.engagements }}</td>
              <td class="py-2 pl-2">{{ item.percentage }}</td>
            </tr>
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </CardContent>
  </CardContainer>
</template>
