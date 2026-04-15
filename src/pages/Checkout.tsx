import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBookingStore } from "@/lib/bookingStore";
import { format } from "date-fns";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { booking, setName, setPhone, confirmBooking } = useBookingStore();

  const handleConfirm = () => {
    if (!booking.name.trim() || !booking.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    if (booking.phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    confirmBooking();
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
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
            <span className="text-foreground">{booking.timeSlot?.label || "–"}</span>
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
          className="w-full gradient-neon text-primary-foreground font-heading py-6 text-lg neon-glow-blue hover:scale-[1.02] transition-transform"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
