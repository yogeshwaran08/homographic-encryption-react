import { create } from "zustand";
import { IUser } from "../types/customTypes";
import { NavigateFunction } from "react-router-dom";

interface IUserStore {
  user: IUser | null;
  fetchLocal: () => void;
  setUser: (user: any) => void;
  logout: (navigate: NavigateFunction) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,

  fetchLocal: () => {
    try {
      const storedUser = localStorage.getItem("user");
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

  logout: (navigate) => {
    localStorage.clear();
    set({ user: null });
    navigate("/login");
  },
}));

export default useUserStore;
