// ─────────────────────────────────────────────────────────────────────────────
// Firmendaten — EINE Stelle für Impressum, Footer, Kontakt, JSON-LD (Google/KI) und AGB.
// Vor dem Livegang alle Felder mit «TODO» ausfüllen. Solange `ready` false ist,
// zeigt die Website Platzhalter in eckigen Klammern und der Build gibt eine Warnung aus.
// Wichtig für die eigene Sichtbarkeit: Name, Adresse, Telefon hier exakt so schreiben
// wie im Google-Unternehmensprofil und in den Verzeichnissen (NAP-Konsistenz).
// ─────────────────────────────────────────────────────────────────────────────

export const COMPANY = {
  brand: 'RAG Agencia Regional',
  /** TODO (Rechtsform noch offen): Razón social, z. B. «RAG Agencia Regional S.L.» oder Name des autónomo. */
  legalName: '',
  /** TODO: Administrador (S.L.) bzw. Titular (autónomo). */
  representative: '',
  /** TODO: Domicilio social (kein Apartado de correos). */
  street: '',
  zip: '',
  city: '',
  province: '',
  country: 'España',
  countryCode: 'ES',
  /** TODO: Telefon international, z. B. +34 910 000 000 (für tel:-Links ohne Leerzeichen). */
  phone: '',
  /** TODO: PLATZHALTER — hola@rag-agencia.es existiert nicht. Echte Adresse eintragen, sobald die Domain steht. */
  email: 'hola@rag-agencia.es',
  /** TODO bei S.L.: Registro Mercantil (Provinz, Tomo, Folio, Hoja, Inscripción). Bei autónomo leer lassen. */
  registerCourt: '',
  registerNumber: '',
  /** TODO: NIF/CIF (ES…). Preise netto zzgl. 21 % IVA (B2B). */
  vatId: '',
  /** Optional: Datenschutz-Kontakt / DPO (Delegado de Protección de Datos), falls benannt. */
  contentResponsible: '',
  /** TODO: Bankverbindung für Rechnungen — sieht der Kunde im Kundenbereich bei offener Rechnung. */
  bankName: '',
  iban: '',
  bic: '',
  /** Profile für JSON-LD `sameAs` (Google-Profil-Link, LinkedIn, Instagram, Verzeichnisse) — sobald angelegt. */
  sameAs: [] as string[],
  /** Erst auf true setzen, wenn alles oben echt ausgefüllt ist. */
  ready: false,
}

// Vertragsbedingungen für Spanien (Hypothese aus dem Produktprofil, 16.11.2026 — noch zu bestätigen):
// Preise netto zzgl. 21 % IVA, Monatspakete ohne Mindestlaufzeit, Kündigung 30 Tage zum Monatsende.
export const TERMS = {
  /** Preise sind Nettopreise zzgl. IVA (B2B). */
  pricesNet: true,
  vatRate: 21,
  /** Mindestlaufzeit der Monatspakete in Monaten (0 = ohne Mindestlaufzeit, monatlich kündbar). */
  minTermMonths: 0,
  /** Kündigungsfrist in Tagen zum Monatsende. */
  noticeDays: 30,
}

export function priceNote(): string {
  return TERMS.pricesNet ? `Todos los precios sin IVA (${TERMS.vatRate} % no incluido).` : `Todos los precios con IVA (${TERMS.vatRate} %) incluido.`
}

/** Platzhalter, solange ein Feld leer ist. */
export const fill = (v: string, label: string) => v.trim() || `[${label}]`

export const phoneHref = () => `tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`

/** schema.org-Daten der Agentur — für Google, Bing und KI-Assistenten. Nur echte Angaben, keine Platzhalter. */
export function organizationJsonLd(siteUrl: string) {
  const c = COMPANY
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#organization`,
    name: c.brand,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/icon-512.png`,
    image: `${siteUrl}/og-image.png`,
    description: 'Sistema de visibilidad local en España: Google Maps y perfil de empresa, web y Google Search, búsqueda con IA (ChatGPT, Perplexity, Google AI Overviews), reseñas y redes sociales.',
    areaServed: [
      { '@type': 'Country', name: 'España' },
    ],
    knowsLanguage: ['es'],
    email: c.email,
  }
  if (c.legalName) data.legalName = c.legalName
  if (c.phone) data.telephone = c.phone
  if (c.street && c.zip && c.city) {
    data.address = { '@type': 'PostalAddress', streetAddress: c.street, postalCode: c.zip, addressLocality: c.city, ...(c.province ? { addressRegion: c.province } : {}), addressCountry: c.countryCode }
  }
  if (c.vatId) data.vatID = c.vatId
  if (c.sameAs.length) data.sameAs = c.sameAs
  return data
}
