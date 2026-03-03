import { create } from "zustand";

interface DateStore {
  year: number;
  month: number;
  goToPrev: () => void;
  goToNext: () => void;
  reset: () => void;
}

const now = new Date();

export const useDateStore = create<DateStore>((set) => ({
  year: now.getFullYear(),
  month: now.getMonth() + 1,
  goToPrev: () => {
    set((prev) => {
      if (prev.month === 1) return { year: prev.year - 1, month: 12 };
      return { month: prev.month - 1 };
    });
  },
  goToNext: () => {
    set((prev) => {
      if (prev.month === 12) return { year: prev.year + 1, month: 1 };
      return { month: prev.month + 1 };
    });
  },
  reset: () => {
    set({ year: now.getFullYear(), month: new Date().getMonth() + 1 });
  },
}));
