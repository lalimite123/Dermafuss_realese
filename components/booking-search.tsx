"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Maximize2 } from "lucide-react"

export function BookingSearch() {
  return (
    <Card className="p-6 border-border shadow-lg relative">
      <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full">
        <Maximize2 className="h-4 w-4" />
      </Button>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Find Your Treatment</h3>
          <p className="text-sm text-muted-foreground">Search for services</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Treatment Type</label>
            <Input placeholder="Facial, Massage, Hair..." className="rounded-xl" />
          </div>

          <Button className="w-full rounded-xl gap-2" size="lg">
            <Search className="h-4 w-4" />
            Search Treatments
          </Button>
        </div>
      </div>
    </Card>
  )
}
