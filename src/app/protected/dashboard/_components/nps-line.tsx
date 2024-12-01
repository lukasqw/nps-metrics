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
import { IMonthValues } from "@/services/http/interfaces/responses/month-values.interfaces";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const chartConfig = {
  nps: {
    label: "NPS",
    color: "hsl(var(--chart-1))",
  },
  sentiment: {
    label: "Sentimento",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface NpsLineProps {
  data: IMonthValues[];
}

const mapMonthNumberToName = (monthNumber: number): string => {
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return monthNames[monthNumber - 1];
};

export function NpsLine({ data }: NpsLineProps) {
  const sortedData = data.sort((a, b) => a.month - b.month);
  const mappedData = sortedData.map((item) => ({
    ...item,
    month: mapMonthNumberToName(item.month),
  }));

  return (
    <div>
      {mappedData.length === 0 ? (
        <Skeleton className="h-[386px] w-full" />
      ) : (
        <Card>
          <div className="p-4 pb-4 flex justify-between">
            <h2 className="text-lg font-bold">
              Evolução do NPS x Sentimento Geral
            </h2>
            <Button variant="outline" size="icon" className="border-none">
              <Sparkles className="h-3.5 w-3.5" />
            </Button>
          </div>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={mappedData}
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
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Line
                    dataKey="nps"
                    type="monotone"
                    stroke="var(--color-nps)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-nps)",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  >
                    <LabelList
                      dataKey="nps"
                      position="bottom"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Line>
                  <Line
                    dataKey="sentiment"
                    type="monotone"
                    stroke="var(--color-sentiment)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-sentiment)",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  >
                    <LabelList
                      dataKey="sentiment"
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
      )}
    </div>
  );
}
