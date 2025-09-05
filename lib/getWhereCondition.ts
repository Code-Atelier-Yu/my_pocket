export function getWhereCondition(listtype: string, userId: string) {
  switch (listtype) {
    case "all":
      return { userId: userId };
    case "favorite":
      return { userId: userId, isLiked: true };
    case "archived":
      return { userId: userId, isArchived: true };
    default:
      return { userId: userId, isArchived: false };
  }
}
