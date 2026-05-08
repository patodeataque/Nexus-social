"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-md z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tighter text-white">NEXUS<span className="text-blue-500">.</span>SOCIAL</h1>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm text-gray-400 hidden sm:inline">Olá, {session.user?.name}</span>
              {session.user?.image && (
                <Image 
                  src={session.user.image} 
                  alt="Perfil" 
                  width={32} 
                  height={32} 
                  className="rounded-full border border-blue-500"
                />
              )}
              <button 
                onClick={() => signOut()}
                className="text-xs bg-white/5 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-md transition-all border border-red-500/30"
              >
                Sair
              </button>
            </>
          ) : (
            <button 
              onClick={() => signIn("google")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all"
            >
              Entrar com Google
            </button>
          )}
        </div>
      </div>
    </header>
  )
}