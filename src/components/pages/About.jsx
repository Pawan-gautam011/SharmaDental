import React, { useRef, useState, useEffect } from 'react';

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const team = [
  { name: 'Dr. Rajeev Sharma', role: 'Chief Dental Surgeon', exp: '18 Years', icon: '👨‍⚕️', spec: 'Implants & Oral Surgery' },
  { name: 'Dr. Priya Sharma', role: 'Cosmetic Dentist', exp: '12 Years', icon: '👩‍⚕️', spec: 'Veneers & Smile Design' },
  { name: 'Dr. Amit Verma', role: 'Orthodontist', exp: '10 Years', icon: '👨‍⚕️', spec: 'Braces & Aligners' },
  { name: 'Dr. Neha Patel', role: 'Facial Aesthetics', exp: '8 Years', icon: '👩‍⚕️', spec: 'Non-Surgical Treatments' },
];

const milestones = [
  { year: '2008', event: 'Clinic Founded', desc: 'Started with a vision to make quality dental care accessible to all.' },
  { year: '2012', event: '1000 Patients', desc: 'Reached our first major milestone of 1,000 happy patients.' },
  { year: '2016', event: 'Expanded Services', desc: 'Added facial aesthetics and advanced cosmetic dentistry.' },
  { year: '2020', event: 'Digital Upgrade', desc: 'Introduced 3D imaging and digital smile design technology.' },
  { year: '2024', event: '5000+ Patients', desc: 'Serving over 5,000 patients with world-class care.' },
];

