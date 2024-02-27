<script setup lang="ts">
import ScnButton from '@/components/ui/button/ScnButton.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ScnInput } from '@/components/ui/input'
import { updateSchema } from '@/lib/zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2, PencilIcon, SlashIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

interface UpdateFormProps {
  id: string
  title: string
  customPath: string
  destinationUrl: string
}

// Get default values from props
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

// Get be url
const beUrl = import.meta.env.VITE_BE_URL

// Submit handler
const onSubmit = form.handleSubmit(async (values) => {
  // Create form data
  const formData = new FormData()
  formData.append('title', values.title)
  formData.append('customPath', values.customPath)

  // Submit form
  toast.loading('Loading', { description: 'Please wait...' })

  const res = await fetch(`${beUrl}/api/link/${props.id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include'
  })
  const data = await res.json()

  // Handle response
  if (res.ok) {
    toggleOpen()
    toast.success('Success', { description: 'URL updated successfully' })
    return
  } else {
    form.setFieldError(data.field, data.error)
    toast.error('Error', { description: data.error })
    return
  }
})
</script>

<template>
  <Dialog :open="open" @update:open="toggleOpen">
    <DialogTrigger as-child>
      <ScnButton type="button" variant="outline" size="icon">
        <PencilIcon class="size-5" />
      </ScnButton>
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

        <!-- Destination URL (Read only) -->
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
          <FormField
            name="customPath"
            v-slot="{ componentField }"
            :disabled="form.isSubmitting.value"
          >
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
          type="submit"
          class="w-full"
          size="lg"
          :disabled="
            form.isSubmitting.value ||
            (!form.isFieldDirty('title') && !form.isFieldDirty('customPath'))
          "
        >
          <Loader2 v-if="form.isSubmitting.value" class="mr-2 h-4 w-4 animate-spin" /> Update
        </ScnButton>
      </form>
    </DialogContent>
  </Dialog>
</template>
