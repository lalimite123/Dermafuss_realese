"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share, PlusSquare } from "lucide-react"

export default function IosInstallHelper() {
  const [showCta, setShowCta] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const isIos = /iphone|ipad|ipod/.test(ua)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true
    const vendor = navigator.vendor || ''
    const isSafari = vendor.includes('Apple') && !ua.includes('crios') && !ua.includes('fxios')
    setShowCta(Boolean(isIos && isSafari && !isStandalone))
  }, [])

  if (!showCta) return null

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-card/95 border border-border backdrop-blur-md rounded-2xl shadow-lg p-3 flex items-center gap-3">
          <img src="/kevinelogo.png" alt="App" className="h-8 w-8 rounded-lg" />
          <div className="flex-1">
            <div className="text-sm font-medium">Installieren auf iPhone/iPad</div>
            <div className="text-xs text-muted-foreground">Schnell zur Startseite hinzufügen</div>
          </div>
          <Button size="sm" className="rounded-full" onClick={() => setOpen(true)}>Installieren</Button>
        </div>

        {open && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
            <Card className="w-full sm:max-w-md mx-4 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <img src="/kevinelogo.png" alt="App" className="h-9 w-9 rounded-lg" />
                <h3 className="text-lg font-semibold">App installieren auf iOS</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Share className="h-5 w-5 text-primary" />
                  <span>Tippe auf Teilen</span>
                </div>
                <div className="flex items-center gap-3">
                  <PlusSquare className="h-5 w-5 text-primary" />
                  <span>Wähle „Zum Home-Bildschirm“</span>
                </div>
                <div className="text-xs text-muted-foreground">Nach der Installation startet die App im Vollbildmodus.</div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 rounded-full" onClick={() => setOpen(false)}>Ich habe verstanden</Button>
                <Button variant="ghost" className="rounded-full" onClick={() => setShowCta(false)}>Nicht mehr anzeigen</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}