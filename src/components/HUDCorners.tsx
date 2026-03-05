const HUDCorners = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
    {['top:16px;left:16px', 'top:16px;right:16px', 'bottom:16px;left:16px', 'bottom:16px;right:16px'].map((pos, i) => {
      const styles = Object.fromEntries(pos.split(';').map(p => p.split(':')));
      const rotate = ['0deg', '90deg', '270deg', '180deg'][i];
      return (
        <div key={i} style={{ position: 'absolute', ...styles as any, width: 24, height: 24,
          borderTop: '2px solid rgba(0,229,255,0.7)',
          borderLeft: '2px solid rgba(0,229,255,0.7)',
          transform: `rotate(${rotate})`,
        }} />
      );
    })}
  </div>
);

export default HUDCorners;
