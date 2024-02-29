<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { LinkDetailResponse } from '@/types/api'

interface CardLocationProps {
  class: string
  data: LinkDetailResponse['countries'] | undefined
}

const props = withDefaults(defineProps<CardLocationProps>(), { class: '' })
</script>
<template>
  <Card :class="cn('shadow-lg', props.class)">
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
            <!-- Data is empty -->
            <tr v-if="!props.data">
              <td colspan="5">
                <p class="text-center text-muted-foreground">Data is not available</p>
              </td>
            </tr>

            <!-- Data is not empty -->
            <tr v-else v-for="(item, index) in props.data" :key="index">
              <td class="py-2 pr-2">{{ index + 1 }}</td>
              <td class="px-2 py-2">{{ item.country }}</td>
              <td class="hidden px-2 py-2 sm:block">
                <Progress class="w-64" :model-value="item.percentage" />
              </td>
              <td class="px-2 py-2 text-center">{{ item.count }}</td>
              <td class="py-2 pl-2">{{ item.percentage.toFixed(1) }}</td>
            </tr>
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </CardContent>
  </Card>
</template>
