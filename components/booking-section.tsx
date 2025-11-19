"use client"

import React, { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Clock, User, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function BookingSection() {
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
  }, [formData.date])

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
    <div className="space-y-6 mt-19">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-balance">Termin vereinbaren</h2>
        <p className="text-muted-foreground text-lg text-pretty leading-relaxed">
          Wählen Sie Ihren Wunschtermin in 2 einfachen Schritten
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2].map((num) => (
          <React.Fragment key={num}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
              step >= num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {num}
            </div>
            {num < 2 && <div className={`h-1 w-12 ${step > num ? "bg-primary" : "bg-muted"}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {submitted ? (
            <Alert className="bg-primary/10 border-primary/20 p-6">
              <Check className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                Vielen Dank! Ihre Terminanfrage wurde gesendet. Wir melden uns in Kürze bei Ihnen.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {step === 1 && (
                <Card className="gap-0 p-0 shadow-md">
                  <CardContent className="relative p-0 md:pr-48">
                    <div className="p-4 sm:p-6">
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
                        modifiers={{
                          booked: bookedDates,
                        }}
                        modifiersClassNames={{
                          booked: "[&>button]:line-through opacity-100",
                        }}
                        className="bg-transparent p-0 [--cell-size:2.5rem] sm:[--cell-size:3rem] md:[--cell-size:3.5rem]"
                        formatters={{
                          formatWeekdayName: (date) => {
                            return date.toLocaleString("de-DE", { weekday: "short" })
                          },
                        }}
                      />
                    </div>
                    
                    <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-4 sm:p-6 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l">
                      <div className="grid gap-2">
                        {formData.date ? (
                          timeSlots.map((time) => {
                            const available = isSlotAvailable(formData.date, time)
                            return (
                              <Button
                                key={time}
                                variant={formData.time === time ? "default" : "outline"}
                                onClick={() => handleTimeSelect(time)}
                                disabled={!available}
                                className={`w-full shadow-none text-sm ${
                                  !available ? "line-through opacity-50" : ""
                                }`}
                              >
                                {time}
                              </Button>
                            )
                          })
                        ) : (
                          <div className="text-center text-sm text-muted-foreground py-4">
                            Wählen Sie zuerst ein Datum
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col gap-4 border-t px-4 sm:px-6 !py-5 md:flex-row">
                    <div className="text-xs sm:text-sm">
                      {formData.date && formData.time ? (
                        <>
                          Ihr Termin ist für{" "}
                          <span className="font-medium">
                            {formData.date?.toLocaleDateString("de-DE", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })}
                          </span>
                          {" "}um <span className="font-medium">{formData.time} Uhr</span>.
                        </>
                      ) : (
                        <>Wählen Sie ein Datum und eine Uhrzeit für Ihren Termin.</>
                      )}
                    </div>
                    <Button
                      disabled={!formData.date || !formData.time}
                      className="w-full md:ml-auto md:w-auto"
                      onClick={handleContinue}
                    >
                      Weiter
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {step === 2 && (
                <Card className="p-4 sm:p-6 lg:p-8 shadow-md">
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(1)}
                      className="mb-4"
                    >
                      ← Zurück
                    </Button>
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Ihre Kontaktdaten
                    </h3>
                    {errors.server && (
                      <Alert className="mb-4 bg-destructive/10 border-destructive/20">
                        <AlertDescription className="text-destructive">
                          {errors.server}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="mb-6 p-3 sm:p-4 bg-primary/10 rounded-lg">
                      <div className="flex items-center gap-2 text-xs sm:text-sm mb-2 flex-wrap">
                        <svg className="h-4 w-4 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        <span className="font-semibold">
                          {formData.date?.toLocaleDateString('de-DE', { 
                            weekday: 'long', 
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="font-semibold">{formData.time} Uhr</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          placeholder="Ihr vollständiger Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon / WhatsApp *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          placeholder="0157 845 236 71"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-Mail</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ihre@email.de"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Anmerkungen</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Besondere Wünsche oder Hinweise..."
                          rows={3}
                        />
                      </div>
                      <div className="flex items-start gap-3 py-2">
                        <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-input text-primary focus-visible:ring-ring"
                          aria-invalid={!!errors.consent}
                        />
                        <Label htmlFor="consent" className="text-xs sm:text-sm text-muted-foreground">
                          Ich bin damit einverstanden, dass meine Angaben zur Kontaktaufnahme und Terminabstimmung verwendet
                          werden. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
                        </Label>
                      </div>
                      {errors.consent && <p className="text-destructive text-sm">{errors.consent}</p>}

                      {errors.form && <p className="text-destructive text-sm">{errors.form}</p>}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <Button onClick={handleSubmit} className="w-full" size="lg" disabled={loading}>
                          <Check className="h-4 w-4 mr-2" />
                          {loading ? "Wird gesendet…" : "Termin bestätigen"}
                        </Button>
                        <Button variant="outline" className="w-full" size="lg" asChild>
                          <a href="https://wa.me/4915784523671" target="_blank" rel="noopener noreferrer">
                            WhatsApp kontaktieren
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>

        <div className="space-y-4">
          <Card className="p-4 sm:p-6 shadow-md bg-gradient-to-br from-primary/10 to-transparent">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Wichtige Hinweise</h3>
            <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p>
                  Termine können auch telefonisch oder per WhatsApp unter{" "}
                  <strong className="text-foreground">0157 845 236 71</strong> vereinbart werden.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p>
                  Bitte erscheinen Sie pünktlich. Bei Verhinderung mindestens 24 Stunden vorher absagen.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p>Aus hygienischen Gründen bitte die Füße vor dem Termin kurz reinigen.</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Öffnungszeiten</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Montag – Freitag</span>
                <span className="font-semibold">09:00 – 18:00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Samstag</span>
                <span className="font-semibold">nach Vereinbarung</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 shadow-md border-primary/20">
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-3 w-3 rounded bg-muted" />
                <span>Datum durchgestrichen = komplett ausgebucht</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-3 w-3 rounded bg-muted line-through" />
                <span>Uhrzeit durchgestrichen = nicht verfügbar</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-3 w-3 rounded bg-muted opacity-50" />
                <span>Wochenenden nur nach Vereinbarung</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}