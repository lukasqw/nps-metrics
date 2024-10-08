"use client";

import { IndicatorData } from "@/app/interfaces/indicator-data";
import { IndicatorBox } from "@/components/shared/indicator-box";

const chartData = [
  { day: 1, value: 100 },
  { day: 2, value: 60 },
  { day: 3, value: 70 },
  { day: 4, value: 50 },
  { day: 5, value: 90 },
  { day: 6, value: 100 },
];

const indicatorData: IndicatorData = {
  title: "Taxa de repostas",
  subtitle: "",
  value: 85,
  typeValue: "percent",
  variation: 2,
  typeVariation: "percent",
  chartData,
  chartColor: "--chart-3",
};

export function ResponseRateIndicator() {
  return <IndicatorBox data={indicatorData}></IndicatorBox>;
}
