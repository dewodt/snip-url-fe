import type { LinksResponse } from '@/types/api'

export { default as CardContainer } from './CardContainer.vue'
export { default as CardHeader } from './CardHeader.vue'
export { default as CardTitle } from './CardTitle.vue'
export { default as CardDescription } from './CardDescription.vue'
export { default as CardContent } from './CardContent.vue'
export { default as CardFooter } from './CardFooter.vue'
export { default as CustomCardLinks } from './CustomCardLinks.vue'
export { default as CustomCardLinksDetail } from './CustomCardLinksDetail.vue'

// CustomCardLinks
export interface CustomCardLinksProps extends LinksResponse {
  class: string
}

// CustomCardLocationStats
export interface LocationStats {
  id: string
  country: string
  engagements: number
  percentage: number
}
export interface CustomCardLocationStatsProps {
  data: LocationStats[]
  class: string
}
