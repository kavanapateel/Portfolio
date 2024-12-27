"use client";

import { IconDownload } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import SlideUp from "../motion/Slide-up";
import { PinContainer } from "../ui/3d-pin";
import { AuroraBackground } from "../ui/aurora-background";
import { FlipWords } from "../ui/flip-words";

const words = process.env.NEXT_PUBLIC_ROLES;
const resumeLink = process.env.NEXT_PUBLIC_RESUME ?? "/resume.pdf";

const Main = () => {
  const rolesList = words.split(",").map((word) => word.trim());

  let imageSrc;
  imageSrc = "/kavz.jpg";

  return (
    <AuroraBackground className="flex h-screen w-screen items-start justify-end px-5 py-7">
      <main className="relative flex h-full w-full items-start justify-start md:sticky md:top-10 md:justify-end">
        <PinContainer title="Download Resume" href={resumeLink}>
          <div className="flex aspect-square h-[20rem] basis-full flex-col p-1 tracking-tight sm:basis-1/2">
            <h3 className="!m-0 max-w-xs font-head text-2xl font-black capitalize">
              {process.env.NEXT_PUBLIC_NAME}
            </h3>
            <div className="!m-0 !p-0 text-base font-normal">
              <span className="text-slate-500">
                {process.env.NEXT_PUBLIC_DESCRIPTION ?? "Software Developer"}
              </span>
            </div>
            <Image
              height={500}
              width={500}
              quality={85}
              src={imageSrc ?? "/placeholder.jpg"}
              alt="Profile Picture"
              className="mt-4 flex aspect-video w-full flex-1 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 object-cover object-top"
            />
          </div>
        </PinContainer>
      </main>

      <SlideUp className="relative flex w-full max-w-prose flex-col items-start justify-center gap-4">
        <div className="relative inline w-full max-w-prose overflow-hidden">
          <FlipWords
            words={rolesList}
            className={"font-head text-4xl font-black uppercase md:text-6xl"}
          />
        </div>
        <span className="text-xl">
          Recent MCA graduate with a strong foundation in web development and
          software engineering. Skilled in HTML, CSS, JavaScript, React,
          Node.js, and database management. Passionate about building efficient,
          user-friendly applications and always eager to learn new technologies.
          Ready to contribute to projects and grow as a developer.
        </span>
        <Link
          href={resumeLink}
          target="_blank"
          rel="noreferrer noopener"
          className="text-foreground/50 inline-flex h-12 animate-shimmer items-center justify-center place-self-end rounded-full bg-[linear-gradient(110deg,#18181b,45%,#1e2631,55%,#18181b)] bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none focus:ring-2 md:place-self-start"
        >
          Download Resume <IconDownload size={16} className="ml-1.5" />
        </Link>
      </SlideUp>
    </AuroraBackground>
  );
};

export default Main;
