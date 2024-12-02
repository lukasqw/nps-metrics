import React, { createContext, useContext, useState, ReactNode } from "react";

interface SelectedPeriodContextProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
}

const SelectedPeriodContext = createContext<
  SelectedPeriodContextProps | undefined
>(undefined);

export const SelectedFilterDashProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("120");

  return (
    <SelectedPeriodContext.Provider
      value={{ selectedPeriod, setSelectedPeriod }}
    >
      {children}
    </SelectedPeriodContext.Provider>
  );
};

export const useSelectedPeriod = () => {
  const context = useContext(SelectedPeriodContext);
  if (!context) {
    throw new Error(
      "useSelectedPeriod must be used within a SelectedPeriodProvider"
    );
  }
  return context;
};
