import React, { useRef, useState, useEffect } from 'react';

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const categories = [
  {
    id: 'general', label: 'General Dentistry', icon: '🦷',
    services: [
      { title: 'Dental Checkup & Cleaning', desc: 'Comprehensive oral examinations and professional cleaning to maintain optimal dental health.', price: '₹500–₹1,000', duration: '45 min' },
      { title: 'Dental X-Rays', desc: 'Digital radiography for accurate diagnosis with minimal radiation exposure.', price: '₹200–₹500', duration: '20 min' },
      { title: 'Tooth Extraction', desc: 'Safe, comfortable tooth removal with advanced pain management techniques.', price: '₹800–₹2,000', duration: '30–60 min' },
      { title: 'Fillings & Restorations', desc: 'Tooth-colored composite fillings that blend seamlessly with your natural teeth.', price: '₹600–₹1,500', duration: '45–60 min' },
    ],
  },
  {
    id: 'cosmetic', label: 'Cosmetic Dentistry', icon: '✨',
    services: [
      { title: 'Teeth Whitening', desc: 'Professional-grade whitening that brightens your smile up to 8 shades in a single session.', price: '₹3,000–₹8,000', duration: '60–90 min' },
      { title: 'Dental Veneers', desc: 'Ultra-thin porcelain shells that completely transform the appearance of your teeth.', price: '₹8,000–₹15,000', duration: '2 sessions' },
      { title: 'Smile Makeover', desc: 'A comprehensive treatment plan combining multiple cosmetic procedures for a total transformation.', price: 'Custom Quote', duration: 'Multiple sessions' },
      { title: 'Dental Bonding', desc: 'Composite resin applied to fix chips, cracks, and discoloration with natural-looking results.', price: '₹2,000–₹5,000', duration: '60 min' },
    ],
  },
  {
    id: 'advanced', label: 'Advanced Treatments', icon: '🔬',
    services: [
      { title: 'Dental Implants', desc: 'Permanent titanium implants that function and look exactly like natural teeth.', price: '₹25,000–₹60,000', duration: '3–6 months' },
      { title: 'Root Canal Treatment', desc: 'Pain-free endodontic therapy to save infected teeth using rotary techniques.', price: '₹5,000–₹15,000', duration: '1–2 sessions' },
      { title: 'Orthodontics / Braces', desc: 'Metal, ceramic, or clear aligner options for a straighter, healthier smile.', price: '₹25,000–₹80,000', duration: '12–24 months' },
      { title: 'Gum Disease Treatment', desc: 'Deep cleaning and periodontal therapy to restore gum health and prevent bone loss.', price: '₹2,000–₹8,000', duration: '60–90 min' },
    ],
  },
  {
    id: 'facial', label: 'Facial Aesthetics', icon: '🌿',
    services: [
      { title: 'Anti-Wrinkle Injections', desc: 'Botox treatments to smooth fine lines and restore a youthful, refreshed appearance.', price: '₹8,000–₹20,000', duration: '30 min' },
      { title: 'Dermal Fillers', desc: 'Hyaluronic acid fillers to add volume, contour, and lift to the face naturally.', price: '₹12,000–₹30,000', duration: '45 min' },
      { title: 'Lip Enhancement', desc: 'Subtle or dramatic lip augmentation for perfect shape, volume, and symmetry.', price: '₹8,000–₹18,000', duration: '30–45 min' },
      { title: 'PRP Therapy', desc: 'Platelet-rich plasma therapy for skin rejuvenation using your own natural growth factors.', price: '₹10,000–₹25,000', duration: '60 min' },
    ],
  },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [heroRef, heroInView] = useInView(0.1);
  const [servicesRef, servicesInView] = useInView(0.05);
  const [processRef, processInView] = useInView();

  const current = categories.find(c => c.id === activeCategory);

  return (
    <div style={{ fontFamily: "'DM Sans','Nunito',sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .fade-up {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .gradient-text {
          background: linear-gradient(135deg,#0ea5e9,#10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16,185,129,0.1);
          color: #10b981;
          border: 1px solid rgba(16,185,129,0.25);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .cat-btn {
          padding: 10px 20px;
          border-radius: 999px;
          border: 2px solid #e2e8f0;
          background: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        .cat-btn.active {
          background: linear-gradient(135deg,#0ea5e9,#10b981);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 20px rgba(14,165,233,0.3);
        }
        .cat-btn:hover:not(.active) {
          border-color: #0ea5e9;
          color: #0ea5e9;
        }
        .service-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid rgba(14,165,233,0.08);
          transition: all 0.3s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(14,165,233,0.14);
          border-color: rgba(14,165,233,0.2);
        }
        .step-card {
          background: white;
          border-radius: 20px;
          padding: 24px 20px;
          text-align: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transition: all 0.3s;
          height: 100%;
        }
        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(14,165,233,0.12);
        }
        .cat-scroll {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 52px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (max-width: 992px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .service-card {
            padding: 20px;
          }
          .cat-btn {
            padding: 8px 18px;
            font-size: 13px;
          }
        }
        @media (max-width: 768px) {
          .cat-scroll {
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: flex-start;
            padding-bottom: 12px;
            margin-bottom: 40px;
            scrollbar-width: thin;
            -webkit-overflow-scrolling: touch;
          }
          .cat-scroll::-webkit-scrollbar {
            height: 4px;
          }
          .cat-scroll::-webkit-scrollbar-track {
            background: #e2e8f0;
            border-radius: 4px;
          }
          .cat-scroll::-webkit-scrollbar-thumb {
            background: #0ea5e9;
            border-radius: 4px;
          }
          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .steps-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .step-card {
            padding: 20px;
          }
          .service-card {
            padding: 20px;
          }
          .pill-badge {
            font-size: 12px;
            padding: 5px 14px;
          }
          .cta-buttons {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          .cta-buttons button {
            width: 100%;
            max-width: 280px;
            text-align: center;
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .cat-btn {
            padding: 6px 14px;
            font-size: 12px;
            gap: 4px;
          }
          .service-card h3 {
            font-size: 16px;
          }
          .service-card p {
            font-size: 13px;
          }
          .step-card h3 {
            font-size: 15px;
          }
          .step-card p {
            font-size: 12px;
          }
          .pill-badge {
            font-size: 11px;
            padding: 4px 12px;
          }
        }
      `}</style>

      {/* HERO */}
      <section style={{ 
        background: 'linear-gradient(145deg,#f0fdf9,#e8f4fd)', 
        padding: 'clamp(100px, 15vw, 140px) clamp(16px, 5vw, 24px) clamp(60px, 8vw, 80px)', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          position: 'absolute', 
          top: -80, 
          right: -80, 
          width: 'clamp(200px, 40vw, 350px)', 
          height: 'clamp(200px, 40vw, 350px)', 
          background: '#0ea5e9', 
          borderRadius: '50%', 
          filter: 'blur(90px)', 
          opacity: 0.1 
        }} />
        <div ref={heroRef} style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', padding: '0 16px' }}>
          <div className={`pill-badge fade-up ${heroInView ? 'visible' : ''}`} style={{ justifyContent: 'center' }}>
            <span>✦</span> Our Services
          </div>
          <h1 className={`fade-up ${heroInView ? 'visible' : ''}`} style={{ 
            fontFamily: "'Playfair Display',serif", 
            fontSize: 'clamp(28px, 6vw, 56px)', 
            fontWeight: 800, 
            color: '#0f172a', 
            lineHeight: 1.2, 
            marginBottom: 'clamp(16px, 3vw, 20px)', 
            transitionDelay: '0.1s' 
          }}>
            Complete Dental & <span className="gradient-text">Facial Care</span>
          </h1>
          <p className={`fade-up ${heroInView ? 'visible' : ''}`} style={{ 
            color: '#475569', 
            fontSize: 'clamp(15px, 3vw, 17px)', 
            lineHeight: 1.6, 
            transitionDelay: '0.2s' 
          }}>
            From routine checkups to smile transformations and facial rejuvenation—everything you need, all under one roof.
          </p>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section ref={servicesRef} style={{ background: 'white', padding: 'clamp(50px, 8vw, 70px) clamp(16px, 5vw, 24px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Category buttons */}
          <div className="cat-scroll">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                className={`cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {current.services.map((s, i) => (
              <div 
                key={s.title} 
                className={`service-card fade-up ${servicesInView ? 'visible' : ''}`} 
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div style={{ marginBottom: 16 }}>
                  <h3 style={{ 
                    fontSize: 'clamp(16px, 4vw, 18px)', 
                    fontWeight: 700, 
                    color: '#0f172a', 
                    lineHeight: 1.3 
                  }}>
                    {s.title}
                  </h3>
                </div>
                <p style={{ 
                  color: '#64748b', 
                  fontSize: 'clamp(13px, 3vw, 14px)', 
                  lineHeight: 1.6, 
                  marginBottom: 20,
                  flex: 1
                }}>
                  {s.desc}
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
                  <div style={{ 
                    background: 'linear-gradient(135deg,#f0fdf9,#e8f4fd)', 
                    borderRadius: 10, 
                    padding: '6px 14px', 
                    fontSize: 'clamp(12px, 2.5vw, 13px)', 
                    fontWeight: 600, 
                    color: '#0ea5e9' 
                  }}>
                    💰 {s.price}
                  </div>
                  <div style={{ 
                    background: '#f8fafc', 
                    borderRadius: 10, 
                    padding: '6px 14px', 
                    fontSize: 'clamp(12px, 2.5vw, 13px)', 
                    fontWeight: 600, 
                    color: '#64748b' 
                  }}>
                    ⏱ {s.duration}
                  </div>
                </div>
                <button 
                  style={{ 
                    marginTop: 'auto', 
                    width: '100%', 
                    background: 'linear-gradient(135deg,#0ea5e9,#10b981)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: 12, 
                    padding: 'clamp(10px, 3vw, 12px) 0', 
                    fontSize: 'clamp(13px, 3vw, 14px)', 
                    fontWeight: 600, 
                    cursor: 'pointer', 
                    transition: 'opacity 0.2s' 
                  }}
                  onMouseOver={e => e.target.style.opacity = '0.9'}
                  onMouseOut={e => e.target.style.opacity = '1'}
                >
                  Book This Service
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={processRef} style={{ 
        background: 'linear-gradient(180deg,#f8fafc,#f0fdf9)', 
        padding: 'clamp(60px, 10vw, 90px) clamp(16px, 5vw, 24px)' 
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 56px)' }}>
            <div className="pill-badge" style={{ justifyContent: 'center' }}>
              <span>✦</span> How It Works
            </div>
            <h2 className={`fade-up ${processInView ? 'visible' : ''}`} style={{ 
              fontFamily: "'Playfair Display',serif", 
              fontSize: 'clamp(24px, 5vw, 42px)', 
              fontWeight: 800, 
              color: '#0f172a' 
            }}>
              Your Path to a <span className="gradient-text">Perfect Smile</span>
            </h2>
          </div>
          <div className="steps-grid">
            {[
              ['1', '📅', 'Book Appointment', 'Call us, WhatsApp, or use our online booking system.'],
              ['2', '🔍', 'Consultation', 'A thorough exam and personalized treatment plan.'],
              ['3', '💎', 'Treatment', 'Expert care with the latest technology for best results.'],
              ['4', '😊', 'Aftercare', 'Follow-up visits and guidance to keep your smile perfect.'],
            ].map(([step, icon, title, desc], i) => (
              <div 
                key={title} 
                className={`step-card fade-up ${processInView ? 'visible' : ''}`} 
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div style={{ 
                  width: 'clamp(44px, 8vw, 48px)', 
                  height: 'clamp(44px, 8vw, 48px)', 
                  background: 'linear-gradient(135deg,#0ea5e9,#10b981)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white', 
                  fontWeight: 800, 
                  fontSize: 'clamp(16px, 4vw, 18px)', 
                  margin: '0 auto 16px' 
                }}>
                  {step}
                </div>
                <div style={{ fontSize: 'clamp(28px, 8vw, 32px)', marginBottom: 12 }}>{icon}</div>
                <h3 style={{ 
                  fontSize: 'clamp(15px, 3.5vw, 16px)', 
                  fontWeight: 700, 
                  color: '#0f172a', 
                  marginBottom: 8 
                }}>
                  {title}
                </h3>
                <p style={{ 
                  color: '#64748b', 
                  fontSize: 'clamp(12px, 2.5vw, 13px)', 
                  lineHeight: 1.6 
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ 
        background: 'linear-gradient(135deg,#0f172a,#1e293b)', 
        padding: 'clamp(60px, 10vw, 80px) clamp(16px, 5vw, 24px)', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          position: 'absolute', 
          top: -60, 
          left: '30%', 
          width: 'clamp(200px, 40vw, 300px)', 
          height: 'clamp(200px, 40vw, 300px)', 
          background: '#0ea5e9', 
          borderRadius: '50%', 
          filter: 'blur(100px)', 
          opacity: 0.07 
        }} />
        <h2 style={{ 
          fontFamily: "'Playfair Display',serif", 
          fontSize: 'clamp(24px, 5vw, 40px)', 
          fontWeight: 800, 
          color: 'white', 
          marginBottom: 'clamp(12px, 2vw, 14px)', 
          position: 'relative' 
        }}>
          Not Sure Which Service You Need?
        </h2>
        <p style={{ 
          color: '#94a3b8', 
          fontSize: 'clamp(14px, 3vw, 16px)', 
          marginBottom: 'clamp(28px, 5vw, 36px)' 
        }}>
          Book a free consultation and our experts will guide you to the right treatment.
        </p>
        <div className="cta-buttons">
          <button style={{ 
            background: 'linear-gradient(135deg,#0ea5e9,#10b981)', 
            color: 'white', 
            border: 'none', 
            borderRadius: 999, 
            padding: 'clamp(12px, 3vw, 14px) clamp(24px, 5vw, 32px)', 
            fontSize: 'clamp(14px, 3vw, 15px)', 
            fontWeight: 700, 
            cursor: 'pointer', 
            boxShadow: '0 4px 20px rgba(14,165,233,0.3)',
            transition: 'transform 0.2s, opacity 0.2s'
          }}
          onMouseOver={e => { e.target.style.transform = 'scale(1.02)'; e.target.style.opacity = '0.95'; }}
          onMouseOut={e => { e.target.style.transform = 'scale(1)'; e.target.style.opacity = '1'; }}
          >
            📅 Free Consultation
          </button>
          <button style={{ 
            background: 'rgba(255,255,255,0.08)', 
            color: 'white', 
            border: '2px solid rgba(255,255,255,0.2)', 
            borderRadius: 999, 
            padding: 'clamp(12px, 3vw, 14px) clamp(24px, 5vw, 32px)', 
            fontSize: 'clamp(14px, 3vw, 15px)', 
            fontWeight: 700, 
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
          onMouseOut={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
          >
            📞 Call Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;