"use client";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface Props {
  params: { id: string };
}

const NotePreview = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();

  const closeModal = useCallback(() => {
    router.back();
  }, [router]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) {
    return (
      <Modal onClose={closeModal}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal onClose={closeModal}>
        <p>Something went wrong. Please try again later.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    );
  }

  return (
    <Modal onClose={closeModal}>
      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <p>{new Date(data.createdAt).toLocaleString()}</p>
          <p><strong>Tag:</strong>{data.tag}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </Modal>
  );
};

export default NotePreview;
