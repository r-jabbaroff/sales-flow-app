import { FaShoppingBag } from "react-icons/fa";
import { Input } from "@/components/ui/input";

import ThemeToggler from "../ThemeToggler";
import { Dispatch, SetStateAction } from "react";
import SalesDialog from "../DealDialog";
export default function Navbar({
  setSearchQuery,
  searchQuery,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div
      className={`relative flex h-20 w-full items-center justify-between overflow-hidden border-b px-6`}
    >
      {/* Header with Title and Icon */}
      <header className="left-10 top-8 flex items-center gap-2">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary">
          <FaShoppingBag className="text-lg text-white" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-semibold max-md:hidden">
          Sales <span className="font-normal text-primary">Flow</span>
        </h1>
      </header>
      <div className="flex items-center gap-3">
        <div className="relative flex w-[399px] items-center gap-3 max-sm:w-[200px]">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search..."
            className="h-10 rounded-lg"
          />
          <div className="absolute right-[4px] h-[31px]">
            <SalesDialog />
          </div>
        </div>
        {/* dark mode toggle */}
        <ThemeToggler />
      </div>
    </div>
  );
}
