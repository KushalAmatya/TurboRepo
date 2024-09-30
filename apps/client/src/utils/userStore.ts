import { create } from "zustand";
import { API } from "./baseAxios";

type UsersType = {
  _id: number;
  email: string;
  isAdmin: boolean;
  name: string;
};
type UserStore = {
  users: UsersType[];
  setUsers: (users: UsersType[]) => void;
  fetchUsers: () => Promise<void>;
};
export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  setUsers: (users) => set({ users }),
  fetchUsers: async () => {
    try {
      const response = await API.get("/getusers");
      get().setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
}));
