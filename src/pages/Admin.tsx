import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Calendar as CalendarIcon, Lock, RefreshCw, Trash2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { formatTimeRange12h } from "@/lib/pricing";

const ADMIN_PW_KEY = "titanglow_admin_pw";

interface BookingRow {
  id: string;
  name: string;
  phone: string;
  booking_date: string;
  start_time: string | null;
  end_time: string | null;
  console_type: string;
  players: number;
  price: number | null;
  created_at: string;
}

const Admin = () => {
  const [password, setPassword] = useState<string>(() => sessionStorage.getItem(ADMIN_PW_KEY) || "");
  const [pwInput, setPwInput] = useState("");
  const [authed, setAuthed] = useState<boolean>(!!password);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState<string>(() => format(new Date(), "yyyy-MM-dd"));
  const [filterAll, setFilterAll] = useState(false);
  const [search, setSearch] = useState("");
  const [pendingCancelId, setPendingCancelId] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    let q = supabase
      .from("bookings")
      .select("id, name, phone, booking_date, start_time, end_time, console_type, players, price, created_at")
      .order("booking_date", { ascending: false })
      .order("start_time", { ascending: true });
    if (!filterAll && filterDate) q = q.eq("booking_date", filterDate);
    const { data, error } = await q;
    if (error) {
      toast.error("Failed to load bookings");
      setBookings([]);
    } else {
      setBookings((data as BookingRow[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!authed) return;
    fetchBookings();
    const channel = supabase
      .channel("admin-bookings")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, fetchBookings)
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, filterDate, filterAll]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return bookings;
    return bookings.filter(
      (b) =>
        b.name.toLowerCase().includes(s) ||
        b.phone.includes(s) ||
        b.id.toLowerCase().includes(s)
    );
  }, [bookings, search]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwInput.trim()) return;
    sessionStorage.setItem(ADMIN_PW_KEY, pwInput);
    setPassword(pwInput);
    setAuthed(true);
    setPwInput("");
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_PW_KEY);
    setPassword("");
    setAuthed(false);
    setBookings([]);
  };

  const handleCancel = async () => {
    if (!pendingCancelId) return;
    setCancelling(true);
    try {
      const { data, error } = await supabase.functions.invoke("cancel-booking", {
        body: { password, bookingId: pendingCancelId },
      });
      if (error) {
        // edge function returns non-2xx on bad password / missing id
        const msg =
          (data as { error?: string } | null)?.error ||
          error.message ||
          "Failed to cancel booking";
        if (msg.toLowerCase().includes("invalid admin password")) {
          toast.error("Wrong admin password — please log in again");
          handleLogout();
        } else {
          toast.error(msg);
        }
      } else if ((data as { success?: boolean })?.success) {
        toast.success("Booking cancelled successfully");
        // realtime will refresh; fetch immediately as a fallback
        fetchBookings();
      } else {
        toast.error("Cancellation failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error while cancelling");
    } finally {
      setCancelling(false);
      setPendingCancelId(null);
    }
  };

  if (!authed) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm bg-card neon-border rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-neon-cyan" />
              <h1 className="font-heading text-xl text-foreground text-glow-blue">Admin Access</h1>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the admin password to manage bookings.
            </p>
            <Input
              type="password"
              placeholder="Admin password"
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              className="bg-background neon-border"
              autoFocus
            />
            <Button
              type="submit"
              className="w-full gradient-neon text-primary-foreground font-heading"
            >
              Unlock Dashboard
            </Button>
            <Link
              to="/"
              className="block text-center text-xs text-muted-foreground hover:text-foreground"
            >
              ← Back to Home
            </Link>
          </form>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="neon-border bg-card"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" /> Logout
            </Button>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl text-foreground text-glow-blue mb-6">
            Admin Dashboard
          </h1>

          {/* Filters */}
          <div className="bg-card neon-border rounded-xl p-4 mb-6 flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[180px]">
              <label className="text-[11px] font-heading text-muted-foreground mb-1 block">
                <CalendarIcon className="w-3 h-3 inline mr-1" /> Date
              </label>
              <Input
                type="date"
                value={filterDate}
                disabled={filterAll}
                onChange={(e) => setFilterDate(e.target.value)}
                className="bg-background neon-border"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterAll((a) => !a)}
              className={`neon-border ${filterAll ? "gradient-neon text-primary-foreground border-transparent" : "bg-card"}`}
            >
              {filterAll ? "Showing All Dates" : "Show All Dates"}
            </Button>
            <div className="flex-1 min-w-[180px]">
              <label className="text-[11px] font-heading text-muted-foreground mb-1 block">
                Search (name / phone / id)
              </label>
              <Input
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-background neon-border"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchBookings}
              className="neon-border bg-card"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-card neon-border rounded-lg p-3 text-center">
              <div className="text-[10px] text-muted-foreground font-heading">TOTAL</div>
              <div className="font-heading text-2xl text-neon-cyan">{filtered.length}</div>
            </div>
            <div className="bg-card neon-border rounded-lg p-3 text-center">
              <div className="text-[10px] text-muted-foreground font-heading">PLAYERS</div>
              <div className="font-heading text-2xl text-neon-purple">
                {filtered.reduce((s, b) => s + (b.players || 0), 0)}
              </div>
            </div>
            <div className="bg-card neon-border rounded-lg p-3 text-center">
              <div className="text-[10px] text-muted-foreground font-heading">REVENUE</div>
              <div className="font-heading text-2xl text-neon-blue">
                ₹{filtered.reduce((s, b) => s + (b.price || 0), 0)}
              </div>
            </div>
          </div>

          {/* Bookings list */}
          {loading ? (
            <p className="text-center text-muted-foreground py-10">Loading…</p>
          ) : filtered.length === 0 ? (
            <div className="bg-card neon-border rounded-xl p-10 text-center text-muted-foreground">
              No bookings found.
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((b) => (
                <div
                  key={b.id}
                  className="bg-card neon-border rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-3"
                >
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                    <div>
                      <div className="text-[10px] text-muted-foreground font-heading">NAME</div>
                      <div className="text-foreground">{b.name}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground font-heading">PHONE</div>
                      <a
                        href={`tel:${b.phone}`}
                        className="text-neon-cyan hover:underline"
                      >
                        {b.phone}
                      </a>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground font-heading">DATE</div>
                      <div className="text-foreground">
                        {format(new Date(b.booking_date), "PP")}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground font-heading">TIME</div>
                      <div className="text-foreground">
                        {b.start_time && b.end_time
                          ? formatTimeRange12h(b.start_time, b.end_time)
                          : "–"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground font-heading">CONSOLE</div>
                      <div className="text-foreground">
                        {b.console_type} · {b.players}P
                        {b.price ? <span className="text-neon-cyan ml-1">₹{b.price}</span> : null}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPendingCancelId(b.id)}
                    className="border-neon-red/60 text-neon-red hover:bg-neon-red/10 hover:text-neon-red"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Cancel
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={!!pendingCancelId} onOpenChange={(o) => !o && setPendingCancelId(null)}>
        <AlertDialogContent className="bg-card neon-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the booking and frees up the slot for other customers. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancelling}>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              disabled={cancelling}
              className="bg-neon-red hover:bg-neon-red/80 text-primary-foreground"
            >
              {cancelling ? "Cancelling…" : "Yes, Cancel"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageTransition>
  );
};

export default Admin;