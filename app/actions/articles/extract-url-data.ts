"use server";

import { JSDOM } from "jsdom";

export async function extractUrlData(formData: FormData) {
  // const url = "https://yu-and-you.com/sigma1424mm/";
  const url = formData.get('url') as string;

  try {
    // リクエストを送る
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Chrome/120.0.0.0 Safari/537.36 Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
      },
    });

    // HTMLを取り出す
    const html = await response.text();

    // DOMに変換する
    const dom = new JSDOM(html);

    const document = dom.window.document;

    const getMetaContent = (property: string) => {
      // 探すをところを指定する
      const selectors = [
        `meta[property="${property}"]`,
        `meta[name="${property}"]`,
        `meta[property="og:${property}"]`,
        `meta[name="og:${property}"]`,
        `meta[property="twitter:${property}"]`,
        `meta[name="twitter:${property}"]`,
      ];

      // 探す処理

      for (const selector of selectors) {
        const element = document.querySelector(selector);

        if (element) {
          return element.getAttribute("content") || "";
        }
      }

      return "";
    };

    const getContent = () => {
      // 探すをところを指定する
      const contentSelectors = [
        "article",
        ".post-content",
        ".entry-content",
        ".content",
        ".post",
        "main",
        ".article-body",
      ];

      // 探す処理

      for (const selector of contentSelectors) {
        const element = document.querySelector(selector);

        if (element) {
          // スクリプトタグとスタイルタグを削除
          const scripts = element.querySelectorAll(
            "script, style, nav, header, footer, aside"
          );
          scripts.forEach((el) => el.remove());

          return element.textContent?.trim().slice(0, 300) || ""; // 最初の300文字
        }
      }

      return "";
    };

    return {
      title:
        getMetaContent("title") ||
        document.querySelector("h1")?.textContent ||
        document.querySelector("title")?.textContent ||
        "タイトルなし",
      siteName:
        getMetaContent("site_name") ||
        document.querySelector("title")?.textContent?.split(" | ")[1] ||
        new URL(url).hostname,
      description:
        getMetaContent("description") ||
        getMetaContent("twitter:description") ||
        "",
      siteUpdatedAt:
        getMetaContent("article:modified_time") ||
        getMetaContent("article:published_time") ||
        document.querySelector("time")?.getAttribute("datetime") ||
        new Date().toISOString(),
      thumbnail: getMetaContent("image"),
      url: url,
      content: getContent(),
    };
  } catch (err) {
    console.error(err);
  }
}
