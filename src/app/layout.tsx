import type { Metadata } from "next";
import { Orbitron, Rajdhani, Space_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { ToastContainer } from "@/components/organisms/ToastContainer/ToastContainer";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import FloatingMenu from "@/components/organisms/FloatingMenu";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kirtan Kunwar · Developer Portfolio",
  description:
    "A futuristic, cyberpunk-themed developer portfolio showcasing projects, skills, and gaming profile",
   icons: {
    icon: "/icon.ico",
   },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${spaceMono.variable} antialiased`}
      >
        <Providers>
          {/* <LoadingProvider> */}
          {/* Scanlines Effect */}
          <div className="scanlines" />

          {/* Grid Background */}
          <div
            className="fixed inset-0 opacity-5 pointer-events-none z-0"
            style={{
              backgroundImage: `linear-gradient(#00f0ff 1px, transparent 1px), 
                                  linear-gradient(90deg, #00f0ff 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Vignette */}
          <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle, transparent 40%, rgba(10, 14, 39, 0.8) 100%)",
            }}
          />

          {/* Toast Container */}
          <ToastContainer position="top-right" maxToasts={5} />

          {/* Floating Menu */}
          <FloatingMenu />

          {/* Main Content */}
          <main className="relative z-10">{children}</main>
          {/* </LoadingProvider> */}
        </Providers>
      </body>
    </html>
  );
}
