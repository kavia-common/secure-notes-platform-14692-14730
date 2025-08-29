import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Secure Notes",
  description: "Minimal, modern notes app with authentication and CRUD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Wrap entire app with AuthProvider so client components can use auth context */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
