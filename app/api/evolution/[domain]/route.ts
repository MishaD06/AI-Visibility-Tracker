// app/api/evolution/[domain]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ domain: string }> }
) {
  try {
    const { domain } = await params
    const decodedDomain = decodeURIComponent(domain)

    const searches = await prisma.search.findMany({
      where: { domain: decodedDomain },
      orderBy: { createdAt: 'asc' },
      take: 10, // les 10 dernières analyses
      select: {
        id: true,
        createdAt: true,
        visibilityScore: true,
      },
    })

    return NextResponse.json(searches)
  } catch (error) {
    console.error('Erreur récupération historique:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}