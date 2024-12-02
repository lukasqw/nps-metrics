import Link from "next/link";
import { ChartPie } from "lucide-react";
import useMenuLinks from "@/hooks/use-menu-links";

const Sidebar = () => {
  const menuLinks = useMenuLinks();

  return (
    <div className="hidden border-r bg-white dark:bg-zinc-950 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ChartPie className="h-6 w-6" />
            <span className="mt-1">
              NPS<span className="text-sm">metrics</span>
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menuLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
