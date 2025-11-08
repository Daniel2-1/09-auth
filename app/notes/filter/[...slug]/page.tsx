import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? "All Notes" : slug?.[0];
  return {
    title: `Note - ${tag}`,
    description: `View and manage your ${tag?.toLowerCase()} notes on NoteHub.`,
    openGraph: {
      title: `Note - ${tag}`,
      description: `Browse ${tag?.toLowerCase()} notes in NoteHub.`,
      url: `https://08-zustand-tau-ten.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Notes Filter",
        },
      ],
    },
  };
};

export default async function Notes({ params }: Props) {
  const { slug } = await params;

  const tag = slug?.[0] === "all" ? undefined : slug?.[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });



  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
