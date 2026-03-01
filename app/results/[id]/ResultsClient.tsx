'use client'

import { useState, useEffect } from 'react'
import { cleanMarkdown } from '@/lib/utils/formatText'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function ResultsClient({ data }: { data: any }) {
  const availableProviders = Object.keys(data.rawResults || {}) as string[]
  const [activeTab, setActiveTab] = useState<string>(availableProviders[0] || '')
  const [history, setHistory] = useState<any[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)

  useEffect(() => {
    console.log('Données reçues dans ResultsClient :', data)
    // Récupérer l'historique des scores pour ce domaine
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/evolution/${encodeURIComponent(data.domain)}`)
        const historyData = await res.json()
        setHistory(historyData)
      } catch (error) {
        console.error('Erreur chargement historique:', error)
      } finally {
        setLoadingHistory(false)
      }
    }
    fetchHistory()
  }, [data.domain])

  if (!data || availableProviders.length === 0) return <div className="text-center py-20 text-gray-500">Chargement...</div>

  const providerDisplayName = (provider: string) => {
    if (provider === 'gemini') return 'Gemini'
    if (provider === 'mistral') return 'Mistral'
    return provider
  }

  // Formater les données pour le graphique
  const chartData = history.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
    score: item.visibilityScore,
  }))

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Résultats pour {data.domain}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>Secteur : {data.sector}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="text-blue-600 font-semibold">Score : {data.visibilityScore}/100</span>
        </div>
      </div>

      {/* Graphique d'évolution */}
      {!loadingHistory && history.length > 1 && (
        <div className="mb-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Évolution du score</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis domain={[0, 100]} stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Onglets dynamiques */}
      {availableProviders.length > 1 && (
        <div className="flex space-x-2 border-b border-gray-200 mb-6">
          {availableProviders.map((provider) => (
            <button
              key={provider}
              onClick={() => setActiveTab(provider)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === provider
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {providerDisplayName(provider)}
            </button>
          ))}
        </div>
      )}

      {/* Si un seul provider */}
      {availableProviders.length === 1 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600">
            Analyse avec {providerDisplayName(availableProviders[0])}
          </h2>
        </div>
      )}

      {/* Réponses */}
      <div className="space-y-6">
        {Object.entries(data.rawResults?.[activeTab] || {}).map(([query, response]) => (
          <div key={query} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Requête : {query}</h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {cleanMarkdown(response as string)}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Mentions : {(data.mentions?.[activeTab]?.[query] || []).length}
            </div>
          </div>
        ))}
      </div>

      {/* Concurrents */}
      {data.competitors && data.competitors.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Concurrents détectés</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.competitors.map((comp: any, idx: number) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <div className="font-semibold text-blue-600">{comp.name}</div>
                {comp.website && <div className="text-sm text-gray-500 mt-1">{comp.website}</div>}
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{cleanMarkdown(comp.context)}</p>
                <div className="text-xs text-gray-400 mt-3">Fréquence : {comp.frequency}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-12">Aucun concurrent détecté.</p>
      )}

      {/* Recommandations */}
      {data.recommendations && data.recommendations.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recommandations</h2>
          <div className="space-y-4">
            {data.recommendations.map((rec: any, idx: number) => (
              <div key={idx} className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{rec.title}</h3>
                <p className="text-gray-700 mb-4">{cleanMarkdown(rec.description)}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Priorité : {rec.priority}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">Effort : {rec.effort}</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">Impact : {rec.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-12">Aucune recommandation générée pour le moment.</p>
      )}
    </div>
  )
}