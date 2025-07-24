import { create } from "zustand"; // global state

export const configStore = create((set) => ({
  config: {
    category: null,
    role: null,
    supplier: null,
    purchase_status: null,
    brand: null,
  },

  setConfig: (params) =>
    set((state) => ({
      config: {
        ...state.config,
        ...params, // merge new config values
      },
    })),
}));
