import { useEffect, useRef } from "react";

export function StarField({ paused = false, reducedMotion = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let stars = [];
    const saveData = navigator.connection?.saveData;
    const isCompact = window.matchMedia("(max-width: 760px)").matches;
    const starCount = reducedMotion || saveData ? 42 : isCompact ? 64 : 118;

    const buildStars = () => {
      stars = Array.from({ length: starCount }, (_, index) => ({
        x: (Math.sin(index * 812.37) * 0.5 + 0.5) * width,
        y: (Math.sin(index * 437.11 + 1.7) * 0.5 + 0.5) * height,
        size: 0.45 + ((index * 17) % 11) / 12,
        alpha: 0.18 + ((index * 29) % 17) / 28,
        speed: 0.00035 + ((index * 7) % 9) * 0.00005,
      }));
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildStars();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      stars.forEach((star, index) => {
        const pulse = reducedMotion
          ? 0.8
          : 0.62 + Math.sin(time * star.speed + index) * 0.28;
        context.beginPath();
        context.fillStyle = `rgba(210, 225, 255, ${star.alpha * pulse})`;
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fill();
      });

      if (!paused && !reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [paused, reducedMotion]);

  return <canvas ref={canvasRef} className="star-field" aria-hidden="true" />;
}
