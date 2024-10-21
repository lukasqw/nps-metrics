import { useSelectedPeriod } from "@/app/protected/dashboard/context/selectedFilterDash";

export function useSelectedFilterDash() {
  const { selectedPeriod, setSelectedPeriod } = useSelectedPeriod();

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  return {
    selectedPeriod,
    handlePeriodChange,
  };
}
