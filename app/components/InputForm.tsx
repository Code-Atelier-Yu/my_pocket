type InputFormProps = {
  isRegisterMode: boolean;
  handleInput: (formData: FormData) => Promise<void>;
  handleSearch: (formData: FormData) => Promise<void>;
};

export function InputForm({
  isRegisterMode,
  handleInput,
  handleSearch,
}: InputFormProps) {
  return (
    <form
      action={isRegisterMode ? handleInput : handleSearch}
      className="flex gap-3 flex-1"
    >
      <input
        type="text"
        name={isRegisterMode ? "url" : "keyword"}
        placeholder={
          isRegisterMode
            ? "例：https://example.com/article"
            : "タイトルやサイト名で検索"
        }
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        className="hidden md:block w-28 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isRegisterMode ? "登録" : "検索"}
      </button>
    </form>
  );
}
