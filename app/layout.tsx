import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dermafuss Lollar | Professionelle Fußpflege & Medizinische Pediküre",
  description: "Dermafuss Lollar bietet professionelle medizinische Fußpflege, Pediküre und Fußkosmetik. Behandlung von Hühneraugen, eingewachsenen Nägeln, Hornhaut & Nagelpilz. Jetzt Termin vereinbaren!",
  keywords: "Fußpflege Lollar, medizinische Fußpflege, Pediküre Lollar, Podologie, Hühneraugen entfernen, eingewachsene Nägel behandeln, Hornhautentfernung, Nagelpilz Behandlung, Fußkosmetik, diabetischer Fuß",
  authors: [{ name: "Dermafuss Lollar" }],
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
    url: "https://derma-fuss.de",
    siteName: "Dermafuss Lollar",
    title: "Derma-fuss Lollar | Professionelle Fußpflege & Medizinische Pediküre",
    description: "Ihre Experten für medizinische Fußpflege in Lollar. Professionelle Behandlung von Fußproblemen, Pediküre und Fußkosmetik mit modernsten Methoden.",
    images: [
      {
        url: "/kevinelogo.png",
        width: 1200,
        height: 630,
            alt: "Derma-fuss Lollar - Professionelle Fußpflege",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
      title: "Derma-fuss Lollar | Professionelle Fußpflege & Medizinische Pediküre",
    description: "Ihre Experten für medizinische Fußpflege in Lollar. Jetzt Termin vereinbaren!",
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
    canonical: "https://derma-fuss.de",
  },
  verification: {
    // Ajoute ici tes codes de vérification si tu en as
    // google: "ton-code-google",
    // bing: "ton-code-bing",
  },
  manifest: "/manifest.json",
  themeColor: "#9BB8AC",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dermafuss Lollar",
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
        <link rel="canonical" href="https://derma-fuss.de" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Script id="sw-register" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html:
            "if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(() => {}); }); }",
        }} />
      </body>
    </html>
  )
}