import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import heroVideo from "../../assets/video/hero-background-balanced.m4v";
import maleFrame50 from "../../assets/video/male-keyframe-50.webp";
import maleFrame60 from "../../assets/video/male-keyframe-60.webp";
import maleFrame70 from "../../assets/video/male-keyframe-70.webp";

const replacementFrames = [
  { id: "male-50", image: maleFrame50, from: 5.05, to: 6.45, x: 0, y: 0 },
  { id: "male-60", image: maleFrame60, from: 6.45, to: 7.72, x: -0.8, y: -0.5 },
  { id: "male-70", image: maleFrame70, from: 7.72, to: 9.18, x: 0.7, y: -0.3 },
];

function getReplacementFrame(time) {
  return replacementFrames.find((frame) => time >= frame.from && time < frame.to) ?? null;
}

export function HeroBackgroundVideo({ paused, reducedMotion }) {
  const videoRef = useRef(null);
  const activeFrameRef = useRef(null);
  const [activeFrameId, setActiveFrameId] = useState(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const captureMode =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("capture");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || videoFailed) return undefined;

    if (paused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }

    return undefined;
  }, [paused, reducedMotion, videoFailed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || videoFailed) return undefined;

    let callbackId;
    const syncReplacement = () => {
      const nextFrame = getReplacementFrame(video.currentTime)?.id ?? null;
      if (activeFrameRef.current !== nextFrame) {
        activeFrameRef.current = nextFrame;
        setActiveFrameId(nextFrame);
      }

      if (typeof video.requestVideoFrameCallback === "function") {
        callbackId = video.requestVideoFrameCallback(syncReplacement);
      }
    };

    const onTimeUpdate = () => syncReplacement();

    if (typeof video.requestVideoFrameCallback === "function") {
      callbackId = video.requestVideoFrameCallback(syncReplacement);
    } else {
      video.addEventListener("timeupdate", onTimeUpdate);
    }

    return () => {
      if (callbackId && typeof video.cancelVideoFrameCallback === "function") {
        video.cancelVideoFrameCallback(callbackId);
      }
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [reducedMotion, videoFailed]);

  if (reducedMotion || videoFailed || captureMode) {
    return (
      <div className="hero-video-scene hero-video-scene--static">
        <img src={maleFrame70} alt="" draggable="false" />
      </div>
    );
  }

  return (
    <div className="hero-video-scene" data-replacement={activeFrameId ?? undefined}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={maleFrame70}
        onCanPlay={(event) => {
          if (!paused) event.currentTarget.play().catch(() => {});
        }}
        onError={() => setVideoFailed(true)}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <motion.div
        className="hero-video-scene__replacement-bed"
        animate={{ opacity: activeFrameId ? 1 : 0 }}
        transition={{ duration: 0.08 }}
      />

      {replacementFrames.map((frame) => (
        <motion.img
          key={frame.id}
          className="hero-video-scene__replacement"
          src={frame.image}
          alt=""
          draggable="false"
          animate={
            activeFrameId === frame.id
              ? {
                  opacity: 1,
                  scale: 1.015,
                  x: `${frame.x + 0.45}%`,
                  y: `${frame.y - 0.25}%`,
                }
              : { opacity: 0, scale: 1.055, x: `${frame.x}%`, y: `${frame.y}%` }
          }
          transition={{
            opacity: { duration: 0.12 },
            scale: {
              duration: activeFrameId === frame.id ? frame.to - frame.from : 0.16,
              ease: activeFrameId === frame.id ? "linear" : [0.22, 1, 0.36, 1],
            },
            x: {
              duration: activeFrameId === frame.id ? frame.to - frame.from : 0.16,
              ease: "linear",
            },
            y: {
              duration: activeFrameId === frame.id ? frame.to - frame.from : 0.16,
              ease: "linear",
            },
          }}
        />
      ))}

      <div className="hero-video-scene__veil" />
    </div>
  );
}
