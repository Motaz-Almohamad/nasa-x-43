import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Loader.css';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Ring animation
    tl.fromTo(ringRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
    );

    // Title glitch effect
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30, skewX: 20 },
      { opacity: 1, y: 0, skewX: 0, duration: 0.6, ease: 'power4.out' },
      '-=0.3'
    );

    // Subtitle typewriter
    tl.fromTo(subtitleRef.current,
      { width: 0, opacity: 1 },
      { width: 'auto', duration: 1.5, ease: 'steps(38)' },
      '-=0.2'
    );

    // Progress bar
    tl.fromTo(progressRef.current,
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 2.5, 
        ease: 'power2.inOut',
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        }
      },
      '-=1'
    );

    // Log fade in
    tl.fromTo(logRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=1.5'
    );

    // Exit animation
    tl.to(loaderRef.current, {
      y: '-100%',
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.5,
      onComplete: onComplete
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader-bg">
        <div className="loader-grid"></div>
        <div className="loader-scanlines"></div>
      </div>
      
      <div className="loader-content">
        <div ref={ringRef} className="loader-ring">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="rgba(0,229,255,0.3)" strokeWidth="2"/>
            <circle cx="40" cy="40" r="28" stroke="rgba(0,229,255,0.15)" strokeWidth="1"/>
            <text x="40" y="46" textAnchor="middle" fontSize="14" fontFamily="Orbitron" fill="white" fontWeight="900">NASA</text>
          </svg>
          <div className="ring-particles">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="ring-particle" style={{ 
                transform: `rotate(${i * 45}deg) translateX(45px)` 
              }} />
            ))}
          </div>
        </div>
        
        <div ref={titleRef} className="loader-title">
          <span className="title-x">X</span>-43<span className="title-a">A</span>
        </div>
        
        <div className="subtitle-container">
          <div ref={subtitleRef} className="loader-subtitle">
            HYPER-X · SCRAMJET RESEARCH · MACH 9.6
          </div>
        </div>
        
        <div className="progress-container">
          <div className="progress-track">
            <div ref={progressRef} className="progress-fill"></div>
          </div>
          <div className="progress-text">{progress}%</div>
        </div>
        
        <div ref={logRef} className="loader-log">
          <div className="log-line">
            <span className="log-timestamp">[00:00:00]</span>
            <span className="log-level info">INFO</span>
            <span className="log-message">System check: NOMINAL</span>
          </div>
          <div className="log-line">
            <span className="log-timestamp">[00:00:01]</span>
            <span className="log-level success">OK</span>
            <span className="log-message">Scramjet: ARMED</span>
          </div>
          <div className="log-line">
            <span className="log-timestamp">[00:00:02]</span>
            <span className="log-level success">OK</span>
            <span className="log-message">B-52 Carrier: READY</span>
          </div>
          <div className="log-line blink">
            <span className="log-timestamp">[00:00:03]</span>
            <span className="log-level warn">WAIT</span>
            <span className="log-message">Flight data uplink... LOADING</span>
          </div>
        </div>
      </div>
      
      <div className="loader-decorations">
        <div className="corner corner-tl"></div>
        <div className="corner corner-tr"></div>
        <div className="corner corner-bl"></div>
        <div className="corner corner-br"></div>
        <div className="hex-pattern"></div>
      </div>
    </div>
  );
};

export default Loader;
