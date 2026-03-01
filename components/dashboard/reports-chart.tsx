"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { date: "Mon", reports: 86 },
  { date: "Tue", reports: 78 },
  { date: "Wed", reports: 120 },
  { date: "Thu", reports: 65 },
  { date: "Fri", reports: 92 },
  { date: "Sat", reports: 150 },
  { date: "Sun", reports: 135 },
]

const chartConfig = {
  reports: {
    label: "Reports",
    color: "hsl(var(--primary))",
  },
}

export function ReportsChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
            width={30}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="reports" fill="var(--color-reports)" radius={8} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
