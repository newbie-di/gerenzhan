import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export function SectionTitle({ index, eyebrow, title, description }) {
  const reduceMotion = useReducedMotion();
  const staticState = reduceMotion ? false : undefined;

  return (
    <header className="section-heading">
      <motion.div
        className="section-heading__meta"
        initial={staticState ?? { opacity: 0, x: -16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.55, ease }}
      >
        <span>{index}</span>
        <span>{eyebrow}</span>
      </motion.div>
      <div className="section-heading__title-mask">
        <motion.h2
          initial={staticState ?? { opacity: 0, y: "72%", rotate: 1.2 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.88, delay: 0.06, ease }}
        >
          {title}
        </motion.h2>
      </div>
      {description ? (
        <motion.p
          initial={staticState ?? { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.62, delay: 0.22, ease }}
        >
          {description}
        </motion.p>
      ) : null}
    </header>
  );
}
