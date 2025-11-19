"use client"
import HeroService from "./hero-service"
import BookingCard from "./booking-card"
import { useEffect } from "react"

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
      <div className="mt-1 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-12 min-h-[500px]"  >
      {/* Featured Service Card - Takes full height */}
      <div className="lg:col-span-2">
        <HeroService/>
      </div>

      {/* Booking Card - Takes full height on the right */}
      <div className="lg:col-span-1">
        <BookingCard />
      </div>
      </div>
  )
}
