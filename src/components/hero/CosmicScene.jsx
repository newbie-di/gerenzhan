import { motion, useSpring, useTransform } from "framer-motion";
import portalForeground from "../../assets/images/hero/hero-cosmic-portal.webp";
import { StarField } from "./StarField.jsx";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo.jsx";

const sceneTransition = { duration: 0.95, ease: [0.76, 0, 0.24, 1] };

export function CosmicScene({ phase, pointerX, pointerY, paused, reducedMotion }) {
  const smoothX = useSpring(pointerX, { stiffness: 45, damping: 22, mass: 0.8 });
  const smoothY = useSpring(pointerY, { stiffness: 45, damping: 22, mass: 0.8 });
  const backgroundX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const backgroundY = useTransform(smoothY, [-1, 1], [-3, 3]);
  const portalX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const portalY = useTransform(smoothY, [-1, 1], [-13, 13]);

  const isPortal = phase === "portal";
  const isTransitioning = phase === "transitioning";
  const isReset = phase === "reset";

  return (
    <div className="cosmic-scene" aria-hidden="true">
      <motion.div className="cosmic-scene__background" style={{ x: backgroundX, y: backgroundY }}>
        <motion.div
          className="cosmic-scene__background-motion"
          animate={{
            scale: reducedMotion ? 1.04 : isPortal || isReset ? 1.04 : 1.11,
            opacity: 1,
          }}
          transition={isReset ? { duration: 0.18 } : sceneTransition}
        >
          <HeroBackgroundVideo paused={paused} reducedMotion={reducedMotion} />
        </motion.div>
      </motion.div>

      <StarField paused={paused} reducedMotion={reducedMotion} />

      <motion.div className="cosmic-scene__portal" style={{ x: portalX, y: portalY }}>
        <motion.img
          src={portalForeground}
          alt=""
          draggable="false"
          animate={{
            scale: reducedMotion ? 1 : isPortal ? 1 : isTransitioning ? 2.7 : isReset ? 1 : 2.7,
            opacity: reducedMotion ? 1 : isPortal ? 1 : isReset ? 0 : 0,
          }}
          transition={isReset ? { duration: 0.16 } : sceneTransition}
        />
      </motion.div>

      <div className="cosmic-scene__shade" />
      <div className="cosmic-scene__grain" />
    </div>
  );
}
