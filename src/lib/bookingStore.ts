import { create } from "zustand";
import type { Duration } from "./pricing";

export type Console = "PS5" | "PS4" | "PS2";

export const CONSOLE_LIMITS: Record<Console, number> = {
  PS5: 4,
  PS4: 4,
  PS2: 2,
};

export interface BookingData {
  date: Date | undefined;
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
  console: Console | undefined;
  players: number;
  duration: Duration | undefined;
  price: number;
  name: string;
  phone: string;
}

interface BookingStore {
  booking: BookingData;
  setDate: (date: Date | undefined) => void;
  setStartTime: (t: string) => void;
  setEndTime: (t: string) => void;
  setConsole: (c: Console) => void;
  setPlayers: (n: number) => void;
  setDuration: (d: Duration) => void;
  setPrice: (p: number) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  confirmBooking: () => void;
  confirmed: boolean;
}

export const useBookingStore = create<BookingStore>((set) => ({
  booking: {
    date: undefined,
    startTime: "",
    endTime: "",
    console: undefined,
    players: 1,
    duration: undefined,
    price: 0,
    name: "",
    phone: "",
  },
  confirmed: false,
  setDate: (date) => set((s) => ({ booking: { ...s.booking, date } })),
  setStartTime: (t) => set((s) => ({ booking: { ...s.booking, startTime: t } })),
  setEndTime: (t) => set((s) => ({ booking: { ...s.booking, endTime: t } })),
  setConsole: (c) => set((s) => ({ booking: { ...s.booking, console: c } })),
  setPlayers: (n) => set((s) => ({ booking: { ...s.booking, players: Math.max(1, n) } })),
  setDuration: (d) => set((s) => ({ booking: { ...s.booking, duration: d } })),
  setPrice: (p) => set((s) => ({ booking: { ...s.booking, price: p } })),
  setName: (name) => set((s) => ({ booking: { ...s.booking, name } })),
  setPhone: (phone) => set((s) => ({ booking: { ...s.booking, phone } })),
  confirmBooking: () => set({ confirmed: true }),
}));
