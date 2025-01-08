import { create } from "zustand";
import { IUser } from "../types/customTypes";

interface IUserStore {
  user: IUser | null;
  fetchLocal: () => void;
  setUser: (user: any) => void;
  logout: () => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,

  fetchLocal: () => {
    try {
      const storedUser = localStorage.getItem("user");
      console.log("stored", storedUser);
      if (storedUser) {
        set({ user: JSON.parse(storedUser) });
      }
    } catch (error) {
      console.log("unable to convert");
    }
  },

  setUser: (user) => {
    console.log("user", user);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
    console.log("used", user);
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useUserStore;
