"use client"

import { useState } from "react"
import { toggleLike } from "@/app/actions"

interface LikeProps {
  postId: string
  initialLikes: number
  isLiked: boolean
}

export function LikeButton({ postId, initialLikes, isLiked }: LikeProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(isLiked)

  async function handleLike() {
    // Feedback visual imediato (Optimistic Update)
    const newLikedState = !liked
    setLiked(newLikedState)
    setLikes(prev => newLikedState ? prev + 1 : prev - 1)

    try {
      await toggleLike(postId)
    } catch (error) {
      // Reverte se der erro no servidor
      setLiked(liked)
      setLikes(initialLikes)
    }
  }

  return (
    <button 
      onClick={handleLike}
      className={`flex items-center gap-1.5 transition-all active:scale-125 ${liked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-400'}`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={liked ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="2.5" 
        className="w-5 h-5"
      >
        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
      <span className="text-xs font-bold font-mono">{likes}</span>
    </button>
  )
}