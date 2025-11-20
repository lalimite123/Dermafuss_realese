"use client"

import { Card } from "@/components/ui/card"
import { ExpandableGallery } from "@/components/gallery-animation"
import { useEffect } from "react"
import { motion } from "framer-motion"

export function ServicesSection() {
    useEffect(() => {
        const cards = document.querySelectorAll('.service-card');
        cards.forEach((card) => {
            card.classList.add('animate-fade-in');
        });
    }, []);

    return (
        <div className="space-y-8 mt-20">
            <div>
                <h2 className="text-4xl font-bold mb-4 text-balance">Unsere Leistungen</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    Fachfußpflege mit höchster Sorgfalt und Einfühlungsvermögen
                </p>
            </div>

            {/* Bento Grid Layout */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
                {/* Large Featured Image - Nail Treatment */}
                <motion.div
                    initial={{ opacity: 0, x: -40, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                    className="lg:col-span-7"
                >
                <Card className="relative overflow-hidden h-[450px] group shadow-lg transition-transform duration-300 hover:scale-[1.03] service-card">
                    <img
                        src="/2.jpg"
                        alt="Nagelbehandlung"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                        <div className="space-y-2">
                            <div className="text-white/70 text-sm font-mono uppercase tracking-wider">01</div>
                            <h3 className="text-white text-3xl font-bold text-balance">Nagelbehandlung</h3>
                            <p className="text-white/90 text-sm leading-relaxed">
                                Fachgerechtes Kürzen, Glätten, Feilen und Polieren der Fußnägel
                            </p>
                        </div>
                    </div>
                </Card>
                </motion.div>

                {/* Right Column - Stacked Images */}
                <motion.div
                    initial={{ opacity: 0, x: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                    className="lg:col-span-5"
                >
                <Card className="relative overflow-hidden h-[450px] group shadow-lg transition-transform duration-300 hover:scale-[1.03] service-card">
                    <img
                        src="/1.jpg"
                        alt="Fußmassage"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                        <div className="space-y-2">
                            <div className="text-white/70 text-sm font-mono uppercase tracking-wider">02</div>
                            <h3 className="text-white text-3xl font-bold text-balance">Fußmassage</h3>
                            <p className="text-white/90 text-sm leading-relaxed">
                                Eincremen und leichte entspannende Massage
                            </p>
                        </div>
                    </div>
                </Card>
                </motion.div>

                {/* Brand Story Card with Gradient */}
                <motion.div
                    initial={{ opacity: 0, x: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className="lg:col-span-5"
                >
                <Card className="relative overflow-hidden h-[400px] shadow-lg bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 lg:p-8 flex flex-col justify-between service-card transition-transform duration-300 hover:scale-[1.03]">
                    <div className="space-y-4">
                        <div className="text-5xl font-bold text-white tracking-tight">DF</div>
                        <div className="space-y-3">
                            <p className="text-white/95 text-base leading-relaxed font-medium">
                                Bei DermaFuß steht die Gesundheit und Pflege Ihrer Füße im Mittelpunkt.
                            </p>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Jede Behandlung wird individuell auf Ihre Bedürfnisse abgestimmt und unter Einhaltung höchster
                                Hygienestandards durchgeführt – mit sterilisierten Instrumenten, hochwertigen Pflegeprodukten und viel
                                Einfühlungsvermögen.
                            </p>
                        </div>
                    </div>
                    <div className="text-white/60 text-xs font-mono">FACHFUSSPLEGE IN LOLLAR</div>
                </Card>
                </motion.div>

                {/* Info Card with Technical Details */}
                <motion.div
                    initial={{ opacity: 0, x: -40, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="lg:col-span-7"
                >
                <Card className="relative overflow-hidden h-[400px] shadow-lg bg-gradient-to-br from-muted/50 via-muted/30 to-background p-6 lg:p-8 flex flex-col justify-between service-card transition-transform duration-300 hover:scale-[1.03]">
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
                </motion.div>
            </motion.div>

            {/* Galerie des anderen Services */}
            <div className="mt-12 space-y-4">
                <h3 className="text-3xl font-bold">Galerie der Services</h3>
                <p className="text-muted-foreground">Entdecken Sie unsere anderen Leistungen in Bildern.</p>
                <ExpandableGallery
                    images={[
                        "/galerie1.jpg",
                        "/galerie2.jpg",
                        "/galerie3.jpg",
                        "/galerie4.jpg",
                        "/galerie5.jpg",
                        "/landing1.jpg",
                        "/landing2.jpg",
                        "/landing3.jpg",
                    ]}
                    className="w-full"
                />
            </div>
        </div>
    )
}