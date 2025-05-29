import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo App — CRUD with Next.js & Axios",
  description:
    "A full-featured Todo List application built using Next.js App Router, TypeScript, Axios, and json-server with CRUD operations.",
  icons: {
    icon: "/crud.png", // or "/favicon.png" or "/my-icon.svg"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
