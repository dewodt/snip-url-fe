<script setup lang="ts">
import CustomCardLinksLoading from '@/components/loading/CustomCardLinksLoading.vue'
import { CardContainer, CardContent, CardHeader, CustomCardLinks } from '@/components/ui/card'
import { type LinksResponse } from '@/types/api'
import { QueryClient, useQuery } from '@tanstack/vue-query'
import { useHead } from '@unhead/vue'
import { LinkIcon } from 'lucide-vue-next'

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

// Backend URL
const beURL = import.meta.env.VITE_BE_URL

// Initialize query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
})

// Fetch data
const { data, isLoading } = useQuery(
  {
    queryKey: ['session'],
    queryFn: async () => {
      const res = await fetch(`${beURL}/api/link`, {
        method: 'GET',
        credentials: 'include'
      })

      if (!res.ok) {
        return null
      }

      const resJSON = (await res.json()) as LinksResponse[]
      return resJSON
    }
  },
  queryClient
)
</script>

<template>
  <main className="w-full">
    <CardContainer class="shadow-lg">
      <CardHeader>
        <div class="flex flex-row items-center gap-2">
          <LinkIcon class="h-6 w-6 stroke-primary" />
          <h2 class="text-2xl font-bold text-primary">Links</h2>
        </div>
      </CardHeader>
      <CardContent>
        <!-- Links -->
        <ul v-if="!isLoading" class="flex flex-col gap-6">
          <li v-for="item in data" :key="item.id">
            <CustomCardLinks v-bind="item" />
          </li>
        </ul>

        <!-- Loading -->
        <ul v-else class="flex flex-col gap-6">
          <li v-for="i in 5" :key="i">
            <CustomCardLinksLoading />
          </li>
        </ul>
      </CardContent>
    </CardContainer>
  </main>
</template>
