"use client"

import * as React from "react"
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import type { Report } from "@/lib/types"

const getViolationData = (reports: Report[]) => {
    const violationCounts: { [key: string]: number } = {};
    reports.forEach(report => {
        if(report.violationType) {
            violationCounts[report.violationType] = (violationCounts[report.violationType] || 0) + 1;
        }
    });

    return Object.entries(violationCounts).map(([name, value]) => ({
        name: name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        value,
    }));
}

const chartConfig = {
    value: {
        label: "Reports",
    },
    "Illegal Dumping": {
        label: "Illegal Dumping",
        color: "hsl(var(--chart-1))",
    },
    "Unsegregated Waste": {
        label: "Unsegregated",
        color: "hsl(var(--chart-2))",
    },
    "Graffiti": {
        label: "Graffiti",
        color: "hsl(var(--chart-3))",
    },
    "Public Urination": {
        label: "Public Urination",
        color: "hsl(var(--chart-4))",
    },
    "Other": {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
}

export function ViolationsChart({ reports }: { reports: Report[] }) {
  const chartData = getViolationData(reports);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[250px]"
    >
      <ResponsiveContainer>
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
             {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartConfig[entry.name as keyof typeof chartConfig]?.color}
              />
            ))}
          </Pie>
           <ChartLegend
            content={<ChartLegendContent nameKey="name" />}
            className="-translate-y-[20px] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
