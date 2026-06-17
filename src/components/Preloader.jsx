'use client';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Start exit animation after 5.2 seconds
    const exitTimeout = setTimeout(() => {
      setExit(true);
    }, 5200);

    // Call onComplete after 6.0 seconds (allowing 800ms exit transition)
    const completeTimeout = setTimeout(() => {
      onComplete && onComplete();
    }, 6000);

    return () => {
      clearTimeout(exitTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  const text = "IDEA KREASI MEDIA";

  return (
    <>
      <style jsx global>{`
        .preloader-container {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--color-background, #faf9f6);
          overflow: hidden;
          z-index: 99999;
          transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1), opacity 0.8s cubic-bezier(0.7, 0, 0.3, 1);
        }
        .preloader-container.exit {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }
        /* Blobs Container */
        .blobs-wrapper {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          opacity: 0;
        }
        .blob-1 {
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(26, 83, 208, 0.45) 0%, transparent 70%); /* Cobalt Blue */
          filter: blur(50px);
          animation: blobIntro1 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, blobFloat1 10s ease-in-out infinite alternate 1.2s;
        }
        .blob-2 {
          width: 380px;
          height: 580px;
          background: radial-gradient(circle, rgba(125, 211, 252, 0.55) 0%, transparent 70%); /* Soft Ice Blue */
          filter: blur(60px);
          animation: blobIntro2 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, blobFloat2 12s ease-in-out infinite alternate 1.4s;
        }
        .blob-3 {
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(30, 52, 71, 0.35) 0%, transparent 70%); /* Deep Slate Navy */
          filter: blur(45px);
          animation: blobIntro3 1.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, blobFloat3 9s ease-in-out infinite alternate 1.6s;
        }

        @keyframes blobIntro1 {
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes blobIntro2 {
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes blobIntro3 {
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes blobFloat1 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(220px, -150px) scale(1.35) rotate(120deg); }
          100% { transform: translate(-120px, 180px) scale(0.8) rotate(240deg); }
        }
        @keyframes blobFloat2 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-240px, 160px) scale(0.75) rotate(-180deg); }
          100% { transform: translate(150px, -220px) scale(1.3) rotate(-360deg); }
        }
        @keyframes blobFloat3 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(180px, 180px) scale(1.25); }
          100% { transform: translate(-180px, -180px) scale(0.75); }
        }

        /* Content elements */
        .preloader-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .title-wrapper {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          font-family: var(--font-helvetica, 'Inter', sans-serif);
          font-weight: 900;
          text-transform: uppercase;
          font-size: 2.2rem;
          color: var(--color-primary, #1e3447);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) {
          .title-wrapper {
            font-size: 3.5rem;
          }
        }
        .char-wrapper {
          display: flex;
          overflow: hidden;
        }
        .char {
          display: inline-block;
          opacity: 0;
          filter: blur(16px);
          transform: translateY(20px) scale(0.9);
          animation: charReveal 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes charReveal {
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0) scale(1);
          }
        }
        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-accent, #1a53d0);
          margin-left: 2px;
          margin-bottom: 4px;
          transform: scale(0);
          animation: dotReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 2.8s;
        }
        @media (min-width: 768px) {
          .dot {
            width: 12px;
            height: 12px;
            margin-left: 4px;
            margin-bottom: 6px;
          }
        }
        @keyframes dotReveal {
          to { transform: scale(1); }
        }

        .subtitle {
          font-family: var(--font-lato, 'Lato', sans-serif);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--color-primary, #1e3447);
          opacity: 0;
          transform: translateY(10px);
          animation: subtitleReveal 0.8s ease forwards 3.2s;
          margin-top: 0.5rem;
        }
        @media (min-width: 768px) {
          .subtitle {
            font-size: 0.85rem;
            letter-spacing: 0.5em;
          }
        }
        @keyframes subtitleReveal {
          to {
            opacity: 0.65;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className={`preloader-container ${exit ? 'exit' : ''}`}>
        <div className="blobs-wrapper">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        <div className="preloader-content">
          <div className="title-wrapper">
            {(() => {
              let globalCharIndex = 0;
              const words = text.split(' ');
              return words.map((word, wordIndex) => {
                const isLastWord = wordIndex === words.length - 1;
                return (
                  <span key={wordIndex} className="char-wrapper mr-3 last:mr-0">
                    {word.split('').map((char, charIndex) => {
                      const delay = 1.6 + globalCharIndex * 0.04;
                      globalCharIndex++;
                      const isLastChar = charIndex === word.length - 1;
                      return (
                        <span key={charIndex} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                          <span
                            className="char"
                            style={{ animationDelay: `${delay}s` }}
                          >
                            {char}
                          </span>
                          {isLastWord && isLastChar && (
                            <span className="dot" />
                          )}
                        </span>
                      );
                    })}
                  </span>
                );
              });
            })()}
          </div>
          <div className="subtitle">OOH Specialist &amp; Production House</div>
        </div>
      </div>
    </>
  );
}
