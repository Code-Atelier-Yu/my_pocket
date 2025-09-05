"use server";

import prisma from "@/lib/prisma";
import { checkUrlExists } from "./checkUrlExists";
import { revalidatePath } from "next/cache";


type ArticleDataProps = {
  title: string;
  siteName: string;
  description: string;
  siteUpdatedAt: string;
  thumbnail: string;
  url: string;
  content: string;
};

export async function saveArticle(
  articleData: ArticleDataProps,
  userId: string
) {
  try {
    const isDuplicate = await checkUrlExists(articleData.url);

    if(isDuplicate) {
      console.log("URLが重複しています");
      return {
        errorMessage: "この記事はすでに登録されています",
        success: false,
      }
    }

    // データ保存
    await prisma.article.create({
      data: {
        userId: userId,
        title: articleData.title,
        siteName: articleData.siteName,
        description: articleData.description,
        siteUpdatedAt: articleData.siteUpdatedAt,
        thumbnail: articleData.thumbnail,
        url: articleData.url,
        content: articleData.content,
      },
    });

    revalidatePath('/');

    return {
      errorMessage: undefined,
      success: true,
    }
  } catch (err) {
    console.error(err);

    return {
      errorMessage: "記事の保存ができませんでした",
      success: false,
    }
  }
}
