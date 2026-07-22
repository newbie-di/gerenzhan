import { motion } from "framer-motion";

export function SectionTitle({ index, eyebrow, title, description }) {
  return (
    <motion.header
      className="section-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-heading__meta">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </motion.header>
  );
}
