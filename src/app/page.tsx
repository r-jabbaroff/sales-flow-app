"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/custom/Navbar";
import StatCards from "@/components/custom/StatsCard";
import TableArea from "@/components/custom/TableArea";
import { DeleteDialog } from "@/components/custom/DeleteDialog";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="poppins p-5">
      <DeleteDialog />
      <Card>
        <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <StatCards />
        <TableArea searchQuery={searchQuery} />
      </Card>
    </div>
  );
}
