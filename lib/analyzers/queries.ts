// lib/analyzers/queries.ts

type SectorQueries = {
  [key: string]: string[]; // clé : secteur (en minuscules, sans accents)
};

// Dictionnaire de requêtes par secteur (version enrichie et équilibrée)
const sectorQueryMap: SectorQueries = {
  "école d'ingénieurs": [
    "meilleures écoles d'ingénieurs en France",
    "classement des écoles d'ingénieurs",
    "avis sur {domain}",
    "forum {domain}",
    "prépa intégrée ou prépa classique",
    "école d'ingénieurs publique vs privée",
    "alternatives à {domain}",
    "débouchés après {domain}"
  ],
  "université": [
    "meilleures universités en France",
    "classement {domain}",
    "avis étudiants {domain}",
    "frais de scolarité {domain}",
    "campus {domain}",
    "formation {domain}",
    "alternatives à {domain}"
  ],
  "formation professionnelle": [
    "meilleurs organismes de formation",
    "avis sur {domain}",
    "certifications {domain}",
    "alternatives à {domain}",
    "comparaison {domain} avec autres organismes",
    "financement formation {domain}"
  ],
  "e-commerce": [
    "meilleurs sites e-commerce",
    "avis sur {domain}",
    "codes promo {domain}",
    "livraison {domain}",
    "service client {domain}",
    "alternatives à {domain}",
    "comparatif {domain} vs concurrents"
  ],
  "saas": [
    "meilleurs logiciels {sector}",
    "avis sur {domain}",
    "tarif {domain}",
    "fonctionnalités {domain}",
    "alternatives à {domain}",
    "comparaison {domain} avec concurrents",
    "tutoriel {domain}"
  ],
  "startup": [
    "startups innovantes dans le domaine {sector}",
    "levée de fonds {domain}",
    "actualité {domain}",
    "avis employés {domain}",
    "culture d'entreprise {domain}",
    "produit {domain}",
    "concurrents de {domain}"
  ],
  "restaurant": [
    "meilleurs restaurants {sector}",
    "avis sur {domain}",
    "menu {domain}",
    "prix {domain}",
    "réservation {domain}",
    "spécialités {domain}",
    "alternatives à {domain}"
  ],
  "hôtel": [
    "meilleurs hôtels {sector}",
    "avis sur {domain}",
    "prix chambre {domain}",
    "emplacement {domain}",
    "services {domain}",
    "alternatives à {domain}",
    "comparaison hôtels"
  ],
  "service public": [
    "démarches administratives {domain}",
    "horaires {domain}",
    "contact {domain}",
    "avis usagers {domain}",
    "actualités {domain}",
    "services en ligne {domain}"
  ],
  "média": [
    "actualités {sector}",
    "articles récents {domain}",
    "journalisme {domain}",
    "abonnement {domain}",
    "qualité de l'information {domain}",
    "alternatives à {domain}"
  ],
  "association": [
    "missions {domain}",
    "bénévolat {domain}",
    "dons {domain}",
    "actualités {domain}",
    "projets {domain}",
    "avis sur {domain}"
  ],
  "agence web": [
    "meilleures agences web {sector}",
    "avis sur {domain}",
    "portfolio {domain}",
    "tarifs {domain}",
    "réalisations {domain}",
    "alternatives à {domain}"
  ],
  "banque": [
    "meilleures banques en ligne",
    "avis sur {domain}",
    "frais bancaires {domain}",
    "offres {domain}",
    "service client {domain}",
    "comparatif banques",
    "alternatives à {domain}"
  ],
  "assurance": [
    "meilleures assurances {sector}",
    "avis sur {domain}",
    "tarifs {domain}",
    "garanties {domain}",
    "sinistre {domain}",
    "comparateur assurance",
    "alternatives à {domain}"
  ],
  "immobilier": [
    "agences immobilières {sector}",
    "avis sur {domain}",
    "annonces {domain}",
    "estimation {domain}",
    "location {domain}",
    "achat {domain}",
    "alternatives à {domain}"
  ],
  "voyage": [
    "meilleurs sites de voyage",
    "avis sur {domain}",
    "offres {domain}",
    "destinations {domain}",
    "comparateur de vols",
    "alternatives à {domain}"
  ],
  "santé": [
    "meilleurs professionnels de santé {sector}",
    "avis sur {domain}",
    "consultation en ligne {domain}",
    "traitements {domain}",
    "recommandations {domain}",
    "alternatives à {domain}"
  ],
  "beauté": [
    "meilleurs produits de beauté",
    "avis sur {domain}",
    "tutos maquillage {domain}",
    "ingrédients {domain}",
    "marques alternatives",
    "comparatif produits"
  ],
  "sport": [
    "meilleurs équipements sportifs",
    "avis sur {domain}",
    "entraînement {domain}",
    "conseils {domain}",
    "communauté {domain}",
    "alternatives à {domain}"
  ],
  "jeux vidéo": [
    "meilleurs jeux vidéo {sector}",
    "avis sur {domain}",
    "test {domain}",
    "actualités jeux",
    "communauté {domain}",
    "alternatives à {domain}"
  ],
  "high-tech": [
    "meilleurs smartphones",
    "avis sur {domain}",
    "test {domain}",
    "comparatif high-tech",
    "innovations {domain}",
    "alternatives à {domain}"
  ],
  "mode": [
    "meilleures marques de mode",
    "avis sur {domain}",
    "collection {domain}",
    "tendances {domain}",
    "magasins {domain}",
    "alternatives à {domain}"
  ],
  "automobile": [
    "meilleures voitures {sector}",
    "avis sur {domain}",
    "essai {domain}",
    "prix {domain}",
    "concessionnaires {domain}",
    "alternatives à {domain}"
  ],
  "bricolage": [
    "meilleurs outils de bricolage",
    "avis sur {domain}",
    "tutoriels {domain}",
    "magasins {domain}",
    "marques de bricolage",
    "alternatives à {domain}"
  ],
  "jardinage": [
    "meilleurs produits jardinage",
    "avis sur {domain}",
    "conseils jardinage",
    "plantes {domain}",
    "outils {domain}",
    "alternatives à {domain}"
  ],
  "cuisine": [
    "meilleurs ustensiles de cuisine",
    "recettes {domain}",
    "avis sur {domain}",
    "matériel de cuisine",
    "marques de cuisine",
    "alternatives à {domain}"
  ],
  "musique": [
    "meilleurs instruments de musique",
    "avis sur {domain}",
    "cours de musique {domain}",
    "artistes {domain}",
    "labels {domain}",
    "alternatives à {domain}"
  ],
  "cinéma": [
    "meilleurs films {sector}",
    "avis sur {domain}",
    "salles de cinéma {domain}",
    "actualités cinéma",
    "réalisateurs {domain}",
    "alternatives à {domain}"
  ],
  "livres": [
    "meilleurs livres {sector}",
    "avis sur {domain}",
    "librairies {domain}",
    "auteurs {domain}",
    "maisons d'édition",
    "alternatives à {domain}"
  ],
  "art": [
    "meilleurs artistes {sector}",
    "avis sur {domain}",
    "galeries {domain}",
    "expositions {domain}",
    "œuvres {domain}",
    "alternatives à {domain}"
  ],
  "photographie": [
    "meilleurs appareils photo",
    "avis sur {domain}",
    "tutos photo {domain}",
    "objectifs {domain}",
    "marques de photo",
    "alternatives à {domain}"
  ],
  "informatique": [
    "meilleurs logiciels {sector}",
    "avis sur {domain}",
    "tutoriels {domain}",
    "langages de programmation",
    "frameworks {domain}",
    "alternatives à {domain}"
  ],
  "marketing": [
    "meilleurs outils marketing",
    "avis sur {domain}",
    "stratégies {domain}",
    "agences {domain}",
    "formations {domain}",
    "alternatives à {domain}"
  ],
  "finance": [
    "meilleurs conseils financiers",
    "avis sur {domain}",
    "placements {domain}",
    "banques {domain}",
    "assurances {domain}",
    "alternatives à {domain}"
  ],
  "ressources humaines": [
    "meilleurs logiciels RH",
    "avis sur {domain}",
    "recrutement {domain}",
    "formations RH",
    "actualités RH",
    "alternatives à {domain}"
  ],
  "juridique": [
    "meilleurs cabinets d'avocats",
    "avis sur {domain}",
    "conseils juridiques",
    "actualités droit",
    "services {domain}",
    "alternatives à {domain}"
  ],
  "environnement": [
    "meilleures associations environnementales",
    "avis sur {domain}",
    "actions {domain}",
    "projets écologiques",
    "actualités environnement",
    "alternatives à {domain}"
  ],
  "éducation": [
    "meilleurs établissements scolaires",
    "avis sur {domain}",
    "méthodes pédagogiques {domain}",
    "formations {domain}",
    "ressources éducatives",
    "alternatives à {domain}"
  ]
};

