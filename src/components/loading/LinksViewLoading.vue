<script setup lang="ts">
import { CardLinksLoading } from '../custom-cards'
import { CardContainer, CardContent, CardHeader } from '../ui/card'
import { LinkIcon } from 'lucide-vue-next'
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
        <!-- Loading -->
        <ul class="flex flex-col gap-6">
          <li v-for="i in 6" :key="i">
            <CardLinksLoading />
          </li>
        </ul>
      </CardContent>
    </CardContainer>
  </main>
</template>
