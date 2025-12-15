import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, t = 0;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      [60, 120, 255],
      [255, 80, 150],
      [140, 90, 255],
    ];

    function draw() {
      t += 0.003;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < 3; i++) {
        const [r, g, b] = colors[i];

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.08)`;
        ctx.beginPath();

        const waveHeight = 50 + i * 40;
        const speed = 1 + i * 0.4;

        ctx.moveTo(0, h * 0.3);

        for (let x = 0; x <= w; x += 5) {
          const y =
            Math.sin((x * 0.005) + (t * speed)) * waveHeight +
            Math.cos((x * 0.003) - (t * speed * 0.8)) * waveHeight * 0.6 +
            h * 0.45;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
