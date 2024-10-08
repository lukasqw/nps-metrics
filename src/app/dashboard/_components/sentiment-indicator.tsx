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
  title: "Sentimento Geral",
  subtitle: "",
  value: 50,
  variation: 10,
  typeVariation: "absolute",
  chartData,
  chartColor: "--chart-2",
};

export function SentimentIndicator() {
  return <IndicatorBox data={indicatorData}></IndicatorBox>;
}
