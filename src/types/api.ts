export interface CustomPaths {
  id: string
  path: string
  createdAt: string
}

export interface Last4Weeks {
  date: string
  count: number
}

export interface Referrers {
  referrer: string
  count: number
}

export interface Countries {
  country: string
  count: number
  percentage: number
}

export interface Devices {
  device: string
  count: number
}

export interface LinksResponse {
  id: string
  title: string
  destinationUrl: string
  createdAt: string
  customPaths: CustomPaths[]
  totalRequests: number
}

export interface LinkDetailResponse extends LinksResponse {
  last4Weeks: Last4Weeks[]
  referrers: Referrers[]
  devices: Devices[]
  countries: Countries[]
  lastWeekTotalRequests: number
}
