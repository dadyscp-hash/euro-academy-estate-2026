"use client";

import { useEffect, useRef } from "react";

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animation = 0;
    const stars = Array.from({ length: 130 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.25,
      speed: Math.random() * 0.18 + 0.03,
      alpha: Math.random() * 0.55 + 0.2
    }));

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const gradient = context.createRadialGradient(window.innerWidth * 0.5, window.innerHeight * 0.25, 0, window.innerWidth * 0.5, window.innerHeight * 0.35, window.innerWidth);
      gradient.addColorStop(0, "rgba(91,63,255,0.13)");
      gradient.addColorStop(0.32, "rgba(255,138,61,0.08)");
      gradient.addColorStop(1, "rgba(2,2,4,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      for (const star of stars) {
        const x = star.x * window.innerWidth;
        const y = ((star.y * window.innerHeight + frame * star.speed) % window.innerHeight);
        context.beginPath();
        context.fillStyle = "rgba(245,247,250," + star.alpha + ")";
        context.arc(x, y, star.r, 0, Math.PI * 2);
        context.fill();
      }
      animation = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 -z-20 h-screen w-screen bg-void" aria-hidden="true" />
      <div className="cosmic-grid fixed inset-0 -z-10 opacity-60" aria-hidden="true" />
    </>
  );
}
