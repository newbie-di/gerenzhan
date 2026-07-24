import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GitFork, Mail, MapPin } from "lucide-react";
import profileVisual from "../assets/images/profile/profile-abstract.webp";
import { profile, stats } from "../data/portfolioData.js";
import { SectionTransition } from "./SectionTransition.jsx";
import { SectionTitle } from "./SectionTitle.jsx";

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="section about">
      <SectionTransition />
      <div className="container">
        <SectionTitle
          index="01"
          eyebrow="ABOUT / 关于我"
          title="在好奇心与行动之间，持续构建。"
          description="我把 AI 看作一种新的创作材料，也把每个项目看作理解真实问题的机会。"
        />

        <div className="about__grid">
          <motion.figure
            className="about__portrait"
            data-border-glow="box"
            initial={reduceMotion ? false : { opacity: 0, x: -28, scale: 0.975 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={profileVisual} alt="抽象玻璃质感人物视觉，代表 JD 的 AI 创作者身份" />
            <figcaption data-border-glow="top">
              <span>PORTRAIT / GENERATIVE STUDY</span>
              <span>2026</span>
            </figcaption>
            <div className="about__status" data-border-glow="box">
              <i />
              {profile.status}
            </div>
          </motion.figure>

          <motion.div
            className="about__content"
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">CURRENTLY / {profile.location}</span>
            <p className="about__lead">{profile.about}</p>
            <blockquote data-border-glow="left">“{profile.quote}”</blockquote>

            <div className="about__details">
              <div data-border-glow="top-bottom">
                <MapPin size={17} />
                <span>位置</span>
                <strong>{profile.location}</strong>
              </div>
              <a href={`mailto:${profile.email}`} data-border-glow="bottom">
                <Mail size={17} />
                <span>邮箱</span>
                <strong>{profile.email}</strong>
              </a>
              <a
                href={profile.github}
                data-border-glow="bottom"
                target="_blank"
                rel="noreferrer"
              >
                <GitFork size={17} />
                <span>GitHub</span>
                <strong>{profile.githubLabel}</strong>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="stats"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.45 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat"
              data-border-glow="box"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <span>0{index + 1}</span>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
