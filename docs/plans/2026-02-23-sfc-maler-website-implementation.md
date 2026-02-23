# SFC Maler Website — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bilingual (DE/IT) one-page static website for SFC Maler GmbH, deployable on Netlify by dragging a folder.

**Architecture:** Single `index.html` with Tailwind CDN + Alpine.js for reactivity. Language toggle switches all text instantly via `lang.js` dictionaries. No build step, no npm.

**Tech Stack:** HTML5, Tailwind CSS v3 (Play CDN), Alpine.js v3 (CDN), Montserrat (Google Fonts), Netlify Forms

**Design doc:** `docs/plans/2026-02-23-sfc-maler-website-design.md`

---

## Task 1: Project Structure & Netlify Config

**Files:**
- Create: `netlify.toml`
- Create: `css/custom.css`
- Create: `js/main.js`
- Create: `js/lang.js`
- Create: `assets/images/.gitkeep`

**Step 1: Create folder structure**

```bash
mkdir -p assets/images css js
touch css/custom.css js/main.js js/lang.js assets/images/.gitkeep
```

**Step 2: Create netlify.toml**

```toml
# netlify.toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Step 3: Verify structure**

```bash
find . -not -path './.git/*' -not -path './docs/*' | sort
```

Expected output:
```
.
./assets
./assets/images
./assets/logo_bianco.jpeg
./assets/logo_nero.jpeg
./css
./css/custom.css
./js
./js/lang.js
./js/main.js
./netlify.toml
```

**Step 4: Commit**

```bash
git add netlify.toml css/custom.css js/main.js js/lang.js assets/images/.gitkeep
git commit -m "chore: scaffold project structure"
```

---

## Task 2: Download Unsplash Images

**Files:**
- Create: `assets/images/hero.jpg`
- Create: `assets/images/about.jpg`
- Create: `assets/images/gallery-1.jpg` … `gallery-6.jpg`

**Step 1: Download images with curl**

```bash
# Hero: bright painted living room
curl -L "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80" -o assets/images/hero.jpg

# About: craftsman painting wall
curl -L "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=900&q=80" -o assets/images/about.jpg

# Gallery 1: modern white interior
curl -L "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=75" -o assets/images/gallery-1.jpg

# Gallery 2: painted exterior facade
curl -L "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=75" -o assets/images/gallery-2.jpg

# Gallery 3: elegant bedroom after paint
curl -L "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=75" -o assets/images/gallery-3.jpg

# Gallery 4: spray painting detail
curl -L "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=75" -o assets/images/gallery-4.jpg

# Gallery 5: stucco decorative wall
curl -L "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75" -o assets/images/gallery-5.jpg

