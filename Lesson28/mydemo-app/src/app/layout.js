import { Roboto } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mydemo Next App",
  description: "Mydemo NextJS application for Lesson28.",
};

// function below is a component
export default function AppLayout({ children }) {
  console.log("Hello world!");
  return (
    // JSX
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <nav className="flex justify-end gap-4 max-w-3xl w-full mx-auto py-4 px-16">

          {/*page file in app folder */}
          <Link href="/">Home</Link>
          {/*page file in app/contact folder */}
          <Link href="/contact">Contact</Link>
          {/*page file in app/contact/info folder */}
          <Link href="/contact/info">Contact Info</Link>
          
        </nav>
        {children}
      </body>
    </html>
  );
}
