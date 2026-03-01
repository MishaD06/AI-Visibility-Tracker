// lib/analyzers/sector.ts
import { queryLLM } from '@/lib/llm/query'
import { SECTOR_PROMPT } from '@/lib/utils/prompts'

export async function getSector(domain: string): Promise<string> {
  try {
    const prompt = SECTOR_PROMPT(domain)
    const response = await queryLLM('gemini', prompt, 'gemma-3-27b-it')
    const sector = response.trim()
    console.log('✅ Secteur détecté :', sector)
    return sector
  } catch (error) {
    console.error('Erreur détection secteur:', error)
    return 'inconnu'
  }
}