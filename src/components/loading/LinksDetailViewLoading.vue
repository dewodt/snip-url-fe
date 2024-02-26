<script setup lang="ts">
import { CardAnalytics, CardCountryLoading, CardLinksDetailLoading } from '../custom-cards'
import { Skeleton } from '../ui/skeleton'
</script>

<template>
  <main class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
    <!-- Current Link Card -->
    <CardLinksDetailLoading class="h-fit sm:col-span-full" />

    <!-- Total Engagement -->
    <CardAnalytics>
      <template v-slot:card-header>
        <h3 class="text-base font-semibold text-primary">Total Engagement</h3>
      </template>
      <template v-slot:card-content>
        <Skeleton class="h-7 w-14" />
      </template>
    </CardAnalytics>

    <!-- Last 7 Days Engagement -->
    <CardAnalytics>
      <template v-slot:card-header>
        <h3 class="text-base font-semibold text-primary">Last 7 Days</h3>
      </template>
      <template v-slot:card-content>
        <Skeleton class="h-7 w-14" />
      </template>
    </CardAnalytics>

    <!-- Engagement last 4 weeks (1 Month) -->
    <CardAnalytics class="sm:col-span-full">
      <template v-slot:card-header>
        <h3 class="text-base font-semibold text-primary">Last 4 Weeks</h3>
      </template>
      <template v-slot:card-content>
        <Skeleton class="h-[300px] w-full" />
      </template>
    </CardAnalytics>

    <!-- Location -->
    <CardCountryLoading class="col-span-full" />

    <!-- Referrers -->
    <CardAnalytics>
      <template v-slot:card-header>
        <h3 class="text-base font-semibold text-primary">Referrers</h3>
      </template>
      <template v-slot:card-content>
        <Skeleton class="h-[297px] w-full" />
      </template>
    </CardAnalytics>

    <!-- Devices -->
    <CardAnalytics>
      <template v-slot:card-header>
        <h3 class="text-base font-semibold text-primary">Devices</h3>
      </template>
      <template v-slot:card-content>
        <Skeleton class="h-[297px] w-full" />
      </template>
    </CardAnalytics>
  </main>
</template>
