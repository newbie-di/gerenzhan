import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;
const MAX_TRAIL_POINTS = 118;
const POINT_SPACING = 9;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const shortestAngle = (from, to) => {
  let delta = to - from;
  while (delta > Math.PI) delta -= TAU;
  while (delta < -Math.PI) delta += TAU;
  return delta;
};

export function CursorFluidTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!canvas || !context || reducedMotion.matches || !finePointer.matches) {
      return undefined;
    }

    let frame = 0;
    let lastTime = performance.now();
    let lastPointer = null;
    let lastAngle = 0;
    let lastEddyTime = 0;
    let pageVisible = !document.hidden;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const trail = [];
    const eddies = [];

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const clear = () => {
      trail.length = 0;
      eddies.length = 0;
      lastPointer = null;
      context.clearRect(0, 0, width, height);
    };

    const drawEddies = () => {
      context.save();
      context.globalCompositeOperation = "screen";

      eddies.forEach((eddy) => {
        const easedLife = eddy.life * eddy.life;
        const radius = eddy.radius * (1.14 - eddy.life * 0.14);
        const gradient = context.createRadialGradient(
          eddy.x - radius * 0.18,
          eddy.y - radius * 0.12,
          radius * 0.03,
          eddy.x,
          eddy.y,
          radius,
        );

        gradient.addColorStop(0, `rgba(226, 192, 255, ${0.15 * easedLife})`);
        gradient.addColorStop(0.12, `rgba(169, 91, 255, ${0.1 * easedLife})`);
        gradient.addColorStop(0.44, `rgba(115, 48, 238, ${0.055 * easedLife})`);
        gradient.addColorStop(1, "rgba(66, 31, 174, 0)");

        context.save();
        context.translate(eddy.x, eddy.y);
        context.rotate(eddy.angle);
        context.scale(1.3, 0.76);
        context.translate(-eddy.x, -eddy.y);
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(eddy.x, eddy.y, radius, 0, TAU);
        context.fill();
        context.restore();
      });

      context.restore();
    };

    const drawRibbonLayer = ({
      widthScale,
      color,
      alpha,
      blur,
      driftScale,
    }) => {
      if (trail.length < 2) return;

      const visibleTrail = trail.filter((point) => point.life > 0);
      if (visibleTrail.length < 2) return;

      const renderedPoints = visibleTrail.map((point) => {
        const age = 1 - point.life;
        const phase = point.phase + age * point.turn;

        return {
          x: point.x + Math.cos(phase) * point.drift * age * driftScale,
          y: point.y + Math.sin(phase) * point.drift * age * driftScale,
        };
      });
      const meanLife =
        visibleTrail.reduce((sum, point) => sum + point.life, 0) /
        visibleTrail.length;
      const meanSize =
        visibleTrail.reduce(
          (sum, point) => sum + point.size * (0.82 + point.energy * 0.18),
          0,
        ) / visibleTrail.length;

      context.save();
      context.globalCompositeOperation = "screen";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.shadowColor = color.replace("<alpha>", "0.42");
      context.shadowBlur = blur;
      context.strokeStyle = color.replace(
        "<alpha>",
        `${alpha * clamp(meanLife + 0.18, 0, 1)}`,
      );
      context.lineWidth = meanSize * widthScale;
      context.beginPath();
      context.moveTo(renderedPoints[0].x, renderedPoints[0].y);

      for (let index = 1; index < renderedPoints.length - 1; index += 1) {
        const point = renderedPoints[index];
        const nextPoint = renderedPoints[index + 1];
        context.quadraticCurveTo(
          point.x,
          point.y,
          (point.x + nextPoint.x) * 0.5,
          (point.y + nextPoint.y) * 0.5,
        );
      }

      const finalPoint = renderedPoints[renderedPoints.length - 1];
      context.lineTo(finalPoint.x, finalPoint.y);
      context.stroke();
      context.restore();
    };

    const render = (now) => {
      frame = 0;
      if (!pageVisible) return;

      const delta = Math.min(34, now - lastTime);
      lastTime = now;
      context.clearRect(0, 0, width, height);

      for (let index = trail.length - 1; index >= 0; index -= 1) {
        const point = trail[index];
        point.life -= delta / point.decay;
        point.x += point.velocityX * delta;
        point.y += point.velocityY * delta;
        if (point.life <= 0) trail.splice(index, 1);
      }

      for (let index = eddies.length - 1; index >= 0; index -= 1) {
        const eddy = eddies[index];
        eddy.life -= delta / eddy.decay;
        eddy.angle += eddy.spin * delta * 0.00022;
        eddy.x += eddy.velocityX * delta;
        eddy.y += eddy.velocityY * delta;
        if (eddy.life <= 0) eddies.splice(index, 1);
      }

      drawEddies();
      drawRibbonLayer({
        widthScale: 1.9,
        color: "rgba(67, 30, 171, <alpha>)",
        alpha: 0.052,
        blur: 34,
        driftScale: 1.4,
      });
      drawRibbonLayer({
        widthScale: 1,
        color: "rgba(111, 49, 232, <alpha>)",
        alpha: 0.075,
        blur: 24,
        driftScale: 1,
      });
      drawRibbonLayer({
        widthScale: 0.42,
        color: "rgba(158, 82, 255, <alpha>)",
        alpha: 0.12,
        blur: 14,
        driftScale: 0.58,
      });
      drawRibbonLayer({
        widthScale: 0.052,
        color: "rgba(224, 194, 255, <alpha>)",
        alpha: 0.42,
        blur: 7,
        driftScale: 0.2,
      });

      if (trail.length || eddies.length) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const ensureFrame = () => {
      if (!frame && pageVisible) {
        lastTime = performance.now();
        frame = window.requestAnimationFrame(render);
      }
    };

    const addPoint = (x, y, speed, angle, distanceRatio) => {
      const energy = clamp(speed / 58, 0.24, 1);
      const perpendicularX = -Math.sin(angle);
      const perpendicularY = Math.cos(angle);
      const side = Math.sin(trail.length * 1.73) >= 0 ? 1 : -1;
      const drift = (16 + energy * 36) * side;

      trail.push({
        x,
        y,
        life: 1,
        decay: 1500 + energy * 1100,
        size: 58 + energy * 72 + distanceRatio * 18,
        energy,
        phase: angle + side * Math.PI * 0.5,
        turn: side * (1.2 + energy * 1.4),
        drift,
        velocityX: perpendicularX * side * (0.002 + energy * 0.004),
        velocityY: perpendicularY * side * (0.002 + energy * 0.004),
      });

      if (trail.length > MAX_TRAIL_POINTS) {
        trail.splice(0, trail.length - MAX_TRAIL_POINTS);
      }
    };

    const onPointerMove = (event) => {
      if (event.pointerType === "touch" || !pageVisible) return;

      const x = event.clientX;
      const y = event.clientY;
      if (!lastPointer) {
        lastPointer = { x, y, time: event.timeStamp };
        addPoint(x, y, 10, 0, 0);
        ensureFrame();
        return;
      }

      const deltaX = x - lastPointer.x;
      const deltaY = y - lastPointer.y;
      const distance = Math.hypot(deltaX, deltaY);
      if (distance < 1) return;

      const elapsed = Math.max(8, event.timeStamp - lastPointer.time);
      const speed = distance / (elapsed / 16.67);
      const angle = Math.atan2(deltaY, deltaX);
      const steps = Math.max(1, Math.ceil(distance / POINT_SPACING));

      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        addPoint(
          lastPointer.x + deltaX * progress,
          lastPointer.y + deltaY * progress,
          speed,
          angle,
          progress,
        );
      }

      const angleChange = Math.abs(shortestAngle(lastAngle, angle));
      if (
        event.timeStamp - lastEddyTime > 74 &&
        (angleChange > 0.14 || distance > 44)
      ) {
        const direction = shortestAngle(lastAngle, angle) >= 0 ? 1 : -1;
        const energy = clamp(speed / 54, 0.3, 1);
        eddies.push({
          x,
          y,
          life: 1,
          decay: 1700 + energy * 1300,
          radius: 74 + energy * 118,
          angle,
          spin: direction * (1.2 + energy * 2.2),
          velocityX: -Math.sin(angle) * direction * 0.004,
          velocityY: Math.cos(angle) * direction * 0.004,
        });
        if (eddies.length > 12) eddies.shift();
        lastEddyTime = event.timeStamp;
      }

      lastAngle = angle;
      lastPointer = { x, y, time: event.timeStamp };
      ensureFrame();
    };

    const onPointerOut = (event) => {
      if (!event.relatedTarget) lastPointer = null;
    };

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (!pageVisible) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        clear();
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (frame) window.cancelAnimationFrame(frame);
      clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-fluid-trail"
      aria-hidden="true"
    />
  );
}
