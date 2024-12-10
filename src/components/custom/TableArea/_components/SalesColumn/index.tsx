import { SaleType } from "@/types/sales";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import ActionDropDown from "@/components/custom/ActionDropDown";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { LuArrowDownUp } from "react-icons/lu";
import { IoArrowUpSharp, IoArrowDownSharp } from "react-icons/io5";

interface SortableHeaderProps {
  column: Column<SaleType, unknown>;
  label: string;
}
function sortingIcon(isSorted: boolean | string) {
  if (isSorted === "asc") {
    return <IoArrowUpSharp />;
  } else if (isSorted === "desc") {
    return <IoArrowDownSharp />;
  } else {
    return <LuArrowDownUp />;
  }
}

function SortableHeader({ column, label }: SortableHeaderProps) {
  const isSorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      className={`${isSorted && "text-primary"}`}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      {sortingIcon(isSorted)}
    </Button>
  );
}

export const salesColumns: ColumnDef<SaleType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="pl-4">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Customer Name" />;
    },
  },
  {
    accessorKey: "dealValue",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Deal Value" />;
    },
    cell: ({ row }) => {
      const saleValue = row.original.dealValue;

      // Remove any non-numeric characters and convert to number
      const numericSaleValue = parseFloat(saleValue.replace(/[^0-9.-]+/g, ""));

      // Format the numeric value as currency
      const formattedSaleValue = numericSaleValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      return <span>{formattedSaleValue}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Status" />;
    },
    cell: ({ row }) => {
      return (
        <Badge className="select-none rounded-xl bg-primary/15 font-normal text-primary shadow-none">
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "contactDate",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Contact Date" />;
    },
    cell: ({ row }) => {
      const contactDate = row.original.contactDate; // Access the raw date value
      const formattedDate = contactDate
        ? format(new Date(contactDate), "dd/MM/yyyy") // Format the date as desired
        : "N/A"; // Fallback if the date is null or undefined

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "salesperson",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Sales Person" />;
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Priority" />;
    },
    cell: ({ row }) => {
      const priority = row.original.priority; // Get the priority from the row data
      let priorityColor = "";

      // Set the color based on priority
      if (priority === "Low") {
        priorityColor = "bg-blue-500 text-white"; // Green for low priority
      } else if (priority === "Medium") {
        priorityColor = "bg-blue-700 text-white"; // Yellow for medium priority
      } else if (priority === "High") {
        priorityColor = "bg-blue-900 text-white"; // Red for high priority
      }

      return (
        <Badge
          className={` ${priorityColor} font-semibold hover:bg-${priorityColor} shadow-none`}
        >
          {priority}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionDropDown row={row} />;
    },
  },
];
