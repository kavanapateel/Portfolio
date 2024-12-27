import {
  IconBrandGithub,
  IconBrandGmail,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconFileCv,
} from "@tabler/icons-react";
import Link from "next/link";

const myName = process.env.NEXT_PUBLIC_NAME;
const github = process.env.NEXT_PUBLIC_GITHUB;
const linkedin = process.env.NEXT_PUBLIC_LINKEDIN;
const whatsApp = process.env.NEXT_PUBLIC_WHATSAPP;
const whatsAppUrl = `https://wa.me/${whatsApp}?text=${encodeURI(`Hello ${myName}, I am <your-name-here>.`)}`;
const email = process.env.NEXT_PUBLIC_MAIL;

export const links = [
  {
    title: "GitHub",
    icon: <IconBrandGithub className="h-full w-full" />,
    href: `https://github.com/${github}/`,
  },
  {
    title: "LinkedIn",
    icon: <IconBrandLinkedin className="h-full w-full" />,
    href: `https://linkedin.com/in/${linkedin}/`,
  },
  {
    title: "Gmail",
    icon: <IconBrandGmail className="h-full w-full" />,
    href: `mailto:${email}`,
  },
  {
    title: "WhatsApp",
    icon: <IconBrandWhatsapp className="h-full w-full" />,
    href: whatsAppUrl,
  },
  {
    title: "Resume",
    icon: <IconFileCv className="h-full w-full" />,
    href: process.env.NEXT_PUBLIC_RESUME ?? "/resume.pdf",
  },
];

export const educationCards = [
  {
    description:
      "St Aloysius Institute of Management & Information Technology (AIMIT)",
    title: "Master of Computer Applications",
    src: "/education/aimit.webp",
    coverSrc: "/education/aimit-cover.webp",
    duration: "Nov 2022 - Aug 2024",
    grade: 7.45,
    content: () => {
      return (
        <>
          <Link
            href="https://maps.app.goo.gl/QrNd4DmRSAscsjnH9"
            target="_blank"
            rel="noreferrer noopener"
            className="font-lg font-head hover:text-blue-500"
          >
            St Aloysius Institute of Management & Information Technology(AIMIT)
          </Link>
          <p className="mb-2 font-head text-xl">
            <strong>Grade</strong>: 7.45 CGPA
          </p>
          <span className="mb-1 mt-2 font-head text-xl font-bold">
            Achievements
          </span>
          <ul className="list-item list-outside list-disc">
            <li>
              • Organized the IT Manager event, IT Pharaoh, during the National
              Level IT Fest – Epitome 2023 with a team of 10+ members
            </li>
          </ul>
        </>
      );
    },
  },
  {
    description: "Canara College Mangaluru",
    title: "Bachelor of Computer Applications",
    src: "/education/canara.jpg",
    coverSrc: "/education/canara-cover.jpg",
    duration: "Jul 2019 - Oct 2022",
    grade: 7.66,
    content: () => {
      return (
        <>
          <Link
            href="https://maps.app.goo.gl/kDN2oHjskgtEQCdK7"
            target="_blank"
            rel="noreferrer noopener"
            className="font-lg font-head"
          >
            Canara College Mangaluru
          </Link>
          <p className="mb-2 font-head text-xl">
            <strong>Grade</strong>: 7.66 CGPA
          </p>
          <span className="mb-1 mt-2 font-head text-xl font-bold">
            Achievements
          </span>
          <ul className="list-item list-outside list-disc">
            <li>
              • Played a vital role in the IT Association and, took part in the
              interclass events & the National level IT Fest
            </li>
            <li>
              • Attended the Android Workshop at Canara Engineering College
            </li>
          </ul>
        </>
      );
    },
  },
];
