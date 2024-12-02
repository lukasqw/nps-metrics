"use client";

import PageLayout from "@/components/shared/pageLayout";
import { NpsIndicator } from "./nps-indicator";
import { SentimentIndicator } from "./sentiment-indicator";
import { ResponseRateIndicator } from "./response-rate-indicator";
import { TotalResponseIndicator } from "./total-response-indicator";
import { NpsLine } from "./nps-line";
import { UsersPromotersTable } from "./users-promoters-table";
import { HeaderFilter } from "./header-filter";
import { useEffect, useState } from "react";
import { HttpDashboardService } from "@/services/http/http-dashboard.service";
import { PieDistribution } from "./pie-distribution";
import { IDashboardResponse } from "@/services/http/interfaces/responses/dashboard-response.interface";
import { useSelectedFilterDash } from "@/hooks/use-filter-dash";
import { subDays, format } from "date-fns";
import { UsersDetractorsTable } from "./users-detractors-table";
import { DialogProvider } from "../context/dialogContext";
import { DialogExplanIA } from "./dialog-explan-ia/dialog-explan-ia";

const DefaultDashboardData: IDashboardResponse = {
  nps_score: 0,
  sentiment_score: 0,
  nps_distribution: {
    positive: 0,
    neutral: 0,
    negative: 0,
  },
  sentiment_distribution: {
    positive: 0,
    neutral: 0,
    negative: 0,
  },
  nps_distribution_by_period: [],
  sentiment_distribution_by_period: [],
  total_reviews_by_period: [],
  total_reviews: 0,
  response_rate: 0,
  response_rate_by_period: [],
  last_five_negative_reviews: [],
  last_five_positive_reviews: [],
  last_year: [],
};

export function Dashboard() {
  const { selectedPeriod } = useSelectedFilterDash();
  const [dashboardData, setDashboardData] =
    useState<IDashboardResponse>(DefaultDashboardData);

  useEffect(() => {
    async function fetchData() {
      try {
        const companyId = "582c2182-5c69-4a9b-8b84-e4a71972255c";
        const endDate = new Date("2024-06-30");
        const startDate = subDays(endDate, parseInt(selectedPeriod));

        const formattedStartDate = format(startDate, "yyyy-MM-dd");
        const formattedEndDate = format(endDate, "yyyy-MM-dd");

        const response = await HttpDashboardService.all(
          companyId,
          formattedStartDate,
          formattedEndDate
        );
        if (response) {
          setDashboardData(response);
        }
      } catch (error) {
        console.error("Failed to fetch NPS Pie data", error);
      }
    }
    // setDashboardData(DefaultDashboardData);
    fetchData();
  }, [selectedPeriod]);

  return (
    <DialogProvider>
      <PageLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          <HeaderFilter />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NpsIndicator
            value={dashboardData.nps_score}
            variation={0}
            chartData={dashboardData.nps_distribution_by_period}
          />
          <SentimentIndicator
            value={dashboardData.sentiment_score}
            variation={0}
            chartData={dashboardData.sentiment_distribution_by_period}
          />
          <ResponseRateIndicator
            value={dashboardData.response_rate}
            variation={0}
            chartData={dashboardData.response_rate_by_period}
          />
          <TotalResponseIndicator
            value={dashboardData.total_reviews}
            variation={0}
            chartData={dashboardData.total_reviews_by_period}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <PieDistribution
            type="nps"
            title="Distribuição do NPS"
            chartData={dashboardData?.nps_distribution}
          />
          <PieDistribution
            type="sentiment"
            title="Distribuição do sentimento"
            chartData={dashboardData?.sentiment_distribution}
          />
          {/* <NpsBars /> */}
        </div>
        <div className="grid grid-cols-1 ">
          <NpsLine />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <UsersPromotersTable
            data={dashboardData.last_five_positive_reviews}
          />
          <UsersDetractorsTable
            data={dashboardData.last_five_negative_reviews}
          />
        </div>
      </PageLayout>
      <DialogExplanIA></DialogExplanIA>
    </DialogProvider>
  );
}
