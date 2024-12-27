import Link from "next/link";
import { TextHoverEffect } from "../ui/text-hover-effects";

const name = process.env.NAME;

const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center pb-10">
      <Link
        href={`mailto:${process.env.MAIL}`}
        className="hidden w-2/3 lg:inline-block"
        target="_blank"
        rel="noreferrer noopener"
        tabIndex={-1}
      >
        <TextHoverEffect text={name} />
      </Link>
      <div className="max-w-prose px-3.5 text-center lg:p-0 lg:text-right">
        <p className="inline-block text-xl font-light text-gray-500">
          &copy; Copyright {new Date().getFullYear()}.{" "}
          <br className="hidden lg:inline" /> Designed & Maintained by{" "}
          <Link
            href="/"
            className="font-head text-foreground underline underline-offset-2 outline-none focus:text-blue-500 focus:ring-2"
          >
            {name}
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
