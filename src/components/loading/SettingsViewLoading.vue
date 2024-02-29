<script setup lang="ts">
import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { UserIcon } from 'lucide-vue-next'
</script>

<template>
  <Card class="shadow-lg">
    <CardHeader>
      <div class="flex flex-row items-center gap-2">
        <UserIcon class="h-6 w-6 stroke-primary" />
        <h2 class="text-2xl font-bold text-primary">Profile</h2>
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-5">
        <!-- Profile Picture -->
        <div class="flex flex-col gap-2">
          <Skeleton class="h-6 w-20" />
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
            <!-- Avatar Preview -->
            <Skeleton class="h-20 w-20 flex-none rounded-full" />

            <div class="flex w-full flex-row gap-4">
              <!-- File Upload -->
              <Skeleton class="h-10 w-full max-w-xs" />

              <!-- File Delete -->
              <Skeleton class="h-10 w-10 flex-none" />
            </div>
          </div>
        </div>

        <!-- Readonly Email Input -->
        <div class="flex flex-col gap-2">
          <Skeleton class="h-6 w-20" />
          <Skeleton class="h-10 w-full" />
        </div>

        <!-- Name -->
        <div class="flex flex-col gap-2">
          <Skeleton class="h-6 w-20" />
          <Skeleton class="h-10 w-full" />
        </div>

        <!-- Submit Button -->
        <Skeleton class="h-11 w-full" />
      </div>
    </CardContent>
  </Card>
</template>
