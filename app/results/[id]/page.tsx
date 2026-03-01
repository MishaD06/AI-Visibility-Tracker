import { prisma } from '@/lib/db/client'
import { notFound } from 'next/navigation'
import ResultsClient from './ResultsClient'

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const search = await prisma.search.findUnique({
    where: { id },
  })

  if (!search) {
    notFound()
  }

  const data = {
    id: search.id,
    domain: search.domain,
    sector: search.sector,
    createdAt: search.createdAt.toISOString(),
    rawResults: search.rawResults as any,
    mentions: search.mentions as any,
    competitors: search.competitors as any,
    recommendations: search.recommendations as any,
    visibilityScore: search.visibilityScore,
  }

  return <ResultsClient data={data} />
}