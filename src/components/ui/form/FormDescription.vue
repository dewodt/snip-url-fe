<script lang="ts" setup>
import { useFormField } from './useFormField'
import { cn } from '@/lib/utils'
import { useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false
})

const { formDescriptionId } = useFormField()
const { class: className, ...rest } = useAttrs()
</script>

<template>
  <p
    :id="formDescriptionId"
    :class="cn('text-sm text-muted-foreground', className ?? '')"
    v-bind="rest"
  >
    <slot />
  </p>
</template>
