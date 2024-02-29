<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { queryClient } from '@/lib/query'
import { beURL } from '@/lib/url'
import { updateSchema } from '@/lib/zod'
import type { SuccessResponse, ErrorResponse } from '@/types/api'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2, PencilIcon, SlashIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import * as zod from 'zod'

// Get type from zod schema
type FormDataValues = zod.TypeOf<typeof updateSchema>

// Get default values from props
interface UpdateFormProps {
  id: string
  title: string
  customPath: string
  destinationUrl: string
}
const props = defineProps<UpdateFormProps>()

// Form schema
const formSchema = toTypedSchema(updateSchema)
// Form hooks
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: props.title,
    customPath: props.customPath
  }
})

// Dialog state
const open = ref(false)
const toggleOpen = () => {
  // Toggle open state
  open.value = !open.value
  // Reset form if mounted
  if (open.value) {
    form.setValues({
      title: props.title,
      customPath: props.customPath
    })
  }
}

// Use mutation hook
const { mutateAsync } = useMutation<SuccessResponse, ErrorResponse<FormDataValues>, FormDataValues>(
  {
    mutationFn: async (values) => {
      // Create form data
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('customPath', values.customPath)

      // Submit form
      toast.loading('Loading', { description: 'Please wait...' })

      const res = await fetch(`${beURL}/api/link/${props.id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include'
      })
      const resJSON = await res.json()

      // Error
      if (!res.ok) {
        throw resJSON
      }

      // Success
      return resJSON
    },
    onError: (error) => {
      // Toast error
      toast.error('Error', { description: error.error || 'Something went wrong' })

      // Set field error
      error.field && form.setFieldError(error.field, error.error)
    },
    onSuccess: async () => {
      // Refetch queries
      await queryClient.refetchQueries({ queryKey: ['link'] })
      await queryClient.refetchQueries({ queryKey: ['link', props.id] })

      // Close dialog & toast success
      toggleOpen()
      toast.success('Success', { description: 'URL updated successfully' })
    }
  }
)

// Submit handler
const onSubmit = form.handleSubmit((values) => mutateAsync(values))
</script>

<template>
  <Dialog :open="open" @update:open="toggleOpen">
    <DialogTrigger as-child>
      <Button type="button" variant="outline" size="icon">
        <PencilIcon class="size-5" />
      </Button>
    </DialogTrigger>
    <DialogContent @open-auto-focus.prevent>
      <DialogHeader>
        <DialogTitle class="text-2xl">Update link</DialogTitle>
        <DialogDescription>
          Updated custom path will be the latest shortened url
        </DialogDescription>
      </DialogHeader>
      <form class="flex flex-col gap-5" @submit="onSubmit">
        <!-- Title -->
        <FormField name="title" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Title"
                v-bind="componentField"
                :disabled="form.isSubmitting.value"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Destination URL (Read only) -->
        <div class="w-full space-y-2">
          <label class="block text-left text-sm font-medium tracking-tight text-foreground">
            Destination URL
          </label>
          <Input type="text" :default-value="props.destinationUrl" :disabled="true" />
        </div>

        <!-- Shortened URL -->
        <div class="flex flex-col gap-5 lg:flex-row lg:gap-3">
          <!-- Domain (Read Only)-->
          <div class="w-full space-y-2">
            <label class="block text-left text-sm font-medium tracking-tight text-foreground">
              Domain
            </label>
            <Input type="text" default-value="https://url.dewodt.com" :disabled="true" />
          </div>

          <!-- / -->
          <div class="hidden lg:relative lg:top-9 lg:block">
            <SlashIcon class="rotate-[-30deg]" />
          </div>

          <!-- Custom Path -->
          <FormField
            name="customPath"
            v-slot="{ componentField }"
            :disabled="form.isSubmitting.value"
          >
            <FormItem class="w-full">
              <FormLabel>Custom Path</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Custom Path" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          class="w-full"
          size="lg"
          :disabled="
            form.isSubmitting.value ||
            (!form.isFieldDirty('title') && !form.isFieldDirty('customPath'))
          "
        >
          <Loader2 v-if="form.isSubmitting.value" class="mr-2 h-4 w-4 animate-spin" /> Update
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
