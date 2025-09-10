import { extractUrlData } from "@/app/actions/articles/extract-url-data";
import { saveArticle } from "@/app/actions/articles/save-article";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("=== 拡張機能からのAPI呼び出し開始 ===");
  
  try {
    console.log("認証チェック開始...");
    const session = await auth();
    console.log("セッション情報:", session);

    if (!session?.user.id) {
      console.log("認証失敗: セッションまたはユーザーIDが存在しません");
      return NextResponse.json(
        { success: false, error: "ユーザーが認証されていません" },
        { status: 401 }
      );
    }

    console.log("認証成功 - ユーザーID:", session.user.id);

    const body = await request.json();
    const { url } = body;
    console.log("受信したURL:", url);

    // サイトデータの取得
    console.log("サイトデータ取得開始...");
    const formData = new FormData();
    formData.append("url", url);
    const articleData = await extractUrlData(formData);
    console.log("取得したサイトデータ:", articleData);

    if (!articleData) {
      console.log("サイトデータ取得失敗");
      throw new Error("サイトデータの取得に失敗しました");
    }

    // データの保存
    console.log("データ保存開始...");
    const result = await saveArticle(articleData, session.user.id);
    console.log("保存結果:", result);

    if (!result.success) {
      console.log("保存失敗:", result.errorMessage);
      return NextResponse.json(
        { success: false, error: result.errorMessage },
        { status: 400 }
      );
    }

    console.log("=== 保存成功 ===");
    const response = NextResponse.json({
      success: true,
      message: "データを受け取りました",
    });
    
    // CORS ヘッダーをレスポンスにも追加
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    
    return response;
  } catch (err) {
    console.error("=== エラー発生 ===", err);

    const errorResponse = NextResponse.json(
      {
        success: false,
        error:
          err instanceof Error ? err.message : "不明なエラーが発生しました",
      },
      { status: 500 }
    );
    
    // エラーレスポンスにもCORSヘッダーを追加
    errorResponse.headers.set("Access-Control-Allow-Origin", "*");
    errorResponse.headers.set("Access-Control-Allow-Credentials", "true");
    
    return errorResponse;
  }
}

// CORS設定
export async function OPTIONS(request: NextRequest) {
  console.log("OPTIONS リクエスト受信:", request.method);

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Cookie",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}