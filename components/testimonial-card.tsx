"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Regular Client",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The signature facial treatment was absolutely transformative. My skin has never looked better! The staff is incredibly professional and the atmosphere is so relaxing.",
  },
  {
    name: "Emily Rodriguez",
    role: "New Client",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "I came for the hot stone massage and left feeling like a new person. The attention to detail and personalized care really sets this spa apart from others.",
  },
  {
    name: "Jessica Kim",
    role: "VIP Member",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "I've tried many spas in the city, but Luxe Beauty is by far the best. The keratin treatment gave me the smoothest hair I've ever had. Highly recommend!",
  },
]

export function TestimonialCard() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 text-center">Client Love</h2>
        <p className="text-muted-foreground text-center">Hear what our clients say about their experience</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow rounded-lg bg-white">
            <div className="space-y-4">
              {/* Quote Icon */}
              <div className="flex justify-between items-start">
                <Quote className="h-10 w-10 text-primary/30" />
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-lg leading-relaxed text-muted-foreground italic text-center">"{testimonial.text}"</p>

              {/* Client Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={testimonial.image || "/placeholder.svg"} />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-md">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
