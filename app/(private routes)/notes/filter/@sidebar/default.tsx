import { NOTES_FILTER_ALL, NOTES_FILTER_CATEGORIES } from "@/lib/constans";
import Link from "next/link";
import css from '@/components/SidebarNotes/SidebarNotes.module.css'

const Sidebar = () => (
  <ul className={css.menuList}>
    <li className={css.menuItem}>
      <Link href={`/notes/filter/${NOTES_FILTER_ALL}`} className={css.menuLink}>
        All notes
      </Link>
    </li>
    {NOTES_FILTER_CATEGORIES.map((category,id) => (
      <li className={css.menuItem} key={id}>
        <Link href={`/notes/filter/${category}`} className={css.menuLink}>
          {category}
        </Link>
      </li>
    ))}
  </ul>
);

export default Sidebar;
