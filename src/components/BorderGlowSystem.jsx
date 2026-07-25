import { useEffect } from "react";

const selector = "[data-border-glow]";

export function BorderGlowSystem() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (reducedMotion.matches || !finePointer.matches) return undefined;

    let activeElement = null;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const clearActive = () => {
      if (!activeElement) return;
      activeElement.style.setProperty("--border-glow-alpha", "0");
      activeElement = null;
    };

    const renderGlow = () => {
      frame = 0;
      if (!activeElement?.isConnected) {
        clearActive();
        return;
      }

      const bounds = activeElement.getBoundingClientRect();
      const x = Math.max(0, Math.min(bounds.width, pointerX - bounds.left));
      const y = Math.max(0, Math.min(bounds.height, pointerY - bounds.top));
      const angle =
        (Math.atan2(y - bounds.height / 2, x - bounds.width / 2) * 180) / Math.PI + 90;

      activeElement.style.setProperty("--border-glow-x", `${x}px`);
      activeElement.style.setProperty("--border-glow-y", `${y}px`);
      activeElement.style.setProperty("--border-glow-angle", `${angle}deg`);
      activeElement.style.setProperty("--border-glow-alpha", "0.86");
    };

    const onPointerMove = (event) => {
      if (event.pointerType === "touch") return;

      const nextElement = event.target.closest?.(selector) ?? null;
      if (nextElement !== activeElement) {
        clearActive();
        activeElement = nextElement;
      }
      if (!activeElement) return;

      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(renderGlow);
    };

    const onPointerOut = (event) => {
      if (!event.relatedTarget) clearActive();
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      if (frame) window.cancelAnimationFrame(frame);
      clearActive();
    };
  }, []);

  return null;
}
