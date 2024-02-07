export type DateChartData = Array<{
  date: Date
  count: number
}>

export type StringChartData = Array<{
  label: string
  count: number
}>

export interface ChartProps<T> {
  data: T
}
