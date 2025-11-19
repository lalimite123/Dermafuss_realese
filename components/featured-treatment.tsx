"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star, Users, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function FeaturedTreatment() {
  return (
    <Card className="relative overflow-hidden h-full min-h-[500px] lg:min-h-[600px] border-border shadow-lg group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/luxury-spa-treatment-rose-gold-aesthetic.jpg"
          alt="Featured Treatment"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-card-foreground">
              <span className="mr-1">✨</span> Featured Treatment
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 bg-card/90 backdrop-blur-sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 bg-card/90 backdrop-blur-sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Counter */}
        <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
          <div className="text-white/90 text-sm font-medium">
            01 <span className="text-white/50">/ 03</span>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="space-y-4">
          {/* Rating & Stats */}
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="text-2xl font-semibold">4.9</span>
              <span className="text-white/70">/ 5.0</span>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4" />
              <span className="text-white/70">850+ clients</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Eye className="h-4 w-4" />
              <span className="text-white/70">2.4k views</span>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 text-balance">Signature Facial Treatment</h2>
            <p className="text-white/80 text-sm lg:text-base max-w-md text-pretty leading-relaxed">
              Our premium anti-aging facial combines advanced skincare technology with luxurious natural ingredients for
              radiant, youthful skin.
            </p>
          </div>

          {/* Tags & Clients */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
                Anti-Aging
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
                Hydrating
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
                Deep Cleanse
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
                LED Therapy
              </Badge>
            </div>

            {/* Client Avatars */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <Avatar className="h-8 w-8 border-2 border-card">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-card">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-card">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>LK</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-card bg-primary">
                  <AvatarFallback className="text-primary-foreground text-xs">+24</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
