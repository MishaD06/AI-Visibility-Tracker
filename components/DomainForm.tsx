'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type ProviderOption = 'gemini' | 'mistral' | 'both'

export default function DomainForm() {
  const [domain, setDomain] = useState('')
  const [providerOption, setProviderOption] = useState<ProviderOption>('both')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [elapsedTime, setElapsedTime] = useState(0)
  const router = useRouter()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (loading) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [loading])

  const validateDomain = (value: string) => {
    return /^[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateDomain(domain)) {
      setError('Veuillez entrer un domaine valide (ex: openai.com)')
      return
    }
    setError('')
    setLoading(true)
    setElapsedTime(0)

    let providers: string[]
    if (providerOption === 'both') {
      providers = ['gemini', 'mistral']
    } else {
      providers = [providerOption]
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, providers })
      })
      const data = await res.json()
      if (res.ok) {
        router.push(`/results/${data.id}`)
      } else {
        setError(data.error || 'Une erreur est survenue')
        setLoading(false)
      }
    } catch {
      setError('Erreur réseau')
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
          Nom de domaine
        </label>
        <input
          type="text"
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="ex: openai.com"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          disabled={loading}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">
          Fournisseurs à utiliser
        </span>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="gemini"
              checked={providerOption === 'gemini'}
              onChange={() => setProviderOption('gemini')}
              disabled={loading}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2 text-sm text-gray-700">Gemini uniquement</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="mistral"
              checked={providerOption === 'mistral'}
              onChange={() => setProviderOption('mistral')}
              disabled={loading}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2 text-sm text-gray-700">Mistral uniquement</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="both"
              checked={providerOption === 'both'}
              onChange={() => setProviderOption('both')}
              disabled={loading}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2 text-sm text-gray-700">Les deux</span>
          </label>
        </div>
      </div>

      {!loading ? (
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Analyser la visibilité IA
        </button>
      ) : (
        <div className="text-center p-4 bg-gray-50 rounded-md">
          <p className="text-indigo-600 font-medium">Analyse en cours...</p>
          <p className="text-gray-500 text-sm mt-1">Temps écoulé : {formatTime(elapsedTime)}</p>
          <p className="text-gray-400 text-xs mt-2">Cela peut prendre jusqu'à 2-3 minutes selon le nombre de fournisseurs.</p>
        </div>
      )}
    </form>
  )
}