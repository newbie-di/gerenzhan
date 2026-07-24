import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export function SectionTransition() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="section-transition container" aria-hidden="true">
      <motion.span
        className="section-transition__line"
        initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease }}
      />
      <motion.i
        className="section-transition__beam"
        initial={reduceMotion ? false : { opacity: 0, x: "-18%" }}
        whileInView={reduceMotion ? undefined : { opacity: [0, 0.72, 0], x: "118%" }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.05, delay: 0.12, ease }}
      />
    </div>
  );
}
