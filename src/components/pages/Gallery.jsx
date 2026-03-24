import React, { useState, useEffect, useRef } from 'react';

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};


const galleryItems = [
  {
    id: 1,
    category: 'Clinic',
    label: 'Modern Reception',
    sublabel: 'Welcoming & comfortable',
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80',
    size: 'tall',
  },

  {
    id: 3,
    category: 'Treatment',
    label: 'Dental Checkup',
    sublabel: 'Gentle & thorough care',
    img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80',
    size: 'normal',
  },
  {
    id: 4,
    category: 'Team',
    label: 'Our Specialists',
    sublabel: 'Expert & caring doctors',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
    size: 'wide',
  },
  {
    id: 5,
    category: 'Treatment',
    label: 'Teeth Whitening',
    sublabel: 'Professional brightening',
    img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80',
    size: 'normal',
  },
  {
    id: 6,
    category: 'Smiles',
    label: 'Confident Smile',
    sublabel: 'Post-treatment glow',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
    size: 'normal',
  },
  {
    id: 7,
    category: 'Clinic',
    label: 'Treatment Room',
    sublabel: 'State-of-the-art equipment',
    img: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80',
    size: 'tall',
  },
  {
    id: 8,
    category: 'Team',
    label: 'In Consultation',
    sublabel: 'Patient-first approach',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    size: 'normal',
  },

  {
    id: 10,
    category: 'Treatment',
    label: 'Orthodontics',
    sublabel: 'Precision alignment',
    img: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80',
    size: 'wide',
  },
  {
    id: 11,
    category: 'Clinic',
    label: 'Sterilisation Suite',
    sublabel: 'Highest hygiene standards',
    img: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&q=80',
    size: 'normal',
  },
  {
    id: 12,
    category: 'Team',
    label: 'Care & Compassion',
    sublabel: 'Your comfort is our priority',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
    size: 'normal',
  },
];

const CATS = ['All', 'Clinic', 'Smiles', 'Treatment', 'Team'];

