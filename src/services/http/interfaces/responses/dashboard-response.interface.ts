import { IDistributionData } from "./distribution-data.interface";
import { IDistributionPeriod } from "./distribution-period.interface";
import { ILastReviews } from "./last-reviews.interface";
import { IMonthValues } from "./month-values.interfaces";

export interface IDashboardResponse {
  last_five_negative_reviews: ILastReviews[];
  last_five_positive_reviews: ILastReviews[];
  last_year: IMonthValues[];
  nps_distribution_by_period: IDistributionPeriod[];
  nps_distribution: IDistributionData;
  nps_score: number;
  response_rate_by_period: IDistributionPeriod[];
  response_rate: number;
  sentiment_distribution_by_period: IDistributionPeriod[];
  sentiment_distribution: IDistributionData;
  sentiment_score: number;
  total_reviews_by_period: IDistributionPeriod[];
  total_reviews: number;
}
