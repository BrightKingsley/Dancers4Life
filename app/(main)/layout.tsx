import React from "react";
import { Header } from "../components/client";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full gap-2 h-screen bg-brand-silver flex flex-col">
      <Header />
      {children}
    </main>
  );
}
