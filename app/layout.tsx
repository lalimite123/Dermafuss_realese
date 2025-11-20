import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dermafuss Berlin | Professionelle Fußpflege & Medizinische Pediküre",
  description: "Dermafuss Berlin bietet professionelle medizinische Fußpflege, Pediküre und Fußkosmetik. Behandlung von Hühneraugen, eingewachsenen Nägeln, Hornhaut & Nagelpilz. Jetzt Termin vereinbaren!",
  keywords: "Fußpflege Berlin, medizinische Fußpflege, Pediküre Berlin, Podologie, Hühneraugen entfernen, eingewachsene Nägel behandeln, Hornhautentfernung, Nagelpilz Behandlung, Fußkosmetik, diabetischer Fuß",
  authors: [{ name: "Dermafuss Berlin" }],
  creator: "Dermafuss",
  publisher: "Dermafuss",
  generator: "termi-consult",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://dermafuss.de",
    siteName: "Dermafuss Berlin",
    title: "Dermafuss Berlin | Professionelle Fußpflege & Medizinische Pediküre",
    description: "Ihre Experten für medizinische Fußpflege in Berlin. Professionelle Behandlung von Fußproblemen, Pediküre und Fußkosmetik mit modernsten Methoden.",
    images: [
      {
        url: "/kevinelogo.png",
        width: 1200,
        height: 630,
        alt: "Dermafuss Berlin - Professionelle Fußpflege",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dermafuss Berlin | Professionelle Fußpflege & Medizinische Pediküre",
    description: "Ihre Experten für medizinische Fußpflege in Berlin. Jetzt Termin vereinbaren!",
    images: ["/kevinelogo.png"],
  },
  icons: {
    icon: [
      { url: "/kevinelogo.png", type: "image/png", sizes: "32x32" },
      { url: "/kevinelogo.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/kevinelogo.png",
    shortcut: "/kevinelogo.png",
  },
  alternates: {
    canonical: "https://dermafuss.de",
  },
  verification: {
    // Ajoute ici tes codes de vérification si tu en as
    // google: "ton-code-google",
    // bing: "ton-code-bing",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href="https://dermafuss.de" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}