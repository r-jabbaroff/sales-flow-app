import { SaleType } from "@/types/sales";
import Papa from "papaparse";
import { format } from "date-fns";

// Function to export table data to CSV
export const handleExportToCSV = (rowData: SaleType[]) => {
  const formattedData = rowData.map((row) => ({
    Name: row.customerName,
    "Deal Value": `${row.dealValue}`,
    Status: row.status,
    "Contact Date": format(new Date(row.contactDate), "yyyy-MM-dd"),
    "Sales Person": row.salesperson,
    Priority: row.priority,
  }));

  const csv = Papa.unparse(formattedData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "sales-data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
