import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Scramjet.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '3,3', unit: 'km/s', label: 'Geschwindigkeit' },
  { value: '~1600', unit: '°C', label: 'Oberflächentemp.' },
  { value: 'H₂', unit: '', label: 'Treibstoff' },
];

const Scramjet = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.scramjet-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Main image reveal
      gsap.fromTo('.scramjet-visual',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Left content
      gsap.fromTo('.scramjet-left',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Right stats
      gsap.fromTo('.stat-card',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Parallax on image
      gsap.to('.scramjet-image', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Engine diagram animation
      gsap.to('.engine-particle', {
        motionPath: {
          path: '.engine-path',
          align: '.engine-path',
          alignOrigin: [0.5, 0.5]
        },
        duration: 2,
        repeat: -1,
        ease: 'none',
        stagger: 0.3
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="scramjet" className="scramjet">
      <div className="scramjet-bg">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="scramjet-container">
        {/* Header */}
        <div className="scramjet-header">
          <div className="section-tag">
            <span></span>
            Antrieb
            <span></span>
          </div>
          <h2 className="section-title">
            Scramjet <span>Engine</span>
          </h2>
        </div>

        {/* Main Visual */}
        <div className="scramjet-visual">
          <div className="visual-image">
            <img 
              className="scramjet-image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/X-43A_%28Hyper_-_X%29_Mach_7_Sep_2002.jpg/1200px-X-43A_%28Hyper_-_X%29_Mach_7_Sep_2002.jpg"
              alt="X-43A Scramjet"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://upload.wikimedia.org/wikipedia/commons/0/0a/X-43A_in_flight.jpg';
              }}
            />
          </div>
          
          <div className="visual-overlay">
            <div className="overlay-left"></div>
            <div className="overlay-right"></div>
            <div className="overlay-bottom"></div>
          </div>

          {/* Left Content */}
          <div className="scramjet-left">
            <h3 className="left-title">
              Mach 9.6<br />Weltrekord
            </h3>
            <div className="left-info">
              <p className="info-date">16. Nov. 2004</p>
              <p className="info-detail">Free-flight scramjet ignition</p>
              <p className="info-detail">~11 Sekunden Schub · H₂-betrieben</p>
            </div>
            <div className="left-badge">
              <span className="badge-icon">⚡</span>
              <span className="badge-text">WELTREKORD</span>
            </div>
          </div>

          {/* Right Stats */}
          <div className="scramjet-right">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <span className="stat-value">{stat.value}<small>{stat.unit}</small></span>
                <span className="stat-label">{stat.label}</span>
                <div className="stat-glow"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Engine Diagram */}
        <div className="engine-diagram">
          <div className="diagram-header">
            <span className="diagram-tag">TECHNISCHE DARSTELLUNG</span>
            <h4>Scramjet-Prinzip</h4>
          </div>
          
          <div className="diagram-visual">
            <svg viewBox="0 0 800 200" className="engine-svg">
              {/* Engine outline */}
              <path 
                className="engine-outline"
                d="M 50 100 L 150 60 L 650 40 L 750 100 L 650 160 L 150 140 Z"
                fill="none"
                stroke="rgba(0, 229, 255, 0.3)"
                strokeWidth="2"
              />
              
              {/* Flow lines */}
              <path 
                className="engine-path"
                d="M 20 100 Q 100 100 200 90 Q 400 70 600 85 Q 700 100 780 100"
                fill="none"
                stroke="rgba(0, 229, 255, 0.1)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              
              {/* Compression section */}
              <rect x="150" y="50" width="150" height="100" fill="rgba(0, 229, 255, 0.05)" stroke="rgba(0, 229, 255, 0.2)" />
              <text x="225" y="145" textAnchor="middle" fill="rgba(0, 229, 255, 0.5)" fontSize="10" fontFamily="Share Tech Mono">KOMPRESSION</text>
              
              {/* Combustion section */}
              <rect x="320" y="45" width="200" height="110" fill="rgba(252, 61, 33, 0.05)" stroke="rgba(252, 61, 33, 0.2)" />
              <text x="420" y="150" textAnchor="middle" fill="rgba(252, 61, 33, 0.5)" fontSize="10" fontFamily="Share Tech Mono">VERBRENNUNG</text>
              
              {/* Nozzle section */}
              <rect x="540" y="55" width="150" height="90" fill="rgba(255, 179, 0, 0.05)" stroke="rgba(255, 179, 0, 0.2)" />
              <text x="615" y="140" textAnchor="middle" fill="rgba(255, 179, 0, 0.5)" fontSize="10" fontFamily="Share Tech Mono">DÜSE</text>
              
              {/* Flow particles */}
              <circle className="engine-particle" r="4" fill="var(--teal)">
                <animateMotion dur="2s" repeatCount="indefinite" path="M 20 100 Q 100 100 200 90 Q 400 70 600 85 Q 700 100 780 100" />
              </circle>
              <circle className="engine-particle" r="3" fill="var(--nasa-red)" opacity="0.7">
                <animateMotion dur="2s" begin="0.5s" repeatCount="indefinite" path="M 20 100 Q 100 100 200 90 Q 400 70 600 85 Q 700 100 780 100" />
              </circle>
              <circle className="engine-particle" r="3" fill="var(--amber)" opacity="0.7">
                <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M 20 100 Q 100 100 200 90 Q 400 70 600 85 Q 700 100 780 100" />
              </circle>
            </svg>
          </div>

          <div className="diagram-labels">
            <div className="label-item">
              <span className="label-num">01</span>
              <span className="label-text">Lufteinlass bei Hyperschallgeschwindigkeit</span>
            </div>
            <div className="label-item">
              <span className="label-num">02</span>
              <span className="label-text">Verdichtung durch Schrägstoßwellen</span>
            </div>
            <div className="label-item">
              <span className="label-num">03</span>
              <span className="label-text">Wasserstoffverbrennung</span>
            </div>
            <div className="label-item">
              <span className="label-num">04</span>
              <span className="label-text">Ausstoß durch Düse</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorations */}
      <div className="scramjet-decorations">
        <div className="deco-ring"></div>
        <div className="deco-particles">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scramjet;
