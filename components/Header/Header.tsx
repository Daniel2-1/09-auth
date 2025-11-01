import Link from "next/link";
import css from "./Header.module.css";
import { NOTES_FILTER_ALL } from "@/lib/constans";



export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href={`/notes/filter/${NOTES_FILTER_ALL}`}>Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
