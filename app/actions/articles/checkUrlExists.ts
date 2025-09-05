"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/getCurrentUserId";

export async function checkUrlExists(url: string) {
  const userId = await getCurrentUserId();

  const isExistsArticle = await prisma.article.findFirst({
    where: {
      url: url,
      userId: userId,
    }
  })

  return !!isExistsArticle;
}