# Gallery 6: clean bright kitchen interior
curl -L "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=75" -o assets/images/gallery-6.jpg
```

**Step 2: Verify all files downloaded**

```bash
ls -lh assets/images/*.jpg
```

Expected: 8 files, each between 50KB–500KB.

**Step 3: Commit**

```bash
git add assets/images/
git commit -m "feat: add Unsplash stock images for hero, about, gallery"
```

---

## Task 3: Language Dictionaries (lang.js)

**Files:**
- Modify: `js/lang.js`

**Step 1: Write the full translation dictionary**

```js
// js/lang.js
const translations = {
  de: {
    // Nav
    nav_services:   "Dienstleistungen",
    nav_about:      "Über uns",
    nav_gallery:    "Galerie",
    nav_contact:    "Kontakt",
    nav_cta:        "📞 078 404 47 47",

    // Hero
    hero_title:     "Ihr Malerprofi in der ganzen Schweiz",
    hero_subtitle:  "SFC Maler GmbH – Salvo Catanese",
    hero_cta:       "Kostenloses Angebot anfragen",

    // Services
    services_title: "Unsere Dienstleistungen",
    svc1_title:     "Innen- & Aussenmalerarbeiten",
    svc1_desc:      "Professionelle Malerarbeiten für Wohn- und Gewerberäume sowie Fassaden.",
    svc2_title:     "Spritzlackierung",
    svc2_desc:      "Präzise Lackierarbeiten mit modernster Spritzpistolenausrüstung.",
    svc3_title:     "Gipsarbeiten & Verputz",
    svc3_desc:      "Glatte Oberflächen und perfekte Unterlagen für dauerhaften Malerschutz.",
    svc4_title:     "Dekorative Behandlungen",
    svc4_desc:      "Stucco veneziano, Betonoptik, Kreidefarbe und weitere Spezialeffekte.",

    // About
    about_title:    "Über uns",
    about_text:     "Salvo Catanese bringt jahrelange Erfahrung und Schweizer Qualitätsstandards in jeden Auftrag ein. Von der Beratung bis zur Endreinigung – wir begleiten Sie durch das gesamte Projekt mit Zuverlässigkeit, Präzision und Respekt für Ihr Zuhause.",
    badge1:         "✅ Qualitätsgarantie",
    badge2:         "✅ Sauberkeit garantiert",
    badge3:         "✅ Premiummaterialien",

    // Gallery
    gallery_title:  "Unsere Arbeiten",

    // Contact
    contact_title:  "Kontakt aufnehmen",
    form_name:      "Name",
    form_email:     "E-Mail",
    form_phone:     "Telefon",
    form_message:   "Nachricht",
    form_submit:    "Nachricht senden",
    form_success:   "Vielen Dank! Wir melden uns bald.",
    address_label:  "Adresse",
    phone_label:    "Telefon",

    // Footer
    footer_impressum: "Impressum",
    footer_privacy:   "Datenschutz",
    footer_copy:      "© 2026 SFC Maler GmbH. Alle Rechte vorbehalten.",
  },
  it: {
    // Nav
    nav_services:   "Servizi",
    nav_about:      "Chi siamo",
    nav_gallery:    "Lavori",
    nav_contact:    "Contatti",
    nav_cta:        "📞 078 404 47 47",

    // Hero
    hero_title:     "Il tuo professionista della pittura in tutta la Svizzera",
    hero_subtitle:  "SFC Maler GmbH – Salvo Catanese",
    hero_cta:       "Richiedi un Preventivo Gratuito",

    // Services
    services_title: "I Nostri Servizi",
    svc1_title:     "Pittura Interni ed Esterni",
    svc1_desc:      "Lavori di pittura professionali per ambienti residenziali, commerciali e facciate.",
    svc2_title:     "Verniciatura a Spruzzo",
    svc2_desc:      "Verniciatura di precisione con attrezzature a pistola di ultima generazione.",
    svc3_title:     "Gessatura e Stuccatura",
    svc3_desc:      "Superfici lisce e perfette per una protezione pittorica duratura.",
    svc4_title:     "Trattamenti Decorativi",
    svc4_desc:      "Stucco veneziano, effetto cemento, chalk paint e altri effetti speciali.",

    // About
    about_title:    "Chi Siamo",
    about_text:     "Salvo Catanese porta anni di esperienza e gli standard qualitativi svizzeri in ogni commessa. Dalla consulenza alla pulizia finale, vi accompagniamo attraverso l'intero progetto con affidabilità, precisione e rispetto per la vostra casa.",
    badge1:         "✅ Qualità garantita",
    badge2:         "✅ Pulizia garantita",
    badge3:         "✅ Materiali premium",

    // Gallery
    gallery_title:  "I Nostri Lavori",

    // Contact
    contact_title:  "Contattaci",
    form_name:      "Nome",
    form_email:     "Email",
    form_phone:     "Telefono",
    form_message:   "Messaggio",
    form_submit:    "Invia messaggio",
    form_success:   "Grazie! Ti contatteremo presto.",
    address_label:  "Indirizzo",
    phone_label:    "Telefono",

    // Footer
    footer_impressum: "Impressum",
    footer_privacy:   "Privacy Policy",
    footer_copy:      "© 2026 SFC Maler GmbH. Tutti i diritti riservati.",
  }
};

function t(key, lang) {
  return (translations[lang] || translations['de'])[key] || key;
}
```

**Step 2: Verify file is valid JS**

```bash
node -e "const {translations} = require('./js/lang.js'); console.log('DE keys:', Object.keys(translations.de).length, '| IT keys:', Object.keys(translations.it).length)"
```

Expected: `DE keys: 36 | IT keys: 36`

> Note: If node reports module error, just open index.html in browser once it's created — the file will be validated visually.

**Step 3: Commit**

```bash
git add js/lang.js
git commit -m "feat: add DE/IT translation dictionaries"
```

---

## Task 4: Base HTML Skeleton

**Files:**
- Create: `index.html`

**Step 1: Create the base HTML with CDN links and Alpine root**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SFC Maler GmbH – Salvo Catanese</title>
  <meta name="description" content="Ihr Malerprofi in der ganzen Schweiz. SFC Maler GmbH von Salvo Catanese – Qualität, Präzision und Sauberkeit." />

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />

  <!-- Tailwind CSS Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary:  '#1E6BAE',
            accent:   '#2A8C45',
            dark:     '#1A1A2E',
          },
          fontFamily: {
            sans: ['Montserrat', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/custom.css" />

  <!-- Alpine.js -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>

<body
  class="font-sans text-dark bg-white"
  x-data="sfcApp()"
  x-init="init()"
>

  <!-- HEADER -->
  <!-- HERO -->
  <!-- SERVICES -->
  <!-- ABOUT -->
  <!-- GALLERY -->
  <!-- CONTACT -->
  <!-- FOOTER -->

  <!-- Scripts -->
  <script src="js/lang.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

**Step 2: Add Alpine app init to main.js**

```js
// js/main.js
function sfcApp() {
  return {
    lang: 'de',
    menuOpen: false,
    scrolled: false,

    init() {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY > 50;
      });
    },

    t(key) {
      return t(key, this.lang);
    },

    toggleLang() {
      this.lang = this.lang === 'de' ? 'it' : 'de';
      document.documentElement.lang = this.lang;
    },

    scrollTo(id) {
      this.menuOpen = false;
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
}
```

**Step 3: Open in browser and verify no console errors**

Open `index.html` in Chrome/Firefox. Expected: blank white page, no JS errors in DevTools console.

**Step 4: Commit**

```bash
git add index.html js/main.js
git commit -m "feat: add base HTML skeleton with Tailwind + Alpine init"
```

---

## Task 5: Header

**Files:**
- Modify: `index.html` — replace `<!-- HEADER -->` comment

**Step 1: Add sticky header HTML**

Replace `<!-- HEADER -->` with:

```html
<!-- HEADER -->
<header
  class="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300"
  :class="{ 'shadow-md': scrolled }"
>
  <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

    <!-- Logo -->
    <a href="#" @click.prevent="scrollTo('hero')">
      <img src="assets/logo_nero.jpeg" alt="SFC Maler GmbH Logo" class="h-14 w-auto" />
    </a>

    <!-- Desktop Nav -->
    <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-dark">
      <a href="#" @click.prevent="scrollTo('services')" class="hover:text-primary transition-colors" x-text="t('nav_services')"></a>
      <a href="#" @click.prevent="scrollTo('about')"    class="hover:text-primary transition-colors" x-text="t('nav_about')"></a>
      <a href="#" @click.prevent="scrollTo('gallery')"  class="hover:text-primary transition-colors" x-text="t('nav_gallery')"></a>
      <a href="#" @click.prevent="scrollTo('contact')"  class="hover:text-primary transition-colors" x-text="t('nav_contact')"></a>
    </nav>

    <!-- Right: Lang Toggle + CTA -->
    <div class="hidden md:flex items-center gap-3">
      <!-- Language Toggle -->
      <button
        @click="toggleLang()"
        class="text-xs font-bold border-2 border-primary text-primary rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-all"
        x-text="lang === 'de' ? '🇮🇹 IT' : '🇩🇪 DE'"
      ></button>

      <!-- Phone CTA -->
      <a
        href="tel:0784044747"
        class="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-accent transition-colors"
        x-text="t('nav_cta')"
      ></a>
    </div>

    <!-- Mobile Hamburger -->
    <button
      class="md:hidden flex flex-col gap-1.5 p-2"
      @click="menuOpen = !menuOpen"
      aria-label="Menu"
    >
      <span class="block w-6 h-0.5 bg-dark transition-all" :class="{'rotate-45 translate-y-2': menuOpen}"></span>
      <span class="block w-6 h-0.5 bg-dark transition-all" :class="{'opacity-0': menuOpen}"></span>
      <span class="block w-6 h-0.5 bg-dark transition-all" :class="{'-rotate-45 -translate-y-2': menuOpen}"></span>
    </button>
  </div>

  <!-- Mobile Menu Dropdown -->
  <div
    x-show="menuOpen"
    x-transition
    class="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 text-sm font-semibold"
  >
    <a href="#" @click.prevent="scrollTo('services')" x-text="t('nav_services')"></a>
    <a href="#" @click.prevent="scrollTo('about')"    x-text="t('nav_about')"></a>
    <a href="#" @click.prevent="scrollTo('gallery')"  x-text="t('nav_gallery')"></a>
    <a href="#" @click.prevent="scrollTo('contact')"  x-text="t('nav_contact')"></a>
    <div class="flex items-center gap-3 pt-2 border-t border-gray-100">
      <button @click="toggleLang()" class="text-xs font-bold border-2 border-primary text-primary rounded-full px-3 py-1" x-text="lang === 'de' ? '🇮🇹 IT' : '🇩🇪 DE'"></button>
      <a href="tel:0784044747" class="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg" x-text="t('nav_cta')"></a>
    </div>
  </div>
</header>
```

**Step 2: Verify in browser**

- Desktop: logo left, nav center, toggle+phone right ✓
- Scroll down → header gets shadow ✓
- Click `🇮🇹 IT` → all nav text switches to Italian ✓
- Mobile (resize < 768px): hamburger appears, dropdown opens/closes ✓

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add sticky bilingual header with mobile menu"
```

---

## Task 6: Hero Section

**Files:**
- Modify: `index.html` — replace `<!-- HERO -->` comment

**Step 1: Add Hero HTML**

Replace `<!-- HERO -->` with:

```html
<!-- HERO -->
<section
  id="hero"
  class="relative h-screen min-h-[600px] flex items-center justify-center text-center"
>
  <!-- Background image -->
  <div
    class="absolute inset-0 bg-cover bg-center"
    style="background-image: url('assets/images/hero.jpg')"
  ></div>

  <!-- Dark overlay -->
  <div class="absolute inset-0 bg-black/55"></div>

  <!-- Content -->
  <div class="relative z-10 px-4 max-w-3xl mx-auto">
    <h1
      class="text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
      x-text="t('hero_title')"
    ></h1>
    <p
      class="text-xl md:text-2xl text-white/80 font-semibold mb-8"
      x-text="t('hero_subtitle')"
    ></p>
    <a
      href="#"
      @click.prevent="scrollTo('contact')"
      class="inline-block bg-primary hover:bg-accent text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
      x-text="t('hero_cta')"
    ></a>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
    </svg>
  </div>
</section>
```

**Step 2: Add top padding to body to avoid header overlap**

In `css/custom.css`:

```css
/* Offset for fixed header */
section[id] {
  scroll-margin-top: 80px;
}
```

**Step 3: Verify in browser**

- Hero fills full viewport height ✓
- Background photo visible with dark overlay ✓
- H1 text in German by default, switches to Italian on toggle ✓
- CTA button scrolls to contact section ✓
- Bouncing arrow visible at bottom ✓

**Step 4: Commit**

```bash
git add index.html css/custom.css
git commit -m "feat: add hero section with full-bleed image and bilingual CTA"
```

---

## Task 7: Services Section

**Files:**
- Modify: `index.html` — replace `<!-- SERVICES -->` comment

**Step 1: Add Services HTML**

Replace `<!-- SERVICES -->` with:

```html
<!-- SERVICES -->
<section id="services" class="py-20 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4">

    <h2
      class="text-3xl md:text-4xl font-bold text-center text-dark mb-14"
      x-text="t('services_title')"
    ></h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      <!-- Card 1: Innen/Aussen -->
      <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow text-center group">
        <div class="text-5xl mb-4">🎨</div>
        <h3 class="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors" x-text="t('svc1_title')"></h3>
        <p class="text-sm text-gray-500 leading-relaxed" x-text="t('svc1_desc')"></p>
      </div>

      <!-- Card 2: Spritzlackierung -->
      <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow text-center group">
        <div class="text-5xl mb-4">💨</div>
        <h3 class="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors" x-text="t('svc2_title')"></h3>
        <p class="text-sm text-gray-500 leading-relaxed" x-text="t('svc2_desc')"></p>
      </div>

      <!-- Card 3: Gips -->
      <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow text-center group">
        <div class="text-5xl mb-4">🪚</div>
        <h3 class="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors" x-text="t('svc3_title')"></h3>
        <p class="text-sm text-gray-500 leading-relaxed" x-text="t('svc3_desc')"></p>
      </div>

      <!-- Card 4: Dekorativ -->
      <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow text-center group">
        <div class="text-5xl mb-4">✨</div>
        <h3 class="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors" x-text="t('svc4_title')"></h3>
        <p class="text-sm text-gray-500 leading-relaxed" x-text="t('svc4_desc')"></p>
      </div>

    </div>
  </div>
