<script setup lang="ts">
import DiscordIcon from '../icons/DiscordIcon.vue'
import GitHubIcon from '../icons/GitHubIcon.vue'
import GoogleIcon from '../icons/GoogleIcon.vue'
import ScnButton from '@/components/ui/button/ScnButton.vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ScnInput } from '@/components/ui/input'
import { ScnSeparator } from '@/components/ui/separator'
import { beURL } from '@/lib/url'
import { signUpSchema } from '@/lib/zod'
import router from '@/router'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'

// Form schema
const formSchema = toTypedSchema(signUpSchema)

// Form hooks
const form = useForm({
  validationSchema: formSchema
})

// Submit handler
const onSubmit = form.handleSubmit(async (values) => {
  // Create form data
  const formData = new FormData()
  formData.append('email', values.email)
  formData.append('name', values.name)

  // Initialize loading
  toast.loading('Loading...', { description: 'Please wait' })

  // Send form data to backend
  const res = await fetch(`${beURL}/api/auth/email/sign-up`, {
    method: 'POST',
    body: formData
  })
  const resJSON = await res.json()

  // Handle response
  if (!res.ok) {
    toast.error('Error', {
      description: resJSON.error
    })
    return
  }

  // Success
  toast.success('Success', {
    description: 'Please check your email for the magic link.'
  })

  // Redirect to verify email page
  const timeOut = setTimeout(() => {
    clearTimeout(timeOut)
    router.push('/auth/verify-request')
  }, 2000)
})

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
      <!-- Name -->
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <ScnInput
              type="text"
              placeholder="Name"
              v-bind="componentField"
              :disabled="form.isSubmitting.value"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Email -->
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <ScnInput
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
      <ScnButton
        variant="default"
        class="w-full"
        size="lg"
        type="submit"
        :disabled="form.isSubmitting.value"
      >
        <Loader2 v-if="form.isSubmitting.value" class="mr-2 h-4 w-4 animate-spin" /> Continue with
        Email
      </ScnButton>
    </form>

    <!-- Separator -->
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <ScnSeparator />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">or</span>
      </div>
    </div>

    <!-- Google oAuth -->
    <ScnButton
      variant="secondary"
      type="button"
      size="lg"
      class="flex w-full flex-row items-center gap-3"
      :disabled="form.isSubmitting.value"
      @click="onClickGoogle"
    >
      <GoogleIcon :size="20" />
      Continue with Google
    </ScnButton>

    <!-- GitHub oAuth -->
    <ScnButton
      variant="secondary"
      type="button"
      size="lg"
      class="flex w-full flex-row items-center gap-3"
      :disabled="form.isSubmitting.value"
      @click="onClickGitHub"
    >
      <GitHubIcon :size="20" />
      Continue with GitHub
    </ScnButton>

    <!-- Discord oAuth -->
    <ScnButton
      variant="secondary"
      type="button"
      size="lg"
      class="flex w-full flex-row items-center gap-3"
      :disabled="form.isSubmitting.value"
      @click="onClickDiscord"
    >
      <DiscordIcon :size="20" />
      Continue with Discord
    </ScnButton>

    <!-- Sign up option -->
    <div>
      <p class="text-center text-sm">
        Already have an account?
        <RouterLink to="/auth/sign-in" class="font-medium hover:underline hover:underline-offset-4">
          Sign in
        </RouterLink>
      </p>
    </div>
  </div>
</template>
