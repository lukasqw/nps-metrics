import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "../ui/skeleton";
import { IndicatorData } from "@/interfaces/indicator-data.interface";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { useDialog } from "@/app/protected/dashboard/context/dialogContext";

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

const analysisTypeMap = new Map<RegExp, string>([
  [/nps/i, "NPS"],
  [
    /sentimento geral/i,
    "NPS calculado a partir do Sentimento Geral dos comentários dos clientes",
  ],
  [/taxa de resposta/i, "taxa de resposta"],
  [/total de respostas/i, "total de respostas"],
]);

const getAnalysisType = (title: string): string => {
  const entries = Array.from(analysisTypeMap.entries());
  for (const [pattern, type] of entries) {
    if (pattern.test(title)) {
      return type;
    }
  }
  return "informações fornecidas";
};

const generatePrompt = (data: IndicatorData): string => {
  const analysisType = getAnalysisType(data.title);
  return `
Análise do Gráfico - ${data.title}
Valor do ${analysisType} no período: ${data.value}
Dados do gráfico de linha: [${data.chartData
    ?.map((d) => `Período: ${d.period}, Valor: ${d.value}`)
    .join("; ")}]

Com base nos dados fornecidos, forneça uma análise detalhada sobre a disposição do ${analysisType}, incluindo:
1. Tendências gerais observadas no ${analysisType} ao longo do período.
2. Possíveis causas para a variação do ${analysisType} em relação ao período anterior.
3. Identificação de quaisquer padrões sazonais ou eventos específicos que possam ter influenciado os resultados.
4. Sugestões de ações para melhorar o ${analysisType} nos próximos períodos.
5. Comparação com benchmarks da indústria, se disponível.
6. Qualquer outra observação relevante que possa ser extraída dos dados fornecidos.
  `;
};

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
  const { setDialogOpen, setDialogParams } = useDialog();

  function openDialog() {
    const prompt = generatePrompt(data);

    setDialogParams({
      title: data.title,
      prompt,
    });
    setDialogOpen(true);
  }

  return (
    <div>
      {showChart ? (
        <Card className="p-0 flex flex-col justify-between">
          <div className="p-4 pb-1 gap-2">
            <div>
              <div className="flex justify-between">
                <h2 className="text-lg font-bold">{data.title}</h2>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-none"
                  onClick={() => openDialog()}
                >
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
