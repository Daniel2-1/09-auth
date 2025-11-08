import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";



const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});
export const metadata: Metadata = {
  title: "Your notes website.",
  description:
    "This application lets you create, view and organize your notes.",
  openGraph: {
    title: "Your notes website.",
    description: "Create and orginize your notes.",
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

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto} antialiased`}
      >
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
