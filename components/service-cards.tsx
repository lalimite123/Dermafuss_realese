"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    title: "Luxury Hydrafacial",
    image: "/hydrafacial-luxury-spa.jpg",
    rating: 4.9,
    duration: "60 min",
    price: "$180",
    category: "Facial",
    tags: ["Popular", "Hydrating"],
  },
  {
    title: "Hot Stone Massage",
    image: "/hot-stone-massage.png",
    rating: 4.8,
    duration: "90 min",
    price: "$220",
    category: "Massage",
    tags: ["Relaxing", "Therapeutic"],
  },
  {
    title: "Keratin Treatment",
    image: "/keratin-hair-treatment-salon.jpg",
    rating: 4.9,
    duration: "120 min",
    price: "$350",
    category: "Hair",
    tags: ["Smoothing", "Long-lasting"],
  },
  {
    title: "Microdermabrasion",
    image: "/microdermabrasion-beauty-treatment.jpg",
    rating: 4.7,
    duration: "45 min",
    price: "$150",
    category: "Facial",
    tags: ["Exfoliating", "Brightening"],
  },
]

export function ServiceCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Popular Treatments</h2>
        <Badge variant="secondary" className="text-sm">
          {services.length} Services
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
          <Card
            className="overflow-hidden border-border shadow-lg group cursor-pointer transition-transform duration-300 hover:shadow-xl hover:-translate-y-[2px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-primary text-primary-foreground">{service.category}</Badge>
              </div>
              <div className="absolute top-3 right-3 flex gap-1">
                {service.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="bg-card/90 backdrop-blur-sm text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-lg line-clamp-1">{service.title}</h3>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{service.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-lg">{service.price}</span>
                </div>
                <button className="text-sm font-medium text-primary hover:underline">Book Now</button>
              </div>
            </div>
          </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
