export type ReffererChartData = Array<{
  referrer: string
  count: number
}>

export type DeviceChartData = Array<{
  device: string
  count: number
}>

export type Last4WeeksChartData = Array<{
  date: string
  count: number
}>

export interface ChartProps<T> {
  data: T
}
