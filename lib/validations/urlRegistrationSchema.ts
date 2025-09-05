import {z} from "zod";

export const urlRegistrationSchema = z.object({
  url: z
    .string()
    .min(1, "URLを入力してください")
    .max(255, "URLは255文字以内で入力してください")
    .refine((val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },{
      message: "正しいURL形式で入力してください"
    })
})