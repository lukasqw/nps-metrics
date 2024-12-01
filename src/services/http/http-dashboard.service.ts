import Axios from "./axios/axios.service";
import { EndpointEnum } from "./interfaces/endpoint.enum";
import { IDashboardResponse } from "./interfaces/responses/dashboard-response.interface";

export class HttpDashboardService {
  static async all(
    companyId: string,
    startDate: string,
    endDate: string
  ): Promise<IDashboardResponse> {
    try {
      const response = await Axios.get(`${EndpointEnum.REVIEWS_SUMMARY}`, {
        params: {
          company_id: companyId,
          start_date: startDate,
          end_date: endDate,
        },
      });

      // TODO mockado por enquanto
      response.data.data.response_rate = 85;
      response.data.data.response_rate_by_period = [
        { period: 1, value: 80 },
        { period: 2, value: 70 },
        { period: 3, value: 30 },
        { period: 4, value: 50 },
        { period: 5, value: 40 },
        { period: 6, value: 40 },
        { period: 7, value: 60 },
        { period: 8, value: 80 },
        { period: 9, value: 90 },
      ];

      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }

    // return new Promise((resolve) => {
    //   resolve({
    //     nps_score: 50,
    //     sentiment_score: 60,
    //     nps_distribution: {
    //       positive: 500,
    //       neutral: 200,
    //       negative: 300,
    //     },
    //     sentiment_distribution: {
    //       positive: 400,
    //       neutral: 300,
    //       negative: 300,
    //     },
    //     nps_distribution_by_period: [
    //       { period: 1, value: 80 },
    //       { period: 2, value: 90 },
    //       { period: 3, value: 70 },
    //       { period: 4, value: 110 },
    //       { period: 5, value: 105 },
    //       { period: 6, value: 120 },
    //     ],

    //     sentiment_distribution_by_period: [
    //       { period: 1, value: 80 },
    //       { period: 2, value: 90 },
    //       { period: 3, value: 70 },
    //       { period: 4, value: 110 },
    //       { period: 5, value: 105 },
    //       { period: 6, value: 120 },
    //     ],
    //     total_reviews_by_period: [
    //       { period: 1, value: 80 },
    //       { period: 2, value: 90 },
    //       { period: 3, value: 70 },
    //       { period: 4, value: 110 },
    //       { period: 5, value: 105 },
    //       { period: 6, value: 120 },
    //     ],
    //     total_reviews: 1000,
    //     response_rate: 85,
    //     response_rate_by_period: [
    //       { period: 1, value: 80 },
    //       { period: 2, value: 70 },
    //       { period: 3, value: 30 },
    //       { period: 4, value: 50 },
    //       { period: 5, value: 40 },
    //       { period: 6, value: 40 },
    //       { period: 7, value: 60 },
    //       { period: 8, value: 80 },
    //       { period: 9, value: 90 },
    //     ],
    //   });
    // });
  }
}