</section>
```

**Step 2: Verify in browser**

- 4 cards visible in a row on desktop ✓
- 2×2 grid on tablet ✓
- 1 column on mobile ✓
- Hover: shadow increases, title turns blue ✓
- Language toggle switches all card text ✓

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add services section with 4 bilingual cards"
```

---

## Task 8: About / Chi Siamo Section

**Files:**
- Modify: `index.html` — replace `<!-- ABOUT -->` comment

**Step 1: Add About HTML**

Replace `<!-- ABOUT -->` with:

```html
<!-- ABOUT -->
<section id="about" class="py-20 bg-white">
  <div class="max-w-6xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

      <!-- Text -->
      <div>
        <h2
          class="text-3xl md:text-4xl font-bold text-dark mb-6"
          x-text="t('about_title')"
        ></h2>
        <p
          class="text-gray-600 leading-relaxed text-lg mb-8"
          x-text="t('about_text')"
        ></p>

        <!-- Badges -->
        <div class="flex flex-col gap-3">
          <span class="inline-flex items-center gap-2 text-base font-semibold text-dark" x-text="t('badge1')"></span>
          <span class="inline-flex items-center gap-2 text-base font-semibold text-dark" x-text="t('badge2')"></span>
          <span class="inline-flex items-center gap-2 text-base font-semibold text-dark" x-text="t('badge3')"></span>
        </div>
      </div>

      <!-- Photo -->
      <div class="rounded-2xl overflow-hidden shadow-xl">
        <img
          src="assets/images/about.jpg"
          alt="SFC Maler – Salvo Catanese al lavoro"
          class="w-full h-80 object-cover"
        />
      </div>

    </div>
  </div>
</section>
```

