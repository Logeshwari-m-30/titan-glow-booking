import { Link } from "react-router-dom";
import { CheckCircle, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/lib/bookingStore";
import { format } from "date-fns";
import PageTransition from "@/components/PageTransition";
import { formatTimeRange12h } from "@/lib/pricing";

const Confirmation = () => {
  const { booking } = useBookingStore();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4 relative z-10">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-full gradient-neon mx-auto flex items-center justify-center mb-6 animate-glow-breathe">
            <CheckCircle className="w-10 h-10 text-primary-foreground" />
          </div>

          <h1 className="font-heading text-3xl md:text-4xl text-foreground text-glow-blue mb-3">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-8">Your slot is reserved! Please arrive on time.</p>

          <div className="bg-card rounded-xl p-6 neon-border text-left space-y-3 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="text-foreground">{booking.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Phone</span>
              <span className="text-foreground">{booking.phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span className="text-foreground">{booking.date ? format(booking.date, "PPP") : "–"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Time</span>
              <span className="text-foreground">
                {booking.startTime && booking.endTime
                  ? formatTimeRange12h(booking.startTime, booking.endTime)
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
              <span className="text-neon-cyan font-medium">Pay at Shop</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Phone className="w-4 h-4" />
            <span className="text-sm">
              Contact us: <a href="tel:+917639646961" className="hover:text-neon-cyan">+91 76396 46961</a>
              {" / "}
              <a href="tel:+919566924901" className="hover:text-neon-cyan">+91 95669 24901</a>
            </span>
          </div>

          <Link to="/">
            <Button variant="outline" className="neon-border bg-card hover:neon-glow-blue transition-all">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default Confirmation;
