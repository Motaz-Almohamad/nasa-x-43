const data = [
  { label: 'Top Speed', x43: 'Mach 9.6', sr71: 'Mach 3.3', concorde: 'Mach 2.0' },
  { label: 'Propulsion', x43: 'Scramjet', sr71: 'Turbojet', concorde: 'Turbojet' },
  { label: 'Altitude', x43: '110,000 ft', sr71: '85,000 ft', concorde: '60,000 ft' },
  { label: 'Length', x43: '12 ft', sr71: '107 ft', concorde: '204 ft' },
];

const Comparison = () => (
  <section style={{ padding: '100px 40px', background: '#000', color: '#fff' }}>
    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#00e5ff', marginBottom: 60 }}>
      SPEED COMPARISON
    </h2>
    <div style={{ maxWidth: 900, margin: '0 auto', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Specification', 'X-43A', 'SR-71 Blackbird', 'Concorde'].map(h => (
              <th key={h} style={{ padding: '12px 20px', textAlign: 'left', borderBottom: '1px solid rgba(0,229,255,0.3)', color: '#00e5ff', fontSize: '0.8rem', letterSpacing: 2 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{row.label}</td>
              <td style={{ padding: '16px 20px', color: '#00e5ff', fontWeight: 700 }}>{row.x43}</td>
              <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.7)' }}>{row.sr71}</td>
              <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.7)' }}>{row.concorde}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default Comparison;
