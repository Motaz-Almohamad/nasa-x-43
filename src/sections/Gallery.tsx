const images = [
  { label: 'X-43A in Flight', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/X-43A_3_view.png/320px-X-43A_3_view.png' },
  { label: 'Scramjet Engine', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/X-43A_with_Hyper-X_booster_sep.jpg/320px-X-43A_with_Hyper-X_booster_sep.jpg' },
  { label: 'Launch Vehicle', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/X-43A_3_view.png/320px-X-43A_3_view.png' },
];

const Gallery = () => (
  <section className="gallery-section" style={{ padding: '100px 40px', background: '#050505', color: '#fff' }}>
    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#00e5ff', marginBottom: 60 }}>
      GALLERY
    </h2>
    <div className="gallery-track" style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
      {images.map((img, i) => (
        <div key={i} style={{ flex: '0 0 300px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: 200, background: 'rgba(0,229,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,229,255,0.4)', fontSize: '3rem' }}>✈</div>
          <div style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{img.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Gallery;
