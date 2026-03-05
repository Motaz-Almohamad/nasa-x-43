const Legacy = () => (
  <section style={{ padding: '100px 40px', background: '#050505', color: '#fff', textAlign: 'center' }}>
    <h2 style={{ fontSize: '2.5rem', color: '#00e5ff', marginBottom: 24 }}>LEGACY</h2>
    <p style={{ maxWidth: 700, margin: '0 auto 48px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '1.1rem' }}>
      The NASA X-43A's record-breaking flights proved that scramjet technology could sustain hypersonic flight,
      paving the way for future generations of hypersonic vehicles. Its legacy lives on in every program
      pushing the boundaries of atmospheric flight.
    </p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
      {[['Mach 9.6', 'World Record Speed'], ['11 sec', 'Scramjet Burn Time'], ['110,000 ft', 'Peak Altitude'], ['2004', 'Historic Flight Year']].map(([val, label]) => (
        <div key={label} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#00e5ff' }}>{val}</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', letterSpacing: 2, marginTop: 8 }}>{label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Legacy;
