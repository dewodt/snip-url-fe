<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '../avatar'
import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '../dropdown-menu'
import { useSession } from '@/components/layout/session/session'
import { useTheme } from '@/components/layout/theme/theme'
import { beURL } from '@/lib/url'
import { cn } from '@/lib/utils'
import { LogOut, Menu, MoonStar, SettingsIcon, Sun, UserCircle2, X } from 'lucide-vue-next'
import { DropdownMenuTrigger } from 'radix-vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

interface NavBarProps {
  isNavBarExpanded: boolean
}

interface NavBarEmits {
  (e: 'toggleNavBarExpanded'): void
}

const props = defineProps<NavBarProps>()
const emits = defineEmits<NavBarEmits>()

const paths = [
  {
    name: 'Dashboard',
    url: '/dashboard'
  }
]

// Route state
const route = useRoute()
const currentRouteName = computed(() => route.path)

// Theme state
const { theme, updateTheme } = useTheme()

// Get user session
const { session, isPending } = useSession()

// On signout
const onSignOut = () => {
  fetch(`${beURL}/api/auth/sign-out`, {
    method: 'GET',
    credentials: 'include'
  }).then(() => {
    window.location.href = '/'
  })
}
</script>

<template>
  <header
    class="sticky left-0 right-0 top-0 z-40 flex h-[90px] w-full flex-row items-center justify-between border-b-2 border-b-border bg-background px-8 lg:px-16"
  >
    <!-- Logo Icon -->
    <RouterLink tabindex="1" to="/">
      <img src="/logo-cropped.png" class="h-10 w-auto" alt="Snip URL Logo" />
    </RouterLink>

    <!-- Menu Icon Button -->
    <Button
      variant="ghost"
      size="icon"
      aria-label="Menu"
      class="lg:hidden"
      @click="emits('toggleNavBarExpanded')"
    >
      <Menu :size="36" class="stroke-foreground" />
    </Button>

    <div
      :class="
        cn(
          'fixed right-0 top-0 z-10 flex h-full w-[230px] flex-col gap-6 border-l-2 border-l-border bg-background p-5 font-inter text-base duration-300 ease-in-out lg:static lg:h-auto lg:w-auto lg:translate-x-0 lg:flex-row-reverse lg:items-center lg:gap-12 lg:border-none lg:bg-transparent lg:p-0 lg:dark:bg-transparent xl:text-lg',
          props.isNavBarExpanded ? 'translate-x-0' : 'translate-x-full'
        )
      "
    >
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center gap-6">
          <!-- Toggle Light/Dark mode -->
          <Button
            tabindex="3"
            variant="outline"
            size="icon"
            aria-label="Toggle Light/Dark Mode"
            @click="updateTheme"
          >
            <MoonStar v-if="theme === 'dark'" class="h-6 w-6 stroke-primary" />
            <Sun v-else class="h-6 w-6 stroke-primary" />
          </Button>

          <!-- Profile dropdown when there's session -->
          <DropdownMenu v-if="session && !isPending">
            <DropdownMenuTrigger
              tabindex="4"
              class="flex h-11 w-11 items-center justify-center rounded-full border-4 border-transparent hover:border-border data-[state=open]:border-4 data-[state=open]:border-border"
            >
              <!-- Avatar  -->
              <Avatar class="h-10 w-10">
                <AvatarImage
                  :src="session.avatar ?? ''"
                  alt="Avatar Image"
                  class="object-cover object-center"
                />
                <AvatarFallback>
                  <UserCircle2 class="h-10 w-10 stroke-gray-500 stroke-1" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <!-- Title  -->
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <!-- Settings -->
              <RouterLink to="/dashboard/settings">
                <DropdownMenuItem>
                  <SettingsIcon class="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </RouterLink>

              <!-- Sign Out -->
              <DropdownMenuItem class="text-destructive focus:text-destructive" @click="onSignOut">
                <LogOut class="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <RouterLink tabindex="4" v-else to="/auth/sign-in" aria-label="Sign In">
            <Button tabindex="-1" variant="default" size="lg" class="hidden font-semibold lg:flex">
              Sign In
            </Button>
          </RouterLink>
        </div>

        <!-- Close Button -->
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close NavBar"
          class="lg:hidden"
          @click="$emit('toggleNavBarExpanded')"
        >
          <X :size="36" class="stroke-foreground" />
        </Button>
      </div>

      <!-- Path lists -->
      <nav>
        <ul class="flex flex-col lg:flex-row lg:gap-12">
          <li v-for="(path, index) in paths" :key="path.url" class="py-2">
            <router-link
              :to="path.url"
              :tabindex="index + 2"
              :class="
                cn(
                  'text-muted-foreground',
                  currentRouteName.startsWith(path.url)
                    ? 'font-semibold text-foreground'
                    : 'font-medium lg:hover:text-foreground'
                )
              "
            >
              {{ path.name }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Sign In Button when there's no session -->
      <RouterLink
        v-if="!session || isPending"
        tabindex="-1"
        to="/auth/sign-in"
        class="self-center lg:hidden"
        aria-label="Sign In"
      >
        <Button variant="default" size="lg" class="font-semibold"> Sign In </Button>
      </RouterLink>
    </div>

    <!-- Side bar opaque background -->
    <div
      v-if="props.isNavBarExpanded"
      @click="$emit('toggleNavBarExpanded')"
      class="fixed inset-0 z-0 h-full w-full bg-opacity-80 backdrop-blur-sm lg:hidden"
    />
  </header>
</template>
