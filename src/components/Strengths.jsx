import { motion } from "framer-motion";
import {
  BrainCircuit,
  Palette,
  Rocket,
  Sparkles,
  Telescope,
  WandSparkles,
} from "lucide-react";
import { strengths } from "../data/portfolioData.js";
import { SectionTitle } from "./SectionTitle.jsx";

const icons = {
  brain: BrainCircuit,
  spark: Sparkles,
  palette: Palette,
  telescope: Telescope,
  wand: WandSparkles,
  rocket: Rocket,
};

export function Strengths() {
  return (
    <section id="strengths" className="section strengths">
      <div className="container">
        <SectionTitle
          index="03"
          eyebrow="CAPABILITIES / 个人优势"
          title="不是技能百分比，是解决问题的方式。"
          description="从学习、理解到表达和推进，这些能力共同构成我的工作方法。"
        />

        <motion.div
          className="strengths__grid"
          data-border-glow="box"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {strengths.map((strength) => {
            const Icon = icons[strength.icon];
            return (
              <motion.article
                key={strength.id}
                className="strength-card"
                data-border-glow="box"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="strength-card__top">
                  <Icon size={24} strokeWidth={1.35} />
                  <span>{strength.index}</span>
                </div>
                <h3>{strength.title}</h3>
                <p>{strength.description}</p>
                <div className="strength-card__keywords">
                  {strength.keywords.map((keyword) => (
                    <span key={keyword}>{keyword}</span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
