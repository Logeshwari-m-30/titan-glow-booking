import type { Console } from "./bookingStore";

export type Duration = "30min" | "1hr" | "2hr" | "3hr";

export const DURATION_OPTIONS: { value: Duration; label: string; minutes: number }[] = [
  { value: "30min", label: "30 min", minutes: 30 },
  { value: "1hr", label: "1 hr", minutes: 60 },
  { value: "2hr", label: "2 hr", minutes: 120 },
  { value: "3hr", label: "3 hr", minutes: 180 },
];

// Hourly pricing tables: [1P, 2P, 3P, 4P]
// Index by players-1
const PRICING: Record<Console, Record<Exclude<Duration, "30min">, number[]>> = {
  PS5: {
    "1hr": [140, 260, 380, 500],
    "2hr": [280, 500, 740, 980],
    "3hr": [420, 760, 1240, 1400],
  },
  PS4: {
    "1hr": [120, 220, 320, 420],
    "2hr": [240, 420, 620, 820],
    "3hr": [360, 640, 940, 1240],
  },
  PS2: {
    "1hr": [50, 100],
    "2hr": [100, 200],
    "3hr": [150, 300],
  },
};

// PS2 has fixed 30-min pricing; PS5/PS4 use half of 1-hour price
const PS2_30MIN = [30, 60];

export const calculatePrice = (
  cons: Console | undefined,
  players: number,
  duration: Duration | undefined
): number => {
  if (!cons || !duration || players < 1) return 0;
  const idx = players - 1;

  if (duration === "30min") {
    if (cons === "PS2") return PS2_30MIN[idx] ?? 0;
    const hourlyTable = PRICING[cons]["1hr"];
    const hourly = hourlyTable[idx];
    return hourly ? Math.round(hourly / 2) : 0;
  }

  const table = PRICING[cons][duration];
  return table[idx] ?? 0;
};

export const getDurationMinutes = (d: Duration): number =>
  DURATION_OPTIONS.find((o) => o.value === d)?.minutes ?? 60;

// Add minutes to "HH:mm" -> "HH:mm" (clamped to 23:59)
export const addMinutesToTime = (time: string, minutes: number): string => {
  if (!/^\d{2}:\d{2}$/.test(time)) return "";
  const [h, m] = time.split(":").map(Number);
  const total = Math.min(23 * 60 + 59, h * 60 + m + minutes);
  const nh = Math.floor(total / 60).toString().padStart(2, "0");
  const nm = (total % 60).toString().padStart(2, "0");
  return `${nh}:${nm}`;
};