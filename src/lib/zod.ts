import * as z from 'zod'

// Sign in user
export const signInSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).min(1, 'Email is required').email()
})

// Create new schema
export const createUpdateSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).min(1, 'Title is required'),
  destinationUrl: z
    .string({ required_error: 'Destination URL is required' })
    .min(1, 'Destination URL is required')
    .url('Invalid Destination URL'),
  customPath: z
    .string({ required_error: 'Custom path is required' })
    .min(1, 'Custom path is required')
    .regex(
      /^[^~<>;':"/\\[\]^{}()=+!*@&$?%#|]+$/,
      'The characters `~,<>;:\'"/\\[\\]^{}()=+!*@&$?%#|` are not allowed'
    )
})

// Settings schema
export const settingsSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  image: z.string().url('Invalid image url').nullable()
})
