import { useEffect, useState } from "react";
import { extractUrlData } from "../actions/articles/extract-url-data";
import { saveArticle } from "../actions/articles/save-article";
import FormMessage from "./FormMessage";
import { urlRegistrationSchema } from "@/lib/validations/urlRegistrationSchema";
import ToggleSwitch from "./ToggleSwitch";
import { redirect } from "next/navigation";
import { searchKeywordRegistrationSchema } from "@/lib/validations/searchKeywordRegistrationSchema";
import { InputForm } from "./InputForm";
import { getCurrentUserId } from "@/lib/getCurrentUserId";

function InputFormGroup() {
  const [error, setError] = useState<string>("");
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInput = async (formData: FormData) => {
    try {
      const keys = Array.from(formData.keys());
      console.log("送信されたキー:", keys);

      const url = formData.get("url") as string;
      const validationResult = urlRegistrationSchema.safeParse({ url });

      if (!validationResult.success) {
        const errorMessage = validationResult.error.issues
          .map((issue) => issue.message)
          .join(",");

        setError(errorMessage);
        return;
      }

      const articleData = await extractUrlData(formData);
      console.log("記事データ", articleData);

      if (!articleData) {
        return;
      }

      // サーバーアクションを使ってDBに保存する処理をかければいい
      const userId = await getCurrentUserId();
      const result = await saveArticle(articleData, userId);

      if (!result.success) {
        setError(result.errorMessage || "予期しないエラーが発生しました");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (formData: FormData) => {
    const keyword = formData.get("keyword") as string;
    const validationResult = searchKeywordRegistrationSchema.safeParse({
      keyword,
    });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((issue) => issue.message)
        .join(",");

      setError(errorMessage);
      return;
    }

    if (!keyword || keyword.trim() === "") {
      return;
    }

    const redirectUrl = `/?keyword=${encodeURIComponent(keyword)}`;

    redirect(redirectUrl);
  };

  return (
    <div className="flex gap-3 w-3/5 items-center relative">
      <div className="flex gap-3 items-center w-full">
        {/* トグルスイッチ */}
        <ToggleSwitch
          isRegisterMode={isRegisterMode}
          setIsRegisterMode={setIsRegisterMode}
        />

        {/* インプットフォーム */}
        <InputForm 
          isRegisterMode={isRegisterMode}
          handleInput={handleInput}
          handleSearch={handleSearch}
        />
      </div>

      {error && <FormMessage error={error} />}
    </div>
  );
}

export default InputFormGroup;
