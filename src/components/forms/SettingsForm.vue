<script setup lang="ts">
import { AvatarContainer, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CardContainer, CardContent, CardHeader } from '../ui/card'
import ScnButton from '@/components/ui/button/ScnButton.vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ScnInput } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { settingsSchema } from '@/lib/zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Trash2, UserCircle2, UserIcon } from 'lucide-vue-next'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'

// Form schema
const formSchema = toTypedSchema(settingsSchema)

// Form hooks
const form = useForm({
  validationSchema: formSchema
})

// File input state
const fileInputRef = ref<HTMLInputElement | null>(null)
const isUploadingImage = ref(false)
const toggleIsUploadingImage = () => {
  isUploadingImage.value = !isUploadingImage.value
}

// Submit handler
const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values)
})
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
                  :src="form.values.image ?? ''"
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
                    onChange="{onUploadAvatar}"
                  />
                </FormControl>

                <!-- File Delete  -->
                <ScnButton
                  data-cy="settings-profile-avatar-delete"
                  type="button"
                  variant="destructive"
                  size="icon"
                  class="flex-none"
                  :disabled="form.isSubmitting.value || isUploadingImage || !form.values.image"
                  @click="() => form.setFieldValue('image', null, true)"
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
          <ScnInput type="text" default-value="foo@gmail.com" :disabled="true" />
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
          :disabled="
            form.isSubmitting.value ||
            isUploadingImage ||
            (!form.isFieldDirty('name') && !form.isFieldDirty('image'))
          "
        >
          <Loader2 v-if="form.isSubmitting.value" class="mr-2 h-4 w-4 animate-spin" /> Update
        </ScnButton>
      </form>
    </CardContent>
  </CardContainer>
</template>
