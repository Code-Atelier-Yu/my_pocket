import React, { Dispatch, SetStateAction } from "react";
import SidebarUserInfo from "./SidebarUserInfo";
import { SidebarContent } from "./SidebarContent";


type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <section
      className={`fixed lg:sticky top-16 lg:top-24 h-[calc(100vh-4rem)] lg:h-[calc(100vh-6rem)] z-50 left-0 bg-white w-4/5 md:w-2/5 lg:w-1/5 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full translate3d(0,0,0)"
      } transform transition-transform will-change-transform duration-200 ease-out lg:translate-x-0 flex flex-col`}
    >
      {/* メインコンテンツエリア（スクロール対象） */}
      <SidebarContent />

      {/* ユーザー情報エリア（固定） */}
      <SidebarUserInfo />
    </section>
  );
}

export default Sidebar;
