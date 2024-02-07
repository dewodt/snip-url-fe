<script lang="ts" setup>
import { useFormField } from './useFormField'
import { cn } from '@/lib/utils'
import { Label, type LabelProps } from 'radix-vue'
import { useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false
})
const props = defineProps<LabelProps>()

const { error, formItemId } = useFormField()
const { class: className, ...rest } = useAttrs()
</script>

<template>
  <Label
    :class="
      cn(
        'block text-left text-sm font-medium tracking-tight text-foreground',
        error && 'text-destructive',
        className ?? ''
      )
    "
    :for="formItemId"
    v-bind="rest"
  >
    <slot />
  </Label>
</template>
