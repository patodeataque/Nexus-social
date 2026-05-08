"use server"

import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { authOptions } from "./api/auth/[...nextauth]/route"

// Criar Post
export async function createPost(content: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Não autorizado");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("Usuário não encontrado");

  await prisma.post.create({
    data: { content, authorId: user.id }
  });

  revalidatePath("/");
}

// Deletar Post (Com verificação de dono)
export async function deletePost(postId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Não autorizado");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!user || post?.authorId !== user.id) {
    throw new Error("Você só pode deletar seus próprios posts.");
  }

  await prisma.post.delete({ where: { id: postId } });
  revalidatePath("/");
}

// Curtir/Descurtir
export async function toggleLike(postId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Não autorizado");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("Usuário não encontrado");

  const existingLike = await prisma.like.findUnique({
    where: { userId_postId: { userId: user.id, postId } }
  });

  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } });
  } else {
    await prisma.like.create({ data: { userId: user.id, postId } });
  }

  revalidatePath("/");
}

// Criar Comentário
export async function createComment(postId: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Não autorizado");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("Usuário não encontrado");

  await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: user.id
    }
  });

  revalidatePath("/");
}