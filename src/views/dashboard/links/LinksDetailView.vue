<script setup lang="ts">
import type { DateChartData, StringChartData } from '@/components/charts'
import DevicesChart from '@/components/charts/DevicesChart.vue'
import Last4WeeksChart from '@/components/charts/Last4WeeksChart.vue'
import ReferrersChart from '@/components/charts/ReferrersChart.vue'
import { CardContainer, CardContent, CardHeader, type LocationStats } from '@/components/ui/card'
import CustomCardLinksDetail from '@/components/ui/card/CustomCardLinksDetail.vue'
import CustomCardLocationStats from '@/components/ui/card/CustomCardLocationStats.vue'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
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
const mockLinkData = {
  id: '1',
  title: 'This is title 1',
  customPath: [
    'url1',
    'url11',
    'url12',
    'url13',
    'url14',
    'url15',
    'url16',
    'url17',
    'url18',
    'url19'
  ],
  destinationUrl: 'https://www.google.com',
  engagements: 100,
  createdAt: new Date(2021, 10, 10)
}

const mockLast4Weeks: DateChartData = [
  {
    date: new Date(2021, 10, 1),
    count: 100
  },
  {
    date: new Date(2021, 10, 2),
    count: 200
  },
  {
    date: new Date(2021, 10, 3),
    count: 300
  },
  {
    date: new Date(2021, 10, 4),
    count: 400
  },
  {
    date: new Date(2021, 10, 5),
    count: 350
  },
  {
    date: new Date(2021, 10, 6),
    count: 375
  },
  {
    date: new Date(2021, 10, 7),
    count: 400
  },
  {
    date: new Date(2021, 10, 8),
    count: 275
  },
  {
    date: new Date(2021, 10, 9),
    count: 150
  },
  {
    date: new Date(2021, 10, 10),
    count: 250
  },
  {
    date: new Date(2021, 10, 11),
    count: 100
  },
  {
    date: new Date(2021, 10, 12),
    count: 200
  },
  {
    date: new Date(2021, 10, 13),
    count: 300
  },
  {
    date: new Date(2021, 10, 14),
    count: 400
  },
  {
    date: new Date(2021, 10, 15),
    count: 350
  },
  {
    date: new Date(2021, 10, 16),
    count: 375
  },
  {
    date: new Date(2021, 10, 17),
    count: 400
  },
  {
    date: new Date(2021, 10, 18),
    count: 275
  },
  {
    date: new Date(2021, 10, 19),
    count: 150
  },
  {
    date: new Date(2021, 10, 20),
    count: 250
  },
  {
    date: new Date(2021, 10, 21),
    count: 100
  },
  {
    date: new Date(2021, 10, 22),
    count: 200
  },
  {
    date: new Date(2021, 10, 23),
    count: 300
  },
  {
    date: new Date(2021, 10, 24),
    count: 400
  },
  {
    date: new Date(2021, 10, 25),
    count: 350
  },
  {
    date: new Date(2021, 10, 26),
    count: 375
  },
  {
    date: new Date(2021, 10, 27),
    count: 400
  },
  {
    date: new Date(2021, 10, 28),
    count: 275
  },
  {
    date: new Date(2021, 10, 29),
    count: 150
  },
  {
    date: new Date(2021, 10, 30),
    count: 250
  },
  {
    date: new Date(2021, 10, 31),
    count: 100
  }
]

const mockReferrerData: StringChartData = [
  {
    label: 'google.com',
    count: 100
  },
  {
    label: 'facebook.com',
    count: 200
  },
  {
    label: 'twitter.com',
    count: 300
  },
  {
    label: 'instagram.com',
    count: 400
  },
  {
    label: 'linkedIn.com',
    count: 350
  },
  {
    label: 'direct',
    count: 375
  },
  {
    label: 'other',
    count: 400
  }
]

const mockDevices: StringChartData = [
  {
    label: 'Desktop',
    count: 100
  },
  {
    label: 'Mobile',
    count: 200
  },
  {
    label: 'Tablet',
    count: 300
  },
  {
    label: 'Other',
    count: 400
  }
]
const mockLocation: LocationStats[] = [
  {
    id: 'ID',
    country: 'Indonesia',
    engagements: 100,
    percentage: 25.3
  },
  {
    id: 'ID',
    country: 'United States',
    engagements: 200,
    percentage: 50.2
  },
  {
    id: 'ID',
    country: 'India',
    engagements: 300,
    percentage: 35.1
  },
  {
    id: 'ID',
    country: 'China',
    engagements: 400,
    percentage: 25.3
  },
  {
    id: '-',
    country: 'Other',
    engagements: 350,
    percentage: 17.5
  }
]
</script>

<template>
  <main class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
    <!-- Current Link Card -->
    <CustomCardLinksDetail class="sm:col-span-full" v-bind="mockLinkData" />

    <!-- Total Engagement -->
    <CardContainer class="shadow-lg">
      <CardHeader class="px-6 pb-2 pt-6">
        <h3 class="text-base font-semibold text-primary">Total Engagement</h3>
      </CardHeader>
      <CardContent>
        <p class="text-xl font-bold">420</p>
      </CardContent>
    </CardContainer>

    <!-- Last 7 Days Engagement -->
    <CardContainer class="shadow-lg">
      <CardHeader class="px-6 pb-2 pt-6">
        <h3 class="text-base font-semibold text-primary">Last 7 Days</h3>
      </CardHeader>
      <CardContent>
        <p class="text-xl font-bold">69</p>
      </CardContent>
    </CardContainer>

    <!-- Engagement last 4 weeks (1 Month) -->
    <CardContainer class="shadow-lg sm:col-span-full">
      <CardHeader class="p-6">
        <h3 class="text-base font-semibold text-primary">Last 4 Weeks</h3>
      </CardHeader>
      <CardContent>
        <ScrollArea class="w-full">
          <Last4WeeksChart :data="mockLast4Weeks" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </CardContainer>

    <!-- Location -->
    <CustomCardLocationStats class="col-span-full" :data="mockLocation" />

    <!-- Referrers -->
    <CardContainer class="shadow-lg">
      <CardHeader class="p-6">
        <h3 class="text-base font-semibold text-primary">Referrers</h3>
      </CardHeader>
      <CardContent>
        <ReferrersChart :data="mockReferrerData" />
      </CardContent>
    </CardContainer>

    <!-- Devices -->
    <CardContainer class="shadow-lg">
      <CardHeader class="p-6">
        <h3 class="text-base font-semibold text-primary">Devices</h3>
      </CardHeader>
      <CardContent>
        <DevicesChart :data="mockDevices" />
      </CardContent>
    </CardContainer>
  </main>
</template>
