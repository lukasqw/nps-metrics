"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { IndicatorData } from "@/app/interfaces/indicator-data";
import { IndicatorBox } from "@/components/shared/indicator-box";

const chartData = [
  { day: 1, val: 300 },
  { day: 2, val: 400 },
  { day: 3, val: 350 },
  { day: 4, val: 510 },
  { day: 5, val: 600 },
  { day: 6, val: 540 },
];
const chartConfig = {
  val: {
    label: "val",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const indicatorData: IndicatorData = {
  title: "Total de respostas",
  subtitle: "",
  value: 523,
  typeValue: "absolute",
  variation: 35,
  typeVariation: "absolute",
};

export function TotalResponseIndicator() {
  return (
    <IndicatorBox data={indicatorData}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData} margin={{}}>
            <defs>
              <linearGradient
                id="fillTotalResponse"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
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
              fill="url(#fillTotalResponse)"
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
