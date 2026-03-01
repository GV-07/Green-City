"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { energyData } from "@/lib/data";
import { Flame, Recycle, Leaf, IndianRupee, ArrowRight, Wind, Fuel, Dot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSettings } from "@/lib/settings";

const barChartConfig = {
  energy: {
    label: "Energy (MWh)",
    color: "hsl(var(--accent))",
  },
};

const pieChartConfig = {
    value: {
        label: "MWh",
    },
    "Temple Flowers": {
        label: "Temple Flowers",
        color: "hsl(var(--chart-1))",
    },
    "Market Waste": {
        label: "Market Waste",
        color: "hsl(var(--chart-2))",
    },
    "Hotel Waste": {
        label: "Hotel Waste",
        color: "hsl(var(--chart-4))",
    },
}

function EnergyProductionChart() {
  return (
    <ChartContainer config={barChartConfig} className="h-[250px] w-full">
      <ResponsiveContainer>
        <BarChart data={energyData.productionOverTime} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="month"
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
          <Bar dataKey="energy" fill="var(--color-energy)" radius={8} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function EnergySourceChart() {
    return (
        <ChartContainer
            config={pieChartConfig}
            className="mx-auto aspect-square h-[250px]"
        >
        <ResponsiveContainer>
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={energyData.energyBySource} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                    {energyData.energyBySource.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
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

function PipelineStage({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
    return (
        <div className="flex flex-col items-center text-center p-2 rounded-lg bg-secondary/50 flex-1">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mb-3">
                <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-bold font-headline text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
        </div>
    )
}

function RevenueBreakdownItem({ name, value, currency, unit }: { name: string, value: number, currency: string, unit: string }) {
    return (
        <div className="flex justify-between items-center text-sm py-2 border-b last:border-b-0">
            <span className="text-muted-foreground">{name}</span>
            <span className="font-semibold font-mono">{currency}{value}{unit}</span>
        </div>
    )
}

export default function EnergyPipelinePage() {
  const { t } = useSettings();
  return (
    <AppLayout title={t('energy_pipeline')}>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <StatCard
          title="Waste Converted"
          value={`${energyData.stats.wasteConverted} T`}
          icon={Recycle}
          description="Floral & organic waste processed"
        />
        <StatCard
          title="Bio-CNG Generated"
          value={`${energyData.stats.energyGenerated} MWh`}
          icon={Flame}
          description="Equivalent energy produced"
          color="accent"
        />
        <StatCard
          title="Compost Produced"
          value={`${energyData.stats.compostProduced} T`}
          icon={Leaf}
          description="High-quality organic compost"
        />
        <StatCard
          title="Revenue Generated"
          value={`₹${energyData.stats.revenueGenerated.total} L`}
          icon={IndianRupee}
          description="From sales of energy and compost"
        />
        <StatCard
          title="CO₂ Reduced"
          value={`${energyData.stats.co2Reduced} T`}
          icon={Wind}
          description="Carbon dioxide emissions avoided"
        />
        <StatCard
          title="Diesel Replaced"
          value={`${(energyData.stats.dieselReplaced / 1000).toFixed(1)}K L`}
          icon={Fuel}
          description="Fossil fuel consumption offset"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Energy Production</CardTitle>
            <CardDescription>Monthly Bio-CNG generation from waste.</CardDescription>
          </CardHeader>
          <CardContent>
            <EnergyProductionChart />
          </CardContent>
        </Card>

        <div className="col-span-1 lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Biogas Plant Status</CardTitle>
                    <CardDescription>Real-time operational health.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Status</span>
                        <Badge className={cn({
                            "bg-green-600 hover:bg-green-700": energyData.plantStatus.status === 'Running',
                            "bg-yellow-500 hover:bg-yellow-600": energyData.plantStatus.status === 'Under Maintenance',
                            "bg-red-600 hover:bg-red-700": energyData.plantStatus.status === 'Offline',
                        })}>
                            <Dot className="mr-1 h-4 w-4" />
                            {energyData.plantStatus.status}
                        </Badge>
                    </div>
                     <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Current Output</span>
                        <span className="font-semibold">{energyData.plantStatus.currentOutput}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Service</span>
                        <span className="font-semibold">{energyData.plantStatus.lastService}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Revenue Breakdown</CardTitle>
                    <CardDescription>Sources of income from the pipeline.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RevenueBreakdownItem name="Bio-CNG Sales" value={energyData.stats.revenueGenerated.bioCNG} currency="₹" unit="L" />
                    <RevenueBreakdownItem name="Compost Sales" value={energyData.stats.revenueGenerated.compost} currency="₹" unit="L" />
                    <RevenueBreakdownItem name="Carbon Credits" value={energyData.stats.revenueGenerated.carbonCredits} currency="₹" unit="L" />
                </CardContent>
            </Card>
        </div>
      </div>

       <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="font-headline">Energy by Source</CardTitle>
                    <CardDescription>Breakdown of energy generation by waste type.</CardDescription>
                </CardHeader>
                <CardContent>
                    <EnergySourceChart />
                </CardContent>
            </Card>

             <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                    <CardTitle className="font-headline">How It Works</CardTitle>
                    <CardDescription>From sacred waste to clean energy.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-full">
                    <div className="flex items-center justify-center gap-4 w-full">
                       <PipelineStage icon={Recycle} title="Collection" description="Floral & market waste" />
                       <ArrowRight className="h-8 w-8 text-muted-foreground shrink-0" />
                       <PipelineStage icon={Flame} title="Conversion" description="Anaerobic Digestion" />
                       <ArrowRight className="h-8 w-8 text-muted-foreground shrink-0" />
                       <PipelineStage icon={Leaf} title="Output" description="Bio-CNG & Compost" />
                    </div>
                </CardContent>
            </Card>
       </div>
    </AppLayout>
  );
}
