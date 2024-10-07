import { Card } from "@/components/ui/card";
import { IndicatorData } from "@/app/interfaces/indicator-data";
import { ReactNode } from "react";

interface IndicatorBoxProps {
  data: IndicatorData;
  children?: ReactNode;
}

export function IndicatorBox({ data, children }: IndicatorBoxProps) {
  const isPositiveVariation = data.variation >= 0;
  const variationColor = isPositiveVariation
    ? "text-green-500 bg-green-300"
    : "text-red-500 bg-red-300";
  const valueUnit = data.typeValue === "percent" ? "%" : "";
  const variationSign = isPositiveVariation ? "+" : "";
  const variationUnit = data.typeVariation === "percent" ? "%" : "";

  return (
    <Card className="p-0 flex flex-col justify-between">
      <div className="p-4 gap-2">
        <div>
          <h2 className="text-lg font-bold">{data.title}</h2>
          {data.subtitle && (
            <span className="text-sm text-gray-500">{data.subtitle}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="text-4xl md:text-5xl font-bold">
            {data.value}
            <span className="text-3xl md:text-4xl font-thin">{valueUnit}</span>
          </div>
          <div
            className={`text-sm font-bold ${variationColor} bg-opacity-20 rounded-md px-1.5 py-0.5`}
          >
            {variationSign}
            {data.variation}
            {variationUnit}
          </div>
        </div>
      </div>
      <div className="h-[60px]">{children}</div>
    </Card>
  );
}
