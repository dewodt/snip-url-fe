<script setup lang="ts">
import UpdateFormDialog from '../forms/UpdateFormDialog.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Button from '@/components/ui/button/Button.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import Separator from '@/components/ui/separator/Separator.vue'
import { beURL } from '@/lib/url'
import { cn } from '@/lib/utils'
import type { LinkDetailResponse } from '@/types/api'
import {
  BarChart2,
  Calendar,
  CopyIcon,
  GlobeIcon,
  MoreHorizontal,
  Trash2Icon
} from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

interface CardLinksDetailProps extends LinkDetailResponse {
  class: string
}

// Props
const props = withDefaults(defineProps<CardLinksDetailProps>(), {
  class: ''
})

const getShortenedUrl = (path: string) => `${beURL}/${path}`
const latestPathIdx = computed(() => props.customPaths.length - 1)
const latestPath = computed(() => props.customPaths[latestPathIdx.value].path)

// Copy state
const isCopied = ref(false)

// Copy function
const handleCopy = async (text: string) => {
  await navigator.clipboard.writeText(text)
  isCopied.value = true
}

// Handle "copied"
watch(isCopied, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      isCopied.value = false
    }, 1500)
  }
})
</script>

<template>
  <div
    :class="
      cn(
        'flex h-fit flex-col gap-4 rounded-lg border bg-card p-6 shadow-lg lg:flex-row lg:justify-between',
        props.class
      )
    "
  >
    <div class="flex flex-row gap-3">
      <!-- Icon -->
      <div class="hidden sm:block">
        <Avatar class="size-12">
          <AvatarImage alt="Website Icon" :src="`${props.destinationUrl}/favicon.ico`" />
          <AvatarFallback>
            <GlobeIcon class="size-9" />
          </AvatarFallback>
        </Avatar>
      </div>

      <!-- Texts -->
      <div class="flex flex-col gap-3">
        <!-- Title, Urls -->
        <div class="flex flex-col gap-3">
          <!-- Title -->
          <RouterLink :to="`/dashboard/links/${props.id}`">
            <h3 class="text-xl font-bold">{{ props.title }}</h3>
          </RouterLink>

          <!-- Shortened url -->
          <div class="flex gap-2">
            <a
              :href="getShortenedUrl(latestPath)"
              target="_blank"
              class="text-base text-blue-500 hover:underline hover:underline-offset-4"
            >
              {{ getShortenedUrl(latestPath) }}
            </a>

            <!-- See more -->
            <Dialog v-if="props.customPaths.length > 1">
              <DialogTrigger as-child>
                <button class="flex">
                  <Badge> +{{ props.customPaths.length - 1 }} more </Badge>
                </button>
              </DialogTrigger>
              <DialogContent class="max-h-[85vh] overflow-y-auto rounded-lg">
                <DialogHeader>
                  <DialogTitle class="text-left text-2xl">Shortened URL history</DialogTitle>
                  <DialogDescription class="text-left">
                    This link also uses the following shortened urls
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea class="h-64 rounded-md border p-4">
                  <ul class="flex flex-col gap-4">
                    <li
                      v-for="(path, index) in props.customPaths.slice().reverse()"
                      :key="path.id"
                      class="flex gap-3"
                    >
                      <span>{{ getShortenedUrl(path.path) }}</span>
                      <Badge v-if="index === 0" variant="green"> Latest </Badge>
                    </li>
                  </ul>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>

          <!-- Destination URL -->
          <a
            :href="props.destinationUrl"
            target="_blank"
            class="text-base hover:underline hover:underline-offset-4"
          >
            {{ props.destinationUrl }}
          </a>
        </div>

        <!-- Stats, Date -->
        <div class="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <div class="flex gap-1">
            <BarChart2 class="size-5" />
            <RouterLink :to="`/dashboard/links/${props.id}`" class="text-sm">
              {{ props.totalRequests }} engagements
            </RouterLink>
          </div>
          <div class="flex gap-1">
            <Calendar class="size-5" />
            <p class="text-sm">
              {{ new Date(props.createdAt).toLocaleString('en-US', { dateStyle: 'long' }) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Separator -->
    <Separator class="lg:hidden" />

    <!-- Actions -->
    <div class="flex flex-row gap-3 sm:justify-end">
      <!-- Copy -->
      <Button
        variant="secondary"
        class="flex-auto sm:flex-initial"
        @click="handleCopy(getShortenedUrl(latestPath))"
      >
        <CopyIcon class="mr-2 size-5" /> {{ isCopied ? 'Copied' : 'Copy' }}
      </Button>

      <!-- Edit -->
      <UpdateFormDialog
        :id="props.id"
        :title="props.title"
        :custom-path="latestPath"
        :destination-url="props.destinationUrl"
      />

      <!-- More -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="icon" class="flex data-[state=open]:bg-muted">
            <MoreHorizontal class="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-[150px]">
          <DropdownMenuItem class="text-destructive focus:text-destructive" disabled>
            <Trash2Icon class="mr-2 size-5" />
            <p>Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
