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
import { salesPeople } from "@/components/custom/DealDialog";

type selectedSalesPersonProps = {
  selectedSalesPerson: string;
  setSelectedSalesPerson: Dispatch<SetStateAction<string>>;
};

export function SalesPeople({
  selectedSalesPerson,
  setSelectedSalesPerson,
}: selectedSalesPersonProps) {
  return (
    <div className="poppins flex flex-col gap-2">
      <Label className="text-slate-600">{`Sales person`}</Label>

      <Select
        value={selectedSalesPerson}
        onValueChange={(value) => setSelectedSalesPerson(value)}
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder="Select a sales person" />
        </SelectTrigger>
        <SelectContent className="poppins">
          {salesPeople.map((person) => (
            <SelectItem key={person} value={person}>
              {person}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
