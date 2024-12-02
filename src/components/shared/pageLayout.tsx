import React, { ReactNode } from "react";
import Header from "@/components/shared/header";
import Sidebar from "@/components/shared/sidebar";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => (
  <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
    <Sidebar />
    <div className="flex flex-col bg-gray-50 dark:bg-black">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 m-auto w-full max-w-screen-xl">
        {children}
      </main>
    </div>
  </div>
);

export default PageLayout;
