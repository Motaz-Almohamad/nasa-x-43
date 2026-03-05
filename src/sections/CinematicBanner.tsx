import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CinematicBanner.css';

gsap.registerPlugin(ScrollTrigger);

const CinematicBanner = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax image
      gsap.to(imageRef.current, {
        yPercent: -15,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Content reveal
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Label animation
      gsap.fromTo('.banner-label',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Quote animation
      gsap.fromTo('.banner-quote',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="cinematic-banner">
      <div className="banner-image-container">
        <img 
          ref={imageRef}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/X-43A_%28Hyper_-_X%29_Mach_7_Sep_2002.jpg/1200px-X-43A_%28Hyper_-_X%29_Mach_7_Sep_2002.jpg"
          alt="X-43A Mach 7 Test"
          className="banner-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://upload.wikimedia.org/wikipedia/commons/0/0a/X-43A_in_flight.jpg';
          }}
        />
      </div>
      
      <div className="banner-overlay">
        <div className="overlay-gradient"></div>
        <div className="overlay-scanlines"></div>
        <div className="overlay-vignette"></div>
      </div>
      
      <div ref={contentRef} className="banner-content">
        <div className="banner-label">
          <span className="label-line"></span>
          <span className="label-text">MACH 7 TEST · SEPTEMBER 2002 · PACIFIC OCEAN</span>
          <span className="label-line"></span>
        </div>
        
        <blockquote className="banner-quote">
          "The first free-flight demonstration of a hydrogen-fueled scramjet vehicle"
        </blockquote>
        
        <div className="banner-meta">
          <div className="meta-item">
            <span className="meta-value">Mach 7</span>
            <span className="meta-label">Erreichte Geschwindigkeit</span>
          </div>
          <div className="meta-divider"></div>
          <div className="meta-item">
            <span className="meta-value">27.03.2004</span>
            <span className="meta-label">Testdatum</span>
          </div>
        </div>
      </div>
      
      <div className="banner-decorations">
        <div className="deco-frame">
          <div className="frame-corner tl"></div>
          <div className="frame-corner tr"></div>
          <div className="frame-corner bl"></div>
          <div className="frame-corner br"></div>
        </div>
        <div className="deco-lines">
          <div className="h-line"></div>
          <div className="v-line"></div>
        </div>
      </div>
    </div>
  );
};

export default CinematicBanner;
