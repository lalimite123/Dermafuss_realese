"use client"

import { Search, Maximize2, Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

const BookingCard = () => {
  const scrollToBooking = () => {
    const element = document.getElementById("booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToServices = () => {
    const element = document.getElementById("services")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const mapQuery = encodeURIComponent(
    "Gießener Straße 10 35457 Lollar"
  )
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-muted/50 rounded-3xl p-8 shadow-[var(--shadow-card)] relative overflow-hidden h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="mb-auto">
          <h1 className="text-6xl font-bold mb-4 leading-tight">
            Gesunde
            <br />
            Füße
          </h1>

          <p className="text-lg text-muted-foreground max-w-md">
            Professionelle Fußpflege in Lollar mit höchsten Hygienestandards und individueller Betreuung.
          </p>

          <Button
            onClick={scrollToServices}
            className="cursor-pointer mt-8 rounded-full px-5 py-6 text-base font-semibold bg-card hover:bg-card/90 text-foreground border border-border shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-hover)] hover:scale-105 group"
          >
            Unsere Leistungen entdecken
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </div>

        <div className="mt-8 bg-card rounded-2xl p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Service</h3>
            <button className="p-2 hover:bg-muted rounded-lg transition-all">
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <Input
            type="text"
            placeholder="Suchen Sie eine Behandlung"
            className="mb-4 rounded-xl border-border bg-muted/50 text-base py-6"
          />

          <Button
            size="lg"
            onClick={scrollToBooking}
            className="cursor-pointer w-full rounded-xl bg-accent hover:bg-accent/90 text-background py-6 text-base font-semibold shadow-lg transition-all hover:shadow-xl"
          >
            Termin buchen
            <Calendar className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Adresse et redirection vers Google Maps */}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 rounded-2xl border border-border bg-white/10 backdrop-blur-xl p-4 text-foreground shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all hover:bg-white/15 flex items-center gap-3"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <MapPin className="h-5 w-5 text-muted-foreground" />
          </span>
          <div className="flex-1">
            <div className="text-sm font-semibold">Adresse</div>
            <div className="text-sm">DermaFuß – Fachfußpflege</div>
            <div className="text-sm text-muted-foreground">Gießener Straße 10, 35457 Lollar</div>
          </div>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-background">
            <ArrowRight className="h-4 w-4" />
          </span>
        </a>
      </div>
    </motion.div>
  )
}

export default BookingCard
