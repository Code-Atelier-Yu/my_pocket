import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

function SidebarUserInfo() {
  const { data: session } = useSession();

  return (
    <div className="p-4 border-t bg-white lg:hidden">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10 flex-shrink-0">
          {session?.user.image ? (
            <Image
              className="object-cover rounded-full"
              src={session?.user.image}
              fill={true}
              alt="ユーザーアイコン画像"
              sizes="48px"
            />
          ) : (
            <div className="h-full w-full bg-gray-400 flex items-center justify-center text-white font-bold">
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-base truncate">{session?.user.name}</p>
          <p className="text-sm text-gray-500 truncate">
            {session?.user.email}
          </p>
        </div>
      </div>

      {/* ログアウトボタン */}
      <button
        onClick={() => signOut({ callbackUrl: "/signin" })}
        className="w-full py-2 px-4 text-center text-base bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 rounded-md transition-colors"
      >
        ログアウト
      </button>
    </div>
  );
}

export default SidebarUserInfo;
