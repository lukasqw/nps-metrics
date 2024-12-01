import { Card } from "@/components/ui/card";

import { ReactNode } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "../ui/skeleton";
import { IndicatorData } from "@/interfaces/indicator-data.interface";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

interface IndicatorBoxProps {
  data: IndicatorData;
  children?: ReactNode;
}

function generateId(text: string): string {
  const normalizeText = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const random = Math.random().toString(36).substring(2, 11);
  return `${normalizeText}-${random}`;
}

function getChartConfig(chartColor: string): ChartConfig {
  return {
    value: {
      label: "value",
      color: `hsl(var(${chartColor}))`,
    },
  } satisfies ChartConfig;
}

export function IndicatorBox({ data }: IndicatorBoxProps) {
  const uniqueId = generateId(data.title);
  const chartConfig = getChartConfig(data.chartColor);

  const isPositiveVariation = data.variation >= 0;
  const variationColor = isPositiveVariation
    ? "text-green-500 bg-green-300"
    : "text-red-500 bg-red-300";
  const valueUnit = data.typeValue === "percent" ? "%" : "";
  const variationSign = isPositiveVariation ? "+" : "";
  const variationUnit = data.typeVariation === "percent" ? "%" : "";
  const showChart = (data.chartData?.length ?? 0) > 0;
  const showVariation = data.variation !== 0;

  return (
    <div>
      {showChart ? (
        <Card className="p-0 flex flex-col justify-between">
          <div className="p-4 pb-1 gap-2">
            <div>
              <div className="flex justify-between">
                <h2 className="text-lg font-bold">{data.title}</h2>
                <Button variant="outline" size="icon" className="border-none">
                  <Sparkles className="h-3.5 w-3.5" />
                </Button>
              </div>

              {data.subtitle && (
                <span className="text-sm text-gray-500">{data.subtitle}</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-4xl md:text-5xl font-bold">
                {data.value}
                <span className="text-3xl md:text-4xl font-thin">
                  {valueUnit}
                </span>
              </div>
              {showVariation && (
                <div
                  className={`text-sm font-bold ${variationColor} bg-opacity-20 rounded-md px-1.5 py-0.5`}
                >
                  {variationSign}
                  {data.variation}
                  {variationUnit}
                </div>
              )}
            </div>
          </div>
          <div className="h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer config={chartConfig}>
                <AreaChart accessibilityLayer data={data.chartData} margin={{}}>
                  <defs>
                    <linearGradient
                      id={`fill-${uniqueId}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={chartConfig.value.color}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={chartConfig.value.color}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="value"
                    type="natural"
                    fill={`url(#fill-${uniqueId})`}
                    fillOpacity={0.4}
                    stroke={chartConfig.value.color}
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </ResponsiveContainer>
          </div>
        </Card>
      ) : (
        <Skeleton className="h-[166px] w-full" />
      )}
    </div>
  );
}
