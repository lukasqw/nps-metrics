export interface IChartPie {
  class: string;
  qtd: number;
  fill: string;
}

export interface IPieData {
  chartData: IChartPie[];
  total: number;
}
