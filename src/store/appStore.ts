import { create } from "zustand";

export interface Program {
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

export type Product = {
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

// Only local UI selection lives in Zustand; server data belongs to TanStack Query.
type TAppState = {
  activeProgramId: number | null;
  setActiveProgramId: (payload: number) => void;
};
export const useAppStore = create<TAppState>()((set) => ({
  activeProgramId: null,
  setActiveProgramId: (payload) => set({ activeProgramId: payload }),
}));
