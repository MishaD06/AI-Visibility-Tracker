// lib/analyzers/score.ts

export function calculateVisibilityScore(mentionsByProvider: any, targetDomain: string): number {
  console.log('📊 [SCORE] Calcul du score pour la cible:', targetDomain);
  console.log('📊 [SCORE] Structure des mentions reçues:', JSON.stringify(mentionsByProvider, null, 2).substring(0, 500) + '...');

  // Normaliser le nom de la cible : enlever l'extension, minuscules, et créer des variantes
  const targetName = targetDomain.replace(/\.(fr|com|org|net|edu|etc|io|co)$/i, '').toLowerCase();
  const targetVariants = [
    targetName,
    targetName.replace(/-/g, ' '),
    targetName.replace(/[^a-z]/g, ''),
  ];
  console.log('📊 [SCORE] Variantes de la cible:', targetVariants);

  let totalMentions = 0;
  let weightedScore = 0;

  for (const provider in mentionsByProvider) {
    for (const query in mentionsByProvider[provider]) {
      const mentions = mentionsByProvider[provider][query];
      if (!Array.isArray(mentions)) continue;

      for (const mention of mentions) {
        // Nettoyer le nom de la mention
        let mentionName = mention.name?.toLowerCase().trim() || '';
        // Enlever les parenthèses et leur contenu pour mieux matcher
        mentionName = mentionName.replace(/\([^)]*\)/g, '').trim();
        const mentionWebsite = mention.website?.toLowerCase().trim() || '';

        // Vérifier si la mention correspond à l'une des variantes
        let isTarget = false;
        for (const variant of targetVariants) {
          if (mentionName.includes(variant) || variant.includes(mentionName)) {
            isTarget = true;
            break;
          }
        }
        if (!isTarget) {
          // Vérifier aussi le site web
          isTarget = mentionWebsite.includes(targetDomain) || mentionWebsite.includes(targetName);
        }

        if (isTarget) {
          totalMentions++;
          if (mention.position === 'debut') weightedScore += 3;
          else if (mention.position === 'milieu') weightedScore += 2;
          else weightedScore += 1;
          console.log(`🎯 [SCORE] Mention cible trouvée : "${mention.name}" (position: ${mention.position}) -> points: ${mention.position === 'debut' ? 3 : mention.position === 'milieu' ? 2 : 1}`);
        }
      }
    }
  }

  if (totalMentions === 0) {
    console.log('📊 [SCORE] Aucune mention de la cible trouvée, score = 0');
    return 0;
  }

  const rawScore = (weightedScore / (totalMentions * 3)) * 100;
  const finalScore = Math.min(100, Math.round(rawScore));
  console.log(`📊 [SCORE] Score calculé : ${finalScore} (${weightedScore} points pondérés pour ${totalMentions} mentions)`);
  return finalScore;
}