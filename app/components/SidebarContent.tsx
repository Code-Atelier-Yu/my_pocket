import { filterItems } from "../constants/filterItems";
import { SidebarItem } from "./SidebarItem";

export function SidebarContent () {
  return (
    <div className="overflow-y-auto mb-10">
        <div className="pl-4 pt-4 lg:p-0">
          <h2 className="text-3xl lg:text-2xl font-bold mb-8">フィルター</h2>
          <ul className="flex flex-col gap-6 pl-4">
            {filterItems.map((item) => (
              <SidebarItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
  )
}