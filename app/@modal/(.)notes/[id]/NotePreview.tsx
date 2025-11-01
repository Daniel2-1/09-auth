"use client";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface Props {
  params: { id: string };
}

const NotePreview = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const closeModal = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <Modal onClose={closeModal}>
        <div>
          <div>
            {data && (
              <>
                <div>
                  <h2>{data?.title}</h2>
                </div>
                <p>{data?.content}</p>
                <p>{new Date(data?.createdAt).toLocaleString()}</p>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default NotePreview;
