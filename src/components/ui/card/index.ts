export { default as CardContainer } from './CardContainer.vue'
export { default as CardHeader } from './CardHeader.vue'
export { default as CardTitle } from './CardTitle.vue'
export { default as CardDescription } from './CardDescription.vue'
export { default as CardContent } from './CardContent.vue'
export { default as CardFooter } from './CardFooter.vue'
export { default as CustomCardLinks } from './CustomCardLinks.vue'

// CustomCardLinks
export interface CustomCardLinksProps {
  id: string
  title: string
  customPath: string[]
  destinationUrl: string
  engagements: number
  createdAt: Date
}
