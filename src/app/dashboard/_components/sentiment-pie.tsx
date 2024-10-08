"use client";

import * as React from "react";
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { typeNps: "promoters", qtd: 123, fill: "var(--color-promoters)" },
  { typeNps: "passives", qtd: 550, fill: "var(--color-passives)" },
  { typeNps: "detractors", qtd: 350, fill: "var(--color-detractors)" },
];

const chartConfig = {
  qtd: {
    label: "Total",
  },
  promoters: {
    label: "Promotores",
    color: "hsl(var(--chart-2))",
  },
  passives: {
    label: "Neutros",
    color: "hsl(var(--chart-1))",
  },
  detractors: {
    label: "Detratores",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function SentimentPie() {
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.qtd, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <div className="text-center p-4 pb-1">
        <h2 className="text-lg font-bold">Distribuição dos sentimentos</h2>
      </div>

      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="qtd"
                nameKey="typeNps"
                label
                innerRadius={60}
                strokeWidth={2}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const { cx, cy } = viewBox;
                      return (
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={cx}
                            y={cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={cx}
                            y={(cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="typeNps" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
