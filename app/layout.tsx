import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kamel Ride Dashboard",
  description: "Live event analytics for Kamel Ride",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}