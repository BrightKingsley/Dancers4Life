import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "/public/css/globals.css";
import {
  AuthContextProvider,
  ModalContextProvider,
  NotificationContextProvider,
} from "@/context";
import { PortalElements } from "./components/client";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
  display: "swap",
  fallback: ["poppins"],
  subsets: ["latin-ext", "latin"],
});

export const metadata: Metadata = {
  title: "Welcome to Malipoma",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div id="modal" />
        <div id="notification" />
        <AuthContextProvider>
          <NotificationContextProvider>
            <ModalContextProvider>
              <PortalElements />
              {children}
            </ModalContextProvider>
          </NotificationContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}