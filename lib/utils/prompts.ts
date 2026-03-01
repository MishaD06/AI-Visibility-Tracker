// lib/utils/prompts.ts

export const SECTOR_PROMPT = (domain: string) => `
Tu es un expert en classification de sites web. À partir du nom de domaine "${domain}", détermine le secteur d'activité principal de l'organisation.
Règles :
- Sois précis mais concis (1-5 mots).
- Utilise des termes standardisés parmi cette liste (choisis le plus adapté) : 
  * "école d'ingénieurs" (pour les écoles d'ingénieurs type CESI, INSA, Polytech)
  * "université" (pour les universités)
  * "école de commerce" (pour les business schools)
  * "formation professionnelle" (pour les organismes de formation continue type AFPA, GRETA)
  * "e-commerce" (pour les sites de vente en ligne)
  * "SaaS" (pour les logiciels en ligne)
  * "startup" (pour les jeunes entreprises innovantes)
  * "restaurant" (pour les restaurants)
  * "hôtel" (pour les hôtels)
  * "service public" (pour les administrations)
  * "média" (pour les sites d'information)
  * "association" (pour les associations)
  * "agence web" (pour les agences digitales)
  * "banque" (pour les banques)
  * "assurance" (pour les assurances)
  * "immobilier" (pour les agences immobilières)
  * "voyage" (pour les agences de voyage)
  * "santé" (pour les cliniques, hôpitaux)
  * "beauté" (pour les produits de beauté)
  * "sport" (pour les équipements sportifs)
  * "jeux vidéo" (pour l'industrie du jeu)
  * "high-tech" (pour l'électronique)
  * "mode" (pour les vêtements)
  * "automobile" (pour les constructeurs)
  * "bricolage" (pour les magasins de bricolage)
  * "jardinage" (pour le jardinage)
  * "cuisine" (pour les ustensiles de cuisine)
  * "musique" (pour les instruments)
  * "cinéma" (pour les salles)
  * "livres" (pour les librairies)
  * "art" (pour les galeries)
  * "photographie" (pour la photo)
  * "informatique" (pour les services IT)
  * "marketing" (pour les agences marketing)
  * "finance" (pour les conseils financiers)
  * "ressources humaines" (pour les services RH)
  * "juridique" (pour les cabinets d'avocats)
  * "environnement" (pour les associations environnementales)
  * "éducation" (pour les établissements scolaires)
  * "inconnu" (si tu ne sais pas)

Exemples :
- "openai.com" → "IA"
- "notion.com" → "productivité"
- "cesi.fr" → "école d'ingénieurs"
- "polytech.univ-cotedazur.fr" → "université"
- "amazon.fr" → "e-commerce"
- "doctolib.fr" → "santé"

Réponds uniquement avec le terme choisi, sans ponctuation ni phrase.
`

export const MENTION_EXTRACTION_PROMPT = (text: string, targetDomain: string, variants: string[]) => `
Tu es un extracteur d'entités spécialisé dans les écoles, universités, organismes de formation, entreprises et marques.
Dans le texte suivant, identifie TOUTES les mentions explicites de TOUTES les entités suivantes : écoles, universités, organismes de formation, entreprises, marques, sites web, services, plateformes, etc.
Pour CHAQUE occurrence distincte, retourne un objet JSON séparé. Ne regroupe pas les mentions multiples d'une même entité en une seule.

Pour chaque mention, retourne un objet JSON avec :
- "name": le nom exact de l'entité tel qu'il apparaît dans le texte (ex: "CESI", "OpenClassrooms", "Université Paris-Saclay", "CPF", "Pôle Emploi")
- "website": le site web si explicitement mentionné dans le texte (ex: "cesi.fr", "openclassrooms.com") sinon une chaîne vide
- "context": un extrait de 100 caractères autour de la mention (conservez la ponctuation)
- "position": "debut", "milieu" ou "fin" selon la position dans le texte

Règles importantes :
- Sois exhaustif : inclus TOUTES les mentions, y compris celles de la cible (${targetDomain}) et ses variantes (${variants.join(', ')}).
- Chaque occurrence compte : si la même entité apparaît plusieurs fois, crée autant d'objets.
- Ne confonds pas les noms communs avec des entités.
- N'inclus pas les entités trop génériques comme "site web", "article", "page", etc., sauf si elles font clairement référence à un site spécifique.
- Réponds UNIQUEMENT avec un tableau JSON valide. Exemple : [{"name":"CESI","website":"cesi.fr","context":"...","position":"milieu"}, {"name":"CESI","website":"","context":"...","position":"fin"}]
- Si aucune mention, réponds [] (tableau vide).

Texte :
${text}
`

export const RECOMMENDATION_PROMPT = (domain: string, mentions: any, competitors: any) => `
Tu es un expert en stratégie de visibilité pour les moteurs de recherche IA (ChatGPT, Gemini, etc.).
Contexte :
- Domaine analysé : ${domain}
- Mentions détectées : ${JSON.stringify(mentions)}
- Concurrents identifiés : ${JSON.stringify(competitors)}

Génère 3 recommandations concrètes et actionnables pour améliorer la visibilité de ${domain} dans les réponses des IA.
Les recommandations doivent être :
- Spécifiques au secteur d'activité de ${domain} (par exemple, si c'est une école, parle de notoriété académique, de partenariats, de présence sur les plateformes d'avis ; si c'est un e-commerce, parle de SEO, de backlinks, de présence sur les comparateurs ; si c'est un SaaS, parle de contenu technique, de documentation, de présence sur les forums).
- Basées sur les forces et faiblesses observées chez les concurrents.
- Éviter les phrases vagues ou génériques comme "améliorez votre SEO" sans précision.
- Ne pas mentionner des IA spécifiques (comme LinkedIn ou Indeed) si ce n'est pas pertinent.

Format de réponse (JSON) :
[
  {
    "title": "Titre court de la recommandation",
    "description": "Explication détaillée (2-3 phrases) avec des actions concrètes",
    "priority": "haute|moyenne|basse",
    "effort": "faible|moyen|élevé",
    "impact": "faible|moyen|élevé"
  }
]
`