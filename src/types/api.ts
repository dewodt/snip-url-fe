export interface CustomPathResponse {
  id: string
  path: string
  createdAt: string
}

export interface LinksResponse {
  id: string
  title: string
  destinationUrl: string
  createdAt: string
  requestCount: number
  customPaths: CustomPathResponse[]
}
