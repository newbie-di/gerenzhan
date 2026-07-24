import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { About } from "./components/About.jsx";
import { BorderGlowSystem } from "./components/BorderGlowSystem.jsx";
import { Contact } from "./components/Contact.jsx";
import { CursorFluidTrail } from "./components/CursorFluidTrail.jsx";
import { Hero } from "./components/Hero.jsx";
import { Projects } from "./components/Projects.jsx";
import { Strengths } from "./components/Strengths.jsx";

export function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const scrollToHash = (hash, behavior = "smooth") => {
      if (!hash || hash === "#") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      target?.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : behavior,
        block: "start",
      });
    };

    const onInternalLinkClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!target) return;

      event.preventDefault();
      window.history.pushState(null, "", hash);
      scrollToHash(hash);
    };

    const onHistoryChange = () => scrollToHash(window.location.hash, "smooth");
    const settleInitialHash = async () => {
      await document.fonts?.ready;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToHash(window.location.hash, "auto"));
      });
    };

    document.addEventListener("click", onInternalLinkClick);
    window.addEventListener("hashchange", onHistoryChange);
    window.addEventListener("popstate", onHistoryChange);
    settleInitialHash();

    return () => {
      document.removeEventListener("click", onInternalLinkClick);
      window.removeEventListener("hashchange", onHistoryChange);
      window.removeEventListener("popstate", onHistoryChange);
    };
  }, []);

  return (
    <>
      <BorderGlowSystem />
      <CursorFluidTrail />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Hero />
      <main>
        <About />
        <Projects />
        <Strengths />
        <Contact />
      </main>
    </>
  );
}
