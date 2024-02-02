<script setup lang="ts">
import { ScnButton } from '../button'
import { injectThemeKey } from '@/components/layout/theme/theme'
import type { ThemeProviderProps } from '@/components/layout/theme/theme'
import { cn } from '@/lib/utils'
import { Menu, MoonStar, Sun, UserCircle2, X } from 'lucide-vue-next'
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

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
    name: 'Snip',
    url: '/snip'
  }
]

// Route state
const route = useRouter()
const currentRouteName = computed(() => route.currentRoute.value.name?.toString())

// Theme state
const { theme, updateTheme } = inject(injectThemeKey) as ThemeProviderProps
</script>

<template>
  <header
    class="sticky left-0 right-0 top-0 z-40 flex h-[90px] w-full flex-row items-center justify-between border-b-2 border-b-border bg-background px-8 lg:px-16"
  >
    <!-- Logo Icon -->
    <RouterLink data-cy="navbar-logo" to="/">
      <img src="/logo-cropped.png" class="h-10 w-auto" alt="Snip URL Logo" />
    </RouterLink>

    <!-- Menu Icon ScnButton -->
    <ScnButton
      data-cy="navbar-menu"
      variant="ghost"
      size="icon"
      aria-label="Menu"
      class="lg:hidden"
      @click="emits('toggleNavBarExpanded')"
    >
      <Menu :size="36" class="stroke-foreground" />
    </ScnButton>

    <div
      data-cy="navbar-expanded"
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
          <ScnButton
            data-cy="navbar-theme"
            variant="outline"
            size="icon"
            aria-label="Toggle Light/Dark Mode"
            @click="updateTheme"
          >
            <MoonStar v-if="theme === 'dark'" class="h-6 w-6 stroke-primary" />
            <Sun v-else class="h-6 w-6 stroke-primary" />
          </ScnButton>

          <!-- Profile dropdown when there's session -->
          <!-- {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  data-cy="navbar-dropdown-trigger"
                  class="h-11 w-11 rounded-full border-4 border-transparent hover:border-border data-[state=open]:border-4 data-[state=open]:border-border"
                >
                  {/* Avatar */}
                  <Avatar class="h-full w-full">
                    <AvatarImage
                      src={session.image!}
                      alt="Avatar Image"
                      class="object-cover object-center"
                    />
                    <AvatarFallback>
                      <UserCircle2 class="h-full w-full stroke-gray-500 stroke-1" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* Title */}
                  <DropdownMenuLabel data-cy="navbar-dropdown-title">
                    My Account
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {/* Settings */}
                  <Link data-cy="navbar-dropdown-settings" href="/settings">
                    <DropdownMenuItem>
                      <Settings class="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </Link>

                  {/* My Links */}
                  <Link data-cy="navbar-dropdown-settings" href="/settings">
                    <DropdownMenuItem>
                      <Settings class="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </Link>

                  {/* Sign Out */}
                  <DropdownMenuItem
                    data-cy="navbar-dropdown-sign-out"
                    class="text-destructive focus:text-destructive"
                  >
                    <LogOut class="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                data-cy="navbar-sign-in-desktop"
                href="/auth/sign-in"
                aria-label="Sign In"
              >
                <ScnButton
                  variant="default"
                  size="lg"
                  class="hidden font-semibold lg:flex"
                >
                  Sign In
                </ScnButton>
              </Link>
            )} -->
        </div>

        <!-- Close ScnButton -->
        <ScnButton
          data-cy="navbar-close"
          variant="ghost"
          size="icon"
          aria-label="Close NavBar"
          class="lg:hidden"
          @click="$emit('toggleNavBarExpanded')"
        >
          <X :size="36" class="stroke-foreground" />
        </ScnButton>
      </div>

      <!-- Path lists -->
      <nav>
        <ul class="flex flex-col lg:flex-row lg:gap-12">
          <li v-for="path in paths" :key="path.url" class="py-2">
            <router-link
              :data-cy="`navbar-link-${path.name.toLowerCase()}`"
              :to="path.url"
              :class="`${currentRouteName?.startsWith(path.url) ? 'font-semibold text-foreground' : 'font-medium lg:hover:text-foreground'} text-muted-foreground`"
            >
              {{ path.name }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Sign In ScnButton when there's no session -->
      <!-- {!session && (
      <Link
        data-cy="navbar-sign-in-mobile"
        href="/auth/sign-in"
        class="self-center"
        aria-label="Sign In"
      >
        <ScnButton variant="default" size="lg" class="font-semibold lg:hidden"> Sign In </ScnButton>
      </Link>
      )} -->
    </div>

    <!-- Side bar opaque background -->
    <div
      v-if="props.isNavBarExpanded"
      data-cy="navbar-opaque"
      @click="$emit('toggleNavBarExpanded')"
      class="fixed inset-0 z-0 h-full w-full bg-opacity-80 backdrop-blur-sm lg:hidden"
    />
  </header>
</template>