**Step 2: Verify in browser**

- 2-column layout on desktop (text left, photo right) ✓
- 1 column on mobile (text top, photo bottom) ✓
- All 3 badges visible ✓
- Language toggle switches text ✓

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add about section with badges and photo"
```

---

## Task 9: Gallery Section

**Files:**
- Modify: `index.html` — replace `<!-- GALLERY -->` comment

**Step 1: Add Gallery HTML**

Replace `<!-- GALLERY -->` with:

```html
<!-- GALLERY -->
<section id="gallery" class="py-20 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4">

    <h2
      class="text-3xl md:text-4xl font-bold text-center text-dark mb-14"
      x-text="t('gallery_title')"
    ></h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow group">
        <img src="assets/images/gallery-1.jpg" alt="Malerarbeiten 1" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div class="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow group">
        <img src="assets/images/gallery-2.jpg" alt="Malerarbeiten 2" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div class="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow group">
        <img src="assets/images/gallery-3.jpg" alt="Malerarbeiten 3" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div class="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow group">
        <img src="assets/images/gallery-4.jpg" alt="Malerarbeiten 4" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div class="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow group">
        <img src="assets/images/gallery-5.jpg" alt="Malerarbeiten 5" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div class="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow group">
        <img src="assets/images/gallery-6.jpg" alt="Malerarbeiten 6" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
    </div>

  </div>
