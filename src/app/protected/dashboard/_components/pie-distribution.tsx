"use client";

import { useEffect, useState } from "react";
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
import { HttpDashboardService } from "@/services/http/http-dashboard.service";
import { IChartPie, IPieData } from "@/interfaces/pie-data.interface";
import { Skeleton } from "@/components/ui/skeleton";
import { IDistributionData } from "@/services/http/interfaces/responses/distribution-data.interface";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function usePieData(
  initialChartData?: IDistributionData,
  type?: string
): IPieData {
  const [chartData, setChartData] = useState<IChartPie[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setChartData([]);
    if (
      initialChartData &&
      (initialChartData?.negative > 0 ||
        initialChartData?.positive > 0 ||
        initialChartData?.neutral > 0)
    ) {
      const data = [
        {
          class: "positive",
          qtd: initialChartData.positive,
          fill: "var(--color-positive)",
        },
        {
          class: "neutral",
          qtd: initialChartData.neutral,
          fill: "var(--color-neutral)",
        },
        {
          class: "negative",
          qtd: initialChartData.negative,
          fill: "var(--color-negative)",
        },
      ];
      setChartData(data);
      setTotal(data.reduce((acc, curr) => acc + curr.qtd, 0));
      return;
    }
  }, [initialChartData, type]);

  return { chartData, total };
}

const chartConfig: ChartConfig = {
  qtd: { label: "Total" },
  positive: { label: "Promotores", color: "hsl(var(--chart-2))" },
  neutral: { label: "Neutros", color: "hsl(var(--chart-1))" },
  negative: { label: "Detratores", color: "hsl(var(--chart-5))" },
};

interface PieDistributionProps {
  chartData?: IDistributionData;
  title?: string;
  type: "nps" | "sentiment";
}

export function PieDistribution({
  chartData: initialChartData,
  title = "Distribuição",
  type = "nps",
}: PieDistributionProps) {
  const { chartData, total } = usePieData(initialChartData, type);

  if (chartData.length === 0) {
    return <Skeleton className="h-[362px] w-full" />;
  }

  return (
    <Card className="flex flex-col">
      <div className="relative p-4 pb-4">
        <h2 className="text-lg font-bold text-center">{title}</h2>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 border-none"
        >
          <Sparkles className="h-3.5 w-3.5" />
        </Button>
      </div>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={300}>
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
                nameKey="class"
                label
                innerRadius={60}
                strokeWidth={2}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
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
                content={<ChartLegendContent nameKey="class" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
