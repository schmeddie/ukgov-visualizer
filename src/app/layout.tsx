import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UK Government Structure Visualiser",
  description:
    "Interactive network graph visualising the structure of the UK Government.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-[#060a14] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
