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
import { useEffect, useState } from "react";
import { format, startOfYear, endOfYear } from "date-fns";
import { HttpDashboardService } from "@/services/http/http-dashboard.service";
import { useDialog } from "../context/dialogContext";

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

function generatePrompt(title: string, chartData: IMonthValues[]): string {
  return `
Análise do Gráfico - ${title}
Valor do NPS e Sentimento Geral por mês no último ano:
${chartData
  .map(
    (item) =>
      `${mapMonthNumberToName(item.month)}: NPS ${item.nps} - Sentimento ${
        item.sentiment
      }`
  )
  .join("\n")}

Com base nos dados fornecidos, forneça uma análise detalhada sobre a disposição do NPS e Sentimento Geral, incluindo:
1. Tendências gerais observadas no NPS e Sentimento Geral ao longo do período.
2. Possíveis causas para variações no NPS e Sentimento Geral em relação aos meses anteriores.
3. Identificação de quaisquer padrões sazonais ou eventos específicos que possam ter influenciado os resultados.
4. Sugestões de ações para melhorar o NPS e Sentimento Geral nos próximos períodos.
5. Comparação com benchmarks da indústria, se disponível.
6. Qualquer outra observação relevante que possa ser extraída dos dados fornecidos.
  `;
}

export function NpsLine() {
  const [data, setData] = useState<IMonthValues[]>([]);
  const [loading, setLoading] = useState(true);
  const { setDialogOpen, setDialogParams } = useDialog();

  function openDialog() {
    if (data) {
      const prompt = generatePrompt("Evolução do NPS x Sentimento Geral", data);
      setDialogParams({
        title: "Evolução do NPS x Sentimento Geral",
        prompt,
      });
      setDialogOpen(true);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const companyId = "582c2182-5c69-4a9b-8b84-e4a71972255c";
        const endDate = endOfYear(new Date());
        const startDate = startOfYear(new Date());

        const formattedStartDate = format(startDate, "yyyy-MM-dd");
        const formattedEndDate = format(endDate, "yyyy-MM-dd");

        const response = await HttpDashboardService.all(
          companyId,
          formattedStartDate,
          formattedEndDate
        );
        if (response) {
          setData(response.last_year);
        }
      } catch (error) {
        console.error("Failed to fetch NPS data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const sortedData = data.sort((a, b) => a.month - b.month);
  const mappedData = sortedData.map((item) => ({
    ...item,
    month: mapMonthNumberToName(item.month),
  }));

  return (
    <div>
      {loading ? (
        <Skeleton className="h-[386px] w-full" />
      ) : (
        <Card>
          <div className="p-4 pb-4 flex justify-between">
            <h2 className="text-lg font-bold">
              Evolução do NPS x Sentimento Geral
            </h2>
            <Button
              variant="outline"
              size="icon"
              className="border-none"
              onClick={() => openDialog()}
            >
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
