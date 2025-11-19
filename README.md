# DermaFuß — Site vitrine (Next.js)

Site vitrine pour un institut de soins des pieds “DermaFuß”, avec sections animées, grille de services, images immersives et composants UI réutilisables.

## Technologies

- Next.js 16 (App Router, Turbopack)
- React 18 et TypeScript
- PostCSS
- Utilitaires CSS de type Tailwind (classes utilitaires)
- Icônes `lucide-react` (Heart, Award, Shield, Sparkles, etc.)
- Composants UI (Card, Button, Badge, Input…) inspirés d’un kit léger (pattern shadcn/ui)

## Fonctionnalités

- Hero large avec `HeroService` et `BookingCard` en grille responsive
- Section “Über uns” (About) avec animations au scroll via `IntersectionObserver`
- Section “Leistungen” (Services) en bento-grid avec images overlay et transitions
- Navigation, Footer, Testimonials et Booking
- Ancrage et offset de scroll précis (`scroll-mt`) pour sections ciblées

## Prérequis

- Node.js 18+ (recommandé: 18.18+ ou 20+)
- Git
- Gestionnaire de paquets: `npm` (ou `pnpm` si tu préfères)

## Installation

Cloner le dépôt:

```bash
git clone <URL_DU_DEPOT>
```

Entrer dans le projet:

```bash
cd kevine\portfolio
```

Installer les dépendances (npm):

```bash
npm install
```

Alternative (pnpm):

```bash
pnpm install
```

## Démarrage en développement

Lancer le serveur de dev:

```bash
npm run dev
```

Ouvrir l’application:

```bash
start http://localhost:3000/
```

## Scripts utiles

Build de production:

```bash
npm run build
```

Démarrer le serveur de production:

```bash
npm run start
```

Analyser la taille des bundles (si configuré):

```bash
npm run analyze
```

## Structure du projet

- `app/` — App Router (layouts, pages, loaders)
- `components/` — Composants réutilisables (sections et UI)
  - `about-section.tsx` — Section “Über uns” avec animations au scroll
  - `services-section.tsx` — Grille “Leistungen” (images et cartes)
  - `hero-section.tsx` / `hero-service.tsx` — Hero et service vedette
  - `booking-*` — Composants de réservation
  - `ui/` — Primitives UI (Card, Button, Badge, Input…)
- `public/` — Images et assets (ex: `1.jpg`, `2.jpg`)
- `styles/` — Styles globaux
- `next.config.mjs` — Configuration Next.js / Turbopack
- `postcss.config.mjs` — Configuration PostCSS
- `tsconfig.json` — Configuration TypeScript

## Animations et ancrage de scroll

- Les éléments avec `data-animate` sont révélés au scroll via `IntersectionObserver` avec easing doux.
- Pour caler un scroll sur une section, utiliser un `id` et `scroll-mt`:
  - Exemple “Leistungen”: un badge avec `id="leistungen"` et `scroll-mt-24 md:scroll-mt-28` pour compenser un header sticky.
- Scroll programmatique:
  - `document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth', block: 'start' })`

## Déploiement

Générer le build:

```bash
npm run build
```

Démarrer le serveur:

```bash
npm run start
```

Assure-toi que la variable d’environnement `NODE_ENV=production` est bien définie sur l’hébergement, et que les assets du répertoire `public/` sont servis.

## Résolution des erreurs courantes

- Export manquant (`AboutSection`):
  - Si tu vois “Export AboutSection doesn't exist in target module”, vérifie que `about-section.tsx` exporte bien un **export nommé**:
    - `export function AboutSection()` et non `export default function AboutSection()`
  - Ou adapte l’import côté `app/page.tsx` avec un import par défaut: `import AboutSection from "@/components/about-section"`

- Hooks React non définis:
  - “useRef is not defined” survient si `useRef`/`useEffect` ne sont pas importés:
    - Ajoute `import { useEffect, useRef } from "react"` en haut du fichier.
    - Supprime toute définition locale de fonction `useRef(...)` ou `useEffect(...)` qui cacherait les hooks de React.

- Turbopack et racine du projet:
  - Si Next.js signale que la racine est mal inférée (ex: il cherche `next/package.json` dans `app/`), force la racine:
    - Dans `next.config.mjs`, ajoute:
      - `turbopack: { root: require('node:path').resolve(process.cwd()) }`
  - Lance `npm run dev` depuis la **racine** du projet (et pas `app/`).

## Conventions

- Composants client: `“use client”` en tête du fichier pour les hooks et interactions.
- Classes utilitaires (type Tailwind): favorise des classes concises et expressives.
- Accessibilité: conserver des textes alternatifs (`alt`), contrastes suffisants et hiérarchie typographique.

## Licence

Projet interne — usage privé. Ne pas redistribuer sans autorisation.