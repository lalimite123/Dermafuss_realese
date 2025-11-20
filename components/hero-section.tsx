"use client"
import HeroService from "./hero-service"
import BookingCard from "./booking-card"
import { useEffect } from "react"
import { motion } from "framer-motion"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-1 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-12 min-h-[420px] sm:min-h-[520px] lg:min-h-[680px] items-stretch"
      >
      {/* Featured Service Card - Takes full height */}
      <motion.div
        initial={{ opacity: 0, x: -40, scale: 0.98 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        className="lg:col-span-2 h-auto lg:h-full"
      >
        <HeroService/>
      </motion.div>

      {/* Booking Card - Takes full height on the right */}
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="lg:col-span-1 h-auto lg:h-full"
      >
        <BookingCard />
      </motion.div>
      </motion.div>
  )
}
