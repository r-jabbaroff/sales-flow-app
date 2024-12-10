export type SaleStatus = "In Progress" | "Closed" | "Negotiation" | "Pending";
export type SalePriority = "High" | "Medium" | "Low";

export type SaleType = {
  id: string;
  customerName: string;
  dealValue: string;
  status: SaleStatus;
  contactDate: string;
  salesperson: string;
  priority: SalePriority;
};
