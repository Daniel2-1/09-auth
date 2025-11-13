"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
// import Modal from "../../../../components/Modal/Modal";
// import NoteForm from "../../../../components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import css from "@/components/NotesPage/NotesPage.module.css";
import NoNotes from "@/components/NoNotes/NoNotes";
import Link from "next/link";

interface Props {
  tag?: string;
}

function NotesClient({ tag }: Props) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setQuery] = useState("");

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["notes", page, searchQuery, tag],
    queryFn: () => fetchNotes(page, searchQuery, tag),
    placeholderData: keepPreviousData,
  });

  const handleQuery = useDebouncedCallback((query: string) => {
    setQuery(query);
    setPage(1);
  }, 300);

  const totalPages = data?.totalPages || 1;
  // const onCloseModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleQuery} searchQueryProp={searchQuery} />
        {totalPages > 1 && isSuccess && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        {/* <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create Note +
        </button> */}
        <Link href="/notes/action/create">Create</Link>
      </header>
      {data && data?.notes.length > 0 && <NoteList data={data?.notes} />}
      {data?.notes.length === 0 && !isPending && <NoNotes />}
      {/* {isModalOpen && (
        <Modal onClose={onCloseModal}>
          <NoteForm/>
        </Modal>
      )} */}
    </div>
  );
}

export default NotesClient;
