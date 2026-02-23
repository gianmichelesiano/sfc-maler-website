# SFC Maler GmbH — Website Design Document
**Date:** 2026-02-23
**Company:** SFC Maler GmbH — Salvo Catanese
**Location:** 8807 Freienbach, Switzerland
**Phone:** 078 404 47 47

---

## 1. Project Overview

Static one-page website for SFC Maler GmbH, a professional painting company serving all of Switzerland, based in Freienbach (Canton Schwyz). The site serves as a digital business card and lead generation tool.

---

## 2. Technical Stack

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Type | Static one-page site | Fast, zero backend needed |
| HTML/CSS/JS | Pure (no build step) | Simple deployment, no npm required |
| CSS Framework | Tailwind CSS v3 (Play CDN) | Rapid styling, no build step |
| Reactivity | Alpine.js v3 (CDN) | Language toggle + mobile menu, 3kb |
| Font | Montserrat (Google Fonts) | Clean, modern, readable |
| Hosting | Netlify | Free, drag-and-drop deploy, built-in forms |
| Contact Form | Netlify Forms | Zero config, free up to 100 submissions/month |
| Photos | Unsplash stock photos | Professional, free, immediate |
| Languages | Bilingual DE/IT with toggle | Canton Schwyz = German-speaking; owner = Italian |

---

## 3. File Structure

```
sfc_malen_catanese/
├── index.html              ← complete one-page site
├── assets/
│   ├── logo_bianco.jpeg    ← logo on white (for header)
│   ├── logo_nero.jpeg      ← logo on black (for footer/dark contexts)
│   └── images/             ← Unsplash photos (downloaded)
│       ├── hero.jpg
│       ├── about.jpg
│       └── gallery-1..6.jpg
├── css/
│   └── custom.css          ← styles not covered by Tailwind
├── js/
│   ├── main.js             ← scroll animations, sticky header, smooth scroll
│   └── lang.js             ← DE/IT translation dictionaries
├── docs/
│   └── plans/
│       └── 2026-02-23-sfc-maler-website-design.md
└── netlify.toml            ← Netlify Forms + redirect config
```

---

## 4. Visual Design

### Color Palette (derived from logo)
| Role | Color | Hex |
|------|-------|-----|
| Primary | Spray gun blue | `#1E6BAE` |
| Accent | Paintbrush green | `#2A8C45` |
| Background | White | `#FFFFFF` |
| Alt Background | Light grey | `#F8F9FA` |
| Text | Dark | `#1A1A2E` |
| CTA | Primary blue → hover green | gradient |

### Typography
- **Headings:** Montserrat Bold (700)
- **Body:** Montserrat Regular (400)
- **Accents/numbers:** Montserrat SemiBold (600)

### Style Principles
- Clean white/light grey backgrounds — logo provides the colour
- Rounded corners (8px) on cards
- Light shadows on service cards
- Sticky header with shadow on scroll
- No background patterns — photos provide visual interest
- Mobile-first, responsive

---

## 5. Page Sections

### 5.1 Header (sticky)
- **Left:** `logo_bianco.jpeg`
- **Center:** Nav links → Servizi/Dienstleistungen | Chi Siamo/Über uns | Lavori/Galerie | Contatti/Kontakt
- **Right:** `[🇩🇪 DE | 🇮🇹 IT]` toggle + `📞 078 404 47 47` button (blue)
- **Mobile:** hamburger menu (Alpine.js)

### 5.2 Hero
- Full-width Unsplash photo: bright freshly painted living room
- Semi-transparent dark overlay for text legibility
- **H1 (white):**
  - DE: *"Ihr Malerprofi in der ganzen Schweiz"*
  - IT: *"Il tuo professionista della pittura in tutta la Svizzera"*
- **Subtitle:** *"SFC Maler GmbH – Salvo Catanese"*
- **CTA button:**
  - DE: *"Kostenloses Angebot anfragen"*
  - IT: *"Richiedi un Preventivo Gratuito"*

### 5.3 Servizi / Dienstleistungen
4 cards in a 2×2 grid (desktop) / 1 column (mobile):

| Icon | DE | IT |
|------|----|----|
| 🎨 | Innen- & Aussenmalerarbeiten | Pittura Interni ed Esterni |
| 💨 | Spritzlackierung | Verniciatura a Spruzzo |
| 🪚 | Gipsarbeiten & Verputz | Gessatura e Stuccatura |
| ✨ | Dekorative Behandlungen | Trattamenti Decorativi |

### 5.4 Chi Siamo / Über Uns
- Left: text block
  - DE: *"Salvo Catanese bringt jahrelange Erfahrung und Schweizer Qualitätsstandards..."*
  - IT: *"Salvo Catanese porta anni di esperienza e gli standard qualitativi svizzeri..."*
- Right: Unsplash photo (craftsman at work)
- 3 quality badges: ✅ Qualitätsgarantie / Qualità garantita · ✅ Sauberkeit / Pulizia · ✅ Premiummaterialien / Materiali premium

### 5.5 Galleria / Galerie
- 2×3 grid on desktop, 1 column on mobile
- 6 Unsplash photos: painted interiors, exteriors, detail shots
- Hover effect: slight zoom

### 5.6 Contatti / Kontakt
- **Left:** Netlify Form
  - Fields: Name/Nome · Email · Telefon/Telefono · Nachricht/Messaggio
  - Submit button (blue)
- **Right:**
  - 📍 8807 Freienbach
  - 📞 078 404 47 47
  - Google Maps iframe (Freienbach)

### 5.7 Footer
- Logo (small) + © 2026 SFC Maler GmbH
- Links: Impressum · Datenschutz/Privacy Policy
- CHE/UID number placeholder

---

## 6. Language System

Alpine.js root component holds `lang: 'de'` state.
All text elements use `x-text="t('key')"` or `x-html`.
Dictionaries in `js/lang.js`:

```js
const translations = {
  de: { nav_services: "Dienstleistungen", hero_title: "Ihr Malerprofi...", ... },
  it: { nav_services: "Servizi", hero_title: "Il tuo professionista...", ... }
}
```

Toggle button switches `lang` → all text updates instantly, no page reload.

---

## 7. Netlify Configuration

`netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Form uses `netlify` attribute + hidden `form-name` field — no backend needed.

---

## 8. Success Criteria

- [ ] Loads in < 2s on mobile (Lighthouse score ≥ 90)
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] Language toggle works instantly DE ↔ IT
- [ ] Contact form submits successfully via Netlify
- [ ] Phone CTA visible on all viewports
- [ ] Passes basic accessibility (alt tags, contrast ratios, aria labels)
- [ ] Deployable to Netlify by dragging the folder
