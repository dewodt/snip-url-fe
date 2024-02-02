<script setup lang="ts">
import SignInForm from '@/components/forms/SignInForm.vue'
import { CardContainer, CardContent, CardHeader } from '@/components/ui/card'

// Metadata
</script>

<template>
  <main class="flex flex-auto items-center justify-center p-6 py-12 sm:p-12 lg:p-24">
    <CardContainer class="w-full max-w-sm shadow-lg">
      <!-- Title -->
      <CardHeader>
        <h1 class="text-center text-3xl font-bold text-primary">Sign In</h1>
      </CardHeader>

      <!-- Sign in Form & with Google Option -->
      <CardContent>
        <SignInForm />
      </CardContent>
    </CardContainer>
  </main>
</template>
