<script setup lang="ts">
import { CardContainer, CardContent, CardHeader, CustomCardLinks } from '@/components/ui/card'
import { useHead } from '@unhead/vue'
import { LinkIcon } from 'lucide-vue-next'
import { ref } from 'vue'

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

// Template data
const data = ref([
  {
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
  },
  {
    id: '2',
    title: 'This is title 2',
    customPath: ['url2', 'url21', 'url22'],
    destinationUrl: 'https://www.google.com',
    engagements: 100,
    createdAt: new Date(2021, 10, 11)
  },
  {
    id: '3',
    title: 'This is title 3',
    customPath: ['url3'],
    destinationUrl: 'https://www.google.com',
    engagements: 100,
    createdAt: new Date(2021, 10, 12)
  },
  {
    id: '4',
    title: 'This is title 4',
    customPath: ['url4'],
    destinationUrl: 'https://www.google.com',
    engagements: 100,
    createdAt: new Date(2021, 10, 13)
  },
  {
    id: '5',
    title: 'This is title 5',
    customPath: ['url5'],
    destinationUrl: 'https://www.google.com',
    engagements: 100,
    createdAt: new Date(2021, 10, 14)
  },
  {
    id: '6',
    title: 'This is title 6',
    customPath: ['url6'],
    destinationUrl: 'https://www.google.com',
    engagements: 100,
    createdAt: new Date(2021, 10, 15)
  },
  {
    id: '7',
    title: 'This is title 7',
    customPath: ['url7'],
    destinationUrl: 'https://www.google.com',
    engagements: 100,
    createdAt: new Date(2021, 10, 16)
  },
  {
    id: '8',
    title: 'This is title 8',
    customPath: ['url8'],
    destinationUrl: 'https://www.google.com',
    engagements: 100,
    createdAt: new Date(2021, 10, 17)
  },
  {
    id: '9',
    title: 'This is title 9',
    customPath: ['url9'],
    destinationUrl: 'https://www.google.com',
    engagements: 100,
    createdAt: new Date(2021, 10, 18)
  },
  {
    id: '10',
    title: 'This is title 10',
    customPath: ['url10'],
    destinationUrl: 'https://www.google.com',
    engagements: 100,
    createdAt: new Date(2021, 10, 19)
  }
])
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
        <ul class="flex flex-col gap-6">
          <li v-for="item in data" :key="item.id">
            <CustomCardLinks v-bind="item" />
          </li>
        </ul>
      </CardContent>
    </CardContainer>
  </main>
</template>
