<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { queryClient } from '@/lib/query'
import { beURL } from '@/lib/url'
import { createSchema } from '@/lib/zod'
import type { ErrorResponse, SuccessResponse } from '@/types/api'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2, PlusCircle, SlashIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import * as zod from 'zod'

// Get type from zod schema
type FormDataValues = zod.TypeOf<typeof createSchema>
interface SuccessResponseData {
  id: string
}

// Form schema
const formSchema = toTypedSchema(createSchema)

// Form hooks
const form = useForm({
  validationSchema: formSchema
})

// Mutation hook
const { mutateAsync } = useMutation<
  SuccessResponse<SuccessResponseData>,
  ErrorResponse,
  FormDataValues
>({
  mutationFn: async (values) => {
    // Create form data
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('destinationUrl', values.destinationUrl)
    formData.append('customPath', values.customPath)

    // Submit form data
    const res = await fetch(`${beURL}/api/link`, {
      method: 'POST',
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
  onSuccess: async (data) => {
    // Revlidate links
    await queryClient.refetchQueries({ queryKey: ['link'] })

    // Toast success
    toast.success('Success', { description: 'Link created successfully' })

    // Push to links page
    window.location.href = `/dashboard/links/${data.data?.id}`
  }
})

// Submit handler
const onSubmit = form.handleSubmit((values) => mutateAsync(values))
</script>

<template>
  <Card class="shadow-lg">
    <CardHeader>
      <div class="flex flex-row items-center gap-2">
        <PlusCircle class="h-6 w-6 stroke-primary" />
        <h2 class="text-2xl font-bold text-primary">Create New</h2>
      </div>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit" class="flex flex-col gap-5">
        <!-- Title -->
        <FormField name="title" v-slot="{ componentField }" :disabled="form.isSubmitting.value">
          <FormItem>
            <FormLabel> Title </FormLabel>
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

        <!-- Destination URL -->
        <FormField
          name="destinationUrl"
          v-slot="{ componentField }"
          :disabled="form.isSubmitting.value"
        >
          <FormItem>
            <FormLabel>Destination URL</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Destination URL"
                v-bind="componentField"
                :disabled="form.isSubmitting.value"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Shortened URL -->
        <div class="flex flex-col gap-5 lg:flex-row lg:gap-3">
          <!-- Domain (Read Only)-->
          <div class="w-full space-y-2">
            <label class="block text-left text-sm font-medium tracking-tight text-foreground">
              Domain
            </label>
            <Input type="text" :default-value="beURL" :disabled="true" />
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
                <Input
                  type="text"
                  placeholder="Custom Path"
                  v-bind="componentField"
                  :disabled="form.isSubmitting.value"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Submit Button -->
        <Button class="w-full" size="lg" type="submit" :disabled="form.isSubmitting.value">
          <Loader2 v-if="form.isSubmitting.value" class="mr-2 h-4 w-4 animate-spin" /> Create
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
