"use client";

import { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SalePriority, SaleType } from "@/types/sales";

type selectedPriorityProps = {
  selectedPriority: SalePriority;
  setSelectedPriority: Dispatch<SetStateAction<SalePriority>>;
};

export function Priority({
  selectedPriority,
  setSelectedPriority,
}: selectedPriorityProps) {
  const priority: Array<SaleType["priority"]> = ["Low", "Medium", "High"];

  function renderBoxColor(priority: SaleType["priority"]) {
    switch (priority) {
      case "Low":
        return "bg-blue-500";
      case "Medium":
        return "bg-blue-700";
      case "High":
        return "bg-blue-900";

      default:
        return "bg-blue-500";
    }
  }

  return (
    <div className="poppins flex flex-col gap-2">
      <Label className="text-slate-600">{`Priority`}</Label>

      <Select
        value={selectedPriority}
        onValueChange={(value) =>
          setSelectedPriority(value as SaleType["priority"])
        }
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder="Select a priority" />
        </SelectTrigger>
        <SelectContent className="poppins">
          {priority.map((priority) => (
            <SelectItem className="flex" key={priority} value={priority}>
              <div className="flex items-center gap-2">
                <div
                  className={`size-4 ${renderBoxColor(priority)} rounded-md`}
                ></div>
                <span>{priority}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
