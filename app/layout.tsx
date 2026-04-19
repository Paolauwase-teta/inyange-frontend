import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inyange Industry Portfolio",
  description: "Inyange Industries food processing and dairy & beverage manufacturing.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/logo.png",
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
        className={`${jost.variable} antialiased`}
      >
        <NavbarWrapper />
        {children}
        <ToastContainer position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}

