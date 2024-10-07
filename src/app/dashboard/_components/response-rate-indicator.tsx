"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { IndicatorData } from "@/app/interfaces/indicator-data";
import { IndicatorBox } from "@/components/shared/indicator-box";

const chartData = [
  { day: 1, val: 100 },
  { day: 2, val: 60 },
  { day: 3, val: 70 },
  { day: 4, val: 50 },
  { day: 5, val: 90 },
  { day: 6, val: 100 },
];
const chartConfig = {
  val: {
    label: "val",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const indicatorData: IndicatorData = {
  title: "Taxa de repostas",
  subtitle: "",
  value: 85,
  typeValue: "percent",
  variation: 2,
  typeVariation: "percent",
};

export function ResponseRateIndicator() {
  return (
    <IndicatorBox data={indicatorData}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData} margin={{}}>
            <defs>
              <linearGradient id="fillResponseRate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-val)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-val)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="val"
              type="natural"
              fill="url(#fillResponseRate)"
              fillOpacity={0.4}
              stroke="var(--color-val)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </ResponsiveContainer>
    </IndicatorBox>
  );
}
