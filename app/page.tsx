// app/page.tsx
import DomainForm from '@/components/DomainForm'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-4">
        AI Visibility Tracker
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Analysez la visibilité de votre marque sur Gemini et Mistral
      </p>
      <DomainForm />
    </main>
  )
}