import { create } from "zustand";
import { getStocks } from "../APICalls";

export const useUserStore = create((set) => {

  const store = {
    allData: [],
    loading: false,
    error: null,

    fetchUsers: async () => {
      set({ loading: true, error: null });
      try {
        const data = await getStocks();
        set({ allData: data, loading: false });
      } catch (err) {
        set({ error: err.message, loading: false });
      }
    },
  };

  store.fetchUsers();
  return store.allData;
});
