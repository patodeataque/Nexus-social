import { prisma } from "@/lib/prisma"
import { CreatePost } from "@/components/CreatePost"
import { LikeButton } from "@/components/LikeButton"
import { DeleteButton } from "@/components/DeleteButton"
import { Comments } from "@/components/Comments"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Image from "next/image"

export default async function Home() {
  const session = await getServerSession(authOptions);

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { 
      author: true,
      likes: true,
      comments: {
        include: { author: true },
        orderBy: { createdAt: "asc" }
      }
    }
  })

  const currentUser = session?.user?.email 
    ? await prisma.user.findUnique({ where: { email: session.user.email } })
    : null;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20 px-4">
      <CreatePost />

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3 items-center">
                {post.author.image && (
                  <Image src={post.author.image} alt="" width={42} height={42} className="rounded-full border border-white/10 shadow-lg" />
                )}
                <div>
                  <p className="font-bold text-sm text-white">{post.author.name}</p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              {currentUser?.id === post.authorId && (
                <DeleteButton postId={post.id} />
              )}
            </div>
            
            <p className="text-gray-200 text-base leading-relaxed mb-6 px-1">{post.content}</p>
            
            <div className="flex items-center gap-6 pb-4 border-b border-white/5">
              <LikeButton 
                postId={post.id} 
                initialLikes={post.likes.length}
                isLiked={post.likes.some(like => like.userId === currentUser?.id)}
              />
              <div className="flex items-center gap-1.5 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-xs font-bold font-mono">{post.comments.length}</span>
              </div>
            </div>

            <Comments postId={post.id} comments={post.comments} />
          </article>
        ))}
      </div>
    </div>
  )
}