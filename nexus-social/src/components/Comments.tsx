"use client"

import { useState } from "react"
import { createComment } from "@/app/actions"
import Image from "next/image"

export function Comments({ postId, comments }: { postId: string, comments: any[] }) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await createComment(postId, content)
      setContent("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 items-start bg-white/[0.02] border border-white/5 p-3 rounded-xl">
            {comment.author.image && (
              <Image src={comment.author.image} alt="" width={24} height={24} className="rounded-full mt-0.5" />
            )}
            <div className="flex-1">
              <p className="text-[11px] font-bold text-blue-400/80 uppercase tracking-tight">{comment.author.name}</p>
              <p className="text-sm text-gray-300 leading-snug">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva um comentário..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
        />
        <button 
          disabled={isSubmitting}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
        >
          {isSubmitting ? "..." : "Responder"}
        </button>
      </form>
    </div>
  )
}