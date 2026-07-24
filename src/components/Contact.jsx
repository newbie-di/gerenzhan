import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, ContactRound, GitFork, Mail } from "lucide-react";
import spaceBackground from "../assets/images/hero/hero-space-background.webp";
import { profile, socialLinks } from "../data/portfolioData.js";

const icons = { mail: Mail, github: GitFork, linkedin: ContactRound };

export function Contact() {
  return (
    <section id="contact" className="contact">
      <img className="contact__background" src={spaceBackground} alt="" aria-hidden="true" />
      <div className="contact__shade" />

      <div className="contact__inner container">
        <motion.div
          className="contact__content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">04 / CONTACT / 保持连接</span>
          <h2>
            LET&apos;S BUILD
            <em>SOMETHING WITH AI.</em>
          </h2>
          <p>我正在寻找 AI 相关的工作机会，也欢迎有趣的项目合作与交流。</p>

          <a
            className="contact__mail"
            data-border-glow="top-bottom"
            href={`mailto:${profile.email}`}
          >
            <span>
              <small>START A CONVERSATION</small>
              {profile.email}
            </span>
            <ArrowUpRight size={28} />
          </a>
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
