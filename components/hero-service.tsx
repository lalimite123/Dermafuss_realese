"use client"

import { Star, Users, Eye, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"

const HeroService = () => {
  const images = ["/landing1.jpg", "/landing2.jpg", "/landing3.jpg", "/landing4.jpg", "/galerie1.jpg", "/galerie2.jpg", "/galerie3.jpg", "/galerie4.jpg", "/galerie5.jpg"]
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = images.length

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
    }
    emblaApi.on("select", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])
  useEffect(() => {
    if (!emblaApi) return
    const id = setInterval(() => {
      emblaApi.scrollNext()
    }, 3000)
    return () => clearInterval(id)
  }, [emblaApi])

  const services = ["Medizinische Fußpflege", "Nagelkorrektur", "Hornhautentfernung", "Diabetische Fußpflege"]

  return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-6xl mx-auto h-full min-h-[400px] sm:min-h-[600px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] group"
      >
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
              {images.map((src, idx) => (
                <div key={idx} className="min-w-0 flex-[0_0_100%] h-full">
                  <img
                    src={src}
                    alt="Professionelle Fußpflege"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/80"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 sm:h-2/5 bg-gradient-to-t from-green-800/80 via-green-600/60 to-transparent"></div>

          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
               <div className="ml-1 sm:ml-2 flex items-center gap-2">
                  <div className="h-1.5 w-8 sm:w-12 bg-card/30 rounded-full overflow-hidden">
                      <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                      ></div>
                  </div>
                  <span className="text-card font-bold text-sm sm:text-lg">{String(currentSlide + 1).padStart(2, "0")}</span>
                  <span className="text-card/60 text-xs sm:text-sm">/{String(totalSlides).padStart(2, "0")}</span>
              </div>
          </div>

          <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card/70 text-foreground hover:bg-card transition-colors border border-border"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card/70 text-foreground hover:bg-card transition-colors border border-border"
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-8">
            <div className="rounded-2xl bg-white/10 border border-white/15 shadow-[0_12px_40px_rgb(0,0,0,0.35)] p-3 sm:p-6 max-w-full sm:max-w-3xl">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">Medizinische Fußpflege Premium</h2>
              <div className="mt-2 sm:mt-4 flex flex-wrap gap-2">
                {services.map((service) => (
                  <Badge
                    key={service}
                    variant="secondary"
                    className="rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-card/95 hover:bg-card border border-border/50 shadow-lg transition-all hover:scale-105"
                  >
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
      </motion.div>
  )
}

export default HeroService
