"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple line chart";

// Gerador de valores aleatórios com variação de 20% do valor anterior
const months = ["January", "February", "March", "April", "May", "June"];
const generateRandomValuesWithVariation = (
  numPoints: number,
  min: number,
  max: number
) => {
  const values = [Math.floor(Math.random() * (max - min + 1)) + min]; // Primeiro valor aleatório

  for (let i = 1; i < numPoints; i++) {
    const previousValue = values[i - 1];
    const variation = previousValue * 0.5;
    const newValue = Math.floor(
      Math.random() * (2 * variation + 1) + (previousValue - variation)
    );
    values.push(Math.max(min, Math.min(max, newValue))); // Garantir que o valor esteja dentro do intervalo
  }

  return values;
};
const desktopValues = generateRandomValuesWithVariation(months.length, 0, 100);
const mobileValues = generateRandomValuesWithVariation(months.length, 0, 100);
const chartData = months.map((month, index) => ({
  month,
  desktop: desktopValues[index],
  mobile: mobileValues[index],
}));
// ------

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function NpsLine() {
  return (
    <Card>
      <div className="p-4 pb-4">
        <h2 className="text-lg font-bold">
          Evolução do NPS x Sentimento Geral
        </h2>
      </div>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  dataKey="desktop"
                  position="bottom"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-mobile)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  dataKey="mobile"
                  position="bottom"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
