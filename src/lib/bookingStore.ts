import { create } from "zustand";

export type Console = "PS5" | "PS4" | "PS2";

export interface TimeSlot {
  id: string;
  label: string;
  booked: number;
  max: number;
}

export interface BookingData {
  date: Date | undefined;
  timeSlot: TimeSlot | undefined;
  console: Console | undefined;
  players: number;
  name: string;
  phone: string;
}

const generateSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let h = 10; h < 22; h++) {
    const startHour = h > 12 ? h - 12 : h;
    const endHour = (h + 1) > 12 ? (h + 1) - 12 : h + 1;
    const startPeriod = h >= 12 ? "PM" : "AM";
    const endPeriod = (h + 1) >= 12 ? "PM" : "AM";
    slots.push({
      id: `slot-${h}`,
      label: `${startHour}:00 ${startPeriod} – ${endHour}:00 ${endPeriod}`,
      booked: Math.floor(Math.random() * 10),
      max: 12,
    });
  }
  return slots;
};

interface BookingStore {
  booking: BookingData;
  slots: TimeSlot[];
  setDate: (date: Date | undefined) => void;
  setTimeSlot: (slot: TimeSlot) => void;
  setConsole: (c: Console) => void;
  setPlayers: (n: number) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  confirmBooking: () => void;
  confirmed: boolean;
}

export const useBookingStore = create<BookingStore>((set) => ({
  booking: {
    date: undefined,
    timeSlot: undefined,
    console: undefined,
    players: 1,
    name: "",
    phone: "",
  },
  slots: generateSlots(),
  confirmed: false,
  setDate: (date) => set((s) => ({ booking: { ...s.booking, date }, slots: generateSlots() })),
  setTimeSlot: (slot) => set((s) => ({ booking: { ...s.booking, timeSlot: slot } })),
  setConsole: (c) => set((s) => ({ booking: { ...s.booking, console: c } })),
  setPlayers: (n) => set((s) => ({ booking: { ...s.booking, players: Math.min(n, 12) } })),
  setName: (name) => set((s) => ({ booking: { ...s.booking, name } })),
  setPhone: (phone) => set((s) => ({ booking: { ...s.booking, phone } })),
  confirmBooking: () => set({ confirmed: true }),
}));
