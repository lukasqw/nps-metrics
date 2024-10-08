"use client";

import { IndicatorData } from "@/app/interfaces/indicator-data";
import { IndicatorBox } from "@/components/shared/indicator-box";

const chartData = [
  { day: 1, value: 80 },
  { day: 2, value: 90 },
  { day: 3, value: 70 },
  { day: 4, value: 110 },
  { day: 5, value: 105 },
  { day: 6, value: 120 },
];

const indicatorData: IndicatorData = {
  title: "Média do NPS",
  subtitle: "",
  value: 70,
  variation: -10,
  typeVariation: "percent",
  chartData,
  chartColor: "--chart-1",
};

export function NpsIndicator() {
  return <IndicatorBox data={indicatorData}></IndicatorBox>;
}
