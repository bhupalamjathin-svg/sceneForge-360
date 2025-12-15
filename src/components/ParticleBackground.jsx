// src/components/ParticleBackground.jsx
import { useRef, useEffect } from "react";

export default function ParticleBackground({ tint = [120, 80, 255], intensity = 60 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let particles = [];

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function init() {
      particles = [];
      for (let i = 0; i < intensity; i++) {
        particles.push({
          x: rand(0, w),
          y: rand(0, h),
          r: rand(0.6, 2.6),
          vx: rand(-0.15, 0.15),
          vy: rand(-0.05, 0.05),
          alpha: rand(0.05, 0.5),
        });
      }
    }

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      init();
    }
    resize();
    window.addEventListener("resize", resize);

    let raf = null;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      // subtle gradient overlay
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, `rgba(${tint[0]}, ${tint[1]}, ${tint[2]}, 0.03)`);
      g.addColorStop(1, `rgba(255, 60, 140, 0.02)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${tint[0]}, ${tint[1]}, ${tint[2]}, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [tint, intensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
