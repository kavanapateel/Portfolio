import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextHoverEffect } from "@/components/ui/text-hover-effects";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import LenisScroll from "./lenis";

const ErrorPage = () => {
  return (
    <LenisScroll>
      <AuroraBackground className="w-dvh flex h-dvh flex-col place-items-center items-center justify-center gap-8 *:z-[1000] *:text-center">
        <div className="w-full">
          <h1 className="font-head text-8xl font-black uppercase">Oops!</h1>
          <TextHoverEffect
            classNames={{
              containerClassName:
                "hidden lg:inline-block place-self-center uppercase h-fit w-full",
              textSize: "text-xl",
              textClassName: "stroke-gray-500 font-head",
            }}
            text={"404 - Page not Found"}
            size={{ svgWidth: 400, svgHeight: 25 }}
          />
          <p className="inline-block font-head text-3xl font-extralight capitalize lg:hidden">
            <strong>404</strong> - Page not Found
          </p>
        </div>
        <p className="font-xl font-light text-zinc-500">
          The page you&apos;re looking probably doesn&apos;t exist.
          <br />
          If you think this is a mistake, then please&nbsp;
          <Link
            href={`mailto:${process.env.MAIL}`}
            rel="noreferrer noopener"
            target="_blank"
            className="underline outline-none transition-colors duration-300 hover:text-blue-500 focus:ring-2"
          >
            contact me
          </Link>
          .
        </p>
        <Link
          href="/"
          className="text-foreground/50 font-2xl inline-flex h-12 animate-shimmer items-center gap-2 rounded-full bg-[linear-gradient(110deg,#18181b,45%,#1e2631,55%,#18181b)] bg-[length:200%_100%] px-6 font-head font-medium transition-colors focus:outline-none focus:ring-2"
        >
          Return Home <IconArrowRight size={18} />
        </Link>
      </AuroraBackground>
    </LenisScroll>
  );
};

export default ErrorPage;
