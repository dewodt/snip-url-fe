<script setup lang="ts">
import { CardLinks } from '@/components/custom-cards'
import LinksViewLoading from '@/components/loading/LinksViewLoading.vue'
import { Button } from '@/components/ui/button'
// import { Calendar, type DateRange } from '@/components/ui/calendar'
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
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { queryClient } from '@/lib/query'
import { beURL } from '@/lib/url'
import router from '@/router'
// import { cn } from '@/lib/utils'
import { type LinksResponse } from '@/types/api'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import { useHead } from '@unhead/vue'
// import { format } from 'date-fns'
import { LinkIcon } from 'lucide-vue-next'
// import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// import { computed, ref, watch } from 'vue'

// Add custom metatags for current page
useHead({
  title: 'Links | Snip URL',
  meta: [
    {
      name: 'og:title',
      content: 'Links | Snip URL'
    },
    {
      name: 'twitter:title',
      content: 'Links | Snip URL'
    }
  ]
})

// Route hook
const route = useRoute()

// Pagination state (get default state from query params)
const parsePage = Number(route.query.page)
const defaultPage = Number.isNaN(parsePage) ? 1 : parsePage
const currentPage = ref<number>(defaultPage)
// const resetPage = () => {
//   currentPage.value = 1
// }

// // Date range state
// const date = ref<DateRange>({ start: null, end: null })

// // Reset page to 1 if date range changes
// watch([date], () => {
//   resetPage()
// })

// // Date range string
// const startDateStr = computed(() => {
//   return date.value.start ? format(date.value.start, 'yyyy-MM-dd') : ''
// })
// const endDateStr = computed(() => {
//   return date.value.end ? format(date.value.end, 'yyyy-MM-dd') : ''
// })

// Fetch data
const { isPending, data, isPlaceholderData } = useQuery(
  {
    queryKey: ['link', currentPage],
    queryFn: async () => {
      let endpointUrl = `${beURL}/api/link?page=${currentPage.value}`
      // if (startDateStr.value && endDateStr.value) {
      //   endpointUrl += `&start=${startDateStr.value}&end=${endDateStr.value}`
      // }

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
  router.push({ query: { page: currentPage.value } })
}

// Handle first
const handleFirst = () => {
  currentPage.value = 1
  router.push({ query: { page: currentPage.value } })
}

// Next pagination
const handleNext = () => {
  if (!isPlaceholderData.value) {
    currentPage.value = currentPage.value + 1
    router.push({ query: { page: currentPage.value } })
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
    router.push({ query: { page: currentPage.value } })
  }
}

// Number
const handleArbitrary = (page: number) => {
  if (!isPlaceholderData.value) {
    currentPage.value = page
    router.push({ query: { page: currentPage.value } })
  }
}
</script>

<template>
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
        <!-- <div class="grid gap-2">
          <Popover>
            <PopoverTrigger as-child>
              <Button
                id="date"
                :variant="'outline'"
                :class="
                  cn(
                    'w-full justify-start text-left font-normal sm:w-[260px]',
                    !date && 'text-muted-foreground'
                  )
                "
              >
                <CalendarIcon class="mr-2 h-4 w-4" />

                <span>
                  {{
                    date.start
                      ? date.end
                        ? `${format(date.start, 'LLL dd, y')} - ${format(date.end, 'LLL dd, y')}`
                        : format(date.start, 'LLL dd, y')
                      : 'Pick a date'
                  }}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0" align="start">
              @vue-ignore
              <Calendar v-model.range="date" :columns="2" />
            </PopoverContent>
          </Popover>
        </div> -->

        <!-- Links -->
        <p v-if="!data?.data" class="self-center text-center text-muted-foreground">
          Data is not available
        </p>

        <template v-else>
          <ul class="flex w-full flex-col gap-6">
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
              class="flex flex-wrap items-center justify-center gap-1"
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
        </template>
      </CardContent>
    </Card>
  </main>
</template>
