"use client";

import { IndicatorData } from "@/app/interfaces/indicator-data";
import { IndicatorBox } from "@/components/shared/indicator-box";
import { useSelectedFilterDash } from "@/hooks/use-filter-dash";
import { useEffect, useState } from "react";

const initialChartData = [
  { day: 1, value: 100 },
  { day: 2, value: 60 },
  { day: 3, value: 70 },
  { day: 4, value: 50 },
  { day: 5, value: 90 },
  { day: 6, value: 100 },
];

const initialIndicatorData: IndicatorData = {
  title: "Taxa de repostas",
  subtitle: "",
  value: 85,
  typeValue: "percent",
  variation: 2,
  typeVariation: "percent",
  chartData: initialChartData,
  chartColor: "--chart-3",
};

export function ResponseRateIndicator() {
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
