import { useEffect, useRef, useCallback } from "react";

interface Shape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  driftX: number;
  driftY: number;
  type: number;
  opacity: number;
  strokeOnly: boolean;
}

const GeometricMotion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const shapesRef = useRef<Shape[]>([]);
  const timeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const initShapes = useCallback((w: number, h: number) => {
    const shapes: Shape[] = [];
    const count = Math.max(14, Math.floor((w * h) / 22000));
    for (let i = 0; i < count; i++) {
      shapes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 18 + Math.random() * 100,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        driftX: (Math.random() - 0.5) * 0.22,
        driftY: (Math.random() - 0.5) * 0.15,
        type: Math.floor(Math.random() * 4),
        opacity: 0.04 + Math.random() * 0.10,
        strokeOnly: Math.random() > 0.4,
      });
    }
    shapesRef.current = shapes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height };
      if (shapesRef.current.length === 0) {
        initShapes(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const drawShape = (s: Shape) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.lineWidth = 0.6;

      const fillC = `rgba(176,176,176,${s.opacity})`;
      const strokeC = `rgba(200,200,200,${s.opacity * (s.strokeOnly ? 2.2 : 0.7)})`;

      ctx.fillStyle = s.strokeOnly ? "transparent" : fillC;
      ctx.strokeStyle = strokeC;

      ctx.beginPath();
      switch (s.type) {
        case 0:
          ctx.rect(-s.size / 2, -s.size / 2, s.size, s.size);
          break;
        case 1:
          ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
          break;
        case 2:
          ctx.moveTo(0, -s.size / 2);
          ctx.lineTo(s.size / 2, s.size / 2);
          ctx.lineTo(-s.size / 2, s.size / 2);
          ctx.closePath();
          break;
        case 3:
          for (let j = 0; j < 6; j++) {
            const angle = (Math.PI / 3) * j - Math.PI / 2;
            const px = Math.cos(angle) * (s.size / 2);
            const py = Math.sin(angle) * (s.size / 2);
            if (j === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.closePath();
          break;
      }

      if (!s.strokeOnly) ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    const drawGrid = (t: number) => {
      const { w, h } = sizeRef.current;
      ctx.strokeStyle = "rgba(255,255,255,0.02)";
      ctx.lineWidth = 0.5;
      const spacing = 50;
      const offX = (t * 3) % spacing;
      const offY = (t * 2) % spacing;

      for (let x = -spacing + offX; x < w; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = -spacing + offY; y < h; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    };

    const drawConnectors = () => {
      const shapes = shapesRef.current;
      ctx.lineWidth = 0.3;
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[i].x - shapes[j].x;
          const dy = shapes[i].y - shapes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.1;
            ctx.strokeStyle = `rgba(200,200,200,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      const { w, h } = sizeRef.current;
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, w, h);

      drawGrid(timeRef.current);

      shapesRef.current.forEach((s) => {
        s.x += s.driftX;
        s.y += s.driftY;
        s.rotation += s.rotSpeed;
        if (s.x < -130) s.x = w + 70;
        if (s.x > w + 130) s.x = -70;
        if (s.y < -130) s.y = h + 70;
        if (s.y > h + 130) s.y = -70;
        drawShape(s);
      });

      drawConnectors();

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [initShapes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default GeometricMotion;
