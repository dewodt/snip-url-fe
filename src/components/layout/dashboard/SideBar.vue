<script setup lang="ts">
import { ScnButton } from '@/components/ui/button'
import { CardContainer, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { HomeIcon, PlusCircle } from 'lucide-vue-next'
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

// Sidebar urls
const paths = [
  {
    id: 1,
    title: 'Links',
    path: '/dashboard/links'
  },
  {
    id: 2,
    title: 'Analytics',
    path: '/dashboard/analytics'
  },
  {
    id: 3,
    title: 'Settings',
    path: '/dashboard/settings'
  }
]

// Current URL
const route = useRouter()
const currentRouteName = computed(() => route.currentRoute.value.name?.toString() ?? '/')
</script>

<template>
  <aside class="w-full md:max-w-[240px]">
    <CardContainer class="shadow-lg">
      <CardHeader>
        <div class="flex flex-row items-center gap-2">
          <HomeIcon class="h-6 w-6 stroke-primary" />
          <h1 class="text-2xl font-bold text-primary">Dashboard</h1>
        </div>
      </CardHeader>
      <CardContent>
        <ul class="flex flex-col gap-2">
          <!-- Create New -->
          <li>
            <RouterLink to="/dashboard/create-new">
              <ScnButton size="lg" class="w-full">
                Create New <PlusCircle class="ml-2 h-5 w-5" />
              </ScnButton>
            </RouterLink>
          </li>

          <li v-for="path in paths" :key="path.id">
            <RouterLink
              :to="path.path"
              :class="
                cn(
                  'flex w-full items-center gap-2 rounded-md p-3 duration-300 ease-in-out',
                  currentRouteName.startsWith(path.path)
                    ? 'bg-muted font-semibold text-foreground'
                    : 'bg-background font-medium text-muted-foreground hover:bg-muted hover:text-foreground'
                )
              "
            >
              {{ path.title }}
            </RouterLink>
          </li>
        </ul>
      </CardContent>
    </CardContainer>
  </aside>
</template>