export const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null); // holds the item being viewed
  const [imgLoaded, setImgLoaded] = useState({});

  const [heroRef, heroInView] = useInView(0.1);
  const [gridRef, gridInView] = useInView(0.05);
  const [ctaRef, ctaInView] = useInView(0.1);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(g => g.category === activeCategory);

  const handleImgLoad = (id) => setImgLoaded(prev => ({ ...prev, [id]: true }));

  // Navigate lightbox
  const goNext = () => {
    const idx = filtered.findIndex(g => g.id === lightbox.id);
    setLightbox(filtered[(idx + 1) % filtered.length]);
  };
  const goPrev = () => {
    const idx = filtered.findIndex(g => g.id === lightbox.id);
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]);
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Nunito',sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');

        :root {
          --green: #10b981;
          --blue:  #0ea5e9;
          --dark:  #0f172a;
          --mid:   #334155;
          --light: #f0fdf9;
        }

        /* ── shared utilities ── */
        .fade-up { opacity:0; transform:translateY(40px); transition:opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity:1; transform:translateY(0); }

        .gradient-text {
          background: linear-gradient(135deg, #0ea5e9, #10b981);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pill-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(16,185,129,0.1); color:#10b981;
          border:1px solid rgba(16,185,129,0.25); border-radius:999px;
          padding:6px 16px; font-size:13px; font-weight:600;
          letter-spacing:0.5px; margin-bottom:20px;
        }

        /* ── HERO background blobs ── */
        .hero-blob {
          position:absolute; border-radius:50%;
          filter:blur(80px); opacity:0.18;
          animation:blobMove 8s ease-in-out infinite alternate;
        }
        @keyframes blobMove {
          0%  { transform:translate(0,0) scale(1); }
          100%{ transform:translate(30px,20px) scale(1.08); }
        }

        /* ── Category filter pills ── */
        .cat-pill {
          padding:10px 22px; border-radius:999px;
          border:2px solid #e2e8f0; background:#fff;
          cursor:pointer; font-size:14px; font-weight:600;
          color:#64748b; transition:all 0.25s;
          font-family:'DM Sans',sans-serif;
          white-space:nowrap;
        }
        .cat-pill.active {
          background:linear-gradient(135deg,#0ea5e9,#10b981);
          color:white; border-color:transparent;
          box-shadow:0 4px 20px rgba(14,165,233,0.3);
        }
        .cat-pill:hover:not(.active) { border-color:#0ea5e9; color:#0ea5e9; }

        /* ── Grid item card ── */
        .gallery-card {
          position:relative; overflow:hidden;
          border-radius:20px; cursor:pointer;
          background:#f1f5f9;
          transition:transform 0.35s cubic-bezier(.25,.8,.25,1),
                      box-shadow 0.35s cubic-bezier(.25,.8,.25,1);
        }
        .gallery-card:hover { transform:translateY(-7px) scale(1.01); box-shadow:0 24px 56px rgba(14,165,233,0.2); }
        .gallery-card img {
          width:100%; height:100%; object-fit:cover;
          display:block; transition:transform 0.5s ease;
        }
        .gallery-card:hover img { transform:scale(1.06); }

        /* ── Overlay on hover ── */
        .card-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.1) 55%, transparent 100%);
          opacity:0; transition:opacity 0.3s ease;
          display:flex; flex-direction:column;
          justify-content:flex-end; padding:22px;
        }
        .gallery-card:hover .card-overlay { opacity:1; }

        .card-cat-badge {
          display:inline-block; margin-bottom:8px;
          background:rgba(14,165,233,0.9); color:#fff;
          font-size:11px; font-weight:700; letter-spacing:0.6px;
          border-radius:999px; padding:4px 12px;
          width:fit-content;
        }
        .card-label { font-size:16px; font-weight:700; color:#fff; line-height:1.3; }
        .card-sub   { font-size:12px; color:rgba(255,255,255,0.75); margin-top:3px; }

        /* zoom icon */
        .zoom-icon {
          position:absolute; top:14px; right:14px;
          width:36px; height:36px; border-radius:50%;
          background:rgba(255,255,255,0.92);
          display:flex; align-items:center; justify-content:center;
          font-size:16px;
          opacity:0; transform:scale(0.7);
          transition:opacity 0.3s ease, transform 0.3s ease;
          box-shadow:0 2px 10px rgba(0,0,0,0.15);
        }
        .gallery-card:hover .zoom-icon { opacity:1; transform:scale(1); }

        /* shimmer skeleton */
        .img-skeleton {
          position:absolute; inset:0;
          background:linear-gradient(90deg,#f0fdf9 25%,#e0f7fa 50%,#f0fdf9 75%);
          background-size:200% 100%;
          animation:shimmer 1.4s infinite;
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        /* ── Lightbox ── */
        .lightbox-backdrop {
          position:fixed; inset:0; z-index:9999;
          background:rgba(15,23,42,0.93);
          backdrop-filter:blur(12px);
          display:flex; align-items:center; justify-content:center;
          padding:24px; animation:lbFadeIn 0.2s ease;
        }
        @keyframes lbFadeIn { from{opacity:0} to{opacity:1} }

        .lightbox-box {
          position:relative; max-width:860px; width:100%;
          background:#fff; border-radius:24px;
          overflow:hidden; box-shadow:0 40px 100px rgba(0,0,0,0.5);
          animation:lbSlideUp 0.3s cubic-bezier(.25,.8,.25,1);
        }
        @keyframes lbSlideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }

        .lb-img-wrap { position:relative; height:420px; background:#f1f5f9; }
        .lb-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; }

        .lb-info { padding:24px 28px 28px; }
        .lb-close {
          position:absolute; top:14px; right:14px; z-index:2;
          width:38px; height:38px; border-radius:50%;
          background:rgba(255,255,255,0.9); border:none; cursor:pointer;
          font-size:18px; display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 10px rgba(0,0,0,0.15); transition:all 0.2s;
          font-family:sans-serif;
        }
        .lb-close:hover { background:#fff; transform:scale(1.1); }

        .lb-nav {
          position:absolute; top:50%; transform:translateY(-50%);
          width:44px; height:44px; border-radius:50%;
          background:rgba(255,255,255,0.92); border:none; cursor:pointer;
          font-size:20px; display:flex; align-items:center; justify-content:center;
          box-shadow:0 4px 16px rgba(0,0,0,0.2); transition:all 0.2s;
          font-family:sans-serif; z-index:2;
        }
        .lb-nav:hover { background:#fff; transform:translateY(-50%) scale(1.1); }
        .lb-nav.prev { left:-22px; }
        .lb-nav.next { right:-22px; }

        /* ── CTA section ── */
        .btn-primary {
          background:linear-gradient(135deg,#0ea5e9,#10b981);
          color:white; border:none; border-radius:999px;
          padding:14px 32px; font-size:15px; font-weight:600;
          cursor:pointer; transition:all 0.3s;
          box-shadow:0 4px 20px rgba(14,165,233,0.35);
          font-family:'DM Sans',sans-serif;
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(14,165,233,0.45); }

        @media(max-width:768px) {
          .gallery-masonry { column-count:2!important; }
          .lb-nav.prev { left:-14px; }
          .lb-nav.next { right:-14px; }
          .lb-img-wrap { height:260px; }
        }
        @media(max-width:480px) {
          .gallery-masonry { column-count:1!important; }
        }
      `}</style>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(145deg,#f0fdf9 0%,#e0f7fa 40%,#e8f4fd 100%)',
          padding: '130px 24px 72px',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div className="hero-blob" style={{ width:480, height:480, background:'#0ea5e9', top:-120, right:-100 }} />
        <div className="hero-blob" style={{ width:380, height:380, background:'#10b981', bottom:-60, left:-80, animationDelay:'2s' }} />

        <div ref={heroRef} style={{ maxWidth:740, margin:'0 auto', textAlign:'center', position:'relative', zIndex:2 }}>
          <div className={`pill-badge fade-up ${heroInView ? 'visible' : ''}`} style={{ justifyContent:'center' }}>
            <span>✦</span> Our Gallery
          </div>

          <h1
            className={`fade-up ${heroInView ? 'visible' : ''}`}
            style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:'clamp(34px,5vw,62px)',
              fontWeight:800, lineHeight:1.1,
              color:'#0f172a', marginBottom:20,
              transitionDelay:'0.1s',
            }}
          >
            Our Clinic &{' '}
            <span className="gradient-text">Patient Smiles</span>
          </h1>

          <p
            className={`fade-up ${heroInView ? 'visible' : ''}`}
            style={{ fontSize:17, color:'#475569', lineHeight:1.75, maxWidth:520, margin:'0 auto', transitionDelay:'0.2s' }}
          >
            Step inside Sharma Oral Dental Care — see our modern facilities, meet our team, and discover the smile transformations that change lives.
          </p>
        </div>

        {/* Wave */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, overflow:'hidden', lineHeight:0 }}>
          <svg viewBox="0 0 1440 54" fill="none" style={{ display:'block' }}>
            <path d="M0,27 C480,54 960,0 1440,27 L1440,54 L0,54Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════ FILTER + GRID ══════════════════════ */}
      <section ref={gridRef} style={{ background:'white', padding:'64px 24px 80px' }}>
        <div style={{ maxWidth:1240, margin:'0 auto' }}>

          {/* ── Category Filter ── */}
          <div
            style={{
              display:'flex', gap:10, justifyContent:'center',
              flexWrap:'wrap', marginBottom:52,
            }}
          >
            {CATS.map(cat => (
              <button
                key={cat}
                className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'All'       && '🏷 '}
                {cat === 'Clinic'    && '🏥 '}
                {cat === 'Smiles'    && '😁 '}
                {cat === 'Treatment' && '🔬 '}
                {cat === 'Team'      && '👨‍⚕️ '}
                {cat}
              </button>
            ))}
          </div>

          {/* ── Masonry Grid ── */}
          <div
            className="gallery-masonry"
            style={{
              columnCount: 3,
              columnGap: 20,
            }}
          >
            {filtered.map((item, i) => {
              const heights = { tall: 380, wide: 240, normal: 270 };
              const h = heights[item.size] || 270;

              return (
                <div
                  key={item.id}
                  className={`gallery-card fade-up ${gridInView ? 'visible' : ''}`}
                  style={{
                    height: h,
                    marginBottom: 20,
                    breakInside: 'avoid',
                    transitionDelay: `${(i % 6) * 0.07}s`,
                  }}
                  onClick={() => setLightbox(item)}
                >
                  {/* Shimmer skeleton */}
                  {!imgLoaded[item.id] && <div className="img-skeleton" />}

                  <img
                    src={item.img}
                    alt={item.label}
                    onLoad={() => handleImgLoad(item.id)}
                    style={{ opacity: imgLoaded[item.id] ? 1 : 0, transition: 'opacity 0.4s ease' }}
                  />

                  {/* Zoom icon */}
                  <div className="zoom-icon">🔍</div>

                  {/* Hover overlay */}
                  <div className="card-overlay">
                    <span className="card-cat-badge">{item.category}</span>
                    <div className="card-label">{item.label}</div>
                    <div className="card-sub">{item.sublabel}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'60px 0', color:'#64748b' }}>
              <div style={{ fontSize:52, marginBottom:14 }}>🔍</div>
              <p style={{ fontSize:16, fontWeight:600 }}>No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════ BEFORE / AFTER STRIP ══════════════════════ */}
      <section style={{ background:'linear-gradient(145deg,#f0fdf9,#e0f7fa,#e8f4fd)', padding:'80px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="pill-badge" style={{ justifyContent:'center' }}><span>✦</span> Transformations</div>
            <h2
              style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:'clamp(26px,3.5vw,42px)',
                fontWeight:800, color:'#0f172a',
              }}
            >
              Real Results, <span className="gradient-text">Real Smiles</span>
            </h2>
            <p style={{ color:'#475569', fontSize:16, marginTop:12, maxWidth:480, margin:'12px auto 0' }}>
              See the difference our treatments make — every smile here belongs to a real patient.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:24 }}>
            {[
              {
                label:'Smile Makeover',
                desc:'Complete veneer transformation in just 2 sessions.',
                icon:'💎',
                img:'https://images.unsplash.com/photo-1534278931827-8a259344abe7?w=600&q=80',
                tag:'Veneers',
              },
              {
                label:'Teeth Whitening',
                desc:'8 shades brighter with a single in-office treatment.',
                icon:'✨',
                img:'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&q=80',
                tag:'Whitening',
              },
              {
                label:'Orthodontic Treatment',
                desc:'Perfectly aligned smile after 14 months of aligners.',
                icon:'😁',
                img:'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&q=80',
                tag:'Orthodontics',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background:'white', borderRadius:20,
                  boxShadow:'0 4px 24px rgba(0,0,0,0.07)',
                  border:'1px solid rgba(14,165,233,0.1)',
                  overflow:'hidden',
                  transition:'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseOver={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 20px 48px rgba(14,165,233,0.16)'; }}
                onMouseOut={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,0.07)'; }}
              >
                <div style={{ height:220, overflow:'hidden', position:'relative' }}>
                  <img
                    src={item.img}
                    alt={item.label}
                    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  />
                  <div
                    style={{
                      position:'absolute', top:12, left:12,
                      background:'linear-gradient(135deg,#0ea5e9,#10b981)',
                      color:'white', borderRadius:999,
                      padding:'4px 14px', fontSize:11, fontWeight:700,
                    }}
                  >
                    {item.tag}
                  </div>
                </div>
                <div style={{ padding:'22px 24px 26px' }}>
                  <div style={{ fontSize:28, marginBottom:10 }}>{item.icon}</div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:'#0f172a', marginBottom:8 }}>{item.label}</h3>
                  <p style={{ fontSize:13.5, color:'#64748b', lineHeight:1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA ══════════════════════ */}
      <section
        ref={ctaRef}
        style={{
          background:'linear-gradient(135deg,#0ea5e9,#10b981)',
          padding:'80px 24px', textAlign:'center',
        }}
      >
        <div className={`fade-up ${ctaInView ? 'visible' : ''}`} style={{ maxWidth:580, margin:'0 auto' }}>
          <h2
            style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:'clamp(26px,4vw,42px)',
              fontWeight:800, color:'white', marginBottom:14,
            }}
          >
            Your Smile Could Be Next
          </h2>
          <p style={{ color:'rgba(255,255,255,0.88)', fontSize:17, marginBottom:36 }}>
            Join 5,000+ happy patients who've transformed their smiles at Sharma Oral Dental Care.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <button
              className="btn-primary"
              style={{ background:'white', color:'#0ea5e9', boxShadow:'0 4px 20px rgba(0,0,0,0.15)' }}
              onClick={() => window.location.href = '/contact'}
            >
              📅 Book Appointment
            </button>
            <button
              style={{
                background:'rgba(255,255,255,0.15)', color:'white',
                border:'2px solid rgba(255,255,255,0.5)', borderRadius:999,
                padding:'13px 30px', fontSize:15, fontWeight:700,
                cursor:'pointer', transition:'all 0.2s',
                fontFamily:"'DM Sans',sans-serif",
              }}
              onMouseOver={e => { e.target.style.background='rgba(255,255,255,0.25)'; }}
              onMouseOut={e => { e.target.style.background='rgba(255,255,255,0.15)'; }}
            >
              📞 Call Us Now
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════ LIGHTBOX ══════════════════════ */}
      {lightbox && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <div
            className="lightbox-box"
            onClick={e => e.stopPropagation()}
          >
            {/* Image */}
            <div className="lb-img-wrap">
              <img src={lightbox.img} alt={lightbox.label} />

              {/* Close */}
              <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>

              {/* Prev */}
              <button className="lb-nav prev" onClick={goPrev}>‹</button>
              {/* Next */}
              <button className="lb-nav next" onClick={goNext}>›</button>
            </div>

            {/* Info */}
            <div className="lb-info">
              <div
                style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  background:'rgba(16,185,129,0.1)', color:'#10b981',
                  border:'1px solid rgba(16,185,129,0.25)',
                  borderRadius:999, padding:'4px 14px',
                  fontSize:12, fontWeight:700, marginBottom:10,
                }}
              >
                {lightbox.category}
              </div>
              <h3
                style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:22, fontWeight:800, color:'#0f172a', marginBottom:6,
                }}
              >
                {lightbox.label}
              </h3>
              <p style={{ color:'#64748b', fontSize:14, marginBottom:20 }}>
                {lightbox.sublabel} — A glimpse of the exceptional care delivered at Sharma Oral Dental Care & Face Clinic.
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <button
                  onClick={() => window.location.href = '/contact'}
                  style={{
                    flex:1, background:'linear-gradient(135deg,#0ea5e9,#10b981)',
                    color:'white', border:'none', borderRadius:12,
                    padding:'11px 0', fontSize:14, fontWeight:700,
                    cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                  }}
                >
                  📅 Book Appointment
                </button>
                <button
                  onClick={() => setLightbox(null)}
                  style={{
                    padding:'11px 22px', background:'#f0fdf9', color:'#0ea5e9',
                    border:'2px solid #0ea5e9', borderRadius:12,
                    fontSize:14, fontWeight:700, cursor:'pointer',
                    fontFamily:"'DM Sans',sans-serif",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};