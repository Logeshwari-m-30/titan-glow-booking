import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, Users, Gamepad2, Clock, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useBookingStore, type Console } from "@/lib/bookingStore";
import { calculatePrice, DURATION_OPTIONS, addMinutesToTime, getDurationMinutes, formatTime12h, formatTimeRange12h } from "@/lib/pricing";
import { supabase } from "@/integrations/supabase/client";
import PageTransition from "@/components/PageTransition";
import AvailableGames from "@/components/AvailableGames";
import gamingBg from "@/assets/gaming-bg.jpg";

const consoleOptions = [
{ value: "PS5", emoji: "🎮" },
{ value: "PS4", emoji: "🕹️" },
{ value: "PS2", emoji: "👾" },
];

const toMinutes = (t: string) => {
const [h, m] = t.split(":").map(Number);
return h * 60 + m;
};

const Booking = () => {
const navigate = useNavigate();
const { booking, setDate, setStartTime, setEndTime, setConsole, setPlayers, setDuration, setPrice } = useBookingStore();

const [step, setStep] = useState(1);
const [dayBookings, setDayBookings] = useState<any[]>([]);

useEffect(() => {
if (!booking.date) return;

```
const fetchBookings = async () => {
  const dateStr = format(booking.date!, "yyyy-MM-dd");

  const { data } = await supabase
    .from("bookings")
    .select("*")
    .eq("booking_date", dateStr);

  setDayBookings(data || []);
};

fetchBookings();
```

}, [booking.date]);

const startMin = toMinutes(booking.startTime);
const endMin = toMinutes(booking.endTime);

const isBookedByConsole = useMemo(() => {
const result = { PS5: false, PS4: false, PS2: false };

```
for (const row of dayBookings) {
  const rs = toMinutes(row.start_time.slice(0, 5));
  const re = toMinutes(row.end_time.slice(0, 5));

  if (startMin < re && endMin > rs) {
    result[row.console_type] = true; // 🔥 ONE BOOKING = FULL
  }
}

return result;
```

}, [dayBookings, startMin, endMin]);

const totalPrice = useMemo(
() => calculatePrice(booking.console, booking.players, booking.duration),
[booking.console, booking.players, booking.duration]
);

useEffect(() => {
setPrice(totalPrice);
}, [totalPrice]);

return ( <PageTransition> <div className="min-h-screen bg-background"> <div className="py-8 px-4 max-w-2xl mx-auto">

```
      <Link to="/" className="flex items-center gap-2 mb-6">
        <ArrowLeft /> Back
      </Link>

      <h1 className="text-3xl mb-6">Book Your Slot</h1>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <Calendar mode="single" selected={booking.date} onSelect={setDate} />

          <Input type="time" onChange={(e) => setStartTime(e.target.value)} />

          <div className="grid grid-cols-4 gap-2 mt-4">
            {DURATION_OPTIONS.map((d) => (
              <button key={d.value} onClick={() => setDuration(d.value)}>
                {d.label}
              </button>
            ))}
          </div>

          <Button onClick={() => setStep(2)}>Next</Button>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <div className="grid grid-cols-3 gap-3">
            {consoleOptions.map((c) => {
              const isBooked = isBookedByConsole[c.value];

              return (
                <button
                  key={c.value}
                  disabled={isBooked}
                  onClick={() => setConsole(c.value)}
                  className={cn(
                    "p-4 rounded-lg border text-center",
                    isBooked
                      ? "border-red-500 bg-red-900 text-white shadow-[0_0_15px_red]"
                      : "bg-card"
                  )}
                >
                  <div className="text-2xl">{c.emoji}</div>
                  <div>{c.value}</div>
                  <div>{isBooked ? "BOOKED" : "AVAILABLE"}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <button onClick={() => setPlayers(booking.players - 1)}>-</button>
            <span>{booking.players}</span>
            <button onClick={() => setPlayers(booking.players + 1)}>+</button>
          </div>

          <div className="mt-4 text-xl">
            ₹{totalPrice}
          </div>

          <Button onClick={() => navigate("/checkout")}>
            Proceed
          </Button>
        </>
      )}

      {booking.console && <AvailableGames console={booking.console} />}
    </div>
  </div>
</PageTransition>
```

);
};

export default Booking;
