// lib/analyzers/competitors.ts
import { Mention, Competitor } from '@/lib/llm/types'

// Mots génériques à ignorer
const genericTerms = [
  'formation', 'école', 'université', 'cours', 'diplôme', 'site', 'page',
  'accueil', 'contact', 'mentions légales', 'cf', 'voir', 'plus', 'information',
  'cpf', 'mon compte formation', 'financement', 'pôle emploi', 'pole emploi',
  'opco', 'qualité', 'certification', 'qualiopi', 'tutoriel', 'guide',
  'outils', 'logiciels', 'méthode', 'conseils', 'astuces', 'formation continue',
  'formation professionnelle', 'formation en ligne', 'mooc', 'spoc', 'classe virtuelle',
  'ccna', 'agile', 'scrum', 'psm', 'csm', 'it service', 'management', 'projet',
  'certifications', 'competences', 'apprentissage', 'alternance', 'stage', 'emploi',
  'recrutement', 'carriere', 'metier', 'profession', 'secteur', 'domaine',
  'avantages', 'inconvenients', 'points forts', 'points faibles', 'avis', 'retour',
  'temoignage', 'experience', 'etudiant', 'alumni', 'diplome', 'formation diplômante',
  'formation qualifiante', 'certificat', 'badge', 'open badge', 'competence',
  'savoir faire', 'savoir etre', 'hard skills', 'soft skills', 'leadership',
  'gestion de projet', 'project management', 'informatique', 'developpement',
  'programmation', 'langage', 'framework', 'bibliotheque', 'api', 'cloud',
  'cybersecurite', 'reseaux', 'systemes', 'base de donnees', 'data science',
  'intelligence artificielle', 'machine learning', 'deep learning', 'big data',
  'marketing digital', 'seo', 'sea', 'social media', 'community management',
  'communication', 'publicite', 'branding', 'strategie', 'innovation',
  'entrepreneuriat', 'startup', 'business', 'commerce', 'vente', 'achat',
  'e commerce', 'marketplace', 'plateforme', 'application', 'mobile', 'web',
  'design', 'ux', 'ui', 'graphisme', 'illustration', 'video', 'photo',
  'musique', 'art', 'culture', 'sport', 'sante', 'bien etre', 'nutrition',
  'fitness', 'coaching', 'developpement personnel', 'productivite', 'organisation',
  'gestion du temps', 'priorisation', 'objectifs', 'motivation', 'confiance',
  'estime de soi', 'intelligence emotionnelle', 'empathie', 'collaboration',
  'travail d equipe', 'esprit d equipe', 'cohesion', 'synergie', 'partenariat',
  'reseau', 'relations', 'clients', 'fournisseurs', 'prestataires', 'sous traitants',
  'concurrents', 'concurrence', 'marché', 'secteur d activite', 'industrie',
  'filiere', 'branche', 'profession', 'corporation', 'ordre', 'syndicat',
  'association', 'federation', 'confederation', 'union', 'groupe', 'holding',
  'multinationale', 'pme', 'tpe', 'eti', 'grande entreprise', 'administration',
  'collectivite', 'etat', 'ministere', 'organisme public', 'service public',
  'hopital', 'clinique', 'cabinet', 'etablissement de sante', 'medecin',
  'specialiste', 'pharmacie', 'laboratoire', 'recherche', 'developpement',
  'innovation', 'technologie', 'high tech', 'electronique', 'robotique',
  'automatisation', 'ia', 'vr', 'ar', 'metaverse', 'blockchain', 'crypto',
  'nft', 'web3', 'metavers', 'realite virtuelle', 'realite augmentee',
  'jeux video', 'gaming', 'esport', 'streaming', 'contenu', 'creation',
  'influenceur', 'youtubeur', 'tiktokeur', 'instagrameur', 'snapchateur',
  'twitteur', 'linkedin', 'facebook', 'twitter', 'instagram', 'tiktok',
  'snapchat', 'youtube', 'twitch', 'discord', 'telegram', 'whatsapp',
  'signal', 'messenger', 'wechat', 'line', 'kakao', 'viber', 'skype',
  'zoom', 'teams', 'meet', 'webex', 'gotomeeting', 'livestorm',
  'webinaire', 'classe virtuelle', 'e learning', 'formation a distance',
  'formation en ligne', 'formation hybride', 'blended learning',
  'formation presentielle', 'intra entreprise', 'inter entreprise',
  'sur mesure', 'personnalisee', 'adaptee', 'certifiante', 'diplômante',
  'qualifiante', 'professionnalisante', 'continue', 'initiale', 'adulte',
  'jeune', 'senior', 'demandeur d emploi', 'salarie', 'independant',
  'freelance', 'auto entrepreneur', 'micro entrepreneur', 'travailleur independant',
  'profession liberale', 'artisan', 'commercant', 'agriculteur', 'exploitant',
  'chef d entreprise', 'dirigeant', 'manager', 'cadre', 'employe',
  'ouvrier', 'technicien', 'agent de maitrise', 'apprenti', 'alternant',
  'stagiaire', 'volontaire', 'benevole', 'militant', 'engage',
  'acteur', 'partie prenante', 'intervenant', 'formateur', 'enseignant',
  'professeur', 'maitre de conference', 'chercheur', 'etudiant chercheur',
  'doctorant', 'post doc', 'ingenieur', 'technicien', 'conseiller',
  'consultant', 'expert', 'specialiste', 'generaliste', 'polyvalent',
  'competent', 'qualifie', 'expérimenté', 'debutant', 'junior', 'senior',
  'expert', 'gourou', 'evangeliste', 'ambassadeur', 'influenceur'
]

