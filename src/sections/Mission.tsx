import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Mission.css';

gsap.registerPlugin(ScrollTrigger);

const specs = [
  { key: 'Länge', value: '3,66 m' },
  { key: 'Gewicht', value: '1.270 kg' },
  { key: 'Antrieb', value: 'Hydrogen Scramjet' },
  { key: 'Max. Mach', value: '9.6 Mach', highlight: true },
  { key: 'Hersteller', value: 'Boeing Phantom Works' },
  { key: 'Programm', value: 'NASA Hyper-X · 1996–2004' },
];

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.mission-header',
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

      // Image reveal with clip-path
      gsap.fromTo(imageRef.current,
        { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        {
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Content stagger
      gsap.fromTo(contentRef.current?.querySelectorAll('.content-item') || [],
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Specs animation
      gsap.fromTo('.spec-row',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.specs-container',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Parallax on image
      gsap.to('.mission-image img', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="mission" className="mission">
      <div className="mission-bg">
        <div className="bg-grid"></div>
        <div className="bg-glow"></div>
      </div>

      <div className="mission-container">
        {/* Header */}
        <div className="mission-header">
          <div className="section-tag">
            <span></span>
            Mission
            <span></span>
          </div>
          <h2 className="section-title">
            Hyper-X <span>Research</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="mission-grid">
          {/* Image */}
          <div ref={imageRef} className="mission-image-wrapper">
            <div className="mission-image">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/X43a2_nasa_scramjet.jpg"
                alt="X-43A mit Pegasus-Booster"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://upload.wikimedia.org/wikipedia/commons/0/0a/X-43A_in_flight.jpg';
                }}
              />
            </div>
            <div className="image-frame">
              <div className="frame-corner tl"></div>
              <div className="frame-corner tr"></div>
              <div className="frame-corner bl"></div>
              <div className="frame-corner br"></div>
            </div>
            <div className="image-caption">
              X-43A / Pegasus Booster — Pre-Launch Config
            </div>
            <div className="image-overlay">
              <div className="overlay-scan"></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="mission-content">
            <h3 className="content-item mission-title">
              Das schnellste<br />Flugzeug der Erde
            </h3>
            
            <p className="content-item mission-desc">
              Das X-43A wurde im NASA Hyper-X-Programm entwickelt, um Scramjet-Antriebe
              im atmosphärischen Freiflug zu beweisen. Drei Testflüge — einer davon mit
              Mach 9,6 — revolutionierten die Hyperschalltechnik und öffneten das Tor
              zur nächsten Generation der Luftfahrt.
            </p>

            <div className="content-item specs-container">
              {specs.map((spec, index) => (
                <div key={index} className="spec-row">
                  <span className="spec-key">{spec.key}</span>
                  <span className={`spec-value ${spec.highlight ? 'highlight' : ''}`}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="content-item mission-quote">
              <blockquote>
                "Das X-43A hat bewiesen, dass luftatmende Hyperschallantriebe funktionieren."
              </blockquote>
              <cite>— NASA Dryden Flight Research Center</cite>
            </div>
          </div>
        </div>
      </div>

      {/* Decorations */}
      <div className="mission-decorations">
        <div className="deco-circle"></div>
        <div className="deco-line"></div>
        <div className="deco-dots">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="dot"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
