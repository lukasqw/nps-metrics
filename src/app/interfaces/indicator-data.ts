export interface IndicatorData {
  title: string;
  subtitle: string;
  value: number;
  variation: number;
  typeValue?: "percent" | "absolute";
  typeVariation?: "percent" | "absolute";
  chartData?: { [key: string]: number }[];
  chartColor: string;
}
