import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, Users, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useBookingStore, type Console, CONSOLE_LIMITS } from "@/lib/bookingStore";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import gamingBg from "@/assets/gaming-bg.jpg";

const consoleOptions: { value: Console; label: string; emoji: string }[] = [
  { value: "PS5", label: "PlayStation 5", emoji: "🎮" },
  { value: "PS4", label: "PlayStation 4", emoji: "🕹️" },
  { value: "PS2", label: "PlayStation 2", emoji: "👾" },
];

// Compare only the local-date portion (ignore time, ignore UTC)
const startOfLocalDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const isPastDate = (d: Date) => startOfLocalDay(d).getTime() < startOfLocalDay(new Date()).getTime();

const Booking = () => {
  const navigate = useNavigate();
  const { booking, slots, setDate, setTimeSlot, setConsole, setPlayers } = useBookingStore();
  const [step, setStep] = useState(1);
  // bookedBySlotConsole[slotLabel][console] = totalPlayersBooked
  const [bookedMap, setBookedMap] = useState<Record<string, Record<Console, number>>>({});
  const [loadingAvail, setLoadingAvail] = useState(false);

  // Fetch availability for the selected date (and refresh on console/slot change)
  useEffect(() => {
    if (!booking.date) return;
    let cancelled = false;
    const fetchAvailability = async () => {
      setLoadingAvail(true);
      const dateStr = format(booking.date!, "yyyy-MM-dd");
      const { data, error } = await supabase
        .from("bookings")
        .select("time_slot, console_type, players")
        .eq("booking_date", dateStr);
      if (cancelled) return;
      if (error) {
        console.error("Availability fetch failed:", error);
        setBookedMap({});
      } else {
        const map: Record<string, Record<Console, number>> = {};
        for (const row of data || []) {
          const slot = row.time_slot as string;
          const cons = row.console_type as Console;
          if (!map[slot]) map[slot] = { PS5: 0, PS4: 0, PS2: 0 };
          if (cons in map[slot]) map[slot][cons] += row.players ?? 0;
        }
        setBookedMap(map);
      }
      setLoadingAvail(false);
    };
    fetchAvailability();

    // Realtime: refresh when bookings change
    const channel = supabase
      .channel("bookings-availability")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, fetchAvailability)
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [booking.date]);

  const getRemaining = (cons: Console): number => {
    if (!booking.timeSlot) return CONSOLE_LIMITS[cons];
    const booked = bookedMap[booking.timeSlot.label]?.[cons] ?? 0;
    return Math.max(0, CONSOLE_LIMITS[cons] - booked);
  };

  const remainingForSelected = booking.console ? getRemaining(booking.console) : 0;
  const maxPlayers = booking.console ? remainingForSelected : 1;

  // Clamp players if remaining shrinks
  useEffect(() => {
    if (booking.console && booking.players > remainingForSelected && remainingForSelected > 0) {
      setPlayers(remainingForSelected);
    }
  }, [remainingForSelected, booking.console]);

  const canProceed = () => {
    if (step === 1) return !!booking.date && !!booking.timeSlot;
    if (step === 2)
      return (
        !!booking.console &&
        booking.players >= 1 &&
        booking.players <= remainingForSelected
      );
    return false;
  };

  const handleNext = () => {
    if (step === 2 && booking.console && booking.players > remainingForSelected) {
      toast.error(`Only ${remainingForSelected} seats left for ${booking.console}`);
      return;
    }
    if (step < 2) setStep(step + 1);
    else navigate("/checkout");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative z-10">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <img src={gamingBg} alt="" className="w-full h-full object-cover opacity-15 blur-[3px]" width={1920} height={1080} loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5" />
        </div>

        <div className="relative z-10 py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <h1 className="font-heading text-3xl md:text-4xl text-foreground text-glow-blue mb-8">Book Your Slot</h1>

            {/* Progress */}
            <div className="flex gap-2 mb-10">
              {[1, 2].map((s) => (
                <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-all duration-500", s <= step ? "gradient-neon" : "bg-muted")} />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-8">
                {/* Date Picker */}
                <div>
                  <label className="font-heading text-sm text-muted-foreground mb-2 block">Select Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal neon-border bg-card", !booking.date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 w-4 h-4" />
                        {booking.date ? format(booking.date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                      <Calendar
                        mode="single"
                        selected={booking.date}
                        onSelect={setDate}
                        disabled={isPastDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Slots */}
                {booking.date && (
                  <div>
                    <label className="font-heading text-sm text-muted-foreground mb-3 block">Select Time Slot</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {slots.map((slot) => {
                        const slotBooked = bookedMap[slot.label] || { PS5: 0, PS4: 0, PS2: 0 };
                        const totalLimit = CONSOLE_LIMITS.PS5 + CONSOLE_LIMITS.PS4 + CONSOLE_LIMITS.PS2;
                        const totalBooked = slotBooked.PS5 + slotBooked.PS4 + slotBooked.PS2;
                        const left = totalLimit - totalBooked;
                        const isFull = left <= 0;
                        const isSelected = booking.timeSlot?.id === slot.id;

                        return (
                          <button
                            key={slot.id}
                            disabled={isFull}
                            onClick={() => setTimeSlot(slot)}
                            className={cn(
                              "p-4 rounded-lg border text-left slot-card-hover transition-all duration-300",
                              isFull && "opacity-40 cursor-not-allowed bg-muted border-border",
                              !isFull && !isSelected && "bg-card neon-border hover:neon-glow-blue cursor-pointer",
                              isSelected && "gradient-neon neon-glow-blue border-transparent"
                            )}
                          >
                            <div className={cn("font-medium text-sm", isSelected ? "text-primary-foreground" : "text-foreground")}>
                              {slot.label}
                            </div>
                            <div className={cn(
                              "text-xs mt-1 font-medium",
                              isFull ? "text-muted-foreground" : isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                            )}>
                              {isFull ? "FULL" : `${left}/${totalLimit} seats available`}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {loadingAvail && (
                      <p className="text-xs text-muted-foreground mt-2">Loading availability…</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                {/* Console Selection */}
                <div>
                  <label className="font-heading text-sm text-muted-foreground mb-3 block">
                    <Gamepad2 className="w-4 h-4 inline mr-1" /> Select Console
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {consoleOptions.map((c) => {
                      const limit = CONSOLE_LIMITS[c.value];
                      const remaining = getRemaining(c.value);
                      const isFull = remaining <= 0;
                      const almostFull = remaining > 0 && remaining <= 1;
                      const isSelected = booking.console === c.value;
                      return (
                        <button
                          key={c.value}
                          disabled={isFull}
                          onClick={() => setConsole(c.value)}
                          className={cn(
                            "p-4 rounded-lg border text-center slot-card-hover transition-all duration-300",
                            isFull && "opacity-40 cursor-not-allowed bg-muted border-border",
                            !isFull && !isSelected && "bg-card neon-border hover:neon-glow-purple",
                            isSelected && "gradient-neon neon-glow-purple border-transparent",
                            almostFull && !isSelected && "animate-pulse-red"
                          )}
                        >
                          <div className="text-3xl mb-2">{c.emoji}</div>
                          <div className={cn("font-heading text-xs", isSelected ? "text-primary-foreground" : "text-foreground")}>
                            {c.value}
                          </div>
                          <div
                            className={cn(
                              "text-[10px] mt-2 font-medium",
                              isFull
                                ? "text-muted-foreground"
                                : almostFull
                                ? "text-neon-red"
                                : isSelected
                                ? "text-primary-foreground/80"
                                : "text-muted-foreground"
                            )}
                          >
                            {isFull ? "FULL" : almostFull ? `⚠ Almost Full (${remaining}/${limit})` : `${remaining}/${limit} seats`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Group Booking */}
                <div>
                  <label className="font-heading text-sm text-muted-foreground mb-3 block">
                    <Users className="w-4 h-4 inline mr-1" /> Number of Players
                  </label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="neon-border bg-card hover:neon-glow-blue transition-all"
                      onClick={() => setPlayers(Math.max(1, booking.players - 1))}
                    >–</Button>
                    <span className="font-heading text-2xl text-foreground w-12 text-center">{booking.players}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="neon-border bg-card hover:neon-glow-blue transition-all"
                      onClick={() => setPlayers(Math.min(maxPlayers, booking.players + 1))}
                    >+</Button>
                  </div>
                  {booking.console && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Max {maxPlayers} players for {booking.console} ({remainingForSelected} seats left)
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-10 flex gap-4">
              {step > 1 && (
                <Button variant="outline" className="neon-border bg-card" onClick={() => setStep(step - 1)}>Back</Button>
              )}
              <Button
                disabled={!canProceed()}
                className="flex-1 gradient-neon text-primary-foreground font-heading animate-glow-breathe hover:scale-[1.03] transition-transform disabled:opacity-40 disabled:animate-none"
                onClick={handleNext}
              >
                {step < 2 ? "Next" : "Proceed to Checkout"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Booking;
