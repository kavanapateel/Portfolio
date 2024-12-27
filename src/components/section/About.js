import certicates from "@/data/certificates";
import { educationCards } from "@/data/dynaLinks";
import experiences from "@/data/exp";
import projects from "@/data/projects";
import skills from "@/data/skills";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import SlideUp from "../motion/Slide-up";
import { HoverEffect } from "../ui/card-hover-effect";
import ExpandableCards from "../ui/expandable-cards";

const AnimatedContent = dynamic(
  () => import("../ui/animated-content").then((mod) => mod.AnimatedContent),
  {
    ssr: false,
  },
);

const About = () => {
  return (
    <div className="flex w-full flex-col items-start justify-end gap-8 px-5 py-7">
      <Projects projects={projects} />
      <Skills />
      <Experience />
      <Education />
      <Certifications />
    </div>
  );
};

export default About;

export const Projects = ({ projects, autoplay = false }) => {
  return (
    <section>
      <h2 className="mb-2 indent-4 text-3xl font-black uppercase">Projects</h2>
      <div className="mt-4 w-full px-4 font-sans antialiased md:mb-12">
        <div className="relative flex h-full w-full flex-col gap-4 md:h-96 md:flex-row">
          <AnimatedContent list={projects} autoplay={autoplay} />
        </div>
      </div>
    </section>
  );
};

export const Skills = () => {
  return (
    <section>
      <h2 className="indent-4 text-3xl font-black uppercase">Skills</h2>
      <HoverEffect items={skills} />
    </section>
  );
};

export const Education = () => {
  return (
    <section className="flex w-full flex-col">
      <h2 className="mb-2 indent-4 text-3xl font-black uppercase">Education</h2>
      <ExpandableCards cards={educationCards} />
    </section>
  );
};

export const Experience = () => {
  return (
    <section>
      <h2 className="indent-4 text-3xl font-black uppercase">Experience</h2>
      <div
        className={`grid w-full grid-cols-1 place-content-center gap-2 pb-10 ${experiences?.length > 1 && "lg:grid-cols-4"} `}
      >
        {experiences.map((exp, index) => (
          <SlideUp key={index}>
            <div className="w-full rounded-lg p-3 hover:bg-neutral-800 focus:outline-none focus:ring-2">
              <Link
                href={exp.verifyLink}
                target="_blank"
                rel="noreferrer noopener"
                tabIndex={-1}
              >
                <h6 className="font-head text-2xl font-bold">
                  {exp.role ?? "Role"}
                </h6>
                <p className="font-head text-lg font-light">
                  {`${exp.companyName ?? "Company Name"} • ${exp.employment ?? "Employment"} • ${exp.mode ?? "Mode"}`}
                </p>
                <p>
                  {`${exp.duration ?? "Duration"} • ${exp.location ?? "Location"}`}
                </p>
                <div className="relative ml-2.5 border-l-4 border-neutral-700 px-1.5 pt-3.5">
                  <p className="font-head text-xl font-semibold">
                    {`${exp.project.title ?? "Project"} • ${exp.project.category ?? "Category"}`}
                  </p>
                  <p className="">{exp.project.desc}</p>
                </div>
              </Link>
            </div>
          </SlideUp>
        ))}
      </div>
    </section>
  );
};

export const Certifications = () => {
  return (
    <>
      <h2 className="indent-4 text-3xl font-black uppercase">Certifications</h2>
      <div className="grid w-full grid-cols-1 place-content-center gap-2 px-4 pb-10 lg:grid-cols-4">
        {certicates.map((certificate, index) => (
          <SlideUp delay={index * 0.3} key={index}>
            <Link
              className="flex flex-col items-start justify-start rounded-lg p-3 hover:bg-neutral-800 focus:outline-none focus:ring-2"
              href={
                certificate?.href ??
                "https://www.linkedin.com/in/kavana-31dec/details/certifications/"
              }
              rel="noreferrer noopener"
              target="_blank"
            >
              <Image
                src={certificate?.img}
                alt={certificate?.title ?? "Image Not Found"}
                width={100}
                height={100}
                className="mb-2 flex aspect-video w-full max-w-full place-items-center rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500"
              />
              <h6 className="font-head text-xl font-black">
                {certificate?.title ?? "Title"}
              </h6>
              <p className="mb-2 font-head font-light">
                {`${certificate?.issuer ?? "Issuer"} • ${certificate?.doi ?? "Date of Issue"}`}
              </p>
            </Link>
          </SlideUp>
        ))}
      </div>
    </>
  );
};