// Requêtes génériques pour les secteurs non listés
const defaultQueries = [
  "meilleurs {sector}",
  "avis sur {domain}",
  "alternatives à {domain}",
  "comparaison {domain} concurrents",
  "actualités {domain}",
  "prix {domain}",
  "qualité {domain}"
];

/**
 * Nettoie une chaîne pour faciliter la correspondance (supprime accents, points, etc.)
 */
function normalizeSector(sector: string): string {
  return sector
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // enlève accents
    .replace(/[^\w\s]/g, ' ') // remplace ponctuation par espace
    .replace(/\s+/g, ' ')     // réduit espaces multiples
    .trim();
}

/**
 * Trouve la clé la plus proche dans le mapping (correspondance approximative)
 */
function findBestMatch(normalizedSector: string): string | undefined {
  // Correspondance exacte
  if (sectorQueryMap[normalizedSector]) return normalizedSector;

  // Cherche une clé contenant le mot-clé principal (premier mot significatif)
  const words = normalizedSector.split(/\s+/).filter(w => w.length > 3);
  for (const word of words) {
    for (const key of Object.keys(sectorQueryMap)) {
      if (key.includes(word)) {
        return key;
      }
    }
  }

  // Cherche une clé qui contient la chaîne entière (ex: "formation professionnelle" dans "formation")
  for (const key of Object.keys(sectorQueryMap)) {
    if (normalizedSector.includes(key) || key.includes(normalizedSector)) {
      return key;
    }
  }

  return undefined;
}

export function generateQueries(sector: string, domain: string): string[] {
  const normalized = normalizeSector(sector);
  const bestKey = findBestMatch(normalized);
  
  let queries: string[];
  if (bestKey) {
    queries = sectorQueryMap[bestKey];
  } else {
    queries = defaultQueries;
  }

  // Remplacer les variables {domain} et {sector}
  const processed = queries.map(q => q
    .replace(/{domain}/g, domain)
    .replace(/{sector}/g, sector) // on garde le secteur original pour le contexte
  );

  // Limiter à 3 requêtes maximum pour réduire le temps d'analyse
  return processed.slice(0, 3);
}