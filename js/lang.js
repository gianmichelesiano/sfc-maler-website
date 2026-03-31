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
    hero_title:      "Ihr Malerprofi in der ganzen Schweiz",
    hero_subtitle:   "SFC Maler GmbH – Salvo Catanese",
    hero_cta:        "Kostenloses Angebot anfragen",
    hero_cta2:       "Jetzt anrufen",
    hero_stat1_num:  "50+",
    hero_stat1_lbl:  "Experten",
    hero_stat2_num:  "100+",
    hero_stat2_lbl:  "Kunden",
    hero_stat3_num:  "98%",
    hero_stat3_lbl:  "Zufriedenheit",

    // Services
    services_label: "Unsere Leistungen",
    services_title: "Unsere Dienstleistungen",
    svc1_title:     "Innen- & Aussenmalerarbeiten",
    svc1_desc:      "Professionelle Malerarbeiten für Wohn- und Gewerberäume sowie Fassaden.",
    svc2_title:     "Spritzlackierung",
    svc2_desc:      "Präzise Lackierarbeiten mit modernster Spritzpistolenausrüstung.",
    svc3_title:     "Gipsarbeiten & Verputz",
    svc3_desc:      "Glatte Oberflächen und perfekte Unterlagen für dauerhaften Malerschutz.",
    svc4_title:     "Dekorative Behandlungen",
    svc4_desc:      "Stucco veneziano, Betonoptik, Kreidefarbe und weitere Spezialeffekte.",

    // Stats bar
    stats_projects:   "Abgeschl. Projekte",
    stats_experience: "Jahre Erfahrung",
    stats_team:       "Teammitglieder",
    stats_clients:    "Aktive Kunden",

    // About
    about_label: "Über uns",
    about_title: "Über uns",
    about_text:     "Salvo Catanese bringt jahrelange Erfahrung und Schweizer Qualitätsstandards in jeden Auftrag ein. Von der Beratung bis zur Endreinigung – wir begleiten Sie durch das gesamte Projekt mit Zuverlässigkeit, Präzision und Respekt für Ihr Zuhause.",
    about_badge1:   "✅ Qualitätsgarantie",
    about_badge2:   "✅ Sauberkeit garantiert",
    about_badge3:   "✅ Premiummaterialien",

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
    whatsapp_label: "WhatsApp",
    whatsapp_msg:   "Hallo SFC Maler, ich interessiere mich für Ihre Dienste.",

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
    hero_title:      "Il tuo professionista della pittura in tutta la Svizzera",
    hero_subtitle:   "SFC Maler GmbH – Salvo Catanese",
    hero_cta:        "Richiedi un Preventivo Gratuito",
    hero_cta2:       "Chiamaci ora",
    hero_stat1_num:  "50+",
    hero_stat1_lbl:  "Esperti",
    hero_stat2_num:  "100+",
    hero_stat2_lbl:  "Clienti",
    hero_stat3_num:  "98%",
    hero_stat3_lbl:  "Soddisfazione",

    // Services
    services_label: "I Nostri Servizi",
    services_title: "I Nostri Servizi",
    svc1_title:     "Pittura Interni ed Esterni",
    svc1_desc:      "Lavori di pittura professionali per ambienti residenziali, commerciali e facciate.",
    svc2_title:     "Verniciatura a Spruzzo",
    svc2_desc:      "Verniciatura di precisione con attrezzature a pistola di ultima generazione.",
    svc3_title:     "Gessatura e Stuccatura",
    svc3_desc:      "Superfici lisce e perfette per una protezione pittorica duratura.",
    svc4_title:     "Trattamenti Decorativi",
    svc4_desc:      "Stucco veneziano, effetto cemento, chalk paint e altri effetti speciali.",

    // Stats bar
    stats_projects:   "Progetti Completati",
    stats_experience: "Anni d'Esperienza",
    stats_team:       "Membri del Team",
    stats_clients:    "Clienti Attivi",

    // About
    about_label: "Chi siamo",
    about_title: "Chi Siamo",
    about_text:     "Salvo Catanese porta anni di esperienza e gli standard qualitativi svizzeri in ogni commessa. Dalla consulenza alla pulizia finale, vi accompagniamo attraverso l'intero progetto con affidabilità, precisione e rispetto per la vostra casa.",
    about_badge1:   "✅ Qualità garantita",
    about_badge2:   "✅ Pulizia garantita",
    about_badge3:   "✅ Materiali premium",

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
    whatsapp_label: "WhatsApp",
    whatsapp_msg:   "Ciao SFC Maler, sono interessato ai vostri servizi.",

    // Footer
    footer_impressum: "Impressum",
    footer_privacy:   "Privacy Policy",
    footer_copy:      "© 2026 SFC Maler GmbH. Tutti i diritti riservati.",
  }
};

function t(key, lang) {
  return (translations[lang] || translations['de'])[key] || key;
}
