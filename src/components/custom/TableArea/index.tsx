"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import PaginationArea from "@/components/custom/TableArea/_components/PaginationArea";

import { salesColumns } from "./_components/SalesColumn";

import {
  // ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSalesStore } from "@/lib/useSalesStore";
import { handleExportToCSV } from "@/lib/functions";

export interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

export default function TableArea({ searchQuery }: { searchQuery: string }) {
  const { allSales, loadAllSales } = useSalesStore();
  const tabItems = [
    { value: "all", label: "All Deals", count: allSales.length },
    {
      value: "high",
      label: "High Priority",
      count: allSales.filter((d) => d.priority === "High").length,
    },
    {
      value: "medium",
      label: "Medium Priority",
      count: allSales.filter((d) => d.priority === "Medium").length,
    },
    {
      value: "low",
      label: "Low Priority",
      count: allSales.filter((d) => d.priority === "Low").length,
    },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 8,
  });

  useEffect(() => {
    loadAllSales();
  }, [loadAllSales]);

  // Filter data based on the active tab
  const filteredData = useMemo(() => {
    if (activeTab === "all") return allSales;
    return allSales.filter((data) => data.priority.toLowerCase() === activeTab);
  }, [activeTab, allSales]);

  const table = useReactTable({
    data: filteredData,
    columns: salesColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    table.getColumn("customerName")?.setFilterValue(searchQuery); // Assuming the column key for search is "name"
  }, [searchQuery, table]);

  return (
    <Card className="m-6 overflow-hidden shadow-none">
      <div className="p-8">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className="mb-6 w-full"
        >
          <div className="mb-4 flex items-center justify-between max-lg:gap-2 max-md:flex-col max-sm:items-start">
            <TabsList className="h-10 max-sm:flex max-sm:h-[132px] max-sm:w-full max-sm:flex-col">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`flex h-8 items-center gap-2 rounded-md transition-all ${
                    activeTab === tab.value
                      ? "bg-primary text-white max-sm:w-full"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab(tab.value)}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`size-5 rounded-full ${
                      activeTab === tab.value ? "text-primary" : "text-gray-500"
                    } text-[11px]`}
                  >
                    {tab.count}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              onClick={() => handleExportToCSV(allSales)}
              className="flex items-center gap-2 max-lg:w-full max-sm:mt-4"
            >
              <HiOutlineDocumentDownload className="size-4" />
              <span>Download as CSV</span>
            </Button>
          </div>

          {tabItems.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="mt-9 w-full"
            >
              {activeTab === tab.value && (
                // table
                <span>
                  <div className="overflow-hidden rounded-md border">
                    <Table>
                      <TableHeader className="overflow-hidden bg-gray-50 dark:bg-gray-900">
                        {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow className="h-10" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                              return (
                                <TableHead key={header.id}>
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                      )}
                                </TableHead>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                            <TableRow
                              className="h-12"
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                            >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={table.getAllColumns().length}
                              className="h-24 text-center"
                            >
                              No results.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </span>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      {/* pagination area */}
      <PaginationArea
        table={table}
        pagination={pagination}
        setPagination={setPagination}
      />
    </Card>
  );
}
