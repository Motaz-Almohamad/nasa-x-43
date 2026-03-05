import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StatsRibbon.css';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
}

const stats: StatItem[] = [
  { value: 9.6, suffix: '×', decimals: 1, label: 'Schallgeschwindigkeit' },
  { value: 12144, suffix: 'km/h', decimals: 0, label: 'Maximalgeschwindigkeit' },
  { value: 29000, suffix: 'm', decimals: 0, label: 'Reiseflughöhe' },
  { value: 11, suffix: 's', decimals: 0, label: 'Scramjet-Brenndauer' },
];

const StatsRibbon = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          stats.forEach((stat, index) => {
            const obj = { value: 0 };
            gsap.to(obj, {
              value: stat.value,
              duration: 2.5,
              delay: index * 0.2,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = obj.value;
                  return newCounts;
                });
              }
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number, decimals: number): string => {
    if (decimals === 0) {
      return Math.floor(num).toLocaleString('de-DE');
    }
    return num.toFixed(decimals);
  };

  return (
    <div ref={sectionRef} className="stats-ribbon">
      <div className="stats-bg">
        <div className="stats-glow"></div>
        <div className="stats-line"></div>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-cell">
            <div className="stat-content">
              <span className="stat-number">
                {formatNumber(counts[index], stat.decimals)}
                <span className="stat-suffix">{stat.suffix}</span>
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
            <div className="stat-border"></div>
            <div className="stat-corner tl"></div>
            <div className="stat-corner tr"></div>
            <div className="stat-corner bl"></div>
            <div className="stat-corner br"></div>
          </div>
        ))}
      </div>
      
      <div className="stats-decorations">
        <div className="deco-arrow left"></div>
        <div className="deco-arrow right"></div>
        <div className="deco-dots">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="dot" style={{ 
              animationDelay: `${i * 0.1}s`,
              left: `${i * 5}%`
            }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsRibbon;
