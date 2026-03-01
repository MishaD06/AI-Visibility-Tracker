// app/history/page.tsx
import { prisma } from '@/lib/db/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  const searches = await prisma.search.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Historique des analyses</h1>
      {searches.length === 0 ? (
        <p className="text-neutral-500">Aucune analyse pour le moment.</p>
      ) : (
        <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden">
          {searches.map((search) => (
            <Link
              key={search.id}
              href={`/results/${search.id}`}
              className="block border-b border-neutral-800 last:border-0 hover:bg-neutral-800/50 transition-colors"
            >
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{search.domain}</h2>
                  <p className="text-sm text-neutral-400">{search.sector || 'Secteur inconnu'}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-neutral-400">
                      {new Date(search.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    {search.visibilityScore !== null && (
                      <div className="text-emerald-400 font-semibold">Score: {search.visibilityScore}</div>
                    )}
                  </div>
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}