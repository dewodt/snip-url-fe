import * as z from 'zod'

// Sign in user
export const signInSchema = z.object({
  email: z.string().email()
})
