<script setup lang="ts">
import DiscordIcon from '../icons/DiscordIcon.vue'
import GitHubIcon from '../icons/GitHubIcon.vue'
import GoogleIcon from '../icons/GoogleIcon.vue'
import ScnButton from '@/components/ui/button/ScnButton.vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ScnInput } from '@/components/ui/input'
import { ScnSeparator } from '@/components/ui/separator'
import { signUpSchema } from '@/lib/zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'

// Form schema
const formSchema = toTypedSchema(signUpSchema)

// Form hooks
const form = useForm({
  validationSchema: formSchema
})

// Submit handler
const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values)
})
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
