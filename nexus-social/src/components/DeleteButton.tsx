"use client"

import { deletePost } from "@/app/actions"

export function DeleteButton({ postId }: { postId: string }) {
  async function handleDelete() {
    if (confirm("Deseja mesmo excluir esta postagem?")) {
      try {
        await deletePost(postId)
      } catch (error) {
        alert("Erro ao deletar post.")
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    </button>
  )
}