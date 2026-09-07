import { create } from "zustand";

interface Program {
  id: number;
  title: string;
  image: string;
  description: string;
  date: string;
  location: string;
  isFeatured: boolean | null;
  link: string;
  status: boolean;
  availableDates: string;
  sessions: string;
  duration: string;
  participants: string;
  modules: string;
  isUpcoming: string;
  createdAt: string;
  updatedAt: string;
}

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
  status: boolean;
  categoryId: number;
  created_by: number;
  updated_by: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  link?: string;
};

type TAppState = {
  activeProgramId: number | null;
  programDetails: Program[];
  productDetails: Product[];
  setProgramDetails: (payload: Program[]) => void;
  setActiveProgramId: (payload: number) => void;
  setProductDetails: (payload: Product[]) => void;
};

export const useAppStore = create<TAppState>()((set) => ({
  programDetails: [],
  productDetails: [],
  activeProgramId: null,
  setProductDetails: (payload) => set({ productDetails: payload }),
  setProgramDetails: (payload) => set({ programDetails: payload }),
  setActiveProgramId: (payload) => set({ activeProgramId: payload }),
}));
