import { corsHeaders } from "npm:@supabase/supabase-js/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const webhookUrl = Deno.env.get("GOOGLE_SHEETS_WEBHOOK_URL");
    if (!webhookUrl) {
      throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not configured");
    }

    const body = await req.json();
    const { name, phone, booking_date, time_slot, console_type, players } = body ?? {};

    if (!name || !phone || !booking_date || !time_slot || !console_type) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const payload = {
      name: String(name),
      phone: String(phone),
      date: String(booking_date),
      slot: String(time_slot),
      console: String(console_type),
      players: Number(players ?? 1),
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await res.text();
    if (!res.ok) {
      throw new Error(`Sheets webhook failed [${res.status}]: ${text}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("sync-to-sheets error:", message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
