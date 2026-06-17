'use client';
import { useEffect, useRef } from 'react';
// import gsap from 'gsap'; // removed unused import

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // start animation
    container.classList.add('preloader-animate');
    const timeout = setTimeout(() => {
      onComplete && onComplete();
    }, 6000); // total duration
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <>
      <style jsx global>{`\n        .preloader-container {\n          position: fixed;\n          inset: 0;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          background: #f0f4f8;\n          overflow: hidden;\n          z-index: 9999;\n        }\n        .fluid {\n          position: absolute;\n          width: 120%;\n          height: 120%;\n          background: radial-gradient(circle at 50% 50%, #1a53d0, #1e3447);\n          filter: blur(80px);\n          animation: fluidMove 5s ease-in-out infinite;\n        }\n        @keyframes fluidMove {\n          0% { transform: translate(-10%, -10%) scale(1); }\n          50% { transform: translate(0, 0) scale(1.1); }\n          100% { transform: translate(-10%, -10%) scale(1); }\n        }\n        .title {\n          font-family: Helvetica, sans-serif;\n          font-weight: 900;\n          font-size: 3rem;\n          color: #1e3447;\n          text-align: center;\n          animation: titleFade 4s ease forwards;\n        }\n        .ikm {\n          font-family: Helvetica, sans-serif;\n          font-weight: 900;\n          font-size: 5rem;\n          color: #1e3447;\n          text-align: center;\n          position: absolute;\n          opacity: 0;\n          animation: ikmFade 4s ease forwards 2s;\n        }\n        @keyframes titleFade {\n          0% { opacity: 0; transform: translateY(20px); }\n          30% { opacity: 1; transform: translateY(0); }\n          70% { opacity: 1; }\n          100% { opacity: 0; transform: translateY(-20px); }\n        }\n        @keyframes ikmFade {\n          0% { opacity: 0; transform: translateY(20px); }\n          30% { opacity: 1; transform: translateY(0); }\n          70% { opacity: 1; }\n          100% { opacity: 0; transform: translateY(-20px); }\n        }\n        .preloader-animate {\n          animation: containerFadeOut 1s ease forwards 5s;\n        }\n        @keyframes containerFadeOut {\n          to { opacity: 0; visibility: hidden; transform: translateY(-100px); }\n        }\n      `}</style>
      <div ref={containerRef} className="preloader-container">
        <div className="fluid" />
        <h1 className="title">IDEA KREASI MEDIA</h1>
        <h1 className="ikm">IKM</h1>
      </div>
    </>
  );
}
