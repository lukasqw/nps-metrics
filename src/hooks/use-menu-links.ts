import { Home, LineChart, Table } from "lucide-react";

const useMenuLinks = () => {
  const menuLinks = [
    { href: "/protected/dashboard", icon: Home, label: "Dashboard" },
    { href: "/protected/comments", icon: Table, label: "Comentários" },
    { href: "/protected/analytics", icon: LineChart, label: "Analytics" },
  ];

  return menuLinks;
};

export default useMenuLinks;
