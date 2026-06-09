import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const roboto = Roboto({
  variable: "--roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "William Salembien - Vertex Digital | Développeur Fullstack Freelance",
  description: "Développeur web freelance spécialisé en Symfony, Next.js et Tailwind. En recherche d'alternance CDA.",
  alternates: {
    canonical: "https://vertex-digital.fr",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html
      lang="fr"
      className={`${roboto.variable} h-full antialiased `}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
