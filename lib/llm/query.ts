// lib/llm/query.ts
import { LLMProvider } from './types'
import { geminiClient, mistralClient } from './client'
import { withTimeout } from '@/lib/utils/timeout'

export async function queryLLM(
  provider: LLMProvider,
  query: string,
  model?: string
): Promise<string> {
  try {
    switch (provider) {
      case 'gemini':
        return await callGemini(query, model)
      case 'mistral':
        return await callMistral(query)
      default:
        const _exhaustiveCheck: never = provider
        throw new Error(`Provider ${provider} non supporté`)
    }
  } catch (error) {
    console.error(`❌ Erreur lors de l'appel à ${provider}:`, error)
    return `[Erreur ${provider}] ${error instanceof Error ? error.message : 'Erreur inconnue'}`
  }
}

async function callGemini(query: string, modelName?: string): Promise<string> {
  try {
    const model = geminiClient.getGenerativeModel({
      model: modelName || 'gemma-3-27b-it',
    })
    const result = await withTimeout(model.generateContent(query), 50000)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Erreur Gemini:', error)
    throw error
  }
}

async function callMistral(query: string): Promise<string> {
  try {
    const systemPrompt = `Tu es un assistant spécialisé dans l'analyse d'entreprises, d'écoles et d'organisations. 
Quand on te demande un avis sur un site web (ex: "avis sur example.com"), tu dois donner un avis sur l'organisation derrière ce site (sa réputation, ses formations, ses services), et non sur le design ou la technique du site. 
Si la question concerne un prix, une alternative ou une comparaison, réponds de manière factuelle et précise.`

    const chatResponse = await withTimeout(
      mistralClient.chat.complete({
        model: 'mistral-small-latest', // ou 'mistral-large-latest'
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
      }),
      50000
    )
    return chatResponse.choices[0]?.message?.content ?? ''
  } catch (error) {
    console.error('Erreur Mistral:', error)
    throw error
  }
}