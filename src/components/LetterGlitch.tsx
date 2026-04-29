import { useEffect, useRef } from "react";

const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]{}<>?/\\|=+-_~";

type LetterGlitchProps = {
  className?: string;
  textColor?: string;
  glowColor?: string;
  backgroundColor?: string;
};

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const LetterGlitch = ({
  className,
  textColor = "rgba(70, 255, 130, 0.85)",
  glowColor = "rgba(120, 255, 170, 0.28)",
  backgroundColor = "#031106",
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let animationFrameId = 0;
    const fontSize = 15;
    let drops: number[] = [];
    let lastTimestamp = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const columns = Math.max(1, Math.ceil(width / fontSize));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      context.textBaseline = "top";

      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * Math.ceil(height / fontSize)),
      );
    };

    resize();

    const draw = (timestamp: number) => {
      if (timestamp - lastTimestamp < 45) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTimestamp = timestamp;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const columns = Math.max(1, Math.ceil(width / fontSize));

      context.fillStyle = `${backgroundColor}26`;
      context.fillRect(0, 0, width, height);

      for (let col = 0; col < columns; col += 1) {
        const x = col * fontSize;
        const y = drops[col] * fontSize;

        context.fillStyle = glowColor;
        context.fillRect(x, y, fontSize, fontSize);

        context.fillStyle = "rgba(205, 255, 225, 0.95)";
        context.fillText(randomGlyph(), x + 1, y);

        context.fillStyle = textColor;
        context.fillText(randomGlyph(), x + 1, y + fontSize);

        if (y > height && Math.random() > 0.965) {
          drops[col] = 0;
        }

        drops[col] += 1 + Math.floor(Math.random() * 2);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [backgroundColor, glowColor, textColor]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default LetterGlitch;