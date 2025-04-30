"use client";

import { CVProvider } from "@/contexts/CVContext";

export default function BulkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CVProvider>{children}</CVProvider>;
} 