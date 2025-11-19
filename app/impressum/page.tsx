export const metadata = {
  title: "Impressum | DermaFuß",
  description: "Rechtliche Angaben gemäß § 5 TMG",
}

export default function ImpressumPage() {
  return (
    <main className="container mx-auto px-4 py-10 lg:px-8">
      <section className="prose prose-neutral max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Impressum</h1>
        <p className="text-muted-foreground mb-6">Rechtliche Angaben gemäß § 5 TMG</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Diensteanbieter</h2>
        <p>
          DermaFuß<br />
          Gießener Straße 10<br />
          35457 Lollar
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Kontakt</h2>
        <p>
          Telefon: 0157 845 236 71<br />
          E‑Mail: info@dermafuss.de
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Vertretungsberechtigt</h2>
        <p>
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: DermaFuß
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Umsatzsteuer</h2>
        <p>
          Umsatzsteuer‑Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: wird ergänzt
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Berufsrechtliche Angaben</h2>
        <p>
          Angaben zur berufsrechtlichen Regelung und zuständigen Kammer werden ergänzt.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
          allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
          nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
          Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
          haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Streitbeilegung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online‑Streitbeilegung (OS) bereit:
          <a className="text-primary" href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">https://ec.europa.eu/consumers/odr</a>.
        </p>

        <p className="text-sm text-muted-foreground mt-8">
          Hinweis: Diese Seite dient als Platzhalter. Rechtliche Angaben (z. B. USt‑ID, HRB, Vertreter) sollten
          vollständig ergänzt werden.
        </p>
      </section>
    </main>
  )
}