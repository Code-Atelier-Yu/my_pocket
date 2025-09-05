"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function toggleArchive(isArchived: boolean, articleId: string) {
  try {
    const reversedArchived = !isArchived;

    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        isArchived: reversedArchived,
      },
    });

    revalidatePath("/");

    const result = isArchived ? "アーカイブが解除されました" : "アーカイブしました";
    console.log(result);

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      errorMessage: "アーカイブの更新に失敗しました",
      success: false,
    };
  }
}

export default toggleArchive;
