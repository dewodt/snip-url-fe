<script setup lang="ts">
import type { Last4WeeksChartData, ChartProps } from '.'
import { StackedBar } from '@unovis/ts'
import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer } from '@unovis/vue'

const props = defineProps<ChartProps<Last4WeeksChartData>>()
const x = (d: Last4WeeksChartData[number]) => new Date(d.date)
const y = (d: Last4WeeksChartData[number]) => d.count
const triggers = {
  [StackedBar.selectors.bar]: (d: Last4WeeksChartData[number]) =>
    `<span>
      <span class="font-semibold">Date:</span>  ${Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(d.date))}
      <br/>
      <span class="font-semibold">Engagement:</span> ${d.count}
    </span>`
}
</script>

<template>
  <VisXYContainer :margin="{ left: 20, right: 20 }" :data="props.data">
    <!-- Bar -->
    <VisStackedBar :x="x" :y="y" color="#FACC15" :bar-padding="0.15" :rounded-corners="4" />

    <!-- X Axis -->
    <VisAxis
      type="x"
      :num-ticks="5"
      :grid-line="false"
      :tick-line="true"
      :domain-line="true"
      :tick-format="
        (value: string) =>
          Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(new Date(value))
      "
      color="#888888"
    />

    <!-- Y Axis -->
    <VisAxis
      type="y"
      :num-ticks="10"
      :grid-line="false"
      :tick-line="true"
      :domain-line="true"
      color="#888888"
    />

    <!-- Tooltip -->
    <VisTooltip :triggers="triggers" />
  </VisXYContainer>
</template>
