import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSalesStore } from "@/lib/useSalesStore";
import { useToast } from "@/hooks/useToast";

export function DeleteDialog() {
  const {
    openDeleteDialog,
    setOpenDeleteDialog,
    deleteSale,
    selectedSale,
    isLoading,
  } = useSalesStore();
  const { toast } = useToast();
  //
  async function deleteSaleFunction() {
    if (selectedSale) {
      const result = await deleteSale(selectedSale.id);

      if (result) {
        toast({
          title: "Sale Deleted!",
          description: `The sale has been deleted successfully.`,
        });

        setOpenDeleteDialog(false);
      }
    }
  }
  return (
    <AlertDialog
      open={openDeleteDialog}
      onOpenChange={(open) => {
        setOpenDeleteDialog(open);
      }}
    >
      <AlertDialogContent className="p-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2">
            This action cannot be undone. This will permanently delete this
            sale.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={deleteSaleFunction}>
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
