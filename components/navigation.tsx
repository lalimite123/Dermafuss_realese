"use client"

import { Button } from "@/components/ui/button"
import { Heart, Menu, Phone, Calendar } from "lucide-react"
import { useState } from "react"

export function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [selectedSection, setSelectedSection] = useState<string | null>(null)

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setMobileMenuOpen(false)
            setSelectedSection(id) // Set the selected section
        }
    }

    return (
        <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <button
                        onClick={() => scrollToSection("home")}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                    >
                        {/*<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary">*/}
                        {/*    <Heart className="h-5 w-5 text-primary-foreground" />*/}
                        {/*</div>*/}
                        <div className="flex h-20 w-20 md:h-16 md:w-20 items-center justify-center rounded-2xl overflow-hidden">
                            <img src="/kevinelogo.png" alt="Logo" className="h-full w-full object-contain" />
                        </div>
                    </button>

                    <div className="hidden md:flex items-center gap-1">
                        {["about", "services", "philosophy", "contact"].map(section => (
                            <Button
                                key={section}
                                variant="ghost"
                                className={`rounded-full cursor-pointer ${selectedSection === section ? 'bg-primary text-primary-foreground' : ''}`}
                                onClick={() => scrollToSection(section)}>
                                {section === "about" ? "Über uns" : section === "services" ? "Leistungen" : section === "philosophy" ? "Philosophie" : "Kontakt"}
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full cursor-pointer" asChild>
                            <a href="tel:+4915565725090">
                                <Phone className="h-5 w-5" />
                            </a>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden rounded-full cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <Button className="hidden md:flex rounded-full cursor-pointer border-2 border-primary transition-colors duration-300 hover:border-secondary" onClick={() => scrollToSection("booking")}>
                            Termin buchen
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-2">
                            {["about", "services", "philosophy", "contact"].map(section => (
                                <Button
                                    key={section}
                                    variant="ghost"
                                    className={`justify-start ${selectedSection === section ? 'bg-primary text-primary-foreground' : ''}`}
                                    onClick={() => scrollToSection(section)}>
                                    {section === "about" ? "Über uns" : section === "services" ? "Leistungen" : section === "philosophy" ? "Philosophie" : "Kontakt"}
                                </Button>
                            ))}
                            <Button className="mt-2 transition-transform duration-300 transform hover:scale-105" onClick={() => scrollToSection("booking")}>
                                Termin buchen        <Calendar className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
