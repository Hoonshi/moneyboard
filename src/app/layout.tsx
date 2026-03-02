import type { Metadata } from "next";
import Provider from "@/providers/provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoneyLog",
  description: "나만의 가계부",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Provider>{children}</Provider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              fontSize: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
