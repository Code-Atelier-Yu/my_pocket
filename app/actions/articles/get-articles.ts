"use server";

import prisma from "@/lib/prisma";

type GetArticlesProps = {
  userId: string;
  isLiked?: boolean;
  isArchived?: boolean;
}

export async function getArticles(whereCondition: GetArticlesProps) {
  try {
    const articles = await prisma.article.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: "desc",
      },
    });

    return articles;
  } catch (err) {
    console.error(err);
  }
}
