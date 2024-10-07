export interface IndicatorData {
  title: string;
  subtitle: string;
  value: number;
  variation: number;
  typeValue?: "percent" | "absolute";
  typeVariation?: "percent" | "absolute";
}
