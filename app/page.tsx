"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { BookingSection } from "@/components/booking-section"
import { ContactSection } from "@/components/contact-section"
import { TestimonialSection } from "@/components/testimonial-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6 lg:px-8">
        <div className="grid gap-4 lg:gap-6">
          {/* Hero Section */}
          <section id="home" className="mt-5">
            <HeroSection />
          </section>

          

          {/* Services Section */}
          <section id="services" className="mt-16">
            <ServicesSection />
          </section>

          {/* About Section */}
          <section id="about" className="mt-02">
            <AboutSection />
          </section>

          {/* Philosophy & Hygiene */}
           <section id="philosophy" className="mt-16">
            <PhilosophySection />
          </section> 

          {/* Testimonials */}
          <section id="testimonials">
            <TestimonialSection />
          </section>

          {/* Booking Section */}
          <section id="booking">
            <BookingSection />
          </section>

          {/* Contact Section */}
          <section id="contact">
            <ContactSection />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
