// lib/axiom.ts
import { Axiom } from "@axiomhq/js";

// Server-side configuration only
const getConfig = () => {
  return {
    token: process.env.AXIOM_TOKEN,
    orgId: process.env.AXIOM_ORG_ID,
    dataset: process.env.AXIOM_DATASET
  };
};

const axiomConfig = getConfig();

// Validate configuration silently

let axiom: Axiom | null = null;

try {
  if (axiomConfig.token && axiomConfig.orgId) {
    axiom = new Axiom({
      token: axiomConfig.token,
      orgId: axiomConfig.orgId,
    });
  }
} catch (error) {
  // Silently handle initialization errors
}

// Client-side logging function that sends events to the API route
export function logEventClient(event: string, data: Record<string, any>) {
  if (typeof window === "undefined") return;

  // Clean up the data by removing nil/empty values
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) =>
      value !== null && value !== undefined && value !== ''
    )
  );

  // Add client-side metadata
  const logData = {
    ...cleanData,
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
    },
    referrer: document.referrer || undefined, // Only include if not empty
    url: window.location.href,
  };

  // Send to API route for server-side logging with IP detection
  fetch('/api/axiom/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event, data: logData }),
  }).catch(() => {
    // Silently handle fetch errors
  });
}

export function logEvent(event: string, data: Record<string, any>, request?: any) {

  if (!axiom) {
    return;
  }

  // Server-side logging with IP detection from request headers
  try {
    // Add IP address from request headers if available
    if (request) {
      // Try multiple header sources for IP detection
      const clientIP = request.headers?.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers?.get('x-real-ip') ||
        request.headers?.get('cf-connecting-ip') || // Cloudflare
        request.headers?.get('x-client-ip') ||
        request.headers?.get('x-forwarded') ||
        request.headers?.get('forwarded-for') ||
        request.headers?.get('forwarded');

      if (clientIP && clientIP !== 'unknown' && clientIP !== '::1') {
        data.ip = clientIP;
        data.ipSource = 'server-headers';
      }
    }

    // Send to Axiom
    if (axiomConfig.dataset) {
      axiom?.ingest(axiomConfig.dataset, { event, ...data });
    }
  } catch (error) {
    // Silently handle errors
  }
}
