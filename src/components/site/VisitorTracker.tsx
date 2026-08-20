import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function VisitorTracker() {
  useEffect(() => {
    let mounted = true;

    const trackVisitor = async () => {
      try {
        if (sessionStorage.getItem("visitor_tracked")) return;

        let ip = "";
        let city = "";
        let country = "";
        let region = "";

        try {
          const res = await fetch("https://ipapi.co/json/");
          if (res.ok) {
            const data = await res.json();
            ip = data.ip || "";
            city = data.city || "";
            country = data.country_name || "";
            region = data.region || "";
          }
        } catch {
          try {
            const res = await fetch("https://api.ipify.org?format=json");
            if (res.ok) {
              const data = await res.json();
              ip = data.ip || "";
            }
          } catch {
            /* silently fail */
          }
        }

        const userAgent = navigator.userAgent;
        const deviceType = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent)
          ? "Mobile"
          : "Desktop";

        if (mounted) {
          await supabase.from("visitors").insert({
            ip_address: ip,
            city,
            country,
            region,
            user_agent: userAgent,
            device_type: deviceType,
          });
          sessionStorage.setItem("visitor_tracked", "true");
        }
      } catch {
        /* silently fail — never block UI */
      }
    };

    trackVisitor();
    return () => {
      mounted = false;
    };
  }, []);

  return null;
}