<script setup lang="ts">
import CardContainer from '../ui/card/CardContainer.vue'
import CardContent from '../ui/card/CardContent.vue'
import CardHeader from '../ui/card/CardHeader.vue'
import { cn } from '@/lib/utils'

interface CardAnalyticsProps {
  class: string
}

const props = withDefaults(defineProps<CardAnalyticsProps>(), {
  class: ''
})
</script>

<template>
  <CardContainer :class="cn('shadow-lg', props.class)">
    <CardHeader class="px-6 pb-2 pt-6">
      <slot name="card-header"> </slot>
      <!-- <h3 class="text-base font-semibold text-primary">Last 7 Days</h3> -->
    </CardHeader>
    <CardContent>
      <slot name="card-content"></slot>
      <!-- <p class="text-xl font-bold">69</p> -->
    </CardContent>
  </CardContainer>
</template>
