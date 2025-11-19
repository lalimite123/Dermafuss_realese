"use client"

import { Card } from "@/components/ui/card"
import { ExpandableGallery } from "@/components/gallery-animation"

export function ServicesSection() {
  return (
    <div className="space-y-6 mt-19">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-balance">Unsere Leistungen</h2>
        <p className="text-muted-foreground text-lg text-pretty leading-relaxed">
          Fachfußpflege mit höchster Sorgfalt und Einfühlungsvermögen
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Large Featured Image - Nail Treatment */}
        <Card className="lg:col-span-7 relative overflow-hidden h-[400px] lg:h-[500px] group shadow-lg">
          <img
            src="/1.jpg"
            alt="Nagelbehandlung"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <div className="space-y-2">
              <div className="text-white/70 text-sm font-mono uppercase tracking-wider">01</div>
              <h3 className="text-white text-2xl lg:text-3xl font-bold text-balance">Nagelbehandlung</h3>
              <p className="text-white/90 text-sm lg:text-base leading-relaxed text-pretty">
                Fachgerechtes Kürzen, Glätten, Feilen und Polieren der Fußnägel
              </p>
            </div>
          </div>
        </Card>

        {/* Right Column - Stacked Images */}
        <Card className="lg:col-span-5 relative overflow-hidden h-[400px] lg:h-[500px] group shadow-lg">
          <img
            src="/2.jpg"
            alt="Fußmassage"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <div className="space-y-2">
              <div className="text-white/70 text-sm font-mono uppercase tracking-wider">02</div>
              <h3 className="text-white text-2xl lg:text-3xl font-bold text-balance">Fußmassage</h3>
              <p className="text-white/90 text-sm lg:text-base leading-relaxed text-pretty">
                Eincremen und leichte entspannende Massage
              </p>
            </div>
          </div>
        </Card>

        {/* Brand Story Card with Gradient */}
        <Card className="lg:col-span-5 relative overflow-hidden h-[350px] shadow-lg bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 lg:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-4xl lg:text-5xl font-bold text-white tracking-tight">DF</div>
            <div className="space-y-3">
              <p className="text-white/95 text-sm lg:text-base leading-relaxed font-medium">
                Bei DermaFuß steht die Gesundheit und Pflege Ihrer Füße im Mittelpunkt.
              </p>
              <p className="text-white/80 text-xs lg:text-sm leading-relaxed">
                Jede Behandlung wird individuell auf Ihre Bedürfnisse abgestimmt und unter Einhaltung höchster
                Hygienestandards durchgeführt – mit sterilisierten Instrumenten, hochwertigen Pflegeprodukten und viel
                Einfühlungsvermögen.
              </p>
            </div>
          </div>
          <div className="text-white/60 text-xs font-mono">FACHFUSSPLEGE IN LOLLAR</div>
        </Card>

        {/* Info Card with Technical Details */}
        <Card className="lg:col-span-7 relative overflow-hidden h-[350px] shadow-lg bg-gradient-to-br from-muted/50 via-muted/30 to-background p-6 lg:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground font-mono mb-1">03</div>
                <div className="font-medium">Hornhautentfernung</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-mono mb-1">04</div>
                <div className="font-medium">Hühneraugen</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-mono mb-1">05</div>
                <div className="font-medium">Seniorenbetreuung</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-mono mb-1">06</div>
                <div className="font-medium">Pflegeberatung</div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                Behandlungsumfang
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span>Fachgerechtes Kürzen & Glätten</span>
                  <span className="text-xs font-mono">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sanftes Abtragen von Hornhaut</span>
                  <span className="text-xs font-mono">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Feilen und Polieren</span>
                  <span className="text-xs font-mono">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Individuelle Pflegeempfehlungen</span>
                  <span className="text-xs font-mono">✓</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>DERMAFUSS.DE</span>
            <span>LOLLAR · GIESENER STR. 10</span>
          </div>
        </Card>
      </div>

      {/* Galerie des autres services */}
      <div className="mt-10 space-y-4">
        <h3 className="text-2xl lg:text-3xl font-bold">Galerie des services</h3>
        <p className="text-muted-foreground">Découvrez nos autres prestations en images.</p>
        <ExpandableGallery
          images={[
            "/hydrafacial-luxury-spa.jpg",
            "/keratin-hair-treatment-salon.jpg",
            "/microdermabrasion-beauty-treatment.jpg",
            "/professional-foot-care-treatment-spa-luxury-wellne.jpg",
            "/hot-stone-massage.png",
          ]}
          className="w-full"
        />
      </div>
    </div>
  )
}
