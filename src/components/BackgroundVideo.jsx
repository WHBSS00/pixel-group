'use client';
import { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo({ opacity = 0.3, className = '' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = 0;
    let height = 0;

    // Grid configuration
    const countX = 45;
    const countY = 30;
    const gapX = 55;
    const gapY = 55;

    // 3D camera settings
    const focalLength = 350;
    const distance = 450;
    const tiltAngle = 0.95; // ~55 degrees forward tilt
    const cosT = Math.cos(tiltAngle);
    const sinT = Math.sin(tiltAngle);

    // Resize handler
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse movement listener
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Normalize mouse coords to [-0.5, 0.5]
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current.targetY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      time += 0.015;

      const centerX = width / 2 + mouse.x * 100;
      const centerY = height / 2.3 + mouse.y * 50;

      // Draw all grid dots
      for (let ix = 0; ix < countX; ix++) {
        for (let iy = 0; iy < countY; iy++) {
          // Centered grid coords
          const gridX = (ix - countX / 2) * gapX;
          const gridY = (iy - countY / 2) * gapY;

          // Compute Z height with sine waves
          // Two combined sine waves create a complex, natural water-like ripple
          const zHeight =
            Math.sin(ix * 0.2 + time) * 35 +
            Math.sin(iy * 0.25 + time * 1.3) * 20;

          // 3D Rotate around X axis
          const rotY = gridY * cosT - zHeight * sinT;
          const rotZ = gridY * sinT + zHeight * cosT;

          // Perspective Projection
          const scale = focalLength / (focalLength + rotZ + distance);
          const screenX = centerX + gridX * scale;
          const screenY = centerY + rotY * scale;

          // Render limits check
          if (screenX < 0 || screenX > width || screenY < 0 || screenY > height) {
            continue;
          }

          // Depth cueing for size and opacity
          // RotZ + distance is the actual distance from camera
          const currentDistance = rotZ + distance;
          const minDistance = distance - 55;
          const maxDistance = distance + 300;
          
          // Calculate normalized depth [0 = close, 1 = far]
          let depth = (currentDistance - minDistance) / (maxDistance - minDistance);
          depth = Math.max(0, Math.min(1, depth));

          // Opposing alpha and scale based on distance
          const dotOpacity = (1 - depth) * opacity;
          const radius = (1.2 - depth) * 2.5;

          if (dotOpacity <= 0) continue;

          // Draw the dot
          ctx.beginPath();
          ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
          // Spira Cobalt blue accent: #1A53D0 = rgb(26, 83, 208)
          ctx.fillStyle = `rgba(26, 83, 208, ${dotOpacity})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isMounted, opacity]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
