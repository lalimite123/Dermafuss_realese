"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Award, Shield, Sparkles } from "lucide-react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const features = [
    {
        icon: Award,
        title: "Fachkompetenz",
        description: "Medizinische Ausbildung und kontinuierliche Weiterbildung",
        accent: false,
    },
    {
        icon: Shield,
        title: "Höchste Hygiene",
        description: "Sterilisierte Instrumente und strikte Hygienestandards",
        accent: false,
    },
    {
        icon: Heart,
        title: "Einfühlsame Betreuung",
        description: "Besonders für ältere und empfindliche Personen",
        accent: false,
    },
    {
        icon: Sparkles,
        title: "Individuelle Pflege",
        description: "Jede Behandlung angepasst an Ihre Bedürfnisse",
        accent: false,
    },
]

export function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const root = containerRef.current
        if (!root) return

        const targets = root.querySelectorAll("[data-animate]")
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement
                    if (entry.isIntersecting) {
                        el.classList.remove("opacity-0", "translate-y-2")
                        el.classList.add("opacity-100", "translate-y-0")
                        observer.unobserve(el)
                    }
                })
            },
            { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
        )

        targets.forEach((el) => {
            el.classList.add("opacity-0", "translate-y-2")
                ; (el as HTMLElement).style.transition = "transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 700ms cubic-bezier(0.22,1,0.36,1)"
            observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={containerRef} className="py-20">
            <motion.div
                initial="hidden"
                animate="show"
                variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    show: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.5, ease: "easeInOut" }
                    }
                }}
                className="relative min-h-[380px] md:min-h-[460px] mb-16 rounded-3xl overflow-hidden border border-white/10"
            >
                <img
                    src="/kevinelogo.png"
                    alt="DermaFuß Banner"
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <h2 className="absolute top-4 left-4 text-white text-2xl font-bold">Willkommen bei DermaFuß</h2>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-700/70 to-gray-500/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-800/80 via-green-600/60 to-transparent" />
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                    className="relative z-10 p-6 md:p-10"
                >
                    <div className="max-w-2xl space-y-3 mb-8">
                        <motion.h3
                            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                            className="text-white text-xl md:text-2xl font-semibold"
                        >
                            Über die Gründerin
                        </motion.h3>
                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                            className="text-white/90 text-sm md:text-base"
                        >
                            Frau K. Mefo ist examinierte Pflegefachkraft mit mehreren Jahren Erfahrung im Bereich der medizinischen
                            Pflege. Sie absolvierte eine Fachausbildung in professioneller Fußpflege und befindet sich aktuell in der
                            Ausbildung zur Podologin.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                                className="rounded-2xl p-6 backdrop-blur-md bg-white/10 border border-white/15 shadow-[0_12px_40px_rgb(0,0,0,0.25)]"
                                data-animate
                            >
                                <div className="flex items-center">
                                    <feature.icon className="h-6 w-6 text-white mr-2" />
                                    <div className="text-white font-medium text-base">{feature.title}</div>
                                </div>
                                <p className="text-white/90 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

        </div>
    );
}