import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const authStore = create<AuthStore>((set) => ({
  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin: isAdmin }),
}));
