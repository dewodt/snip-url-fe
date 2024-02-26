<script setup lang="ts">
import ScnButton from '@/components/ui/button/ScnButton.vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ScnInput } from '@/components/ui/input'
import { createUpdateSchema } from '@/lib/zod'
import type { CustomPaths } from '@/types/api'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2, SlashIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'

interface UpdateFormProps {
  title: string
  customPaths: CustomPaths[]
  destinationUrl: string
}

// Get default values from props
const props = defineProps<UpdateFormProps>()

// Form schema
const formSchema = toTypedSchema(createUpdateSchema)

// Form hooks
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: props.title,
    customPath: props.customPaths[0].path
  }
})

// Submit handler
const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-5">
    <!-- Title -->
    <FormField name="title" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <ScnInput
            type="text"
            placeholder="Title"
            v-bind="componentField"
            :disabled="form.isSubmitting.value"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Destination URL -->
    <div class="w-full space-y-2">
      <label class="block text-left text-sm font-medium tracking-tight text-foreground">
        Destination URL
      </label>
      <ScnInput type="text" :default-value="props.destinationUrl" :disabled="true" />
    </div>

    <!-- Shortened URL -->
    <div class="flex flex-col gap-5 lg:flex-row lg:gap-3">
      <!-- Domain (Read Only)-->
      <div class="w-full space-y-2">
        <label class="block text-left text-sm font-medium tracking-tight text-foreground">
          Domain
        </label>
        <ScnInput type="text" default-value="https://url.dewodt.com" :disabled="true" />
      </div>

      <!-- / -->
      <div class="hidden lg:relative lg:top-9 lg:block">
        <SlashIcon class="rotate-[-30deg]" />
      </div>

      <!-- Custom Path -->
      <FormField name="customPath" v-slot="{ componentField }" :disabled="form.isSubmitting.value">
        <FormItem class="w-full">
          <FormLabel>Custom Path</FormLabel>
          <FormControl>
            <ScnInput type="text" placeholder="Custom Path" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Submit Button -->
    <ScnButton
      class="w-full"
      size="lg"
      type="submit"
      :disabled="
        form.isSubmitting.value || (!form.isFieldDirty('title') && !form.isFieldDirty('customPath'))
      "
    >
      <Loader2 v-if="form.isSubmitting.value" class="mr-2 h-4 w-4 animate-spin" /> Update
    </ScnButton>
  </form>
</template>
