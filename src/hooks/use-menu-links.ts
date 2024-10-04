import { Home, LineChart } from "lucide-react";

const useMenuLinks = () => {
  const menuLinks = [
    { href: "#", icon: Home, label: "Dashboard" },
    { href: "#", icon: LineChart, label: "Analytics" },
  ];

  return menuLinks;
};

export default useMenuLinks;
