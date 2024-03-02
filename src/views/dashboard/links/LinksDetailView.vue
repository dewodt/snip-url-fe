<script setup lang="ts">
import DevicesChart from '@/components/charts/DevicesChart.vue'
import Last4WeeksChart from '@/components/charts/Last4WeeksChart.vue'
import ReferrersChart from '@/components/charts/ReferrersChart.vue'
import { CardAnalytics, CardLinksDetail, CardCountry } from '@/components/custom-cards'
import ServerErrorView from '@/components/error/ServerErrorView.vue'
import LinksDetailViewLoading from '@/components/loading/LinksDetailViewLoading.vue'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { queryClient } from '@/lib/query'
import { beURL } from '@/lib/url'
import type { LinkDetailResponse } from '@/types/api'
import { useQuery } from '@tanstack/vue-query'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

// Add custom metatags for current page
useHead({
  title: `Links ID ${id} | Snip URL`,
  meta: [
    {
      name: 'og:title',
      content: `Links ID ${id} | Snip URL`
    },
    {
      name: 'twitter:title',
      content: `Links ID ${id} | Snip URL`
    }
  ]
})

// Fetch data
const { data, isPending, isError } = useQuery(
  {
    queryKey: ['link', id],
    queryFn: async () => {
      const res = await fetch(`${beURL}/api/link/${id}`, {
        method: 'GET',
        credentials: 'include'
      })

      if (!res.ok) {
        return null
      }

      const resJSON = await res.json()
      return resJSON.data as LinkDetailResponse
    }
  },
  queryClient
)
</script>

<template>
  <!-- Error -->
  <ServerErrorView v-if="isError" />

  <!-- Loading View -->
  <LinksDetailViewLoading v-if="isPending" />

  <!-- Done View -->
  <main v-else class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
    <!-- Current Link Card -->
    <CardLinksDetail class="sm:col-span-full" v-bind="data as LinkDetailResponse" />

    <!-- Total Engagement -->
    <CardAnalytics>
      <template v-slot:card-header>
        <h3 class="text-base font-semibold text-primary">Total Engagement</h3>
      </template>
      <template v-slot:card-content>
        <p class="text-xl font-bold">{{ data?.totalRequests }}</p>
      </template>
    </CardAnalytics>

    <!-- Last 7 Days Engagement -->
    <CardAnalytics>
      <template v-slot:card-header>
        <h3 class="text-base font-semibold text-primary">Last 7 Days</h3>
      </template>
      <template v-slot:card-content>
        <p class="text-xl font-bold">{{ data?.lastWeekTotalRequests }}</p>
      </template>
    </CardAnalytics>

    <!-- Engagement last 4 weeks (1 Month) -->
    <CardAnalytics class="sm:col-span-full">
      <template v-slot:card-header>
        <h3 class="text-base font-semibold text-primary">Last 4 Weeks</h3>
      </template>
      <template v-slot:card-content>
        <ScrollArea class="w-full">
          <Last4WeeksChart v-if="data && data.last4Weeks" :data="data.last4Weeks" />
          <p v-else class="text-base text-muted-foreground">Data is not available</p>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </template>
    </CardAnalytics>

    <!-- Location -->
    <CardCountry class="col-span-full" :data="data?.countries" />

    <!-- Referrers -->
    <CardAnalytics>
      <template v-slot:card-header>
        <h3 class="text-base font-semibold text-primary">Referrers</h3>
      </template>
      <template v-slot:card-content>
        <div v-if="data && data.referrers && data.referrers.length">
          <ReferrersChart :data="data.referrers" />
        </div>
        <p v-else class="text-base text-muted-foreground">Data is not available</p>
      </template>
    </CardAnalytics>

    <!-- Devices -->
    <CardAnalytics>
      <template v-slot:card-header>
        <h3 class="text-base font-semibold text-primary">Devices</h3>
      </template>
      <template v-slot:card-content>
        <DevicesChart v-if="data && data.devices && data.referrers.length" :data="data.devices" />
        <p v-else class="text-base text-muted-foreground">Data is not available</p>
      </template>
    </CardAnalytics>
  </main>
</template>
