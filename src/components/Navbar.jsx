import { useEffect, useState } from "react";
import { Menu, Pause, Play, Sparkles, X } from "lucide-react";

const navItems = [
  { label: "首页", href: "#home" },
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "优势", href: "#strengths" },
  { label: "联系", href: "#contact" },
];

export function Navbar({ paused, onTogglePause }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      data-border-glow="bottom"
    >
      <div className="navbar__inner">
        <a className="navbar__brand" href="#home" aria-label="返回首页">
          JD<span>.</span>
        </a>

        <div className="navbar__mark" aria-hidden="true">
          <Sparkles size={18} strokeWidth={1.5} />
        </div>

        <nav className="navbar__links" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            className="icon-button navbar__motion-toggle"
            data-border-glow="box"
            type="button"
            onClick={onTogglePause}
            aria-label={paused ? "播放首屏动画" : "暂停首屏动画"}
            aria-pressed={paused}
          >
            {paused ? <Play size={17} /> : <Pause size={17} />}
          </button>
          <button
            className="icon-button navbar__menu-button"
            data-border-glow="box"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}
        data-border-glow="left"
      >
        <nav aria-label="移动端导航">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              data-border-glow="bottom"
              onClick={closeMenu}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
