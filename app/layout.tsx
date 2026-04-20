import type { Metadata } from "next";
// Removed Jost import to use Arial (system font) instead
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import ChatBox from "./components/ChatBox";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Jost configuration removed

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
        className="antialiased"
      >
        <NavbarWrapper />
        {children}
        <ChatBox />
        <ToastContainer position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}

