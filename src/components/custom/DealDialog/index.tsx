"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IoIosAdd } from "react-icons/io";

import { ContactDatePicker } from "./_components/ContactDate";
import CustomerName from "./_components/CustomerName";
import SaleValue from "./_components/SaleValue";
import { Status } from "./_components/Status";
import { Priority } from "./_components/Priority";
import { SalesPeople } from "./_components/SalesPeople";

import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SalePriority, SaleStatus, SaleType } from "@/types/sales";
import { nanoid } from "nanoid";
import { useSalesStore } from "@/lib/useSalesStore";
import { useToast } from "@/hooks/useToast";

export const salesPeople = [
  "Alice Smith",
  "Bob Johnson",
  "Sara Davis",
  "Tom Wilson",
  "Anna Taylor",
  "Chris Lee",
  "Emily Johnson",
];

const dialogSchema = z.object({
  contactDate: z
    .date({ required_error: "Please select the date" })
    .refine((date) => !!date, "Date is required"),
  customerName: z.string().min(1, { message: "The customer name is required" }),
  saleValue: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", {
      message: "Sale value is required",
    })
    .transform((val) => {
      // If it's an empty string, this will fail validation
      if (val === "") return undefined;
      // Convert to number and fix to 2 decimal places
      const num = Number(val);
      return Number(num.toFixed(2));
    })
    .pipe(
      z
        .number({
          required_error: "Sale value is required",
          invalid_type_error: "Sale value must be a number",
        })
        .nonnegative("Sale value cannot be negative"),
    ),
});

type FormData = z.infer<typeof dialogSchema>;

export default function SalesDialog() {
  const [selectedPriority, setSelectedPriority] = useState<SalePriority>("Low");
  const [selectedStatus, setSelectedStatus] =
    useState<SaleStatus>("In Progress");

  const [selectedSalesperson, setSelectedSalesperson] = useState(
    salesPeople[0],
  );

  const methods = useForm<FormData>({
    resolver: zodResolver(dialogSchema),
    defaultValues: {
      saleValue: 0.0,
      customerName: "",
    },
  });

  const {
    addSale,
    openDealDialog,
    setOpenDealDialog,
    selectedSale,
    setSelectedSale,
    updateSale,
    isLoading,
  } = useSalesStore();
  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
    if (!selectedSale) {
      const newSale: SaleType = {
        id: nanoid(),
        priority: selectedPriority,
        salesperson: selectedSalesperson,
        status: selectedStatus,
        dealValue: data.saleValue.toString(),
        contactDate: data.contactDate.toDateString(),
        customerName: data.customerName,
      };

      const result = await addSale(newSale);
      const formattedSaleValue = data.saleValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      if (result) {
        toast({
          title: "Sale Added!",
          description: `The deal of the amount ${formattedSaleValue} has been added successfully.`,
        });
      }
    } else {
      //here the function to edit
      const saleToUpdate: SaleType = {
        id: selectedSale.id,
        contactDate: data.contactDate.toDateString(),
        dealValue: data.saleValue.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
        customerName: data.customerName,
        priority: selectedPriority,
        salesperson: selectedSalesperson,
        status: selectedStatus,
      };

      const result = await updateSale(saleToUpdate);

      if (result) {
        toast({
          title: "Sale Updated!",
          description: `The sale has been updated successfully.`,
        });
      }
    }

    handleDialogClose();
    setOpenDealDialog(false);
  };

  const handleDialogClose = () => {
    // Reset form fields and custom state when dialog is closed
    methods.reset();
    setSelectedPriority("Low");
    setSelectedStatus("In Progress");
    setSelectedSalesperson(salesPeople[0]);
  };

  useEffect(() => {
    if (selectedSale) {
      methods.reset({
        customerName: selectedSale.customerName,
        contactDate: new Date(selectedSale.contactDate),
        saleValue: parseFloat(selectedSale.dealValue.replace(/[^0-9.-]+/g, "")),
      });
      setSelectedPriority(selectedSale.priority);
      setSelectedStatus(selectedSale.status);
      setSelectedSalesperson(selectedSale.salesperson);
    } else {
      methods.reset({ saleValue: 0.0, customerName: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDealDialog, selectedSale]);

  return (
    <Dialog open={openDealDialog} onOpenChange={setOpenDealDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpenDealDialog(true)} className="h-8">
          <IoIosAdd className="text-3xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="poppins max-h-screen overflow-auto p-7 px-8 max-sm:w-full sm:max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-[22px]">
            {selectedSale ? "Edit Sale" : "New Sale"}
          </DialogTitle>
          <DialogDescription>
            Fill in the form to {selectedSale ? "edit" : "new"} sale
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {/*  */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
              <CustomerName />
              <SaleValue />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <Status
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
              <Priority
                selectedPriority={selectedPriority}
                setSelectedPriority={setSelectedPriority}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <ContactDatePicker />
              <SalesPeople
                selectedSalesPerson={selectedSalesperson}
                setSelectedSalesPerson={setSelectedSalesperson}
              />
            </div>
            <DialogFooter className="mb-4 mt-11 flex items-center gap-4">
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    setOpenDealDialog(false);
                    setSelectedSale(null);
                  }}
                  variant={"secondary"}
                  className="h-11 px-11 max-sm:w-full"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button className="h-11 px-11 max-sm:w-full">
                {isLoading
                  ? "loading..."
                  : `${selectedSale ? "Save" : "Add Sale"}`}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
