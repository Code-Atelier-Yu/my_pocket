"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function deleteArticle(articleId: string) {
  try {
    await prisma.article.delete({
      where: {
        id: articleId,
      },
    });

    revalidatePath("/");
  } catch (err) {
    console.error(err);
  }
}

export default deleteArticle;
