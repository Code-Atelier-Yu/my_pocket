import { FaRegHeart, FaHeart } from "react-icons/fa";
import toggleLike from "../actions/articles/toggle-like";
import { useOptimistic } from "react";
import { Article } from "../generated/prisma";

type LikeButtonProps = {
  articleData: Article;
}

export default function LikeButton({articleData}: LikeButtonProps) {
  const [optimisticLike, setOptimisticLike] = useOptimistic(
    articleData.isLiked,
    (currentState, newValue: boolean) => newValue
  );

  const handleToggleLike = async () => {
    setOptimisticLike(!optimisticLike);

    try {
      await toggleLike(articleData.isLiked, articleData.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form action={handleToggleLike}>
      <button
        type="submit"
        className="cursor-pointer"
      >
        {optimisticLike ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </button>
    </form>
  );
}
