import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowDownRight, Mail, MoveDown } from "lucide-react";
import { heroScenes, profile, projects } from "../data/portfolioData.js";
import { Navbar } from "./Navbar.jsx";
import { CosmicScene } from "./hero/CosmicScene.jsx";

const CYCLE_DURATION = 5100;

export function Hero() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState("portal");
  const [manualPaused, setManualPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [documentHidden, setDocumentHidden] = useState(document.hidden);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const reducedMotion = Boolean(prefersReducedMotion);
  const paused = manualPaused || !isVisible || documentHidden || reducedMotion;
  const capturePhase =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("phase") : null;
  const renderedPhase = ["portal", "transitioning", "space", "reset"].includes(capturePhase)
    ? capturePhase
    : phase;

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.5] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setDocumentHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPhase("portal");
      return undefined;
    }
    if (paused) return undefined;

    const timers = [];
    const scheduleCycle = () => {
      setPhase("portal");
      timers.push(window.setTimeout(() => setPhase("transitioning"), 1750));
      timers.push(window.setTimeout(() => setPhase("space"), 2750));
      timers.push(window.setTimeout(() => setPhase("reset"), 4800));
    };

    scheduleCycle();
    const cycle = window.setInterval(scheduleCycle, CYCLE_DURATION);

    return () => {
      window.clearInterval(cycle);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [paused, reducedMotion]);

  const onPointerMove = (event) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const bounds = heroRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const portalScene = heroScenes[0];
  const spaceScene = heroScenes[1];
  const portalVisible = reducedMotion || renderedPhase === "portal";
  const spaceVisible = !reducedMotion && renderedPhase === "space";

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <a className="skip-link" href="#about">
        跳到主要内容
      </a>

      <CosmicScene
        phase={renderedPhase}
        pointerX={pointerX}
        pointerY={pointerY}
        paused={paused}
        reducedMotion={reducedMotion}
      />

      <Navbar
        paused={manualPaused || reducedMotion}
        onTogglePause={() => {
          if (!reducedMotion) setManualPaused((value) => !value);
        }}
      />

      <div className="hero__content-frame">
        <motion.div
          className="hero-intro"
          onFocusCapture={() => setManualPaused(true)}
          animate={
            portalVisible
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: -18, filter: "blur(7px)" }
          }
          initial={false}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!portalVisible}
        >
          <div className="hero-intro__meta">
            <span className="eyebrow">{portalScene.label}</span>
            <span className="hero-intro__availability">
              <i /> {profile.availability}
            </span>
          </div>

          <div className="hero-intro__body">
            <p className="hero-intro__index">PORTAL / 01</p>
            <h1>
              {portalScene.title[0]}
              <em>{portalScene.title[1]}</em>
            </h1>
            <p className="hero-intro__role">{profile.role}</p>
            <p className="hero-intro__description">{portalScene.description}</p>
            <div className="hero-intro__actions">
              <a
                className="button button--primary"
                href="#projects"
                tabIndex={portalVisible ? 0 : -1}
              >
                查看精选项目 <ArrowDownRight size={18} />
              </a>
              <a
                className="button button--ghost"
                href={`mailto:${profile.email}`}
                tabIndex={portalVisible ? 0 : -1}
              >
                <Mail size={17} /> 联系我
              </a>
            </div>
          </div>

          <div className="hero-intro__coordinates" aria-hidden="true">
            <span>39.9042° N</span>
            <span>116.4074° E</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-projects"
          onFocusCapture={() => setManualPaused(true)}
          animate={
            spaceVisible
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 22, filter: "blur(8px)" }
          }
          initial={false}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!spaceVisible}
        >
          <div className="hero-projects__heading">
            <span className="eyebrow">{spaceScene.label}</span>
            <h2>
              {spaceScene.title[0]} <em>{spaceScene.title[1]}</em>
            </h2>
            <p>三个正在生长的 AI 产品实验。</p>
          </div>

          <div className="hero-projects__cards">
            {projects.map((project, index) => (
              <a
                key={project.id}
                className="hero-project-card"
                href={`#${project.id}`}
                tabIndex={spaceVisible ? 0 : -1}
                style={{ "--card-index": index }}
              >
                <img src={project.image} alt="" />
                <span>{project.index}</span>
                <strong>{project.title}</strong>
                <ArrowDownRight size={17} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="向下滚动到关于我">
        <span>SCROLL TO EXPLORE</span>
        <MoveDown size={17} />
      </a>

      <div className="hero__cycle-indicator" aria-hidden="true">
        <span className={renderedPhase === "portal" ? "is-active" : ""}>01</span>
        <i />
        <span className={renderedPhase === "space" ? "is-active" : ""}>02</span>
      </div>

      <div className="hero__corner-mark" aria-hidden="true">
        <ArrowDown size={15} />
      </div>
    </section>
  );
}
