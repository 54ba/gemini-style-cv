// lib/axiom.ts
import { Axiom } from "@axiomhq/js";
import axiomConfig from "@/axiom.config";

const axiom = new Axiom({
  token: axiomConfig.token ?? "",
  orgId: axiomConfig.orgId,
});

export function logEvent(event: string, data: Record<string, any>) {
  // Try to get extra info from browser
  if (typeof window !== "undefined") {
    data.userAgent = navigator.userAgent;
    data.language = navigator.language;
    data.platform = navigator.platform;
    data.screen = {
      width: window.screen.width,
      height: window.screen.height,
    };
    data.referrer = document.referrer;
    data.url = window.location.href;
    // Try to get IP and country via a public API
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((info) => {
        data.ip = info.ip;
        data.country = info.country_name;
        data.city = info.city;
        data.org = info.org;
        data.timezone = info.timezone;
        axiom.ingest(event, data);
        axiom.ingest(axiomConfig.dataset, { event, ...data });
      })
      .catch(() => axiom.ingest(axiomConfig.dataset, { event, ...data }));
  } else {
    axiom.ingest(axiomConfig.dataset, { event, ...data });
  }
}
