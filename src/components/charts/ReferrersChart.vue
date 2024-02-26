<script setup lang="ts">
import type { ReffererChartData, ChartProps } from '.'
import { Donut } from '@unovis/ts'
import type { DonutDatum } from '@unovis/ts/components/donut/types'
import { VisSingleContainer, VisTooltip, VisDonut, VisBulletLegend } from '@unovis/vue'

const props = defineProps<ChartProps<ReffererChartData>>()

const value = (d: ReffererChartData[number]) => d.count
const triggers = {
  [Donut.selectors.segment]: (d: any) =>
    `<span>
      <span class="font-semibold">Referrer:</span> ${d.data.referrer}
      <br/>
      <span class="font-semibold">Count:</span> ${d.data.count}
    </span>`
}
const items = props.data.map((d) => {
  return { name: d.referrer }
})
const sortFunction = (
  a: DonutDatum<ReffererChartData[number]>,
  b: DonutDatum<ReffererChartData[number]>
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
