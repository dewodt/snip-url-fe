<script setup lang="ts">
import type { DeviceChartData, ChartProps } from '.'
import { Donut } from '@unovis/ts'
import type { DonutDatum } from '@unovis/ts/components/donut/types'
import { VisSingleContainer, VisTooltip, VisDonut, VisBulletLegend } from '@unovis/vue'

const props = defineProps<ChartProps<DeviceChartData>>()

const value = (d: DeviceChartData[number]) => d.count
const triggers = {
  [Donut.selectors.segment]: (d: any) =>
    `<span>
      <span class="font-semibold">Device:</span> ${d.data.device}
      <br/>
      <span class="font-semibold">Count:</span> ${d.data.count}
    </span>`
}
const items = props.data.map((d) => {
  return { name: d.device }
})
const sortFunction = (
  a: DonutDatum<DeviceChartData[number]>,
  b: DonutDatum<DeviceChartData[number]>
) => {
  return a.datum.count - b.datum.count
}
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <VisSingleContainer :height="225" :data="props.data">
      <VisDonut :value="value" :sortFunction="sortFunction" />
      <VisTooltip :triggers="triggers" />
    </VisSingleContainer>
    <VisBulletLegend class="[&>div]:flex [&>div]:flex-wrap [&>div]:justify-center" :items="items" />
  </div>
</template>