</section>
```

**Step 2: Verify in browser**

- 3×2 grid on desktop ✓
- 2×3 grid on tablet ✓
- 1 column on mobile ✓
- Hover: photo zooms in slightly ✓

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add gallery section with 6 photos and hover zoom"
```

---

## Task 10: Contact Section

**Files:**
- Modify: `index.html` — replace `<!-- CONTACT -->` comment

**Step 1: Add Contact HTML with Netlify Form**

Replace `<!-- CONTACT -->` with:

```html
<!-- CONTACT -->
<section id="contact" class="py-20 bg-white">
  <div class="max-w-6xl mx-auto px-4">

    <h2
      class="text-3xl md:text-4xl font-bold text-center text-dark mb-14"
      x-text="t('contact_title')"
    ></h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

      <!-- Form -->
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        class="flex flex-col gap-4"
        @submit.prevent="handleSubmit($event)"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p class="hidden"><input name="bot-field" /></p>

        <input
          type="text"
          name="name"
          required
          :placeholder="t('form_name')"
          class="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="email"
          name="email"
          required
          :placeholder="t('form_email')"
          class="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="tel"
          name="phone"
          :placeholder="t('form_phone')"
          class="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <textarea
          name="message"
          rows="5"
          required
          :placeholder="t('form_message')"
          class="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        ></textarea>

        <button
          type="submit"
          class="bg-primary hover:bg-accent text-white font-bold py-3 rounded-xl transition-colors"
          x-text="t('form_submit')"
        ></button>

        <!-- Success message -->
        <p
          x-show="formSuccess"
          x-transition
          class="text-accent font-semibold text-center"
          x-text="t('form_success')"
        ></p>
      </form>

      <!-- Contact Info + Map -->
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-3 text-gray-700">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📍</span>
            <div>
              <p class="text-xs text-gray-400 uppercase font-semibold" x-text="t('address_label')"></p>
              <p class="font-semibold">8807 Freienbach, Schweiz</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-2xl">📞</span>
            <div>
              <p class="text-xs text-gray-400 uppercase font-semibold" x-text="t('phone_label')"></p>
              <a href="tel:0784044747" class="font-semibold text-primary hover:underline">078 404 47 47</a>
            </div>
          </div>
        </div>

        <!-- Google Maps -->
        <div class="rounded-2xl overflow-hidden shadow-md h-64">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2704.2!2d8.76!3d47.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479ab5b0c3a8c3a3%3A0x1234!2sFreienbach%2C+8807!5e0!3m2!1sde!2sch!4v1"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="SFC Maler GmbH – Freienbach"
          ></iframe>
        </div>
      </div>

    </div>
  </div>
</section>
```

