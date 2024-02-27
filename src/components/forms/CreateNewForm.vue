<script setup lang="ts">
import ScnButton from '@/components/ui/button/ScnButton.vue'
import { CardContainer, CardContent, CardHeader } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ScnInput } from '@/components/ui/input'
import { createSchema } from '@/lib/zod'
import router from '@/router'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2, PlusCircle, SlashIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'

// Form schema
const formSchema = toTypedSchema(createSchema)

// Form hooks
const form = useForm({
  validationSchema: formSchema
})

// Submit handler
const onSubmit = form.handleSubmit(async (values) => {
  // Create form data
  const formData = new FormData()
  formData.append('title', values.title)
  formData.append('destinationUrl', values.destinationUrl)
  formData.append('customPath', values.customPath)

  // Show loading toast
  toast.loading('Loading', { description: 'Please wait...' })

  // Submit form data
  const beUrl = import.meta.env.VITE_BE_URL
  const res = await fetch(`${beUrl}/api/link`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  })
  const resJSON = await res.json()

  // Error
  if (!res.ok) {
    // Toast error
    toast.error('Error', { description: resJSON.error || 'Something went wrong' })

    // Set field error
    resJSON.field && form.setFieldError(resJSON.field, resJSON.error)

    return
  }

  // Success
  toast.success('Success', { description: 'Link created successfully' })

  // Push to links detail page
  const linkId = resJSON.id
  router.push(`/links/${linkId}`)
})
</script>

<template>
  <CardContainer class="shadow-lg">
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
        <FormField
          name="destinationUrl"
          v-slot="{ componentField }"
          :disabled="form.isSubmitting.value"
        >
          <FormItem>
            <FormLabel>Destination URL</FormLabel>
            <FormControl>
              <ScnInput
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
            <ScnInput type="text" default-value="https://url.dewodt.com" :disabled="true" />
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
                <ScnInput
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
        <ScnButton class="w-full" size="lg" type="submit" :disabled="form.isSubmitting.value">
          <Loader2 v-if="form.isSubmitting.value" class="mr-2 h-4 w-4 animate-spin" /> Create
        </ScnButton>
      </form>
    </CardContent>
  </CardContainer>
</template>
