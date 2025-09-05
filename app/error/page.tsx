"use client";

import Image from "next/image";
import Link from "next/link";

function Error() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="relative h-20 w-20 mx-auto">
          <Image
            className="object-contain"
            src="/images/icon.png"
            alt="My Pocket Logo"
            fill={true}
            sizes="80px"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          my-pocket
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ログインエラー
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              ログイン処理中にエラーが発生しました。
              <br />
              再度お試しください。
            </p>
          </div>

          <Link
            href="/signin"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            サインインページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
