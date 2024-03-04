<script setup lang="ts">
import { CardLinks } from '@/components/custom-cards'
import ServerErrorView from '@/components/error/ServerErrorView.vue'
import LinksViewLoading from '@/components/loading/LinksViewLoading.vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { queryClient } from '@/lib/query'
import { beURL } from '@/lib/url'
import { cn } from '@/lib/utils'
import router from '@/router'
import { type LinksResponse } from '@/types/api'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import { useHead } from '@unhead/vue'
import { format } from 'date-fns'
import { CalendarIcon, FilterX, LinkIcon } from 'lucide-vue-next'
import type { DatePickerRangeObject } from 'v-calendar/dist/types/src/use/datePicker.js'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// Add custom metatags for current page
useHead({
  title: 'Links | Snip URL'
})

// Route hook
const route = useRoute()

// Pagination state (get default state from query params if available)
const parsePage = Number(route.query.page)
const defaultPage = Number.isNaN(parsePage) ? 1 : parsePage
const currentPage = ref<number>(defaultPage)

// Date range state (get default state from query params if available)
const parseStart = Number(route.query.start)
const parseEnd = Number(route.query.end)
const defaultRange =
  Number.isNaN(parseStart) || Number.isNaN(parseEnd)
    ? undefined
    : {
        start: new Date(parseStart),
        end: new Date(parseEnd)
      }
const date = ref<DatePickerRangeObject | undefined>(defaultRange)

// Reset page when date start or end is changed
watch(date, (newDate) => {
  if (newDate && newDate.start && newDate.end) {
    // Calculate new start & end time
    const correction = Math.floor(new Date().getTimezoneOffset() / 60) * 3600 * 1000
    const startTime = new Date(newDate.start.toString()).getTime() + correction
    const endTime = new Date(newDate.end.toString()).getTime() + correction
    // Reset pagination
    currentPage.value = 1
    router.push({ query: { page: 1, start: startTime, end: endTime } })
  }
})

// Fetch data
const { isPending, data, isPlaceholderData, isError } = useQuery(
  {
    queryKey: ['link', currentPage, date],
    queryFn: async () => {
      let endpointUrl = `${beURL}/api/link?page=${currentPage.value}`
      if (date.value && date.value.start && date.value.end) {
        const correction = Math.floor(new Date().getTimezoneOffset() / 60) * 3600 * 1000
        const startTime = new Date(date.value.start.toString()).getTime() + correction
        const endTime = new Date(date.value.end.toString()).getTime() + correction
        endpointUrl += `&start=${startTime}&end=${endTime}`
      }

      const res = await fetch(endpointUrl, {
        method: 'GET',
        credentials: 'include'
      })

      if (!res.ok) {
        return null
      }

      const resJSON = (await res.json()) as {
        data: LinksResponse[]
        totalLinks: number
      }

      return resJSON
    },
    placeholderData: keepPreviousData
  },
  queryClient
)

// Previous pagination
const handlePrev = () => {
  currentPage.value = Math.max(currentPage.value - 1, 1)
  router.push({ query: { ...route.query, page: currentPage.value } })
}

// Handle first
const handleFirst = () => {
  currentPage.value = 1
  router.push({ query: { ...route.query, page: currentPage.value } })
}

// Next pagination
const handleNext = () => {
  if (!isPlaceholderData.value) {
    currentPage.value = currentPage.value + 1
    router.push({ query: { ...route.query, page: currentPage.value } })
  }
}

// Last pagination
const handleLast = () => {
  if (!isPlaceholderData.value) {
    if (data?.value?.totalLinks) {
      // Get the last page
      currentPage.value = Math.ceil(data.value.totalLinks / 6)
    } else {
      // Fallback to first page
      currentPage.value = 1
    }
    router.push({ query: { ...route.query, page: currentPage.value } })
  }
}

// Number
const handleArbitrary = (page: number) => {
  if (!isPlaceholderData.value) {
    currentPage.value = page
    router.push({ query: { ...route.query, page: currentPage.value } })
  }
}

// Reset date (and page)
const handleResetDate = () => {
  currentPage.value = 1
  date.value = undefined
  router.push({ query: { page: 1 } })
}
</script>

<template>
  <!-- Error -->
  <ServerErrorView v-if="isError" />

  <!-- Loading view -->
  <LinksViewLoading v-if="isPending" />

  <!-- Done view -->
  <main v-else className="w-full">
    <Card class="shadow-lg">
      <CardHeader>
        <div class="flex flex-row items-center gap-2">
          <LinkIcon class="h-6 w-6 stroke-primary" />
          <h2 class="text-2xl font-bold text-primary">Links</h2>
        </div>
      </CardHeader>
      <CardContent class="flex flex-col items-start gap-8">
        <!-- Filter date -->
        <div class="flex flex-row gap-2">
          <!-- Date trigger -->
          <Popover>
            <PopoverTrigger as-child>
              <Button
                id="date"
                :variant="'outline'"
                :class="
                  cn(
                    'h-10 w-full justify-start text-left font-normal sm:w-[260px]',
                    !date && 'text-muted-foreground'
                  )
                "
              >
                <CalendarIcon class="mr-2 h-4 w-4" />

                <span>
                  {{
                    date && date.start
                      ? date.end
                        ? `${format(date.start as Date, 'LLL dd, y')} - ${format(date.end as Date, 'LLL dd, y')}`
                        : format(date.start as Date, 'LLL dd, y')
                      : 'Pick a date'
                  }}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0" align="start">
              <Calendar v-model.range="date" :columns="1" />
            </PopoverContent>
          </Popover>

          <!-- Reset date -->
          <Button
            v-if="date && date.start && date.end"
            size="icon"
            variant="destructive"
            @click="handleResetDate"
            class="flex-none"
          >
            <FilterX class="size-5" />
          </Button>
        </div>

        <!-- Links -->
        <p v-if="!data?.data" class="self-center text-center text-muted-foreground">
          Data is not available
        </p>
        <ul v-else class="flex w-full flex-col gap-6">
          <li v-for="item in data?.data" :key="item.id">
            <CardLinks v-bind="item" />
          </li>
        </ul>

        <!-- Pagination -->
        <Pagination
          v-slot="{ page }"
          :default-page="1"
          :items-per-page="6"
          :page="currentPage"
          show-edges
          :sibling-count="2"
          :total="data?.totalLinks"
          class="self-center"
        >
          <PaginationList
            v-slot="{ items }"
            class="flex flex-wrap items-center justify-center gap-2"
          >
            <PaginationFirst @click="handleFirst" />
            <PaginationPrev @click="handlePrev" />

            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <Button
                  class="h-10 w-10 p-0"
                  :variant="item.value === page ? 'default' : 'outline'"
                  @click="handleArbitrary(item.value)"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext @click="handleNext" />
            <PaginationLast @click="handleLast" />
          </PaginationList>
        </Pagination>
      </CardContent>
    </Card>
  </main>
</template>
