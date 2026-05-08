"use client"

import { useState } from "react"
import { createPost } from "@/app/actions"

export function CreatePost() {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  async function handlePost() {
    if (!content.trim() || loading) return

    setLoading(true)
    try {
      await createPost(content)
      setContent("") 
    } catch (error) {
      alert("Houve um erro ao postar. Verifique o terminal do servidor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm shadow-2xl">
      <h2 className="text-xl font-bold mb-4 tracking-tight text-white/90">O que está acontecendo?</h2>
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-transparent border-none focus:ring-0 text-lg resize-none placeholder:text-gray-600 text-white"
        placeholder="Compartilhe algo com o Nexus..."
        rows={3}
      />
      <div className="flex justify-end mt-4 border-t border-white/5 pt-4">
        <button 
          onClick={handlePost}
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-full font-bold transition-all active:scale-95 flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? "Postando..." : "Postar"}
        </button>
      </div>
    </section>
  )
}