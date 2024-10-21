"use client";

import { useEffect, useState } from "react";

import { IndicatorBox } from "@/components/shared/indicator-box";
import { useSelectedFilterDash } from "@/hooks/use-filter-dash";
import { IndicatorData } from "@/interfaces/indicator-data";

const initialChartData = [
  { day: 1, value: 80 },
  { day: 2, value: 90 },
  { day: 3, value: 70 },
  { day: 4, value: 110 },
  { day: 5, value: 105 },
  { day: 6, value: 120 },
];

const initialIndicatorData: IndicatorData = {
  title: "Média do NPS",
  subtitle: "",
  value: 70,
  variation: -10,
  typeVariation: "percent",
  chartData: initialChartData,
  chartColor: "--chart-1",
};

export function NpsIndicator() {
  const { selectedPeriod } = useSelectedFilterDash();
  const [indicatorData, setIndicatorData] =
    useState<IndicatorData>(initialIndicatorData);

  const reloadChartData = () => {
    const newChartData = initialChartData.map((data) => ({
      ...data,
      value: data.value + Math.floor(Math.random() * 20 - 10), // Random variation for demonstration
    }));
    setIndicatorData((prevData) => ({
      ...prevData!,
      chartData: newChartData,
    }));
  };

  useEffect(() => {
    setIndicatorData((prev) => ({
      ...prev,
      chartData: undefined,
    })); // Set to undefined to show skeleton

    const timeoutId = setTimeout(reloadChartData, 1000); // 1-second delay

    return () => clearTimeout(timeoutId);
  }, [selectedPeriod]);

  return <IndicatorBox data={indicatorData} />;
}
