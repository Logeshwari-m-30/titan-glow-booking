import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBookingStore } from "@/lib/bookingStore";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import PageTransition from "@/components/PageTransition";
import gamingBg from "@/assets/gaming-bg.jpg";
import { useState } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const { booking, setName, setPhone, confirmBooking } = useBookingStore();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!booking.name.trim() || !booking.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    if (booking.phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    const payload = {
      name: booking.name.trim(),
      phone: booking.phone.trim(),
      booking_date: booking.date ? format(booking.date, "yyyy-MM-dd") : "",
      start_time: booking.startTime,
      end_time: booking.endTime,
      time_slot: `${booking.startTime} - ${booking.endTime}`,
      console_type: booking.console || "",
      players: booking.players,
      price: booking.price,
    };

    try {
      const { error } = await supabase.from("bookings").insert(payload);
      if (error) throw error;

      // Fire-and-forget Google Sheets sync — don't block confirmation if it fails
      supabase.functions
        .invoke("sync-to-sheets", { body: payload })
        .then(({ error: syncError }) => {
          if (syncError) console.error("Google Sheets sync failed:", syncError);
        });

      toast.success("Booking saved successfully!");
      confirmBooking();
      navigate("/confirmation");
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Failed to save booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative z-10">
        <div className="fixed inset-0 z-0">
          <img src={gamingBg} alt="" className="w-full h-full object-cover opacity-15 blur-[3px]" width={1920} height={1080} loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>

        <div className="relative z-10 py-8 px-4">
          <div className="max-w-lg mx-auto">
            <Link to="/booking" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Booking
            </Link>

            <h1 className="font-heading text-3xl text-foreground text-glow-blue mb-8">Checkout</h1>

            {/* Summary */}
            <div className="bg-card rounded-xl p-6 neon-border mb-8 space-y-3">
              <h2 className="font-heading text-lg text-foreground mb-4">Booking Summary</h2>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">{booking.date ? format(booking.date, "PPP") : "–"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time</span>
                <span className="text-foreground">
                  {booking.startTime && booking.endTime
                    ? `${booking.startTime} – ${booking.endTime}`
                    : "–"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Console</span>
                <span className="text-foreground">{booking.console || "–"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Players</span>
                <span className="text-foreground">{booking.players}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-border">
                <span className="text-muted-foreground">Total Price</span>
                <span className="font-heading text-lg text-neon-cyan text-glow-blue">₹{booking.price}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-border">
                <span className="text-muted-foreground">Payment</span>
                <span className="text-neon-cyan font-medium flex items-center gap-1">
                  <CreditCard className="w-4 h-4" /> Pay at Shop
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="font-heading text-sm text-muted-foreground mb-2 block">Your Name</label>
                <Input
                  value={booking.name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-card neon-border"
                />
              </div>
              <div>
                <label className="font-heading text-sm text-muted-foreground mb-2 block">Phone Number</label>
                <Input
                  value={booking.phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  type="tel"
                  className="bg-card neon-border"
                />
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full gradient-neon text-primary-foreground font-heading py-6 text-lg animate-glow-breathe hover:scale-[1.02] transition-transform disabled:animate-none"
            >
              {loading ? "Saving..." : "Confirm Booking"}
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
