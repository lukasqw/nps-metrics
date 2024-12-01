"use client";

import { IndicatorBox } from "@/components/shared/indicator-box";
import { IndicatorData } from "@/interfaces/indicator-data.interface";
import { IDistributionPeriod } from "@/services/http/interfaces/responses/distribution-period.interface";
import { useEffect, useState } from "react";

const initialIndicatorData = (
  value: number,
  variation: number,
  chartData: { period: number; value: number }[]
): IndicatorData => ({
  title: "Taxa de repostas",
  subtitle: "",
  value,
  variation,
  typeValue: "percent",
  typeVariation: "percent",
  chartData,
  chartColor: "--chart-3",
});

interface indicatorProps {
  value: number;
  variation: number;
  chartData: IDistributionPeriod[];
}

export function ResponseRateIndicator({
  value,
  variation,
  chartData,
}: indicatorProps) {
  const [indicatorData, setIndicatorData] = useState<IndicatorData>(() =>
    initialIndicatorData(value, variation, chartData)
  );

  useEffect(() => {
    setIndicatorData(initialIndicatorData(value, variation, chartData));
  }, [value, variation, chartData]);

  return <IndicatorBox data={indicatorData} />;
}
