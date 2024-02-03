import * as z from 'zod'

// Sign in user
export const signInSchema = z.object({
  email: z.string().email()
})

// Create new schema
export const createNewSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  destinationUrl: z
    .string({ required_error: 'Destination URL is required' })
    .url('Invalid Destination URL'),
  customPath: z
    .string({ required_error: 'Custom path is required' })
    .regex(
      /^[^~<>;':"/\\[\]^{}()=+!*@&$?%#|]+$/,
      'The characters `~,<>;:\'"/\\[\\]^{}()=+!*@&$?%#|` are not allowed'
    )
})
