"use client"

import { Star, Users, Eye, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const HeroService = () => {
  const [currentSlide] = useState(1)
  const totalSlides = 3

  const services = ["Medizinische Fußpflege", "Nagelkorrektur", "Hornhautentfernung", "Diabetische Fußpflege"]

  return (
      <div className="relative w-full max-w-6xl mx-auto h-full rounded-2xl overflow-hidden shadow-[var(--shadow-card)] group">
          <img
              src="/professional-foot-care-treatment-spa-luxury-wellne.jpg"
              alt="Professionelle Fußpflege"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/80"></div>

          <div className="absolute top-6 left-6 flex flex-col sm:flex-row items-center gap-3">
              <div className="bg-card rounded-2xl px-4 py-2 flex items-center gap-2 shadow-lg">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">Signature Behandlung</span>
              </div>

              <div className="flex gap-2">
                  <button className="bg-card/90 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-all shadow-lg">
                      <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button className="bg-card/90 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-all shadow-lg">
                      <ChevronRight className="h-5 w-5" />
                  </button>
              </div>

              <div className="ml-2 flex items-center gap-2">
                  <div className="h-1.5 w-12 bg-card/30 rounded-full overflow-hidden">
                      <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
                      ></div>
                  </div>
                  <span className="text-card font-bold text-lg">{String(currentSlide).padStart(2, "0")}</span>
                  <span className="text-card/60 text-sm">/{String(totalSlides).padStart(2, "0")}</span>
              </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
              <h2 className="text-4xl font-bold text-card mb-3">Medizinische Fußpflege Premium</h2>

              <div className="mt-4 flex flex-wrap gap-2">
                  {services.map((service) => (
                      <Badge
                          key={service}
                          variant="secondary"
                          className="rounded-full px-4 py-1.5 bg-card/95 backdrop-blur-sm hover:bg-card border border-border/50 shadow-lg transition-all hover:scale-105"
                      >
                          {service}
                      </Badge>
                  ))}
              </div>
          </div>
      </div>
  )
}

export default HeroService
