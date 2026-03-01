import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { getSector } from '@/lib/analyzers/sector'
import { generateQueries } from '@/lib/analyzers/queries'
import { queryLLM } from '@/lib/llm/query'
import { extractMentionsFromText } from '@/lib/analyzers/mentions'
import { identifyCompetitors } from '@/lib/analyzers/competitors'
import { generateRecommendations } from '@/lib/analyzers/recommendations'
import { calculateVisibilityScore } from '@/lib/analyzers/score'

export async function POST(request: Request) {
  console.log('🚀 [API] /api/analyze appelée')
  try {
    const { domain, providers: requestedProviders } = await request.json()
    console.log('📥 [API] Domaine reçu:', domain)
    console.log('📥 [API] Providers demandés:', requestedProviders)

    // Validation du domaine
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!domainRegex.test(domain)) {
      console.warn('⚠️ [API] Domaine invalide:', domain)
      return NextResponse.json({ error: 'Domaine invalide' }, { status: 400 })
    }

    // Déterminer les providers à utiliser
    let providers: string[] = requestedProviders
    if (!providers || !Array.isArray(providers) || providers.length === 0) {
      providers = ['gemini', 'mistral'] // par défaut les deux
    } else {
      providers = providers.filter(p => p === 'gemini' || p === 'mistral')
      if (providers.length === 0) providers = ['gemini', 'mistral']
    }
    console.log('✅ [API] Providers retenus:', providers)

    // 1. Déterminer le secteur
    console.log('🔍 [API] Détermination du secteur...')
    const sector = await getSector(domain)
    console.log('✅ [API] Secteur:', sector)

    // 2. Générer les requêtes
    const queries = generateQueries(sector, domain)
    console.log('📋 [API] Requêtes générées:', queries)

    const rawResults: any = {}
    const mentions: any = {}

    // 3. Appels LLM
    for (const provider of providers) {
      console.log(`🤖 [API] Appel à ${provider}...`)
      rawResults[provider] = {}
      mentions[provider] = {}
      
      for (const query of queries) {
        console.log(`   📝 Requête "${query}" vers ${provider}`)
        const start = Date.now()
        
        const response = await queryLLM(provider as 'gemini' | 'mistral', query)
        const duration = Date.now() - start
        console.log(`   ✅ Réponse reçue de ${provider} en ${duration}ms`)
        
        rawResults[provider][query] = response
        
        // Extraction des mentions
        console.log(`   🔎 Extraction des mentions pour ${provider}...`)
        const extracted = await extractMentionsFromText(response, domain)
        mentions[provider][query] = extracted
        console.log(`   ✅ Mentions extraites:`, extracted)
      }
    }

    // 4. Concurrents
    console.log('🏆 [API] Identification des concurrents...')
    const competitors = identifyCompetitors(mentions, domain)
    console.log('✅ Concurrents:', competitors)

    // 5. Recommandations
    console.log('💡 [API] Génération des recommandations...')
    const recommendations = await generateRecommendations(domain, mentions, competitors)
    console.log('✅ Recommandations:', recommendations)

    // 6. Score
    const visibilityScore = calculateVisibilityScore(mentions, domain)
    console.log('📊 [API] Score de visibilité:', visibilityScore)

    // 7. Sauvegarde
    console.log('💾 [API] Sauvegarde en base...')
    const search = await prisma.search.create({
      data: {
        domain,
        sector,
        rawResults,
        mentions,
        competitors,
        recommendations,
        visibilityScore,
      },
    })
    console.log('✅ [API] Analyse terminée, ID:', search.id)

    return NextResponse.json({ id: search.id })
  } catch (error) {
    console.error('🔥 [API] Erreur non rattrapée:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}