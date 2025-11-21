import { Phone, Mail } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-16 mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full overflow-hidden flex items-center justify-center">
                                <img src="/kevinelogo.png" alt="Logo" className="h-full w-full object-contain" />
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Professionelle Fachfußpflege in Lollar. Ihre Fußgesundheit ist unsere Priorität.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Navigation</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <a href="#home" className="hover:text-[#9BB8AC] transition-colors">
                                    Startseite
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="hover:text-[#9BB8AC] transition-colors">
                                    Über uns
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-[#9BB8AC] transition-colors">
                                    Leistungen
                                </a>
                            </li>
                            <li>
                                <a href="#booking" className="hover:text-[#9BB8AC] transition-colors">
                                    Termin buchen
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:text-[#9BB8AC] transition-colors">
                                    Kontakt
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Leistungen</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>Nagelbehandlung</li>
                            <li>Hornhautentfernung</li>
                            <li>Hühneraugen-Behandlung</li>
                            <li>Fußmassage</li>
                            <li>Seniorenbetreuung</li>
                            <li>Pflegeberatung</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Kontakt</h4>
                        <ul className="space-y-3 text-gray-300">
                            <li>Gießener Straße 10</li>
                            <li>35457 Lollar</li>
                            <li className="pt-2 flex items-center gap-2">
                                <Phone className="h-5 w-5" />
                                <a href="tel:015565725090" className="hover:text-[#9BB8AC] transition-colors">
                                    +49 1556 572 5090
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                <span>info@dermafuss.de</span>
                            </li>
                        </ul>
                        <div className="mt-4">
                            <p className="text-sm font-semibold mb-2">Öffnungszeiten:</p>
                            <p className="text-sm text-gray-300">Mo-Fr: 09:00 - 18:00</p>
                            <p className="text-sm text-gray-300">Sa: nach Vereinbarung</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">© 2025 DermaFuß. Alle Rechte vorbehalten.</p>
                    <div className="flex gap-6 items-center text-sm text-gray-400">
                        <a href="/impressum" className="hover:text-[#9BB8AC] transition-colors">
                            Impressum
                        </a>
                        <a href="https://termiconsult.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-[#9BB8AC] transition-colors">
                            Entworfen von TermiConsult UG ❤️
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
