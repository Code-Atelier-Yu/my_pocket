import { FaArchive } from "react-icons/fa";
import toggleArchive from "../actions/articles/toggle-archive";
import { Article } from "../generated/prisma";

type ArchiveButtonProps = {
  articleData: Article;
};

export default function ArchiveButton({ articleData }: ArchiveButtonProps) {
  const handleToggleArchive = async () => {
    try {
      await toggleArchive(articleData.isArchived, articleData.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form action={handleToggleArchive}>
      <button
        type="submit"
        className="cursor-pointer"
      >
        {articleData.isArchived ? (
          <FaArchive className="text-red-500" />
        ) : (
          <FaArchive />
        )}
      </button>
    </form>
  );
}
