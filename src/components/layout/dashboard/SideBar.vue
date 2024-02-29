<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { HomeIcon, PlusCircle, BarChart3, SettingsIcon, LinkIcon, LogOut } from 'lucide-vue-next'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

// Sidebar urls
const paths = [
  {
    id: 1,
    title: 'Links',
    path: '/dashboard/links',
    icon: LinkIcon
  },
  {
    id: 2,
    title: 'Settings',
    path: '/dashboard/settings',
    icon: SettingsIcon
  }
]

// Current URL
const route = useRoute()
const currentRouteName = computed(() => route.path)
</script>

<template>
  <aside class="w-full lg:max-w-[240px]">
    <Card class="shadow-lg">
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
              <Button size="lg" class="h-12 w-full">
                Create New <PlusCircle class="ml-2 h-5 w-5" />
              </Button>
            </RouterLink>
          </li>

          <!-- Map Paths -->
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
              <component :is="path.icon" class="h-5 w-5" /> {{ path.title }}
            </RouterLink>
          </li>
        </ul>
      </CardContent>
    </Card>
  </aside>
</template>
