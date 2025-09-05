import { extractUrlData } from "@/app/actions/articles/extract-url-data";
import { saveArticle } from "@/app/actions/articles/save-article";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return NextResponse.json(
        { success: false, error: "ユーザーが認証されていません" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { url } = body;

    // サイトデータの取得
    const formData = new FormData();
    formData.append("url", url);
    const articleData = await extractUrlData(formData);

    if (!articleData) {
      throw new Error("サイトデータの取得に失敗しました");
    }

    // データの保存
    const result = await saveArticle(articleData, session.user.id);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.errorMessage },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "データを受け取りました",
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error:
          err instanceof Error ? err.message : "不明なエラーが発生しました",
      },
      { status: 500 }
    );
  }
}

// CORS設定
export async function OPTIONS(request: NextRequest) {
  console.log(request);

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
