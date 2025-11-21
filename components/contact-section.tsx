"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock } from "lucide-react"
import { motion } from "framer-motion"

export function ContactSection() {
    return (
        <div className="space-y-5">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-5 mt-10"
            >
                <h2 id="contact-title" className="text-3xl lg:text-4xl font-bold mb-3 text-balance scroll-mt-24">Kontakt & Anfahrt</h2>
                <p className="text-foreground/90 text-lg text-pretty leading-relaxed">
                    Besuchen Sie uns im Herzen von Lollar
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Address */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <Card className="p-5 shadow-md hover:shadow-lg transition-shadow">
                        <MapPin className="h-8 w-8 text-primary mb-4" />
                        <h3 className="font-semibold text-lg mb-3">Adresse</h3>
                    <p className="text-foreground/80 leading-relaxed">
                        DermaFuß – Fachfußpflege
                        <br />
                        Gießener Straße 10
                        <br />
                        35457 Lollar
                    </p>
                    <p className="text-sm text-foreground/70 mt-3">Zentral in Lollar mit Parkmöglichkeiten in der Nähe</p>
                    </Card>
                </motion.div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                >
                    <Card className="p-5 shadow-md hover:shadow-lg transition-shadow">
                        <Phone className="h-8 w-8 text-primary mb-4" />
                        <h3 className="font-semibold text-lg mb-3">Kontakt</h3>
                        <div className="space-y-3">
                            <div>
                            <p className="text-sm text-foreground/70 mb-1">Telefon / WhatsApp</p>
                            <a href="tel:+4915565725090" className="text-foreground hover:text-primary transition-colors font-medium">
                                +49 1556 572 5090
                            </a>
                            </div>
                            <div>
                            <p className="text-sm text-foreground/70 mb-1">E-Mail</p>
                            <a
                                href="mailto:info@dermafuss.de"
                                className="text-foreground hover:text-primary transition-colors font-medium"
                            >
                                info@dermafuss.de
                            </a>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Button size="sm" className="rounded-full" asChild>
                                <a href="tel:+4915565725090">Anrufen</a>
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-full bg-transparent" asChild>
                                <a href="https://wa.me/4915565725090" target="_blank" rel="noopener noreferrer">
                                    WhatsApp
                                </a>
                            </Button>
                        </div>
                    </Card>
                </motion.div>

                {/* Hours */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <Card className="p-5 shadow-md hover:shadow-lg transition-shadow">
                        <Clock className="h-8 w-8 text-primary mb-4" />
                        <h3 className="font-semibold text-lg mb-3">Öffnungszeiten</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-border">
                                <span className="text-sm text-muted-foreground">Montag</span>
                                <span className="text-sm font-medium">09:00 – 18:00</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-border">
                                <span className="text-sm text-muted-foreground">Dienstag</span>
                                <span className="text-sm font-medium">09:00 – 18:00</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-border">
                                <span className="text-sm text-muted-foreground">Mittwoch</span>
                                <span className="text-sm font-medium">09:00 – 18:00</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-border">
                                <span className="text-sm text-muted-foreground">Donnerstag</span>
                                <span className="text-sm font-medium">09:00 – 18:00</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-border">
                                <span className="text-sm text-muted-foreground">Freitag</span>
                                <span className="text-sm font-medium">09:00 – 18:00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Samstag</span>
                                <span className="text-sm font-medium">nach Vereinbarung</span>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Card className="p-5 shadow-md">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <iframe
                        src="https://maps.google.com/maps?q=Gie%C3%9Fener%20Stra%C3%9Fe%2010%2C%2035457%20Lollar%2C%20Deutschland&hl=de&z=16&output=embed"
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Kartenansicht DermaFuß Lollar"
                        />
                    </div>
                    <div className="mt-3">
                        <Button size="sm" variant="outline" className="rounded-full" asChild>
                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=Gie%C3%9Fener%20Stra%C3%9Fe%2010%2C%2035457%20Lollar%2C%20Deutschland"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Route
                            </a>
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}

