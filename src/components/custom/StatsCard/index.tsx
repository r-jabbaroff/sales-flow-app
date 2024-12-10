import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { GrMoney } from "react-icons/gr";
import { FaHandshake, FaChartLine } from "react-icons/fa";
import { useSalesStore } from "@/lib/useSalesStore";

type SingleCard = {
  title: string;
  value: string;
  icon: ReactNode;
};

export default function StatCards() {
  const { allSales } = useSalesStore();

  const closedSales = allSales.filter((sale) => sale.status === "Closed");
  // Array of statistics cards
  const stats: SingleCard[] = [
    {
      title: "Total Sales",
      value: allSales
        .reduce((total, sale) => {
          const numericValue = parseFloat(
            sale.dealValue.replace(/[^0-9.-]+/g, ""),
          );
          return total + numericValue;
        }, 0)
        .toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      icon: <GrMoney />,
    },
    {
      title: "Deals in Progress",
      value: allSales
        .filter((sale) => sale.status === "In Progress")
        .length.toString(),
      icon: <FaHandshake />,
    },
    {
      title: "Conversion Rate",
      value:
        `${((closedSales.length / allSales.length) * 100).toFixed(2)} %` ||
        "0.00%",
      icon: <FaChartLine />,
    },
  ];

  return (
    <div className="mt-7 grid grid-cols-3 gap-6 p-6 max-sm:grid-cols-1">
      {stats.map((stat, index) => (
        <SingleStatCard key={index} SingleCard={stat} />
      ))}
    </div>
  );
}

function SingleStatCard({ SingleCard }: { SingleCard: SingleCard }) {
  return (
    <Card className="flex flex-col gap-2 p-4 shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-600">
          {SingleCard.title}
        </span>
        <div className="flex size-7 items-center justify-center rounded-md bg-primary/25 text-sm font-bold text-primary">
          {SingleCard.icon}
        </div>
      </div>

      {/* Amount */}
      <div className={`text-3xl font-bold`}>{SingleCard.value}</div>
    </Card>
  );
}
