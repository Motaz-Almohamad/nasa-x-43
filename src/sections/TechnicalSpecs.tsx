import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TechnicalSpecs.css';

gsap.registerPlugin(ScrollTrigger);

interface SpecCategory {
  title: string;
  icon: string;
  specs: { key: string; value: string }[];
}

const specCategories: SpecCategory[] = [
  {
    title: 'Abmessungen',
    icon: '📐',
    specs: [
      { key: 'Länge', value: '3,66 m (12 ft)' },
      { key: 'Spannweite', value: '1,52 m (5 ft)' },
      { key: 'Höhe', value: '0,61 m (2 ft)' },
      { key: 'Flügelfläche', value: '0,93 m²' },
    ]
  },
  {
    title: 'Gewicht',
    icon: '⚖️',
    specs: [
      { key: 'Leergewicht', value: '1.270 kg' },
      { key: 'Max. Startgewicht', value: '1.400 kg' },
      { key: 'Treibstoff', value: 'Hydrogen (H₂)' },
      { key: 'Tankkapazität', value: '~35 kg' },
    ]
  },
  {
    title: 'Antrieb',
    icon: '🔥',
    specs: [
      { key: 'Triebwerk', value: 'Scramjet (SJX61-1)' },
      { key: 'Brenndauer', value: '~11 Sekunden' },
      { key: 'Schub', value: 'Klassifiziert' },
      { key: 'Treibstoffsystem', value: 'Kryogener Wasserstoff' },
    ]
  },
  {
    title: 'Leistung',
    icon: '⚡',
    specs: [
      { key: 'Max. Geschwindigkeit', value: 'Mach 9.6 (11.760 km/h)' },
      { key: 'Reisegeschwindigkeit', value: 'Mach 7+ (8.600 km/h)' },
      { key: 'Dienstgipfelhöhe', value: '29.000 m (95.000 ft)' },
      { key: 'Reichweite', value: '~1.500 km' },
    ]
  },
  {
    title: 'Struktur',
    icon: '🏗️',
    specs: [
      { key: 'Rumpfmaterial', value: 'Nickel-Basislegierung' },
      { key: 'Hitzeschild', value: 'Aktive Kühlung + Keramik' },
      { key: 'Flügelprofil', value: 'Wedge-Integration' },
      { key: 'Steuerung', value: 'Aerodynamisch + RCS' },
    ]
  },
  {
    title: 'Avionik',
    icon: '📡',
    specs: [
      { key: 'Navigation', value: 'INS + GPS' },
      { key: 'Telemetrie', value: 'S-Band + C-Band' },
      { key: 'Datenrate', value: '10 Mbps' },
      { key: 'Flugcomputer', value: 'Redundant (3x)' },
    ]
  },
];

const TechnicalSpecs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.specs-header',
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

      // Tabs animation
      gsap.fromTo('.spec-tab',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.specs-tabs',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Content animation
      gsap.fromTo('.specs-content',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.specs-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    
    gsap.to('.specs-panel', {
      opacity: 0,
      x: index > activeTab ? -30 : 30,
      duration: 0.3,
      onComplete: () => {
        setActiveTab(index);
        gsap.fromTo('.specs-panel',
          { opacity: 0, x: index > activeTab ? 30 : -30 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }
        );
      }
    });
  };

  return (
    <section ref={sectionRef} id="specs" className="technical-specs">
      <div className="specs-bg">
        <div className="bg-radial"></div>
        <div className="bg-grid"></div>
        <div className="bg-lines"></div>
      </div>

      <div className="specs-container">
        {/* Header */}
        <div className="specs-header">
          <div className="section-tag">
            <span></span>
            Technische Daten
            <span></span>
          </div>
          <h2 className="section-title">
            Spezifikationen <span>& Details</span>
          </h2>
          <p className="specs-subtitle">
            Umfassende technische Details des NASA X-43A Hyper-X Forschungsflugzeugs
          </p>
        </div>

        {/* Tabs */}
        <div className="specs-tabs">
          {specCategories.map((cat, index) => (
            <button
              key={index}
              className={`spec-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabChange(index)}
            >
              <span className="tab-icon">{cat.icon}</span>
              <span className="tab-label">{cat.title}</span>
              <span className="tab-indicator"></span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="specs-content">
          <div className="specs-panel">
            <div className="panel-header">
              <span className="panel-icon">{specCategories[activeTab].icon}</span>
              <h3>{specCategories[activeTab].title}</h3>
              <div className="panel-line"></div>
            </div>
            
            <div className="panel-grid">
              {specCategories[activeTab].specs.map((spec, index) => (
                <div key={index} className="spec-item">
                  <div className="spec-item-inner">
                    <span className="item-key">{spec.key}</span>
                    <span className="item-value">{spec.value}</span>
                    <div className="item-glow"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Info */}
          <div className="specs-side">
            <div className="side-card comparison">
              <h4>Geschwindigkeitsvergleich</h4>
              <div className="comparison-bars">
                <div className="comp-bar">
                  <span className="bar-label">Concorde</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '22%' }}></div>
                  </div>
                  <span className="bar-value">Mach 2.04</span>
                </div>
                <div className="comp-bar">
                  <span className="bar-label">SR-71</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '35%' }}></div>
                  </div>
                  <span className="bar-value">Mach 3.3</span>
                </div>
                <div className="comp-bar highlight">
                  <span className="bar-label">X-43A</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '100%' }}></div>
                  </div>
                  <span className="bar-value">Mach 9.6</span>
                </div>
              </div>
            </div>

            <div className="side-card facts">
              <h4>Schnelle Fakten</h4>
              <ul className="facts-list">
                <li>
                  <span className="fact-dot"></span>
                  <span>3 Testflüge durchgeführt</span>
                </li>
                <li>
                  <span className="fact-dot"></span>
                  <span>2 erfolgreiche Scramjet-Zündungen</span>
                </li>
                <li>
                  <span className="fact-dot"></span>
                  <span>Weltrekord seit 2004 ungebrochen</span>
                </li>
                <li>
                  <span className="fact-dot"></span>
                  <span>Programmkosten: ~$230 Millionen</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Decorations */}
      <div className="specs-decorations">
        <div className="deco-hex"></div>
        <div className="deco-ring-outer"></div>
        <div className="deco-ring-inner"></div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;
