<script setup lang="ts">
import type { CustomCardLinksProps } from '.'
import UpdateForm from '@/components/forms/UpdateForm.vue'
import { AvatarContainer, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import ScnButton from '@/components/ui/button/ScnButton.vue'
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
import ScnSeparator from '@/components/ui/separator/ScnSeparator.vue'
import { cn } from '@/lib/utils'
import {
  BarChart2,
  Calendar,
  CopyIcon,
  GlobeIcon,
  LinkIcon,
  MoreHorizontal,
  PencilIcon,
  Trash2Icon
} from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

// Props
const props = withDefaults(defineProps<CustomCardLinksProps>(), {
  class: ''
})
const getShortenedUrl = (path: string) => `https://url.dewodt.com/${path}`

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
        'flex flex-col gap-4 rounded-lg border bg-card p-4 lg:flex-row lg:justify-between lg:p-5',
        props.class
      )
    "
  >
    <div class="flex flex-row gap-3">
      <!-- Icon -->
      <div class="hidden sm:block">
        <AvatarContainer class="size-12">
          <AvatarImage alt="Website Icon" :src="`${props.destinationUrl}/favicon.ico`" />
          <AvatarFallback>
            <GlobeIcon class="size-9" />
          </AvatarFallback>
        </AvatarContainer>
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
              :href="getShortenedUrl(props.customPaths[0].path)"
              target="_blank"
              class="text-base text-blue-500 hover:underline hover:underline-offset-4"
            >
              {{ getShortenedUrl(props.customPaths[0].path) }}
            </a>

            <!-- See more -->
            <Dialog v-if="props.customPaths.length > 1">
              <DialogTrigger as-child>
                <button class="flex">
                  <Badge> +{{ props.customPaths.length - 1 }} more </Badge>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle class="text-left text-2xl">Shortened URL history</DialogTitle>
                  <DialogDescription class="text-left">
                    This link also uses the following shortened urls
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea class="h-64 rounded-md border p-4">
                  <ul class="flex flex-col gap-4">
                    <li
                      v-for="(path, index) in props.customPaths"
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
              {{ props.requestCount }} engagements
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
    <ScnSeparator class="lg:hidden" />

    <!-- Actions -->
    <div class="flex flex-row gap-3 sm:justify-end">
      <!-- Copy -->
      <ScnButton
        variant="secondary"
        class="flex-auto sm:flex-initial"
        @click="handleCopy(getShortenedUrl(props.customPaths[0].path))"
      >
        <CopyIcon class="mr-2 size-5" /> {{ isCopied ? 'Copied' : 'Copy' }}
      </ScnButton>

      <!-- Edit -->
      <Dialog>
        <DialogTrigger as-child>
          <ScnButton variant="outline" size="icon">
            <PencilIcon class="size-5" />
          </ScnButton>
        </DialogTrigger>
        <DialogContent :onOpenAutoFocus="(e) => e.preventDefault()">
          <DialogHeader>
            <DialogTitle class="text-2xl">Update link</DialogTitle>
            <DialogDescription>
              Updated custom path will be the latest shortened url
            </DialogDescription>
          </DialogHeader>
          <div>
            <UpdateForm v-bind="props" />
          </div>
        </DialogContent>
      </Dialog>

      <!-- More -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <ScnButton variant="outline" size="icon" class="flex data-[state=open]:bg-muted">
            <MoreHorizontal class="size-5" />
          </ScnButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-[150px]">
          <DropdownMenuItem>
            <RouterLink :to="`/dashboard/links/${props.id}`" class="flex">
              <LinkIcon class="mr-2 size-5" />
              <p>View detail</p>
            </RouterLink>
          </DropdownMenuItem>
          <DropdownMenuItem class="text-destructive focus:text-destructive" disabled>
            <Trash2Icon class="mr-2 size-5" />
            <p>Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
