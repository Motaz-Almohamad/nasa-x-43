import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const machRef = useRef<HTMLSpanElement>(null);
  const aircraftRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const [machValue, setMachValue] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 100, rotateX: -45 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.5, delay: 0.5, ease: 'power4.out' }
      );

      // Mach counter animation
      const machObj = { value: 0 };
      gsap.to(machObj, {
        value: 9.6,
        duration: 4,
        delay: 1,
        ease: 'power2.out',
        onUpdate: () => {
          setMachValue(Number(machObj.value.toFixed(1)));
        },
        onComplete: () => {
          // Screen shake at completion
          gsap.to(sectionRef.current, {
            x: 'random(-10, 10)',
            y: 'random(-5, 5)',
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            ease: 'none'
          });
        }
      });

      // Aircraft float animation
      gsap.to(aircraftRef.current, {
        y: -30,
        rotation: -2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Rings rotation
      gsap.to('.hero-ring-1', {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: 'none'
      });

      gsap.to('.hero-ring-2', {
        rotation: -360,
        duration: 18,
        repeat: -1,
        ease: 'none'
      });

      // Parallax on scroll
      gsap.to('.hero-bg-img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Content fade on scroll
      gsap.to('.hero-content', {
        opacity: 0,
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1
        }
      });

      // Velocity lines animation
      gsap.utils.toArray<HTMLElement>('.v-line').forEach((line, i) => {
        gsap.to(line, {
          x: -200,
          opacity: 0,
          duration: 1 + i * 0.2,
          repeat: -1,
          ease: 'none',
          delay: i * 0.3
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToMission = () => {
    const mission = document.getElementById('mission');
    if (mission) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: mission, offsetY: 80 },
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <section ref={sectionRef} id="hero" className="hero">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-bg-img">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/0a/X-43A_in_flight.jpg" 
            alt="X-43A in flight"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.opacity = '0';
            }}
          />
        </div>
        <div className="hero-bg-overlay"></div>
        <div className="hero-grid"></div>
        <div className="hero-scanlines"></div>
        <div className="hero-glow"></div>
      </div>

      {/* Shock cone effect */}
      <div className="shock-cone"></div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-left">
          {/* Tag */}
          <div className="hero-tag">
            <span className="tag-badge">Classified · Mission X-43A</span>
            <span className="tag-date">// 2004 · Edwards AFB</span>
          </div>

          {/* Title */}
          <h1 ref={titleRef} className="hero-title">
            <span className="title-x">X</span>-43
            <span className="title-a">A</span>
          </h1>

          <div className="hero-subtitle">Hypersonic</div>

          {/* Mach Display */}
          <div className="mach-display">
            <span className="mach-label">Mach</span>
            <span ref={machRef} className="mach-value">{machValue.toFixed(1)}</span>
            <span className="mach-unit">MACH</span>
          </div>

          {/* Description */}
          <p className="hero-desc">
            Das schnellste angetriebene Flugzeug der Welt. Am 16. November 2004
            erreichte das NASA X-43A Mach 9,6 — knapp 12.000 km/h — und schrieb
            mit dem ersten freien Scramjet-Flug Luftfahrtgeschichte.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">
            <button className="btn-primary" onClick={scrollToMission}>
              Mission ansehen
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <a href="#gallery" className="btn-secondary">
              Galerie
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-right">
          {/* Rings */}
          <div ref={ringsRef} className="hero-rings">
            <div className="hero-ring hero-ring-1"></div>
            <div className="hero-ring hero-ring-2"></div>
            <div className="hero-ring hero-ring-3"></div>
          </div>

          {/* Aircraft */}
          <div ref={aircraftRef} className="aircraft-container">
            <div className="heat-glow"></div>
            <div className="velocity-lines">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="v-line" style={{ 
                  top: `${20 + i * 15}%`,
                  width: `${80 + Math.random() * 60}px`,
                  animationDelay: `${i * 0.2}s`
                }}></div>
              ))}
            </div>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/0a/X-43A_in_flight.jpg" 
              alt="NASA X-43A"
              className="aircraft-img"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://upload.wikimedia.org/wikipedia/commons/8/84/X43a2_nasa_scramjet.jpg';
              }}
            />
          </div>

          {/* HUD Tags */}
          <div className="hud-tag hud-tag-tl">
            <span className="hud-label">Velocity</span>
            <span className="hud-value">12,144 KM/H</span>
          </div>
          <div className="hud-tag hud-tag-br">
            <span className="hud-label">Altitude MSL</span>
            <span className="hud-value">29,000 M</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hero-decorations">
        <div className="decoration-line line-1"></div>
        <div className="decoration-line line-2"></div>
        <div className="decoration-line line-3"></div>
        <div className="hex-grid"></div>
      </div>
    </section>
  );
};

export default Hero;
