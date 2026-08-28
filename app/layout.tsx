import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./theme-context";

export const metadata: Metadata = {
  title: "Sajad - Software Developer",
  description: "Shaping concepts. Building experiences. Portfolio of a creative developer based in Kerala.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col"
        style={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--font-body" as any]: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--font-mono" as any]: `ui-monospace, SFMono-Regular, Menlo, monospace`,
        }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
