import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "A Netflix-like streaming platform clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
