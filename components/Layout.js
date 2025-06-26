import Head from 'next/head'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function Layout({ children, title = 'S.T.I.L - Stil waar stilte God se stem word' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="STIL meditation app - Find peace and stillness with God" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">S.T.I.L</h1>
                <p className="text-sm text-gray-600">Stil waar stilte God se stem word</p>
              </div>
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </>
  )
}
