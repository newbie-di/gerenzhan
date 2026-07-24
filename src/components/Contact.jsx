import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight, ContactRound, GitFork, Mail } from "lucide-react";
import spaceBackground from "../assets/images/hero/hero-space-background.webp";
import { profile, socialLinks } from "../data/portfolioData.js";
import { SectionTransition } from "./SectionTransition.jsx";

const icons = { mail: Mail, github: GitFork, linkedin: ContactRound };

export function Contact() {
  const reduceMotion = useReducedMotion();
  const lineReveal = {
    hidden: { opacity: 0, y: "86%", rotate: 1.2 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  };

  return (
    <section id="contact" className="contact">
      <img className="contact__background" src={spaceBackground} alt="" aria-hidden="true" />
      <div className="contact__shade" />
      <SectionTransition />

      <div className="contact__inner container">
        <motion.div
          className="contact__content"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.11 } },
          }}
        >
          <motion.span
            className="eyebrow"
            variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            04 / CONTACT / 保持连接
          </motion.span>
          <h2>
            <span className="contact__title-mask">
              <motion.span
                variants={lineReveal}
                transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
              >
                LET&apos;S BUILD
              </motion.span>
            </span>
            <span className="contact__title-mask">
              <motion.em
                variants={lineReveal}
                transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
              >
                SOMETHING WITH AI.
              </motion.em>
            </span>
          </h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            我正在探索 AI 领域，也欢迎有趣的项目合作与交流。
          </motion.p>

          <motion.a
            className="contact__mail"
            data-border-glow="top-bottom"
            href={`mailto:${profile.email}`}
            variants={{
              hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
              visible: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
            }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>
              <small>START A CONVERSATION</small>
              {profile.email}
            </span>
            <ArrowUpRight size={28} />
          </motion.a>
        </motion.div>

        <div className="contact__footer" data-border-glow="top">
          <div className="contact__socials">
            {socialLinks.map((link) => {
              const Icon = icons[link.icon];
              const external = !link.href.startsWith("mailto:");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                >
                  <Icon size={16} /> {link.label}
                </a>
              );
            })}
          </div>

          <p>Designed &amp; built by JD · © 2026</p>

          <a className="contact__top" href="#home" aria-label="返回页面顶部">
            BACK TO TOP <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
