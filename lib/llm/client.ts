// lib/llm/client.ts
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Mistral } from '@mistralai/mistralai'

export const geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
export const mistralClient = new Mistral({ 
  apiKey: process.env.MISTRAL_API_KEY! 
})