import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, Users, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useBookingStore, type Console } from "@/lib/bookingStore";
import PageTransition from "@/components/PageTransition";
import gamingBg from "@/assets/gaming-bg.jpg";

const consoleOptions: { value: Console; label: string; emoji: string }[] = [
  { value: "PS5", label: "PlayStation 5", emoji: "🎮" },
  { value: "PS4", label: "PlayStation 4", emoji: "🕹️" },
  { value: "PS2", label: "PlayStation 2", emoji: "👾" },
];

const Booking = () => {
  const navigate = useNavigate();
  const { booking, slots, setDate, setTimeSlot, setConsole, setPlayers } = useBookingStore();
  const [step, setStep] = useState(1);

  const seatsLeft = booking.timeSlot ? booking.timeSlot.max - booking.timeSlot.booked : 0;
  const maxPlayers = booking.timeSlot ? Math.min(12, seatsLeft) : 12;

  const canProceed = () => {
    if (step === 1) return !!booking.date && !!booking.timeSlot;
    if (step === 2) return !!booking.console && booking.players >= 1;
    return false;
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
                        disabled={(date) => date < new Date()}
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
                        const left = slot.max - slot.booked;
                        const isFull = left <= 0;
                        const almostFull = left > 0 && left < 4;
                        const isSelected = booking.timeSlot?.id === slot.id;

                        return (
                          <button
                            key={slot.id}
                            disabled={isFull}
                            onClick={() => setTimeSlot(slot)}
                            className={cn(
                              "p-4 rounded-lg border text-left slot-card-hover",
                              isFull && "opacity-40 cursor-not-allowed bg-muted border-border",
                              !isFull && !isSelected && "bg-card neon-border hover:neon-glow-blue cursor-pointer",
                              isSelected && "gradient-neon neon-glow-blue border-transparent",
                              almostFull && !isSelected && "animate-pulse-red"
                            )}
                          >
                            <div className={cn("font-medium text-sm", isSelected ? "text-primary-foreground" : "text-foreground")}>
                              {slot.label}
                            </div>
                            <div className={cn(
                              "text-xs mt-1 font-medium",
                              isFull ? "text-muted-foreground" : almostFull ? "text-neon-red" : isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                            )}>
                              {isFull ? "FULL" : almostFull ? `⚠ Almost Full – ${left} seats left` : `${left}/${slot.max} seats available`}
                            </div>
                          </button>
                        );
                      })}
                    </div>
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
                    {consoleOptions.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setConsole(c.value)}
                        className={cn(
                          "p-4 rounded-lg border text-center slot-card-hover",
                          booking.console === c.value ? "gradient-neon neon-glow-purple border-transparent" : "bg-card neon-border hover:neon-glow-purple"
                        )}
                      >
                        <div className="text-3xl mb-2">{c.emoji}</div>
                        <div className={cn("font-heading text-xs", booking.console === c.value ? "text-primary-foreground" : "text-foreground")}>
                          {c.value}
                        </div>
                      </button>
                    ))}
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
                  {booking.timeSlot && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Max {maxPlayers} players for this slot ({seatsLeft} seats left)
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
                onClick={() => step < 2 ? setStep(step + 1) : navigate("/checkout")}
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
