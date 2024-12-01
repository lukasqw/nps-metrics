"use client";
import { Dashboard } from "./_components/dashboard";
import { SelectedFilterDashProvider } from "./context/selectedFilterDash";

export default function Page() {
  return (
    <SelectedFilterDashProvider>
      <Dashboard />
    </SelectedFilterDashProvider>
  );
}
