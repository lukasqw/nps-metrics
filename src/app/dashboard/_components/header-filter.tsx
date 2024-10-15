import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSelectedFilterDash } from "@/hooks/use-filter-dash";
import { ListFilter } from "lucide-react";

const toggleItems = [
  { value: "90", label: "90d" },
  { value: "60", label: "60d" },
  { value: "30", label: "30d" },
];

export function HeaderFilter() {
  const { selectedPeriod, handlePeriodChange } = useSelectedFilterDash();

  return (
    <div className="flex gap-1">
      <ToggleGroup
        type="single"
        value={selectedPeriod}
        onValueChange={handlePeriodChange}
      >
        {toggleItems.map((item) => (
          <ToggleGroupItem
            key={item.value}
            variant="outline"
            size="sm"
            value={item.value}
            className="h-7 gap-1"
          >
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Button variant="outline" size="sm" className="h-7 gap-1 px-2">
        <ListFilter className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Filter
        </span>
      </Button>
    </div>
  );
}
