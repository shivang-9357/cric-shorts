import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/fonts.css";
import { Provider } from "@/components/ui/provider";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/navbar/Navbar";
import { AppContextProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CricShorts",
  description: "Cricket in 60 seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <AppContextProvider>
            <Box>
              <Navbar />
              {children}
            </Box>
          </AppContextProvider>
        </Provider>
      </body>
    </html>
  );
}