const About = () => {
  const [heroRef, heroInView] = useInView(0.1);
  const [teamRef, teamInView] = useInView();
  const [timelineRef, timelineInView] = useInView();
  const [valuesRef, valuesInView] = useInView();

  return (
    <div style={{ fontFamily: "'DM Sans', 'Nunito', sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');
        .fade-up { opacity:0; transform:translateY(36px); transition:opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity:1; transform:translateY(0); }
        .fade-left { opacity:0; transform:translateX(-40px); transition:opacity 0.7s ease, transform 0.7s ease; }
        .fade-left.visible { opacity:1; transform:translateX(0); }
        .fade-right { opacity:0; transform:translateX(40px); transition:opacity 0.7s ease, transform 0.7s ease; }
        .fade-right.visible { opacity:1; transform:translateX(0); }
        .gradient-text { background:linear-gradient(135deg,#0ea5e9,#10b981); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .pill-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(16,185,129,0.1); color:#10b981; border:1px solid rgba(16,185,129,0.25); border-radius:999px; padding:6px 16px; font-size:13px; font-weight:600; margin-bottom:20px; }
        .team-card { transition:transform 0.3s,box-shadow 0.3s; cursor:pointer; }
        .team-card:hover { transform:translateY(-8px); box-shadow:0 24px 50px rgba(14,165,233,0.15)!important; }
        .value-card { transition:all 0.3s; border:1px solid rgba(14,165,233,0.08); }
        .value-card:hover { border-color:rgba(14,165,233,0.25); background:linear-gradient(135deg,#f0fdf9,#e8f4fd)!important; }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .about-hero-grid { flex-direction: column !important; text-align: center; gap: 40px !important; }
          .pill-badge { margin-left: auto; margin-right: auto; justify-content: center; width: fit-content; }
          .team-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .team-card { max-width: 320px; margin: 0 auto; width: 100%; padding: 24px !important; }
          .value-card { padding: 24px !important; text-align: center; }
          .timeline-item { flex-direction: column !important; align-items: flex-start !important; padding-left: 60px !important; margin-bottom: 48px !important; position: relative; }
          .timeline-line { left: 20px !important; transform: none !important; }
          .timeline-dot { left: 20px !important; top: 24px !important; transform: none !important; width: 12px !important; height: 12px !important; }
          .timeline-content { width: 100% !important; margin-left: 0 !important; margin-right: 0 !important; }
          .timeline-card { width: 100% !important; background: rgba(255,255,255,0.05) !important; border-radius: 18px !important; padding: 16px 20px !important; }
        }

        @media (max-width: 480px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .hero-card { padding: 24px !important; }
          .value-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .team-card { padding: 20px !important; max-width: 280px; }
          .timeline-card { padding: 14px 18px !important; }
          .timeline-card h4 { font-size: 14px !important; }
          .timeline-card p { font-size: 12px !important; }
          .cta-button { padding: 12px 24px !important; font-size: 14px !important; width: 90%; max-width: 280px; }
          .values-section { padding: 60px 16px !important; }
          .team-section { padding: 60px 16px !important; }
          .timeline-section { padding: 60px 16px !important; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
          .value-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
          .about-hero-grid { gap: 40px !important; }
        }

        @media (min-width: 1025px) {
          .team-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 28px !important; }
          .value-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 24px !important; }
        }

        /* Smooth container padding */
        .section-container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
        @media (max-width: 768px) { .section-container { padding: 0 16px; } }
        @media (max-width: 480px) { .section-container { padding: 0 12px; } }
      `}</style>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(145deg,#f0fdf9,#e8f4fd)', padding: 'clamp(80px, 15vw, 140px) 24px clamp(60px, 10vw, 80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, background: '#0ea5e9', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.12 }} />
        <div ref={heroRef} className="section-container">
          <div className="about-hero-grid" style={{ display: 'flex', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={`pill-badge fade-up ${heroInView ? 'visible' : ''}`}><span>✦</span> About Us</div>
              <h1 className={`fade-up ${heroInView ? 'visible' : ''}`} style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px, 5vw, 54px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 20, transitionDelay: '0.1s' }}>
                Smiles Built on <span className="gradient-text">Trust & Expertise</span>
              </h1>
              <p className={`fade-up ${heroInView ? 'visible' : ''}`} style={{ color: '#475569', fontSize: 'clamp(15px, 3vw, 17px)', lineHeight: 1.65, marginBottom: 28, transitionDelay: '0.2s' }}>
                Founded in 2008, Sharma Oral Dental Care and Face Clinic has been a beacon of excellence in dental and facial care. We blend advanced technology with heartfelt compassion to create smiles that transform lives.
              </p>
              <p className={`fade-up ${heroInView ? 'visible' : ''}`} style={{ color: '#475569', fontSize: 'clamp(15px, 3vw, 17px)', lineHeight: 1.65, transitionDelay: '0.3s' }}>
                Our team of board-certified specialists is committed to your comfort, health, and confidence—every single visit.
              </p>
            </div>
            <div className={`fade-right ${heroInView ? 'visible' : ''}`} style={{ flex: 1, maxWidth: '100%', width: '100%', transitionDelay: '0.2s' }}>
              <div style={{ background: 'white', borderRadius: 28, padding: 'clamp(24px, 5vw, 36px)', boxShadow: '0 20px 60px rgba(14,165,233,0.15)' }}>
                <div style={{ fontSize: 'clamp(48px, 8vw, 64px)', textAlign: 'center', marginBottom: 16 }}>🏥</div>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Sharma Oral Dental Care</div>
                  <div style={{ color: '#10b981', fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600 }}>& Face Clinic</div>
                </div>
                <div className="hero-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(12px, 3vw, 16px)' }}>
                  {[['15+', 'Years'], ['5K+', 'Patients'], ['4', 'Specialists'], ['98%', 'Success']].map(([n, l]) => (
                    <div key={l} style={{ background: 'linear-gradient(135deg,#f0fdf9,#e8f4fd)', borderRadius: 14, padding: 'clamp(12px, 3vw, 16px)', textAlign: 'center' }}>
                      <div className="gradient-text" style={{ fontSize: 'clamp(20px, 5vw, 26px)', fontWeight: 800, fontFamily: "'Playfair Display',serif" }}>{n}</div>
                      <div style={{ color: '#64748b', fontSize: 'clamp(10px, 3vw, 12px)', marginTop: 2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section ref={valuesRef} style={{ background: 'white', padding: 'clamp(60px, 10vw, 90px) 0' }} className="values-section">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 56px)' }}>
            <div className="pill-badge" style={{ justifyContent: 'center' }}><span>✦</span> Our Values</div>
            <h2 className={`fade-up ${valuesInView ? 'visible' : ''}`} style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: 800, color: '#0f172a' }}>
              What Drives <span className="gradient-text">Everything We Do</span>
            </h2>
          </div>
          <div className="value-grid" style={{ display: 'grid', gap: 'clamp(20px, 4vw, 24px)' }}>
            {[
              ['💙', 'Compassionate Care', 'We treat every patient with genuine empathy, understanding, and respect—always.'],
              ['🔬', 'Clinical Excellence', 'Continuous learning and cutting-edge techniques ensure the best outcomes.'],
              ['🤝', 'Patient Trust', 'Transparent communication and honest recommendations build lasting relationships.'],
              ['🌱', 'Holistic Approach', 'We care about your overall wellbeing, not just your teeth.'],
            ].map(([icon, title, desc], i) => (
              <div key={title} className={`value-card fade-up ${valuesInView ? 'visible' : ''}`}
                style={{ background: 'white', borderRadius: 20, padding: 'clamp(20px, 4vw, 28px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transitionDelay: `${i * 0.08}s`, textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(32px, 6vw, 36px)', marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: 'clamp(16px, 3.5vw, 17px)', fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{title}</h3>
                <p style={{ color: '#64748b', fontSize: 'clamp(13px, 3vw, 14px)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section ref={teamRef} style={{ background: 'linear-gradient(180deg,#f8fafc,#f0fdf9)', padding: 'clamp(60px, 10vw, 90px) 0' }} className="team-section">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 56px)' }}>
            <div className="pill-badge" style={{ justifyContent: 'center' }}><span>✦</span> Our Team</div>
            <h2 className={`fade-up ${teamInView ? 'visible' : ''}`} style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: 800, color: '#0f172a' }}>
              Meet Our <span className="gradient-text">Expert Doctors</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: 'clamp(14px, 3vw, 16px)', marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>Board-certified specialists committed to giving you the best care possible.</p>
          </div>
          <div className="team-grid" style={{ display: 'grid', gap: 'clamp(20px, 4vw, 28px)' }}>
            {team.map((doc, i) => (
              <div key={doc.name} className={`team-card fade-up ${teamInView ? 'visible' : ''}`}
                style={{ background: 'white', borderRadius: 24, padding: 'clamp(20px, 4vw, 28px)', boxShadow: '0 6px 30px rgba(0,0,0,0.07)', textAlign: 'center', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ width: 'clamp(70px, 15vw, 80px)', height: 'clamp(70px, 15vw, 80px)', background: 'linear-gradient(135deg,#e0f7fa,#e8f4fd)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(32px, 7vw, 40px)', margin: '0 auto 16px' }}>{doc.icon}</div>
                <h3 style={{ fontSize: 'clamp(16px, 3.5vw, 17px)', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{doc.name}</h3>
                <div style={{ color: '#0ea5e9', fontSize: 'clamp(12px, 3vw, 13px)', fontWeight: 600, marginBottom: 4 }}>{doc.role}</div>
                <div style={{ color: '#94a3b8', fontSize: 'clamp(11px, 2.8vw, 12px)', marginBottom: 12 }}>{doc.spec}</div>
                <div style={{ background: 'linear-gradient(135deg,#f0fdf9,#e8f4fd)', borderRadius: 10, padding: '8px 16px', display: 'inline-block', fontSize: 'clamp(11px, 2.8vw, 12px)', color: '#10b981', fontWeight: 600 }}>{doc.exp} Experience</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section ref={timelineRef} style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: 'clamp(60px, 10vw, 90px) 0' }} className="timeline-section">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}>
            <div className="pill-badge" style={{ background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.3)', color: '#10b981', justifyContent: 'center' }}><span>✦</span> Our Journey</div>
            <h2 className={`fade-up ${timelineInView ? 'visible' : ''}`} style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: 800, color: 'white' }}>
              15 Years of <span className="gradient-text">Excellence</span>
            </h2>
          </div>
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
            <div className="timeline-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg,#0ea5e9,#10b981)', transform: 'translateX(-50%)' }} />
            {milestones.map((m, i) => (
              <div key={m.year} className={`timeline-item fade-up ${timelineInView ? 'visible' : ''}`}
                style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: 40, position: 'relative', transitionDelay: `${i * 0.1}s` }}>
                <div className="timeline-card" style={{ width: '45%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '20px 24px' }}>
                  <div className="gradient-text" style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 800, fontFamily: "'Playfair Display',serif", marginBottom: 6 }}>{m.year}</div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: 'clamp(14px, 3vw, 15px)', marginBottom: 6 }}>{m.event}</div>
                  <div style={{ color: '#94a3b8', fontSize: 'clamp(12px, 3vw, 13px)', lineHeight: 1.6 }}>{m.desc}</div>
                </div>
                <div className="timeline-dot" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 16, height: 16, background: 'linear-gradient(135deg,#0ea5e9,#10b981)', borderRadius: '50%', border: '3px solid #1e293b', zIndex: 2 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,#0ea5e9,#10b981)', padding: 'clamp(50px, 10vw, 70px) 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px, 5vw, 38px)', fontWeight: 800, color: 'white', marginBottom: 14, padding: '0 16px' }}>Come Visit Us Today</h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(14px, 3.5vw, 16px)', marginBottom: 32, padding: '0 16px' }}>We'd love to be part of your smile journey.</p>
        <button className="cta-button" style={{ background: 'white', color: '#0ea5e9', border: 'none', borderRadius: 999, padding: 'clamp(12px, 3vw, 14px) clamp(24px, 5vw, 32px)', fontSize: 'clamp(14px, 3vw, 15px)', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}>
          📅 Book a Consultation
        </button>
      </section>
    </div>
  );
};

export default About;