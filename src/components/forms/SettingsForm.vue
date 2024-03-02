<script setup lang="ts">
import { useSession } from '../layout/session/session'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent, CardHeader } from '../ui/card'
import Button from '@/components/ui/button/Button.vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { beURL } from '@/lib/url'
import { avatarSchema, settingsSchema } from '@/lib/zod'
import type { SuccessResponse, ErrorResponse } from '@/types/api'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { Trash2, UserCircle2, UserIcon } from 'lucide-vue-next'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { toast } from 'vue-sonner'
import * as zod from 'zod'

// Get form data values
type FormDataImageValues = zod.TypeOf<typeof avatarSchema>
type FormDataSettingsValues = zod.TypeOf<typeof settingsSchema>

// Get session from provider
const { session, updateSession } = useSession()

// Form schema
const formSchema = toTypedSchema(settingsSchema)

// Form hooks
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: session.value?.name ?? '',
    avatar: session.value?.avatar ?? null
  }
})

// File input state
// const fileInputRef = ref<HTMLInputElement | null>(null)

// Upload image mutation hook
const mutateAvatar = useMutation<SuccessResponse<string>, ErrorResponse, FormDataImageValues>({
  mutationFn: async (file) => {
    // Reset previous errors
    form.setFieldError('avatar', undefined)

    // If no file
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

    // Error
    if (!res.ok) {
      throw resJSON
    }

    // Success
    return resJSON
  },
  onError: (error) => {
    // Error
    toast.error('Error', {
      description: error.error || 'Image upload failed'
    })
  },
  onSuccess: (data) => {
    // Success
    form.setValues({ avatar: data.data })
    toast.success('Success', {
      description: 'Image uploaded successfully'
    })
  }
})

// Mutate settings hook
const mutateSettings = useMutation<SuccessResponse, ErrorResponse, FormDataSettingsValues>({
  mutationFn: async (values) => {
    // Create form data
    const formData = new FormData()
    formData.append('name', values.name)
    values.avatar && formData.append('avatar', values.avatar)

    // Initiate loading toast
    toast.loading('Loading...', {
      description: 'Updating profile'
    })

    // Send request
    const res = await fetch(`${beURL}/api/user`, {
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
    // Error toast
    toast.error('Error', { description: error.error || 'Profile update failed' })
  },
  onSuccess: () => {
    // Update session
    updateSession()

    // Show success toast
    toast.success('Success', { description: 'Profile successfully updated' })
  }
})

// Handle avatar
const handleAvatar = () => {
  if (form.isSubmitting.value || mutateAvatar.isPending.value) return
  // fileInputRef bug
  // const elmt = fileInputRef.value
  // elmt?.click()
  const elmt = document.getElementById('input-avatar') as HTMLInputElement
  elmt.click()
}

// Submit handler
const onSubmit = form.handleSubmit((values) => mutateSettings.mutateAsync(values))

// form.isFieldDirty() is not triggered when using form.SetValues
const isFormDirty = computed(
  () => session.value?.name != form.values.name || session.value?.avatar != form.values.avatar
)
</script>

<template>
  <Card class="shadow-lg">
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
              <button
                type="button"
                @click="handleAvatar"
                class="size-20"
                :disabled="form.isSubmitting.value || mutateAvatar.isPending.value"
              >
                <Avatar class="size-20">
                  <AvatarImage
                    :src="form.values.avatar!"
                    alt="Avatar Upload Preview"
                    class="object-cover object-center"
                  />
                  <AvatarFallback>
                    <UserCircle2 class="h-20 w-20 stroke-gray-500 stroke-1" />
                  </AvatarFallback>
                </Avatar>
              </button>

              <div class="flex flex-row gap-4">
                <!-- File Upload -->
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    id="input-avatar"
                    :disabled="form.isSubmitting.value || mutateAvatar.isPending.value"
                    @change="
                      (e: Event) => mutateAvatar.mutate((e.target as HTMLInputElement)!.files![0])
                    "
                  />
                </FormControl>

                <!-- File Delete  -->
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  class="flex-none"
                  :disabled="
                    form.isSubmitting.value || mutateAvatar.isPending.value || !form.values.avatar
                  "
                  @click="() => form.setFieldValue('avatar', null, true)"
                >
                  <Trash2 class="h-5 w-5" />
                </Button>
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
          <Input type="text" :default-value="session?.email" :disabled="true" />
        </div>

        <!-- Name -->
        <FormField :disabled="form.isSubmitting.value" name="name" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Submit Button -->
        <Button
          class="w-full"
          size="lg"
          type="submit"
          :disabled="form.isSubmitting.value || mutateAvatar.isPending.value || !isFormDirty"
        >
          <Loader2 v-if="form.isSubmitting.value" class="mr-2 h-4 w-4 animate-spin" /> Update
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
