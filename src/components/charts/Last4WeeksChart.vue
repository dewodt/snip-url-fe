<script setup lang="ts">
import type { DateChartData, ChartProps } from '.'
import { StackedBar } from '@unovis/ts'
import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer } from '@unovis/vue'

const props = defineProps<ChartProps<DateChartData>>()
const x = (d: DateChartData[number]) => d.date
const y = (d: DateChartData[number]) => d.count
const triggers = {
  [StackedBar.selectors.bar]: (d: DateChartData[number]) =>
    `<span>
      <span class="font-semibold">Date:</span>  ${Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(d.date)}
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
      :tick-format="
        (value: Date) => Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(value)
      "
      :domain-line="true"
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
