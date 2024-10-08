"use client";

import { IndicatorData } from "@/app/interfaces/indicator-data";
import { IndicatorBox } from "@/components/shared/indicator-box";

const chartData = [
  { day: 1, value: 300 },
  { day: 2, value: 400 },
  { day: 3, value: 350 },
  { day: 4, value: 510 },
  { day: 5, value: 600 },
  { day: 6, value: 540 },
];

const indicatorData: IndicatorData = {
  title: "Total de respostas",
  subtitle: "",
  value: 523,
  typeValue: "absolute",
  variation: 35,
  typeVariation: "absolute",
  chartData,
  chartColor: "--chart-4",
};

export function TotalResponseIndicator() {
  return <IndicatorBox data={indicatorData}></IndicatorBox>;
}
