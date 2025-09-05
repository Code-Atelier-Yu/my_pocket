export function getPageTitle(listtype: string) {
  switch(listtype) {
    case "all":
      return "すべて";
    case "favorite":
      return "お気に入り";
    case "archived":
      return "アーカイブ";
    default:
      return "ホーム";
  }
}