"use client"

import React, { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Clock, User, Check, AlertCircle, Calendar as CalendarIcon, Phone, Mail, MessageSquare, Sparkles } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"


export default function BookingSection() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: undefined as Date | undefined,
    time: null as string | null,
    notes: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [consent, setConsent] = useState(false)
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [fullyBookedDates, setFullyBookedDates] = useState<string[]>([])

  const timeSlots = Array.from({ length: 19 }, (_, i) => {
    const totalMinutes = i * 30
    const hour = Math.floor(totalMinutes / 60) + 9
    const minute = totalMinutes % 60
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  })

  const bookedDates: Date[] = fullyBookedDates.map((d) => new Date(d))

  const isSlotAvailable = (date: Date | undefined, time: string) => {
    if (!date) return false
    return !bookedTimes.includes(time)
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const compareDate = new Date(date)
    compareDate.setHours(0, 0, 0, 0)
    return compareDate < today
  }

  const handleDateSelect = async (date: Date | undefined) => {
    setFormData({ ...formData, date, time: null })
    setBookedTimes([])
    if (date) {
      try {
        const dateStr = date.toISOString().split("T")[0]
        const res = await fetch(`/api/bookings?date=${dateStr}`)
        if (res.ok) {
          const data = await res.json()
          const times: string[] = Array.isArray(data?.times) ? data.times : []
          setBookedTimes(times)
        } else {
          setBookedTimes([])
        }
      } catch (e) {
        setBookedTimes([])
      }
    }
  }

  React.useEffect(() => {
    const fetchMonthly = async (forDate: Date) => {
      const year = forDate.getFullYear()
      const month = String(forDate.getMonth() + 1).padStart(2, "0")
      try {
        const res = await fetch(`/api/bookings?month=${year}-${month}`)
        if (res.ok) {
          const data = await res.json()
          const totals: Record<string, number> = data?.totals || {}
          const fullDays = Object.entries(totals)
            .filter(([, count]) => count >= timeSlots.length)
            .map(([d]) => d)
          setFullyBookedDates(fullDays)
        }
      } catch (e) {
        setFullyBookedDates([])
      }
    }
    fetchMonthly(formData.date || new Date())
  }, [formData.date, timeSlots.length])

  const handleTimeSelect = (time: string) => {
    if (isSlotAvailable(formData.date, time)) {
      setFormData({ ...formData, time })
    }
  }

  const handleContinue = () => {
    if (formData.date && formData.time) {
      setStep(2)
    }
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setErrors({ form: "Bitte füllen Sie alle Pflichtfelder aus" })
      return
    }
    if (!consent) {
      setErrors({ consent: "Bitte bestätigen Sie die Datenschutz- und Kontaktbedingungen." })
      return
    }
    setErrors({})
    setLoading(true)
    try {
      const dateStr = formData.date.toISOString().split("T")[0]
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: dateStr,
          time: formData.time,
          notes: formData.notes,
          consent,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        if (res.status === 409) {
          setErrors({ time: "Dieser Termin ist bereits vergeben. Bitte wählen Sie eine andere Uhrzeit." })
        } else {
          setErrors({ server: data?.error || "Es ist ein Fehler aufgetreten." })
        }
        return
      }
      setSubmitted(true)
      setStep(1)
      setFormData({ name: "", phone: "", email: "", date: undefined, time: null, notes: "" })
      setConsent(false)
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setErrors({ server: "Netzwerkfehler. Bitte versuchen Sie es erneut." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6 hover:scale-105 transition-transform duration-300">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Réservation en ligne</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground bg-clip-text">
            Termin vereinbaren
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Buchen Sie Ihren Wunschtermin in nur zwei einfachen Schritten – schnell, unkompliziert und transparent
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {[
            { num: 1, label: "Datum & Zeit" },
            { num: 2, label: "Kontaktdaten" }
          ].map(({ num, label }, idx) => (
            <React.Fragment key={num}>
              <div className="flex flex-col items-center gap-2">
                <div className={`relative flex items-center justify-center w-14 h-14 rounded-full font-bold text-lg transition-all duration-500 ${
                  step >= num 
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/50 scale-110" 
                    : "bg-muted/50 backdrop-blur-sm text-muted-foreground border-2 border-muted"
                }`}>
                  {step > num ? <Check className="h-6 w-6" /> : num}
                  {step === num && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  )}
                </div>
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  step >= num ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {label}
                </span>
              </div>
              {idx < 1 && (
                <div className={`h-0.5 w-16 sm:w-24 rounded-full transition-all duration-500 mt-[-20px] ${
                  step > num ? "bg-primary shadow-sm shadow-primary/50" : "bg-muted/30"
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area */}
          <div className="lg:col-span-2">
            {submitted ? (
              <Alert className="bg-gradient-to-r from-green-500/10 to-primary/10 backdrop-blur-lg border-green-500/30 p-8 shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Anfrage erfolgreich gesendet!</h3>
                    <AlertDescription className="text-muted-foreground">
                      Vielen Dank für Ihre Terminanfrage. Wir werden uns schnellstmöglich bei Ihnen melden, um den Termin zu bestätigen.
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ) : (
              <>
                {/* Step 1: Date & Time Selection */}
                {step === 1 && (
                  <Card className="overflow-hidden shadow-2xl backdrop-blur-xl bg-card/80 border-primary/10">
                    <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 border-b border-primary/10">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        Wählen Sie Datum und Uhrzeit
                      </h3>
                    </div>
                    
                    <CardContent className="p-0 md:flex">
                      {/* Calendar */}
                      <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-border/50">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={handleDateSelect}
                          onMonthChange={(d) => {
                            const date = d instanceof Date ? d : new Date()
                            const year = date.getFullYear()
                            const month = String(date.getMonth() + 1).padStart(2, "0")
                            fetch(`/api/bookings?month=${year}-${month}`)
                              .then((res) => res.ok ? res.json() : null)
                              .then((data) => {
                                if (!data) return setFullyBookedDates([])
                                const totals: Record<string, number> = data?.totals || {}
                                const fullDays = Object.entries(totals)
                                  .filter(([, count]) => count >= timeSlots.length)
                                  .map(([d]) => d)
                                setFullyBookedDates(fullDays)
                              })
                              .catch(() => setFullyBookedDates([]))
                          }}
                          defaultMonth={formData.date || new Date()}
                          disabled={(date) => 
                            isPastDate(date) || 
                            isWeekend(date) || 
                            bookedDates.some(bookedDate => 
                              bookedDate.toDateString() === date.toDateString()
                            )
                          }
                          showOutsideDays={false}
                          modifiers={{ booked: bookedDates }}
                          modifiersClassNames={{ booked: "[&>button]:line-through opacity-50" }}
                          className="bg-transparent [--cell-size:3rem] sm:[--cell-size:3.5rem]"
                          formatters={{
                            formatWeekdayName: (date) => date.toLocaleString("de-DE", { weekday: "short" })
                          }}
                        />
                      </div>
                      
                      {/* Time Slots */}
                      <div className="w-full md:w-64 p-6">
                        <div className="mb-4">
                          <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Verfügbare Zeiten
                          </h4>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                          {formData.date ? (
                            timeSlots.map((time) => {
                              const available = isSlotAvailable(formData.date, time)
                              const selected = formData.time === time
                              return (
                                <Button
                                  key={time}
                                  variant={selected ? "default" : "outline"}
                                  onClick={() => handleTimeSelect(time)}
                                  disabled={!available}
                                  className={`w-full justify-start transition-all duration-300 ${
                                    selected 
                                      ? "shadow-lg shadow-primary/30 scale-105" 
                                      : available 
                                      ? "hover:scale-105 hover:shadow-md hover:border-primary/50" 
                                      : "line-through opacity-40"
                                  }`}
                                >
                                  <Clock className="h-4 w-4 mr-2" />
                                  {time} Uhr
                                </Button>
                              )
                            })
                          ) : (
                            <div className="text-center py-8 text-sm text-muted-foreground">
                              <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
                              Bitte wählen Sie zuerst ein Datum aus
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="bg-muted/30 backdrop-blur-sm p-6 flex-col sm:flex-row gap-4">
                      <div className="flex-1 text-sm">
                        {formData.date && formData.time ? (
                          <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Ihr gewählter Termin:</p>
                              <p className="text-muted-foreground">
                                {formData.date?.toLocaleDateString("de-DE", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric"
                                })} um {formData.time} Uhr
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">
                            Wählen Sie ein Datum und eine Uhrzeit, um fortzufahren
                          </p>
                        )}
                      </div>
                      <Button
                        disabled={!formData.date || !formData.time}
                        className="w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-primary/20"
                        size="lg"
                        onClick={handleContinue}
                      >
                        Weiter zur Bestätigung
                        <Check className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {/* Step 2: Contact Information */}
                {step === 2 && (
                  <Card className="shadow-2xl backdrop-blur-xl bg-card/80 border-primary/10">
                    <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 border-b border-primary/10">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(1)}
                        className="mb-3 hover:scale-105 transition-transform duration-300"
                      >
                        ← Zurück
                      </Button>
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Ihre Kontaktdaten
                      </h3>
                    </div>

                    <CardContent className="p-6 space-y-6">
                      {errors.server && (
                        <Alert className="bg-destructive/10 backdrop-blur-sm border-destructive/30">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.server}</AlertDescription>
                        </Alert>
                      )}
                      
                      {/* Appointment Summary */}
                      <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-md rounded-xl border border-primary/20 shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <CalendarIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Gewählter Termin</p>
                            <p className="font-semibold">
                              {formData.date?.toLocaleDateString('de-DE', { 
                                weekday: 'long', 
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pl-13">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{formData.time} Uhr</span>
                        </div>
                      </div>

                      {/* Form */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            Vollständiger Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Max Mustermann"
                            className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            Telefon / WhatsApp *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+49 1556 572 5090"
                            className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            E-Mail (optional)
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="max@beispiel.de"
                            className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes" className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            Anmerkungen (optional)
                          </Label>
                          <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Besondere Wünsche oder Hinweise..."
                            rows={4}
                            className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg resize-none"
                          />
                        </div>

                        {/* Consent */}
                        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border/50">
                          <input
                            id="consent"
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary transition-all cursor-pointer"
                          />
                          <Label htmlFor="consent" className="text-xs text-muted-foreground cursor-pointer">
                            Ich bin damit einverstanden, dass meine Angaben zur Kontaktaufnahme und Terminabstimmung verwendet werden. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
                          </Label>
                        </div>
                        {errors.consent && (
                          <p className="text-destructive text-sm">
                            {errors.consent}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="grid sm:grid-cols-2 gap-4 pt-4">
                        <Button 
                          onClick={handleSubmit}
                          disabled={loading}
                          className="w-full h-12 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-primary/30"
                          size="lg"
                        >
                          {loading ? (
                            <>
                              <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              Wird gesendet...
                            </>
                          ) : (
                            <>
                              <Check className="h-5 w-5 mr-2" />
                              Termin bestätigen
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full h-12 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/5 hover:border-primary/50"
                          size="lg"
                          asChild
                        >
                          <a href="https://wa.me/4915565725090" target="_blank" rel="noopener noreferrer">
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            WhatsApp
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-3">
            {/* Important Notes */}
            <Card className="overflow-hidden shadow-xl backdrop-blur-xl bg-gradient-to-br from-primary/5 via-card/80 to-card/80 border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group">
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <AlertCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Wichtige Hinweise</h3>
                </div>
                
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-card/80">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p>
                      Termine auch telefonisch oder per WhatsApp unter{" "}
                      <a href="tel:+4915565725090" className="font-semibold text-primary hover:underline">
                        +49 1556 572 5090
                      </a>
                    </p>
                  </div>
                  <div className="flex gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-card/80">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p>Bitte pünktlich erscheinen. Bei Verhinderung 24h vorher absagen.</p>
                  </div>
                  <div className="flex gap-2 p-3 rounded-lg bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-card/80">
                    <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p>Aus hygienischen Gründen bitte die Füße vor dem Termin kurz reinigen.</p>
                  </div>
                  <div className="flex gap-1 p-3 rounded-lg bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-card/80">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Öffnungszeiten</p>
                      <div className="mt-1 space-y-1">
                        <div className="flex justify-between gap-3">
                          <span className="text-muted-foreground">Montag – Freitag</span>
                          <span className="font-semibold text-primary">09:00 – 18:00</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="text-muted-foreground">Samstag</span>
                          <span className="font-semibold text-primary">nach Vereinbarung</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Card */}
            <Card className="shadow-xl backdrop-blur-xl bg-gradient-to-br from-primary/10 via-primary/5 to-card/80 border-primary/20 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 group">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Schnellkontakt</h3>
                </div>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto py-3 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <a href="tel:+4915565725090">
                      <Phone className="h-4 w-4 mr-3 text-primary" />
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">Telefon</div>
                        <div className="font-semibold">+49 1556 572 5090</div>
                      </div>
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto py-3 backdrop-blur-sm hover:bg-green-500/10 hover:border-green-500/50 hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <a href="https://wa.me/4915565725090" target="_blank" rel="noopener noreferrer">
                      <svg className="h-4 w-4 mr-3 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">WhatsApp</div>
                        <div className="font-semibold">Direkt chatten</div>
                      </div>
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-gradient {
          animation: gradient 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}