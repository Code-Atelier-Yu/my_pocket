import Link from "next/link";

type SidebarItemProps = {
  item :{
    id: string;
    href: string;
    name: string;
  }
}

export function SidebarItem({item}: SidebarItemProps) {
  return (
    <li>
      <Link
        href={item.href}
        className="flex items-center gap-3 text-xl"
      >
        {item.name}
      </Link>
    </li>
  );
}
