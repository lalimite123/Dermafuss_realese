"use client"

import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Maria S.",
    rating: 5,
    text: "Sehr professionell und einfühlsam! Frau Mefo nimmt sich Zeit für jeden Kunden. Die Hygiene ist vorbildlich und ich fühle mich hier sehr gut aufgehoben.",
    date: "vor 2 Wochen",
  },
  {
    name: "Hans M.",
    rating: 5,
    text: "Als Senior mit Bewegungseinschränkungen schätze ich besonders die geduldige und sorgfältige Behandlung. Endlich wieder schmerzfreie Füße!",
    date: "vor 1 Monat",
  },
  {
    name: "Sophie K.",
    rating: 5,
    text: "Die beste Fußpflege in der Region! Moderne Ausstattung, perfekte Hygiene und eine sehr angenehme Atmosphäre. Absolut empfehlenswert!",
    date: "vor 3 Wochen",
  },
]

export function TestimonialSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-balance">Was unsere Kunden sagen</h2>
        <p className="text-muted-foreground text-lg text-pretty leading-relaxed">
          Vertrauen und Zufriedenheit stehen im Mittelpunkt
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <Quote className="h-8 w-8 text-primary/30 mb-4" />

            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-4 italic">"{testimonial.text}"</p>

            <div className="flex justify-between items-center pt-4 border-t border-border">
              <span className="font-semibold text-foreground">{testimonial.name}</span>
              <span className="text-xs text-muted-foreground">{testimonial.date}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 shadow-md bg-gradient-to-br from-primary/10 to-transparent text-center">
        <p className="text-muted-foreground leading-relaxed">
          Ihre Meinung ist uns wichtig! Teilen Sie Ihre Erfahrung mit DermaFuß und helfen Sie anderen, die richtige
          Entscheidung für ihre Fußgesundheit zu treffen.
        </p>
      </Card>
    </div>
  )
}
