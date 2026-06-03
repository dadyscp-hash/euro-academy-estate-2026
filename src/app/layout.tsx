import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Euro Academy | Candidature Estate 2026",
  description: "Percorso di formazione e selezione EuroSirius per venditori di servizi marketing.",
  metadataBase: new URL("https://euroacademy.it")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-void text-lunar antialiased">
        {children}
      </body>
    </html>
  );
}
