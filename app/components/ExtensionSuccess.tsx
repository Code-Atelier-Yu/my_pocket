"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ExtensionSuccess() {
  useEffect(() => {
    // 5秒後に自動でページを閉じる
    const timer = setTimeout(() => {
      window.close();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="w-15 h-15 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h2 className="text-green-500 mb-4 text-2xl font-semibold">
          ログイン完了！
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          拡張機能で記事の保存ができるようになりました！
          <br />
          このタブを閉じて、保存したいページで拡張機能をクリックしてください。
        </p>

        <Link
          href="/"
          className="bg-gray-600 text-white no-underline px-6 py-3 rounded-md inline-block text-sm hover:bg-gray-700 transition-colors"
        >
          アプリを開く
        </Link>
      </div>
    </div>
  );
}
