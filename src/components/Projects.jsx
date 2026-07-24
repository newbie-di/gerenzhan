import { motion } from "framer-motion";
import { ArrowUpRight, GitFork } from "lucide-react";
import { projects } from "../data/portfolioData.js";
import { SectionTitle } from "./SectionTitle.jsx";

export function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionTitle
          index="02"
          eyebrow="SELECTED WORK / 精选项目"
          title="把 AI 的可能性，做成可以感知的体验。"
          description="这些是目前用于展示方法与思考的占位项目，结构已经为后续真实案例预留。"
        />

        <div className="projects__list">
          {projects.map((project, index) => (
            <motion.article
              id={project.id}
              key={project.id}
              className={`project ${index % 2 ? "project--reverse" : ""}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                className="project__visual"
                data-border-glow="box"
                href={project.demoUrl}
                aria-label={`查看${project.title}`}
              >
                <img src={project.image} alt={project.imageAlt} />
                <span className="project__visual-index" data-border-glow="box">
                  PROJECT / {project.index}
                </span>
                <span className="project__visual-action" data-border-glow="box">
                  查看项目 <ArrowUpRight size={18} />
                </span>
              </a>

              <div className="project__content">
                <span className="eyebrow">{project.type}</span>
                <h3>{project.title}</h3>
                <p className="project__summary">{project.summary}</p>
                <p className="project__highlight" data-border-glow="left">
                  {project.highlight}
                </p>
                <ul className="project__tech" aria-label="使用技术">
                  {project.technologies.map((technology) => (
                    <li key={technology} data-border-glow="box">
                      {technology}
                    </li>
                  ))}
                </ul>
                <div className="project__actions">
                  <a href={project.demoUrl} data-border-glow="bottom">
                    项目交流 <ArrowUpRight size={16} />
                  </a>
                  <a
                    href={project.repoUrl}
                    data-border-glow="bottom"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitFork size={16} /> GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
