<script setup lang="ts">
import DiscordIcon from '../icons/DiscordIcon.vue'
import GitHubIcon from '../icons/GitHubIcon.vue'
import GoogleIcon from '../icons/GoogleIcon.vue'
import Button from '@/components/ui/button/Button.vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { beURL } from '@/lib/url'
import { signInSchema } from '@/lib/zod'
import router from '@/router'
import type { ErrorResponse, SuccessResponse } from '@/types/api'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import * as zod from 'zod'

// Get form data values
type FormDataValues = zod.TypeOf<typeof signInSchema>

// Form schema
const formSchema = toTypedSchema(signInSchema)

// Form hooks
const form = useForm({
  validationSchema: formSchema
})

// Mutation hook
const { mutateAsync } = useMutation<SuccessResponse, ErrorResponse<FormDataValues>, FormDataValues>(
  {
    mutationFn: async (values) => {
      // Create form data
      const formData = new FormData()
      formData.append('email', values.email)

      // Submit form data
      const res = await fetch(`${beURL}/api/auth/email/sign-in`, {
        method: 'POST',
        body: formData
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
        description: error.error || 'Something went wrong'
      })

      // Field
      error.field && form.setFieldError(error.field, error.error)
    },
    onSuccess: () => {
      // Success
      toast.success('Success', {
        description: 'Please check your email for the magic link.'
      })

      // Redirect to verify email page
      const timeOut = setTimeout(() => {
        clearTimeout(timeOut)
        router.push('/auth/verify-request')
      }, 2000)
    }
  }
)

// Submit handler
const onSubmit = form.handleSubmit((values) => mutateAsync(values))

const onClickGoogle = () => {
  const googleOAuthURL = `${beURL}/api/auth/google`
  window.location.href = googleOAuthURL
}

const onClickGitHub = () => {
  const githubOAuthURL = `${beURL}/api/auth/github`
  window.location.href = githubOAuthURL
}

const onClickDiscord = () => {
  const discordOAuthURL = `${beURL}/api/auth/discord`
  window.location.href = discordOAuthURL
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <form @submit="onSubmit" class="flex flex-col gap-5">
      <!-- Email -->
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="Email"
              v-bind="componentField"
              :disabled="form.isSubmitting.value"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Submit Button -->
      <Button
        variant="default"
        class="w-full"
        size="lg"
        type="submit"
        :disabled="form.isSubmitting.value"
      >
        <Loader2 v-if="form.isSubmitting.value" class="mr-2 h-4 w-4 animate-spin" /> Continue with
        Email
      </Button>
    </form>

    <!-- Separator -->
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <Separator />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">or</span>
      </div>
    </div>

    <!-- Google oAuth -->
    <Button
      variant="secondary"
      type="button"
      size="lg"
      class="flex w-full flex-row items-center gap-3"
      :disabled="form.isSubmitting.value"
      @click="onClickGoogle"
    >
      <GoogleIcon :size="20" />
      Continue with Google
    </Button>

    <!-- GitHub oAuth -->
    <Button
      variant="secondary"
      type="button"
      size="lg"
      class="flex w-full flex-row items-center gap-3"
      :disabled="form.isSubmitting.value"
      @click="onClickGitHub"
    >
      <GitHubIcon :size="20" />
      Continue with GitHub
    </Button>

    <!-- Discord oAuth -->
    <Button
      variant="secondary"
      type="button"
      size="lg"
      class="flex w-full flex-row items-center gap-3"
      :disabled="form.isSubmitting.value"
      @click="onClickDiscord"
    >
      <DiscordIcon :size="20" />
      Continue with Discord
    </Button>

    <!-- Sign up option -->
    <div>
      <p class="text-center text-sm">
        Don't have an account?
        <RouterLink to="/auth/sign-up" class="font-medium hover:underline hover:underline-offset-4">
          Sign up
        </RouterLink>
      </p>
    </div>
  </div>
</template>
