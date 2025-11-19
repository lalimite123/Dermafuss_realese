"use client"

import { Card } from "@/components/ui/card"
import { Heart, Shield, Sparkles, Award } from "lucide-react"

export function PhilosophySection() {
  return (
      <div className="space-y-6 mt-19">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-balance">Unsere Philosophie</h2>
        <p className="text-muted-foreground text-lg text-pretty leading-relaxed">
          Sorgfalt, Hygiene und Vertrauen stehen bei uns an erster Stelle
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Philosophy Card */}
        <Card className="p-6 lg:p-8 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-semibold">Unsere Philosophie</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed italic mb-4">
            "Jeder Fuß erzählt eine Geschichte – über Belastung, Bewegung und Alltag."
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bei DermaFuß begegnen wir jedem Kunden mit Respekt, Geduld und Einfühlungsvermögen, um eine Behandlung zu
            ermöglichen, die nicht nur die Füße pflegt, sondern auch das Wohlbefinden stärkt.
          </p>
        </Card>

        {/* Hygiene Concept Card */}
        <Card className="p-6 lg:p-8 shadow-md bg-gradient-to-br from-primary/10 to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-semibold">Hygienekonzept</h3>
          </div>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Nach jeder Behandlung werden alle Instrumente gereinigt, desinfiziert und im Sterilisator aufbereitet.
            </p>
            <p>
              Arbeitsflächen und Geräte werden regelmäßig desinfiziert, und Einmalmaterialien (Handschuhe, Tücher,
              Feilenaufsätze etc.) werden nach jedem Kunden ausgetauscht.
            </p>
          </div>
        </Card>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 shadow-md text-center hover:shadow-lg transition-shadow">
          <Award className="h-10 w-10 text-primary mx-auto mb-3" />
          <h4 className="font-semibold mb-2">Fachkompetenz</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Durch medizinische Ausbildung und kontinuierliche Weiterbildung
          </p>
        </Card>

        <Card className="p-6 shadow-md text-center hover:shadow-lg transition-shadow">
          <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
          <h4 className="font-semibold mb-2">Hygienestandards</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Höchste Standards bei Sterilisation und Desinfektion
          </p>
        </Card>

        <Card className="p-6 shadow-md text-center hover:shadow-lg transition-shadow">
          <Sparkles className="h-10 w-10 text-primary mx-auto mb-3" />
          <h4 className="font-semibold mb-2">Ruhige Atmosphäre</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Freundliche und entspannende Umgebung für Ihr Wohlbefinden
          </p>
        </Card>

        <Card className="p-6 shadow-md text-center hover:shadow-lg transition-shadow">
          <Heart className="h-10 w-10 text-primary mx-auto mb-3" />
          <h4 className="font-semibold mb-2">Vertrauensvolle Betreuung</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Besonders für ältere oder empfindliche Personen
          </p>
        </Card>
      </div>
    </div>
  )
}
