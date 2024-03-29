import * as z from 'zod'

// Sign in user
export const signInSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).min(1, 'Email is required').email()
})

// Sign up user
export const signUpSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).min(1, 'Email is required').email(),
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required')
})

// Create new schema
export const createSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).min(1, 'Title is required'),
  destinationUrl: z
    .string({ required_error: 'Destination URL is required' })
    .min(1, 'Destination URL is required')
    .url('Invalid Destination URL'),
  customPath: z
    .string({ required_error: 'Custom path is required' })
    .min(1, 'Custom path is required')
    .regex(
      /^[^~<>\s\t;':"/\\[\]^{}()=+!*@&$?%#|]+$/,
      'The characters `~,<>\\s\\t;:\'"/\\[\\]^{}()=+!*@&$?%#|` are not allowed'
    )
})

// Update chema
export const updateSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).min(1, 'Title is required'),
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
  avatar: z.string().url('Invalid image url').nullable()
})

// Avatar schema
const maxImageSize = 5 * 1024 * 1024
const allowedImagesTypes = ['image/jpeg', 'image/png', 'image/webp']
export const avatarSchema = z
  .custom<File>()
  .refine((file) => {
    return file.size <= maxImageSize
  }, `File size should be less than 5 MB`)
  .refine((file) => {
    return allowedImagesTypes.includes(file.type)
  }, 'Only these types are allowed .jpg, .jpeg, .png and .webp')
