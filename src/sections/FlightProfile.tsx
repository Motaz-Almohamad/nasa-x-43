import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FlightProfile.css';

gsap.registerPlugin(ScrollTrigger);

const flightPhases = [
  {
    phase: '01',
    title: 'Start & Steigflug',
    time: 'T-0:00',
    altitude: '0 m',
    speed: '0 km/h',
    description: 'B-52 Stratofortress hebt mit dem X-43A unter dem Flügel von Edwards AFB ab.',
    details: ['Startgewicht: ~140 t', 'Besatzung: 5 Personen', 'Flugzeit zum Abwurf: ~1h']
  },
  {
    phase: '02',
    title: 'Abwurf & Freifall',
    time: 'T+1:00:00',
    altitude: '12.000 m',
    speed: '~900 km/h',
    description: 'Das X-43A wird in 12km Höhe abgeworfen und fällt 5 Sekunden frei.',
    details: ['Abwurfgeschwindigkeit: Mach 0.8', 'Freifall: 5 Sekunden', 'Stabilisierung durch RCS']
  },
  {
    phase: '03',
    title: 'Pegasus-Zündung',
    time: 'T+1:00:05',
    altitude: '11.500 m',
    speed: 'Mach 1.5 → Mach 5',
    description: 'Der Pegasus-Booster zündet und beschleunigt das X-43A auf Hyperschall.',
    details: ['Brenndauer: ~75 Sekunden', 'Max. Schub: ~500 kN', 'Steigwinkel: 60°']
  },
  {
    phase: '04',
    title: 'Trennung & Scramjet',
    time: 'T+1:01:30',
    altitude: '28.500 m',
    speed: 'Mach 5+',
    description: 'Trennung vom Booster und Zündung des Scramjet-Triebwerks.',
    details: ['Trennung bei Mach 5', 'Scramjet-Zündung', 'H₂-Einspritzung beginnt']
  },
  {
    phase: '05',
    title: 'Beschleunigung',
    time: 'T+1:01:35',
    altitude: '29.000 m',
    speed: 'Mach 5 → Mach 9.6',
    description: 'Das X-43A beschleunigt auf Rekordgeschwindigkeit von Mach 9.6.',
    details: ['Brenndauer: ~11 Sekunden', 'Beschleunigung: +2g', 'Oberflächentemp: ~1600°C']
  },
  {
    phase: '06',
    title: 'Gleitflug & Landung',
    time: 'T+1:02:00',
    altitude: '29.000 m → 0 m',
    speed: 'Mach 9.6 → 0',
    description: 'Nach Treibstoffende gleitet das X-43A kontrolliert ins Meer.',
    details: ['Gleitflug: ~15 Minuten', 'Gesamtstrecke: ~1.500 km', 'Ziel: Pazifik']
  },
];

const FlightProfile = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.profile-header',
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

      // Timeline line draw
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Phase cards
      gsap.fromTo('.phase-card',
        { opacity: 0, x: (i) => i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Dots animation
      gsap.fromTo('.phase-dot',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Altitude indicator
      gsap.to('.altitude-indicator', {
        y: '100%',
        duration: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flight-profile">
      <div className="profile-bg">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="section-tag">
            <span></span>
            Missionsprofil
            <span></span>
          </div>
          <h2 className="section-title">
            Flug <span>Phasen</span>
          </h2>
          <p className="profile-subtitle">
            Der komplette Ablauf eines X-43A Testflugs vom Start bis zur Landung
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="flight-timeline">
          {/* Center Line */}
          <div className="timeline-center">
            <div className="timeline-line"></div>
            <div className="altitude-track">
              <div className="altitude-indicator"></div>
            </div>
          </div>

          {/* Altitude Labels */}
          <div className="altitude-labels">
            <span>30.000m</span>
            <span>20.000m</span>
            <span>10.000m</span>
            <span>0m</span>
          </div>

          {/* Phases */}
          <div className="phases-container">
            {flightPhases.map((phase, index) => (
              <div 
                key={index} 
                className={`phase-card ${index % 2 === 0 ? 'left' : 'right'}`}
                style={{ top: `${index * 16.66}%` }}
              >
                <div className="phase-content">
                  <div className="phase-header">
                    <span className="phase-number">{phase.phase}</span>
                    <span className="phase-time">{phase.time}</span>
                  </div>
                  <h3 className="phase-title">{phase.title}</h3>
                  <p className="phase-desc">{phase.description}</p>
                  
                  <div className="phase-stats">
                    <div className="stat">
                      <span className="stat-label">Höhe</span>
                      <span className="stat-value">{phase.altitude}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Geschw.</span>
                      <span className="stat-value">{phase.speed}</span>
                    </div>
                  </div>

                  <ul className="phase-details">
                    {phase.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>

                <div className="phase-connector">
                  <div className="connector-line"></div>
                  <div className="phase-dot">
                    <div className="dot-inner"></div>
                    <div className="dot-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="flight-summary">
          <div className="summary-item">
            <span className="summary-value">~62</span>
            <span className="summary-unit">Min</span>
            <span className="summary-label">Gesamtdauer</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-value">1.500</span>
            <span className="summary-unit">km</span>
            <span className="summary-label">Gesamtstrecke</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-value">29</span>
            <span className="summary-unit">km</span>
            <span className="summary-label">Max. Höhe</span>
          </div>
        </div>
      </div>

      {/* Decorations */}
      <div className="profile-decorations">
        <div className="deco-plane">✈</div>
        <div className="deco-trail"></div>
      </div>
    </section>
  );
};

export default FlightProfile;
