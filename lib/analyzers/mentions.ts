// lib/analyzers/mentions.ts
import { queryLLM } from '@/lib/llm/query'
import { Mention } from '@/lib/llm/types'

function generateNameVariants(domain: string): string[] {
  const clean = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const withoutExt = clean.replace(/\.(fr|com|org|net|edu|etc|io|co)$/i, '')
  const parts = withoutExt.split('.')
  const main = parts[parts.length - 1]
  const variants = [
    clean,
    withoutExt,
    main,
    main.replace(/-/g, ' '),
    withoutExt.replace(/-/g, ' '),
    withoutExt.replace(/\./g, ' ')
  ]
  return [...new Set(variants.filter(v => v.length > 2))]
}

export async function extractMentionsFromText(
  text: string,
  targetDomain: string
): Promise<Mention[]> {
  const variants = generateNameVariants(targetDomain)
  console.log('Variantes pour recherche:', variants)

  try {
    const prompt = `
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
    `.trim()

    // Utilisation du modèle principal avec timeout long
    const response = await queryLLM('gemini', prompt, 'gemma-3-27b-it')
    const jsonMatch = response.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      const mentions = JSON.parse(jsonMatch[0])
      if (Array.isArray(mentions)) {
        console.log('Mentions extraites par LLM:', mentions)
        return mentions
      }
    }
  } catch (error) {
    console.error('Erreur extraction LLM, fallback regex:', error)
  }

  // Fallback : recherche textuelle des variantes
  const lowerText = text.toLowerCase()
  const found: Mention[] = []

  for (const variant of variants) {
    const lowerVariant = variant.toLowerCase()
    let pos = lowerText.indexOf(lowerVariant)
    while (pos !== -1) {
      const position = pos < lowerText.length / 3 ? 'debut' : pos < 2 * lowerText.length / 3 ? 'milieu' : 'fin'
      const start = Math.max(0, pos - 50)
      const end = Math.min(text.length, pos + lowerVariant.length + 50)
      const context = text.substring(start, end).replace(/\n/g, ' ')

      found.push({
        name: text.substring(pos, pos + lowerVariant.length),
        website: targetDomain,
        context,
        position,
      })
      pos = lowerText.indexOf(lowerVariant, pos + 1)
    }
  }

  if (found.length > 0) {
    console.log('Mentions trouvées par fallback:', found)
    return found
  }

  return []
}