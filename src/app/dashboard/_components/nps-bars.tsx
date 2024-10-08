"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// gerador de valores aleatórios
const totalResponses = 2000;
const distributionRatios = {
  detractors: 0.4,
  passives: 0.3,
  promoters: 0.3,
};
const generateRandomValues = (total, ratio) => {
  const values = [];
  let remaining = total;

  for (let i = 0; i < 10; i++) {
    const value = Math.round(Math.random() * remaining * ratio);
    values.push(value);
    remaining -= value;
  }

  return values;
};
const detractorsValues = generateRandomValues(
  totalResponses * distributionRatios.detractors,
  1 / 5
);
const passivesValues = generateRandomValues(
  totalResponses * distributionRatios.passives,
  1 / 2
);
const promotersValues = generateRandomValues(
  totalResponses * distributionRatios.promoters,
  1 / 3
);

const chartData = [
  { nota: "1", value: detractorsValues[0], fill: "var(--color-detractors)" },
  { nota: "2", value: detractorsValues[1], fill: "var(--color-detractors)" },
  { nota: "3", value: detractorsValues[2], fill: "var(--color-detractors)" },
  { nota: "4", value: detractorsValues[3], fill: "var(--color-detractors)" },
  { nota: "5", value: detractorsValues[4], fill: "var(--color-detractors)" },
  { nota: "6", value: passivesValues[0], fill: "var(--color-passives)" },
  { nota: "7", value: passivesValues[1], fill: "var(--color-passives)" },
  { nota: "8", value: promotersValues[0], fill: "var(--color-promoters)" },
  { nota: "9", value: promotersValues[1], fill: "var(--color-promoters)" },
  { nota: "10", value: promotersValues[2], fill: "var(--color-promoters)" },
];

// config das cores
const chartConfig = {
  promoters: {
    label: "Promotores",
    color: "hsl(var(--chart-2))",
  },
  passives: {
    label: "Passivos",
    color: "hsl(var(--chart-1))",
  },
  detractors: {
    label: "1",
    color: "hsl(var(--chart-5))",
  },
  value: {
    label: "usuários",
  },
} satisfies ChartConfig;

export function NpsBars() {
  return (
    <Card>
      <div className="p-4 pb-2">
        <h2 className="text-lg font-bold">Distribuição do NPS</h2>
      </div>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="nota"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
