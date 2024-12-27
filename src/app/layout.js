import Loader from "@/components/Loader/Loader";
import Footer from "@/components/section/Footer";
import { Hind, Khand } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const name = process.env.NAME ?? "Name";

const head = Khand({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const body = Hind({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: `${name} • Portfolio`,
  description:
    "MCA graduate skilled in web development (HTML, CSS, JavaScript, React, Node.js), passionate about building user-friendly applications.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="URL_TO_IMAGE" />
        <meta
          property="og:url"
          content={process.env.SITE_URL ?? "kavanapateel.github.io"}
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body
        className={`${head.variable} ${body.variable} relative mb-24 flex h-dvh min-h-screen w-dvw flex-col overflow-x-hidden overscroll-none scroll-smooth bg-zinc-900 font-body text-foreground antialiased`}
      >
        <Loader />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
