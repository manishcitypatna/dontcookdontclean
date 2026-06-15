"use client";

import { useEffect, useRef } from "react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(startVideo);
    } else {
      setTimeout(startVideo, 100);
    }
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      poster="/images/hero_poster.avif"
      aria-hidden="true"
      preload="metadata"
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    >
      <source src="/images/hero_Video.mp4" type="video/mp4" />
      <track kind="captions" srcLang="en" label="English" default />
    </video>
  );
}
