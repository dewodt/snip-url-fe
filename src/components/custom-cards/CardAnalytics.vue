<script setup lang="ts">
import Card from '../ui/card/Card.vue'
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
  <Card :class="cn('flex flex-col shadow-lg', props.class)">
    <CardHeader class="px-6 pb-2 pt-6">
      <slot name="card-header"> </slot>
    </CardHeader>
    <CardContent class="flex flex-auto">
      <slot name="card-content"></slot>
    </CardContent>
  </Card>
</template>
