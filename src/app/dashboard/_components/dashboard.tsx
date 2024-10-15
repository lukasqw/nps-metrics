"use client";

import PageLayout from "@/components/shared/pageLayout";
import { NpsIndicator } from "./nps-indicator";
import { SentimentIndicator } from "./sentiment-indicator";
import { ResponseRateIndicator } from "./response-rate-indicator";
import { TotalResponseIndicator } from "./total-response-indicator";
import { NpsPie } from "./nps-pie";
import { SentimentPie } from "./sentiment-pie";
// import { NpsBars } from "./nps-bars";
import { NpsLine } from "./nps-line";
import { UsersPromotersTable } from "./users-promoters-table";
import { UsersDetractorsTable } from "./users-detractors-table copy";
import { HeaderFilter } from "./header-filter";
import { SelectedFilterDashProvider } from "../context/selectedFilterDash";

export function Dashboard() {
  return (
    <SelectedFilterDashProvider>
      <PageLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          <HeaderFilter />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NpsIndicator />
          <SentimentIndicator />
          <ResponseRateIndicator />
          <TotalResponseIndicator />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <NpsPie />
          <SentimentPie />
          {/* <NpsBars /> */}
        </div>
        <div className="grid grid-cols-1 ">
          <NpsLine />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <UsersPromotersTable />
          <UsersDetractorsTable />
        </div>
      </PageLayout>
    </SelectedFilterDashProvider>
  );
}
