import { MdContentCopy, MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { MdMoreVert } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { SaleType } from "@/types/sales";
import { useSalesStore } from "@/lib/useSalesStore";
import { nanoid } from "nanoid";
import { useToast } from "@/hooks/useToast";

export default function ActionDropDown({ row }: { row: Row<SaleType> }) {
  const { setOpenDeleteDialog, setSelectedSale, setOpenDealDialog, addSale } =
    useSalesStore();

  const { toast } = useToast();

  const menuItems = [
    { icon: <MdContentCopy />, label: "Copy", className: "" },
    { icon: <FaRegEdit />, label: "Edit", className: "" },

    {
      icon: <MdOutlineDelete className="text-lg" />,
      label: "Delete",
      className: "text-red-600",
    },
  ];

  async function handleClickedItem(item: string) {
    if (item === "Copy") {
      const CopyOfSale: SaleType = {
        ...row.original,
        id: nanoid(),
        customerName: `${row.original.customerName} (copy)`,
      };

      const result = await addSale(CopyOfSale);

      if (result) {
        toast({
          title: "Sale Copied!",
          description: "The sale has been copied successfully",
        });
      }
    }
    if (item === "Edit") {
      setSelectedSale(row.original);
      setOpenDealDialog(true);
    }
    if (item === "Delete") {
      setSelectedSale(row.original);
      //Open up the delete dialog
      setOpenDeleteDialog(true);
    }
  }

  return (
    <DropdownMenu>
      {/* Trigger drop down which is the more icon */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MdMoreVert className="h-4 w-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="poppins">
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className={`flex items-center gap-1 p-[10px] ${item.className}`}
            onClick={() => {
              handleClickedItem(item.label);
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
