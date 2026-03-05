import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { id: 'hero', label: 'Start' },
    { id: 'mission', label: 'Mission' },
    { id: 'scramjet', label: 'Scramjet' },
    { id: 'specs', label: 'Technik' },
    { id: 'timeline', label: 'Zeitlinie' },
    { id: 'gallery', label: 'Galerie' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);

      // Update progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / docHeight;
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: progress,
          duration: 0.1,
          ease: 'none'
        });
      }

      // Update active section
      navLinks.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: section, offsetY: 80 },
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <nav ref={navRef} className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-bg"></div>
      
      <div className="nav-content">
        <div className="nav-brand">
          <span className="brand-nasa">NASA</span>
          <span className="brand-divider"></span>
          <span className="brand-hyper">HYPER</span>
          <span className="brand-x">-X</span>
          <span className="brand-year">1996–2004</span>
        </div>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollToSection(link.id)}
              >
                <span className="link-indicator"></span>
                <span className="link-text">{link.label}</span>
                <span className="link-hover"></span>
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-status">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>

      <div className="nav-progress">
        <div ref={progressRef} className="progress-bar"></div>
      </div>

      <div className="nav-decorations">
        <div className="nav-corner nav-corner-left"></div>
        <div className="nav-corner nav-corner-right"></div>
      </div>
    </nav>
  );
};

export default Navigation;