function normalizeName(name: string): string {
  return name.toLowerCase().trim().replace(/[^\w\s]/g, '')
}

function isGeneric(name: string): boolean {
  const normalized = normalizeName(name)
  return genericTerms.some(term => normalized.includes(term))
}

function areSimilar(name1: string, name2: string): boolean {
  const n1 = normalizeName(name1)
  const n2 = normalizeName(name2)
  return n1.includes(n2) || n2.includes(n1) || levenshteinDistance(n1, n2) < 3
}

function levenshteinDistance(a: string, b: string): number {
  const matrix = []
  for (let i = 0; i <= b.length; i++) matrix[i] = [i]
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i-1) === a.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i-1][j-1] + 1,
          matrix[i][j-1] + 1,
          matrix[i-1][j] + 1
        )
      }
    }
  }
  return matrix[b.length][a.length]
}

export function identifyCompetitors(mentionsByProvider: any, targetDomain: string): Competitor[] {
  const competitorMap = new Map<string, { count: number; contexts: string[]; website?: string }>()

  const targetName = targetDomain.replace(/\.(fr|com|org|net|edu|etc)$/i, '').toLowerCase()

  for (const provider in mentionsByProvider) {
    for (const query in mentionsByProvider[provider]) {
      const mentions: Mention[] = mentionsByProvider[provider][query]
      for (const mention of mentions) {
        const name = mention.name
        const normalized = normalizeName(name)

        // Ignorer la cible
        if (normalized.includes(targetName) || targetName.includes(normalized)) {
          continue
        }

        // Ignorer les termes génériques
        if (isGeneric(name)) {
          continue
        }

        // Regrouper les variantes similaires
        let foundKey: string | null = null
        for (const key of competitorMap.keys()) {
          if (areSimilar(key, name)) {
            foundKey = key
            break
          }
        }

        const key = foundKey || name
        if (!competitorMap.has(key)) {
          competitorMap.set(key, { count: 0, contexts: [], website: mention.website })
        }
        const entry = competitorMap.get(key)!
        entry.count += 1
        entry.contexts.push(mention.context)
      }
    }
  }

  const competitors: Competitor[] = Array.from(competitorMap.entries())
    .map(([name, data]) => ({
      name,
      website: data.website || '',
      context: data.contexts.join(' | ').substring(0, 300),
      frequency: data.count,
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 15)

  return competitors
}