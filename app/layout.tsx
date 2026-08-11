import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gahan Dental — Your Smile Comes First | Premium Dental Clinic",
  description: "Modern, high-end dental clinic providing expert therapeutic treatment, 3D scans, surgery, and pediatric care with an architectural aesthetic.",
  keywords: ["Dental Clinic", "Gahan Dental", "3D Scans", "Teeth Cleaning", "Pediatric Dentist", "Dental Surgery"],
  openGraph: {
    title: "Gahan Dental — Premium Dental Clinic",
    description: "Your smile comes first. Experience modern architectural dental care.",
    type: "website",
    locale: "en_US",
    siteName: "Gahan Dental Dental Clinic",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F8FA] text-[#111827] selection:bg-[#587A9C] selection:text-white">
        {children}
      </body>
    </html>
  );
}
