// lib/analyzers/recommendations.ts
import { queryLLM } from '@/lib/llm/query'
import { RECOMMENDATION_PROMPT } from '@/lib/utils/prompts'

export async function generateRecommendations(
  domain: string,
  mentions: any,
  competitors: any
): Promise<any[]> {
  const prompt = RECOMMENDATION_PROMPT(domain, mentions, competitors)
  try {
    const response = await queryLLM('gemini', prompt, 'gemma-3-4b-it')
    const jsonMatch = response.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      const recommendations = JSON.parse(jsonMatch[0])
      return Array.isArray(recommendations) ? recommendations : []
    }
    return []
  } catch (error) {
    console.error('❌ Erreur génération recommandations:', error)
    return []
  }
}