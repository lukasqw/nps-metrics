"use client";

import PageLayout from "@/components/shared/pageLayout";
import { NpsIndicator } from "./nps-indicator";
import { SentimentIndicator } from "./sentiment-indicator";
import { ResponseRateIndicator } from "./response-rate-indicator";
import { TotalResponseIndicator } from "./total-response-indicator";

export function Dashboard() {
  return (
    <PageLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <NpsIndicator />
        <SentimentIndicator />
        <ResponseRateIndicator />
        <TotalResponseIndicator />
      </div>
    </PageLayout>
  );
}
