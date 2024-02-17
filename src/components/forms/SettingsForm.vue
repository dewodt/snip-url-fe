<script setup lang="ts">
import { AvatarContainer, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CardContainer, CardContent, CardHeader } from '../ui/card'
import ScnButton from '@/components/ui/button/ScnButton.vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ScnInput } from '@/components/ui/input'
import type { SessionHookResponse } from '@/hooks/session'
import { cn } from '@/lib/utils'
import { avatarSchema, settingsSchema } from '@/lib/zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Trash2, UserCircle2, UserIcon } from 'lucide-vue-next'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

const props = defineProps<SessionHookResponse>()

// Form schema
const formSchema = toTypedSchema(settingsSchema)

// Form hooks
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: props.session.value?.name ?? '',
    avatar: props.session.value?.avatar ?? null
  }
})

// File input state
const fileInputRef = ref<HTMLInputElement | null>(null)
const isUploadingImage = ref(false)
const toggleIsUploadingImage = () => {
  isUploadingImage.value = !isUploadingImage.value
}

// Get BE URL
const beURL = import.meta.env.VITE_BE_URL

// Upload avatar handler
const onUploadAvatar = async (e: Event) => {
  // Reset previous errors
  form.setFieldError('avatar', undefined)

  // If no files, return
  const file = (e.target as HTMLInputElement).files![0]
  if (!file) return

  // Validate image
  const zodResult = avatarSchema.safeParse(file)
  if (!zodResult.success) {
    // Set error to first error message
    form.setFieldError('avatar', zodResult.error.issues[0].message)
    return
  }

  // Create form data
  const formData = new FormData()
  formData.append('file', file)

  // Set loading state
  toggleIsUploadingImage()
  toast.loading('Loading...', {
    description: 'Uploading image'
  })

  // Upload file
  const res = await fetch(`${beURL}/api/upload-avatar`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  })
  const resJSON = await res.json()

  // Reset loading state
  toggleIsUploadingImage()

  // If upload fails
  if (!res.ok) {
    toast.error('Error', { description: resJSON.error || 'Image upload failed' })
    return
  }

  // Upload succeeded
  toast.success('Success', { description: 'Image uploaded successfully' })
  form.setValues({ avatar: resJSON.url })
}

// Submit handler
const onSubmit = form.handleSubmit(async (values) => {
  // Initiate loading toast
  toast.loading('Loading...', {
    description: 'Updating profile'
  })

  // Create form data
  const formData = new FormData()
  formData.append('name', values.name)
  values.avatar && formData.append('avatar', values.avatar)

  // Send request
  const res = await fetch(`${beURL}/api/user`, {
    method: 'PUT',
    body: formData,
    credentials: 'include'
  })
  const resJSON = await res.json()

  // Error response
  if (!res.ok) {
    toast.error('Error', { description: resJSON.error || 'Profile update failed' })
    return
  }

  // Success response
  // Update session
  props.updateSession()

  // Show success toast
  toast.success('Success', { description: 'Profile successfully updated' })
})

// form.isFieldDirty() is not triggered when using form.SetValues
const isFormDirty = computed(
  () =>
    props.session.value?.name != form.values.name ||
    props.session.value?.avatar != form.values.avatar
)
</script>

<template>
  <CardContainer class="shadow-lg">
    <CardHeader>
      <div class="flex flex-row items-center gap-2">
        <UserIcon class="h-6 w-6 stroke-primary" />
        <h2 class="text-2xl font-bold text-primary">Profile</h2>
      </div>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit" class="flex flex-col gap-5">
        <!-- Profile Picture -->
        <FormField control="{control}" name="image">
          <FormItem>
            <FormLabel>Avatar</FormLabel>
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
              <!-- Avatar Preview -->
              <AvatarContainer
                @click="
                  () => !form.isSubmitting.value && !isUploadingImage && fileInputRef!.click()
                "
                :class="
                  cn(
                    'h-20 w-20',
                    form.isSubmitting.value || isUploadingImage
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  )
                "
              >
                <AvatarImage
                  :src="form.values.avatar!"
                  alt="Avatar Upload Preview"
                  class="object-cover object-center"
                />
                <AvatarFallback>
                  <UserCircle2 class="h-20 w-20 stroke-gray-500 stroke-1" />
                </AvatarFallback>
              </AvatarContainer>

              <div class="flex flex-row gap-4">
                <!-- File Upload -->
                <FormControl>
                  <ScnInput
                    type="file"
                    accept="image/*"
                    ref="fileInputRef"
                    :disabled="form.isSubmitting.value || isUploadingImage"
                    @change="onUploadAvatar"
                  />
                </FormControl>

                <!-- File Delete  -->
                <ScnButton
                  data-cy="settings-profile-avatar-delete"
                  type="button"
                  variant="destructive"
                  size="icon"
                  class="flex-none"
                  :disabled="form.isSubmitting.value || isUploadingImage || !form.values.avatar"
                  @click="() => form.setFieldValue('avatar', null, true)"
                >
                  <Trash2 class="h-5 w-5" />
                </ScnButton>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Readonly Email Input -->
        <div class="w-full space-y-2">
          <label class="block text-left text-sm font-medium tracking-tight text-foreground">
            Email
          </label>
          <ScnInput type="text" :default-value="props.session.value?.email" :disabled="true" />
        </div>

        <!-- Name -->
        <FormField :disabled="form.isSubmitting.value" name="name" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <ScnInput type="text" placeholder="Name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Submit Button -->
        <ScnButton
          class="w-full"
          size="lg"
          type="submit"
          :disabled="form.isSubmitting.value || isUploadingImage || !isFormDirty"
        >
          <Loader2 v-if="form.isSubmitting.value" class="mr-2 h-4 w-4 animate-spin" /> Update
        </ScnButton>
      </form>
    </CardContent>
  </CardContainer>
</template>
