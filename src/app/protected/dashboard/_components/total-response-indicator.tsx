"use client";

import { IndicatorData } from "@/interfaces/indicator-data";
import { IndicatorBox } from "@/components/shared/indicator-box";
import { useSelectedFilterDash } from "@/hooks/use-filter-dash";
import { useEffect, useState } from "react";

const initialChartData = [
  { day: 1, value: 300 },
  { day: 2, value: 400 },
  { day: 3, value: 350 },
  { day: 4, value: 510 },
  { day: 5, value: 600 },
  { day: 6, value: 540 },
];

const initialIndicatorData: IndicatorData = {
  title: "Total de respostas",
  subtitle: "",
  value: 523,
  typeValue: "absolute",
  variation: 35,
  typeVariation: "absolute",
  chartData: initialChartData,
  chartColor: "--chart-4",
};

export function TotalResponseIndicator() {
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
