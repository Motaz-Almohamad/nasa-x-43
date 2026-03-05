import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './sections/Loader';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import StatsRibbon from './sections/StatsRibbon';
import CinematicBanner from './sections/CinematicBanner';
import Mission from './sections/Mission';
import Scramjet from './sections/Scramjet';
import TechnicalSpecs from './sections/TechnicalSpecs';
import FlightProfile from './sections/FlightProfile';
import Timeline from './sections/Timeline';
import Gallery from './sections/Gallery';
import Comparison from './sections/Comparison';
import Legacy from './sections/Legacy';
import Footer from './sections/Footer';
import Starfield from './components/Starfield';
import CustomCursor from './components/CustomCursor';
import HUDCorners from './components/HUDCorners';
import ShockFlash from './components/ShockFlash';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize scroll animations after loader
    const timer = setTimeout(() => {
      setIsLoaded(true);
      initScrollAnimations();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const initScrollAnimations = () => {
    // Parallax effects for images
    gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((img) => {
      gsap.to(img, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // Reveal animations
    gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Stagger reveals
    gsap.utils.toArray<HTMLElement>('.stagger-container').forEach((container) => {
      const children = container.querySelectorAll('.stagger-item');
      gsap.fromTo(children,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Horizontal scroll for gallery
    const galleryTrack = document.querySelector('.gallery-track');
    if (galleryTrack) {
      gsap.to(galleryTrack, {
        x: () => -(galleryTrack.scrollWidth - window.innerWidth + 100),
        ease: 'none',
        scrollTrigger: {
          trigger: '.gallery-section',
          start: 'top top',
          end: () => `+=${galleryTrack.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }

    // Rotating elements
    gsap.to('.rotate-slow', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
    });

    gsap.to('.rotate-fast', {
      rotation: -360,
      duration: 15,
      repeat: -1,
      ease: 'none',
    });

    // Pulsing glow effects
    gsap.to('.pulse-glow', {
      boxShadow: '0 0 60px rgba(0, 229, 255, 0.8), 0 0 120px rgba(0, 229, 255, 0.4)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Floating animation
    gsap.to('.float', {
      y: -25,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Scan line animation
    gsap.to('.scan-line', {
      y: '100vh',
      duration: 4,
      repeat: -1,
      ease: 'none',
    });
  };

  return (
    <div ref={mainRef} className="app">
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
      
      {isLoaded && (
        <>
          <CustomCursor />
          <Starfield />
          <HUDCorners />
          <ShockFlash />
          
          <Navigation />
          
          <main>
            <Hero />
            <StatsRibbon />
            <CinematicBanner />
            <Mission />
            <Scramjet />
            <TechnicalSpecs />
            <FlightProfile />
            <Timeline />
            <Gallery />
            <Comparison />
            <Legacy />
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';

export default App;
