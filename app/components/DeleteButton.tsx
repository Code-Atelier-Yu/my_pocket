import { FaRegTrashCan } from "react-icons/fa6";
import deleteArticle from "../actions/articles/delete-article";
import { Article } from "../generated/prisma";

type DeleteButtonProps = {
  articleData: Article;
};

export default function DeleteButton({ articleData }: DeleteButtonProps) {
  const handleDelete = async () => {
    await deleteArticle(articleData.id);
  };

  return (
    <form
      action={handleDelete}
      onSubmit={(e) => {
        if (!confirm("この記事を削除しますか？")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="cursor-pointer"
      >
        <FaRegTrashCan />
      </button>
    </form>
  );
}
