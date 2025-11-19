import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Luxe Beauty & Spa",
  description: "Premium beauty and cosmetics services",
  generator: "termi-consult",
  icons: {
    icon: [
      { url: "/kevinelogo.png", type: "image/png", sizes: "32x32" },
      { url: "/kevinelogo.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/kevinelogo.png",
    shortcut: "/kevinelogo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