**Step 2: Add form submit handler to main.js**

Append to `sfcApp()` return object in `js/main.js`:

```js
formSuccess: false,

handleSubmit(event) {
  const form = event.target;
  const data = new FormData(form);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString()
  })
  .then(() => {
    this.formSuccess = true;
    form.reset();
    setTimeout(() => this.formSuccess = false, 5000);
  })
  .catch(() => alert('Error sending form'));
},
```

**Step 3: Verify in browser**

- Form fields visible with correct placeholders ✓
- Placeholders switch language on toggle ✓
- Address and phone visible ✓
- Map iframe renders ✓
- Note: form submission only works after Netlify deploy (not locally)

**Step 4: Commit**

```bash
git add index.html js/main.js
git commit -m "feat: add contact section with Netlify form and Google Maps"
```

---

## Task 11: Footer

**Files:**
- Modify: `index.html` — replace `<!-- FOOTER -->` comment

**Step 1: Add Footer HTML**

Replace `<!-- FOOTER -->` with:

```html
<!-- FOOTER -->
<footer class="bg-dark text-white py-10">
  <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">

    <!-- Logo -->
    <img src="assets/logo_nero.jpeg" alt="SFC Maler GmbH" class="h-16 w-auto brightness-0 invert" />

    <!-- Copyright -->
    <p class="text-sm text-white/60 text-center" x-text="t('footer_copy')"></p>

    <!-- Links -->
    <div class="flex gap-6 text-sm text-white/60">
      <a href="#" class="hover:text-white transition-colors" x-text="t('footer_impressum')"></a>
      <a href="#" class="hover:text-white transition-colors" x-text="t('footer_privacy')"></a>
    </div>

  </div>
</footer>
```

**Step 2: Verify in browser**

- Dark footer with white inverted logo ✓
- Copyright text switches language ✓
- Impressum and Privacy links visible ✓

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add footer with logo, copyright and legal links"
```

---

## Task 12: Custom CSS Polish

**Files:**
- Modify: `css/custom.css`

**Step 1: Add smooth scroll, font rendering, and minor polish**

```css
/* css/custom.css */

/* Scroll offset for fixed header */
section[id] {
  scroll-margin-top: 80px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Font rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Hide scrollbar on mobile menu */
.overflow-hidden {
  -webkit-overflow-scrolling: touch;
}

/* Form inputs – remove autofill yellow */
input:-webkit-autofill,
textarea:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}

