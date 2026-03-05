const events = [
  { year: '1996', title: 'Program Launch', desc: 'NASA initiates the Hyper-X program to develop scramjet technology.' },
  { year: '1999', title: 'X-43A Design Complete', desc: 'Final design of the X-43A vehicle approved for production.' },
  { year: '2001', title: 'First Flight Attempt', desc: 'First flight attempt fails due to Pegasus booster malfunction.' },
  { year: '2004 Mar', title: 'Mach 6.8 Achieved', desc: 'Second flight successfully reaches Mach 6.8 under scramjet power.' },
  { year: '2004 Nov', title: 'Mach 9.6 Record', desc: 'X-43A sets world speed record for air-breathing aircraft at Mach 9.6.' },
];

const Timeline = () => (
  <section style={{ padding: '100px 40px', background: '#000', color: '#fff' }}>
    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#00e5ff', marginBottom: 60 }}>
      FLIGHT TIMELINE
    </h2>
    <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(0,229,255,0.3)' }} />
      {events.map((e, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: 48, position: 'relative' }}>
          <div style={{ width: '45%', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)', padding: '20px 24px', borderRadius: 4 }}>
            <div style={{ color: '#00e5ff', fontSize: '0.8rem', letterSpacing: 2, marginBottom: 8 }}>{e.year}</div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>{e.title}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{e.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Timeline;
