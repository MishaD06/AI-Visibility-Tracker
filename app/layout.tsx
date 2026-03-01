import Link from 'next/link'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="font-bold">AI Visibility Tracker</Link>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">Accueil</Link>
              <Link href="/history" className="hover:underline">Historique</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}