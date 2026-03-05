import { useEffect, useRef } from 'react';

const ShockFlash = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flash = () => {
      if (!ref.current) return;
      ref.current.style.opacity = '0.15';
      setTimeout(() => { if (ref.current) ref.current.style.opacity = '0'; }, 80);
    };
    const interval = setInterval(flash, Math.random() * 8000 + 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,229,255,1)',
      pointerEvents: 'none',
      zIndex: 100,
      opacity: 0,
      transition: 'opacity 0.05s',
    }} />
  );
};

export default ShockFlash;
