"use client";

import About from "@/components/section/About";
import Main from "@/components/section/Main";
import { FloatingDock } from "@/components/ui/float-dock";
import { links } from "@/data/dynaLinks";
import LenisScroll from "./lenis";

const Home = () => {
  return (
    <LenisScroll>
      <Main />
      <About />
      <FloatingDock mobileClassName="translate-y-20" items={links} />
    </LenisScroll>
  );
};

export default Home;
