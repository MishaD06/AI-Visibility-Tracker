// lib/llm/types.ts
export type LLMProvider = 'gemini' | 'mistral'

export interface Mention {
  name: string
  website?: string
  context: string
  position: 'debut' | 'milieu' | 'fin'
}

export interface Competitor {
  name: string
  website: string
  context: string
  frequency: number
}