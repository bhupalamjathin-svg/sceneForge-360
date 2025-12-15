import { useEffect } from "react";

export default function CursorParticles() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 9999,
      pointerEvents: "none",
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = [];
    const colors = ["#67d7ff", "#7aa9ff", "#b78cff", "#5ef2ff", "#7cf5d2"];

    function spawn(x, y) {
      for (let i = 0; i < 4; i++) {
        particles.push({
          x,
          y,
          size: Math.random() * 4 + 3,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 1.7,
          vy: (Math.random() - 0.5) * 1.7,
        });
      }
    }

    window.addEventListener("mousemove", (e) => spawn(e.clientX, e.clientY));

    function animate() {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
        p.size *= 0.96;

        if (p.alpha <= 0) particles.splice(i, 1);

        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.floor(p.alpha * 255).toString(16)}`;
        ctx.globalCompositeOperation = "lighter";
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    return () => document.body.removeChild(canvas);
  }, []);

  return null;
}
