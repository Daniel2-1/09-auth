import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string[]}>
}

export default async function Notes({ params }: Props) {
  
  const { slug } = await params;

  const tag = slug?.[0] === "all" ? undefined : slug?.[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(1, "", tag),
    
  });

  console.log(queryClient.getQueryData(["notes", 1, ""]));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
