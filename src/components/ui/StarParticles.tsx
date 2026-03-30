import React, { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  density: number;
  color: string;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.baseX = this.x;
    this.baseY = this.y;
    this.size = Math.random() * 2 + 0.5;
    this.density = Math.random() * 20 + 2;
    // Make some stars electric lime, some cyan, most white to match theme
    const colors = ["#ffffff", "#ffffff", "#ffffff", "#ccff00", "#00ffff"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    // Subtle glow effect matches wow factor aesthetic
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
  }

  update(mouse: { x: number; y: number }) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;

    // Repulsion radius
    const maxDistance = 150;
    const force = (maxDistance - distance) / maxDistance;
    const directionX = forceDirectionX * force * this.density;
    const directionY = forceDirectionY * force * this.density;

    if (distance < maxDistance) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      // Slow return to base position (snap back like elastic)
      if (this.x !== this.baseX) {
        const dx_rtn = this.x - this.baseX;
        this.x -= dx_rtn / 10;
      }
      if (this.y !== this.baseY) {
        const dy_rtn = this.y - this.baseY;
        this.y -= dy_rtn / 10;
      }
    }
  }
}

const StarParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles: Particle[] = [];
    const particleCount = Math.floor((width * height) / 10000); // density

    const mouse = { x: -1000, y: -1000 };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw(ctx);
        particles[i].update(mouse);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default StarParticles;
