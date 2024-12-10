import { create } from "zustand";
import { SaleType } from "../types/sales";
import { salesData } from "../data/sales";

interface SalesAppState {
  allSales: SaleType[];
  openDeleteDialog: boolean;
  selectedSale: SaleType | null;
  setSelectedSale: (sale: SaleType | null) => void;
  isLoading: boolean;
  //
  openDealDialog: boolean;
  setOpenDealDialog: (open: boolean) => void;
  setOpenDeleteDialog: (open: boolean) => void;
  loadAllSales: () => Promise<void>;
  addSale: (newSale: SaleType) => Promise<{ success: boolean }>;
  updateSale: (updatedSale: SaleType) => Promise<{ success: boolean }>;
  deleteSale: (saleId: string) => Promise<{ success: boolean }>;
}
export const useSalesStore = create<SalesAppState>((set) => ({
  allSales: [],
  openDeleteDialog: false,
  isLoading: false,
  selectedSale: null,
  openDealDialog: false,
  setOpenDealDialog: (open) => {
    set({ openDealDialog: open });
  },
  setOpenDeleteDialog: (open) => {
    set({ openDeleteDialog: open });
  },

  setSelectedSale: (sale: SaleType | null) => {
    set({ selectedSale: sale });
  },
  // function to fetch all sales

  loadAllSales: async () => {
    const fetchedSales = await fetchAllSales();

    set({ allSales: fetchedSales });
  },
  //   function to add a new sale
  addSale: async (newSale: SaleType) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({ allSales: [...state.allSales, newSale] }));
      return { success: true };
    } finally {
      set({ isLoading: false });
    }
  },

  updateSale: async (updatedSale: SaleType) => {
    set({ isLoading: true });
    try {
      // Simulate the update process with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the product in the state
      set((state) => ({
        allSales: state.allSales.map((sale) =>
          sale.id === updatedSale.id ? updatedSale : sale,
        ),
      }));

      return { success: true };
    } finally {
      set({ isLoading: false });
      set({ openDealDialog: false });
      set({ selectedSale: null });
    }
  },

  deleteSale: async (saleId: string) => {
    try {
      set({ isLoading: true });
      // Simulate the deletion process with a delay
      await new Promise((resolve) => setTimeout(resolve, 2300));

      set((state) => ({
        allSales: state.allSales.filter((sale) => sale.id !== saleId),
      }));
      return { success: true };
    } finally {
      set({ selectedSale: null });
      set({ isLoading: false });
    }
  },
}));

async function fetchAllSales(): Promise<SaleType[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(salesData);
    }, 1200);
  });
}