/* Gallery image aspect ratio stability */
.gallery-img {
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
```

**Step 2: Verify in browser**

- Clicking nav links scrolls smoothly to correct section with header clearance ✓
- No yellow autofill background on form inputs ✓

**Step 3: Commit**

```bash
git add css/custom.css
git commit -m "style: add custom CSS polish and scroll fixes"
```

---

## Task 13: Full Mobile Responsiveness Review

**Files:**
- Modify: `index.html` if needed

**Step 1: Open browser DevTools → toggle device toolbar**

Test at these breakpoints:
- 375px (iPhone SE)
- 768px (iPad)
- 1280px (Desktop)

**Checklist:**
- [ ] Header: hamburger at 375px, full nav at 768px+
- [ ] Hero: font size readable at 375px (should be ~36px)
- [ ] Services: 1 col at 375px, 2 col at 640px, 4 col at 1024px
- [ ] About: stacked at 375px, side-by-side at 768px
- [ ] Gallery: 1 col at 375px, 2 col at 640px, 3 col at 1024px
- [ ] Contact: stacked at 375px, side-by-side at 768px
- [ ] Footer: stacked on mobile, row on desktop
- [ ] No horizontal scroll at any width

**Step 2: Fix any issues found** (adjust Tailwind classes as needed)

**Step 3: Commit**

```bash
git add index.html
git commit -m "fix: responsive layout review and mobile fixes"
```

---

## Task 14: SEO & Meta Tags

**Files:**
- Modify: `index.html` `<head>`

**Step 1: Add complete meta tags**

After the existing `<title>` and `<meta description>`, add:

```html
<!-- SEO -->
<meta name="keywords" content="Maler Schweiz, Malerarbeiten Freienbach, Maler Kanton Schwyz, Spritzlackierung, pittore Svizzera, SFC Maler, Salvo Catanese" />
<meta name="author" content="SFC Maler GmbH – Salvo Catanese" />
<meta name="robots" content="index, follow" />

<!-- Open Graph (social sharing) -->
<meta property="og:title" content="SFC Maler GmbH – Ihr Malerprofi in der ganzen Schweiz" />
<meta property="og:description" content="Professionelle Malerarbeiten in der ganzen Schweiz. Innen, Aussen, Spritzlackierung. Qualität und Sauberkeit garantiert." />
<meta property="og:image" content="assets/images/hero.jpg" />
<meta property="og:type" content="website" />

<!-- Favicon (simple emoji fallback) -->
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>" />
```

**Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add SEO meta tags and Open Graph for social sharing"
```

---

## Task 15: Deploy to Netlify

**Step 1: Final check — verify all files present**

```bash
find . -not -path './.git/*' -not -path './docs/*' | sort
```

Expected key files:
```
./index.html
./netlify.toml
./assets/logo_bianco.jpeg
./assets/logo_nero.jpeg
./assets/images/hero.jpg
./assets/images/about.jpg
./assets/images/gallery-1.jpg  (through gallery-6.jpg)
./css/custom.css
./js/lang.js
./js/main.js
```

**Step 2: Final visual check in browser**

Open `index.html` locally and verify:
- [ ] Page loads with no console errors
- [ ] Language toggle DE ↔ IT works on all sections
- [ ] All images load
- [ ] Smooth scroll navigation works
- [ ] Mobile menu works

**Step 3: Deploy to Netlify**

Option A — Drag & drop (easiest):
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag the entire `sfc_malen_catanese/` folder onto the upload zone
4. Wait ~30 seconds → site is live at `random-name.netlify.app`

Option B — Connect GitHub:
1. Push repo to GitHub: `git remote add origin <url> && git push -u origin master`
2. In Netlify: "Import from Git" → select repo → deploy

**Step 4: Verify Netlify deployment**

- [ ] Site loads at Netlify URL ✓
- [ ] Submit the contact form with test data ✓
- [ ] Check Netlify dashboard → Forms → verify submission received ✓
- [ ] Set custom domain if available (Netlify → Domain settings → Add domain) ✓

**Step 5: Final commit**

```bash
git add .
git commit -m "chore: final deployment-ready state"
```

---

## Summary

| Task | What it builds |
|------|----------------|
| 1 | Folder structure + Netlify config |
| 2 | Unsplash images downloaded |
| 3 | DE/IT translation dictionaries |
| 4 | Base HTML + Alpine/Tailwind init |
| 5 | Sticky bilingual header + mobile menu |
| 6 | Full-bleed hero with CTA |
| 7 | Services section (4 cards) |
| 8 | About section (text + photo + badges) |
| 9 | Gallery section (6 photos) |
| 10 | Contact form (Netlify) + Google Maps |
| 11 | Footer |
| 12 | CSS polish |
| 13 | Mobile responsiveness review |
| 14 | SEO meta tags |
| 15 | Netlify deployment |

**Estimated total time:** 2–3 hours of focused implementation.
