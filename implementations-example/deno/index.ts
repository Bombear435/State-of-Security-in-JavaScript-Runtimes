import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

console.log("Server running on port 3000");

serve(
  (_req) =>
    new Response("Hello from Deno!", {
      headers: { "Content-Type": "text/plain", }
    }), { addr: ":3000" }
);
