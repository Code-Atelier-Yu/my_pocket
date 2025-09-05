import { Article } from "../generated/prisma";
import CardImage from "./CardImage";
import CardDate from "./CardDate";
import CardIcons from "./CardIcons";
import Link from "next/link";

type ArticleCardProps = {
  articleData: Article;
};

export function ArticleCard({ articleData }: ArticleCardProps) {
  return (
    <div className="border group hover:bg-gray-50 transition-colors px-4 pt-4 pb-3 relative">
      <Link 
        href={articleData.url}
        target="_blank"
        className="absolute inset-0 z-0"
        rel="noopener noreferrer"
      />

      <div className="flex justify-between flex-col-reverse md:flex-row gap-8">
        {/* 左側 （タイトル・デスクリプション等）*/}
        <div className="w-full md:w-3/5 lg:w-3/4 flex flex-col">
          {/* タイトル部分 */}
          <div className="mb-4">
            <h3 className="font-bold text-lg md:text-xl mb-1">
              {articleData.title}
            </h3>
            {/* サイトタイトル */}
            <span className="text-gray-400 text-xs md:text-sm">
              {articleData.siteName}
            </span>
          </div>

          <div className="mb-4">
            {/* デスクリプション */}
            <p className="line-clamp-3 text-gray-700 text-base">
              {articleData.description}
            </p>
          </div>
        </div>

        {/* 右側 （サムネ）*/}
        <div className="w-full md:w-2/5 lg:w-1/4 pointer-events-none aspect-[16/9] md:aspect-[3/2]">
          <CardImage thumbnail={articleData.thumbnail} />
        </div>
      </div>

      {/* 日時・アイコン */}
      <div className="flex flex-col md:flex-row justify-between mt-auto items-end">
        <CardDate siteUpdatedAt={articleData.siteUpdatedAt} />

        {/* アイコン */}
        <div className="relative z-20 mt-2 md:mt-6">
          <CardIcons articleData={articleData} />
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
