import { getArticles } from "../actions/articles/get-articles";
import ArticleCard from "./ArticleCard";
import { getWhereCondition } from "@/lib/getWhereCondition";
import { getPageTitle } from "@/lib/getPageTitle";
import { getSearchWhereCondition } from "@/lib/getSearchWhereCondition";
import { getCurrentUserId } from "@/lib/getCurrentUserId";

interface ArticleListsProps {
  params: {
    listtype?: string;
    keyword?: string;
  };
}

async function ArticleLists({ params }: ArticleListsProps) {
  const listtype = params.listtype || "default";
  const keyword = params.keyword;
  const userId = await getCurrentUserId();

  let pageTitle;
  let whereCondition;

  if (keyword) {
    //　検索処理
    pageTitle = `検索結果：${keyword}`;
    whereCondition = getSearchWhereCondition(keyword, userId);
  } else {
    whereCondition = getWhereCondition(listtype, userId);
    pageTitle = getPageTitle(listtype);
  }

  const articlesData = await getArticles(whereCondition);

  if (!articlesData) {
    return (
      <div className="w-full text-center">データを取得できませんでした</div>
    );
  }

  return (
    <div className="w-full lg:w-4/5 px-4">
      {/* タイトル */}
      <div className="flex justify-between mb-4">
        <h2 className="text-4xl font-bold">{pageTitle}</h2>
      </div>

      <hr />

      <div className="p-4 flex flex-col gap-4">
        {articlesData.map((articleData) => (
          <ArticleCard
            key={articleData.id}
            articleData={articleData}
          />
        ))}
      </div>
    </div>
  );
}

export default ArticleLists;
