import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface TeamMember {
  id: number;
  name: string;
  image: string;
  role_id: number;
  status: boolean;
  description: string;
  title: string;
  mobile: string;
  email: string;
  social_links: SocialLink[];
  created_by: number;
  updated_by: number;
  createdAt: string;
  updatedAt: string;
}

type TLocalStore = {
  peopleData: TeamMember[];
  setPeopleData: (payload: TeamMember[]) => void;
};

export const useLocalStore = create<TLocalStore>()(
  persist(
    (set) => ({
      peopleData: [],
      setPeopleData: (payload) => set({ peopleData: payload }),
    }),
    {
      name: "persist:local:inbox:root",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
