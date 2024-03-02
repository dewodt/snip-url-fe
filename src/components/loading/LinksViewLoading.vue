<script setup lang="ts">
import { CardLinksLoading } from '../custom-cards'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { LinkIcon } from 'lucide-vue-next'
</script>

<template>
  <main className="w-full">
    <Card class="shadow-lg">
      <CardHeader>
        <div class="flex flex-row items-center gap-2">
          <LinkIcon class="h-6 w-6 stroke-primary" />
          <h2 class="text-2xl font-bold text-primary">Links</h2>
        </div>
      </CardHeader>
      <CardContent class="flex flex-col items-start gap-8">
        <!-- Filter Date -->
        <Skeleton class="h-10 w-full rounded-md sm:w-[260px]" />

        <!-- Loading -->
        <ul class="flex w-full flex-col gap-6">
          <li v-for="i in 6" :key="i">
            <CardLinksLoading />
          </li>
        </ul>

        <!-- Pagination -->
        <div class="flex flex-wrap items-center justify-center gap-2 self-center">
          <Skeleton class="size-10 rounded-md" />
          <Skeleton class="size-10 rounded-md" />
          <Skeleton class="size-10 rounded-md" />
          <Skeleton class="size-10 rounded-md" />
          <Skeleton class="size-10 rounded-md" />
          <Skeleton class="size-10 rounded-md" />
        </div>
      </CardContent>
    </Card>
  </main>
</template>
