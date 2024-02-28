<script setup lang="ts">
import { CardLinks } from '@/components/custom-cards'
import LinksViewLoading from '@/components/loading/LinksViewLoading.vue'
import { CardContainer, CardContent, CardHeader } from '@/components/ui/card'
import { queryClient } from '@/lib/query'
import { beURL } from '@/lib/url'
import { type LinksResponse } from '@/types/api'
import { useQuery } from '@tanstack/vue-query'
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

// Fetch data
const { data, isLoading } = useQuery(
  {
    queryKey: ['link'],
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
  <!-- Loading view -->
  <LinksViewLoading v-if="isLoading" />

  <!-- Done view -->
  <main v-else className="w-full">
    <CardContainer class="shadow-lg">
      <CardHeader>
        <div class="flex flex-row items-center gap-2">
          <LinkIcon class="h-6 w-6 stroke-primary" />
          <h2 class="text-2xl font-bold text-primary">Links</h2>
        </div>
      </CardHeader>
      <CardContent>
        <!-- Links -->
        <ul class="flex flex-col gap-6">
          <li v-for="item in data" :key="item.id">
            <CardLinks v-bind="item" />
          </li>
        </ul>
      </CardContent>
    </CardContainer>
  </main>
</template>
