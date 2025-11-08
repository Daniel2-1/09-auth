import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not existing page",
  description: "This page does not exist.",
  openGraph: {
    title: "Not existing page",
    description: "This page does not exist.",
    url: "https://08-zustand-tau-ten.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App Preview",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </>
  );
};

export default NotFound;
