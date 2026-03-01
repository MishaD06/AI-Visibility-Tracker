// lib/utils/formatText.ts
export function cleanMarkdown(text: string): string {
  if (!text) return '';
  return text
    // Supprimer les titres markdown (###, ##, etc.)
    .replace(/^#+\s*/gm, '')
    // Supprimer le gras **texte**
    .replace(/\*\*(.*?)\*\*/g, '$1')
    // Supprimer l'italique *texte*
    .replace(/\*(.*?)\*/g, '$1')
    // Supprimer les backticks `code`
    .replace(/`(.*?)`/g, '$1')
    // Remplacer les listes à puces par des points
    .replace(/^[\*\-\+]\s+/gm, '• ')
    // Supprimer les liens markdown [texte](url) → garder seulement le texte
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Réduire les multiples sauts de ligne
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}