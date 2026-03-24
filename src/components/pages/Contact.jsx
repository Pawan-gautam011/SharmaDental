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

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', date: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [heroRef, heroInView] = useInView(0.1);
  const [formRef, formInView] = useInView(0.05);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Nunito',sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');
        .fade-up{opacity:0;transform:translateY(36px);transition:opacity 0.7s ease,transform 0.7s ease;}
        .fade-up.visible{opacity:1;transform:translateY(0);}
        .fade-left{opacity:0;transform:translateX(-40px);transition:opacity 0.7s ease,transform 0.7s ease;}
        .fade-left.visible{opacity:1;transform:translateX(0);}
        .fade-right{opacity:0;transform:translateX(40px);transition:opacity 0.7s ease,transform 0.7s ease;}
        .fade-right.visible{opacity:1;transform:translateX(0);}
        .gradient-text{background:linear-gradient(135deg,#0ea5e9,#10b981);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .pill-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.25);border-radius:999px;padding:6px 16px;font-size:13px;font-weight:600;margin-bottom:20px;}
        .form-input{width:100%;border:2px solid #e2e8f0;border-radius:14px;padding:14px 18px;font-size:15px;color:#0f172a;outline:none;transition:border-color 0.2s,box-shadow 0.2s;font-family:inherit;background:white;box-sizing:border-box;}
        .form-input:focus{border-color:#0ea5e9;box-shadow:0 0 0 4px rgba(14,165,233,0.1);}
        .form-input::placeholder{color:#94a3b8;}
        .info-card{background:white;border-radius:20px;padding:24px;box-shadow:0 4px 24px rgba(0,0,0,0.06);display:flex;align-items:flex-start;gap:18px;border:1px solid rgba(14,165,233,0.08);transition:all 0.3s;}
        .info-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(14,165,233,0.12);}
        .faq-item{background:white;border-radius:16px;border:1px solid rgba(14,165,233,0.1);overflow:hidden;transition:all 0.3s;}
        @media(max-width:768px){.contact-grid{flex-direction:column!important;}}
      `}</style>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(145deg,#f0fdf9,#e8f4fd)', padding: '140px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 350, height: 350, background: '#0ea5e9', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.1 }} />
        <div style={{ position: 'absolute', bottom: -40, left: -60, width: 280, height: 280, background: '#10b981', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.1 }} />
        <div ref={heroRef} style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className={`pill-badge fade-up ${heroInView ? 'visible' : ''}`} style={{ justifyContent: 'center' }}><span>✦</span> Contact Us</div>
          <h1 className={`fade-up ${heroInView ? 'visible' : ''}`} style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,54px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, marginBottom: 20, transitionDelay: '0.1s' }}>
            Let's Talk About <span className="gradient-text">Your Smile</span>
          </h1>
          <p className={`fade-up ${heroInView ? 'visible' : ''}`} style={{ color: '#475569', fontSize: 17, lineHeight: 1.75, transitionDelay: '0.2s' }}>
            Whether you have questions, want to book an appointment, or just need some dental advice—we're here for you.
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section style={{ background: 'white', padding: '70px 24px 0' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 20 }}>
          {[
            ['📍', 'Visit Us', '123 Dental Street\nCity, State 123456', '#0ea5e9'],
            ['📞', 'Call Us', '+91 98765 43210\n+91 87654 32109', '#10b981'],
            ['📧', 'Email Us', 'info@sharmadental.com\ncare@sharmadental.com', '#0ea5e9'],
            ['🕐', 'Working Hours', 'Mon–Sat: 9am–8pm\nSun: By Appointment', '#10b981'],
          ].map(([icon, title, details, color]) => (
            <div key={title} className="info-card">
              <div style={{ width: 48, height: 48, background: `${color}15`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 4 }}>{title}</div>
                {details.split('\n').map(d => <div key={d} style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{d}</div>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + MAP */}
      <section ref={formRef} style={{ background: 'white', padding: '60px 24px 90px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="contact-grid" style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
            {/* Form */}
            <div className={`fade-left ${formInView ? 'visible' : ''}`} style={{ flex: 1.2 }}>
              <div style={{ background: 'linear-gradient(135deg,#f8fafc,#f0fdf9)', borderRadius: 28, padding: '40px 36px', boxShadow: '0 8px 40px rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.1)' }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Book an Appointment</h2>
                <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>Fill out the form and we'll get back to you within 24 hours.</p>

                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>Appointment Requested!</h3>
                    <p style={{ color: '#64748b', fontSize: 15 }}>Thank you! We'll contact you shortly to confirm your appointment.</p>
                    <button onClick={() => setSubmitted(false)} style={{ marginTop: 24, background: 'linear-gradient(135deg,#0ea5e9,#10b981)', color: 'white', border: 'none', borderRadius: 999, padding: '12px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                      Book Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Full Name *</label>
                        <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Phone Number *</label>
                        <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email Address</label>
                      <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Service Required</label>
                        <select className="form-input" name="service" value={form.service} onChange={handleChange} style={{ appearance: 'none' }}>
                          <option value="">Select a service</option>
                          <option>Dental Checkup</option>
                          <option>Teeth Whitening</option>
                          <option>Dental Implants</option>
                          <option>Root Canal</option>
                          <option>Orthodontics</option>
                          <option>Facial Aesthetics</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Preferred Date</label>
                        <input className="form-input" type="date" name="date" value={form.date} onChange={handleChange} />
                      </div>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Message / Concerns</label>
                      <textarea className="form-input" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your dental concerns or any questions you have..." rows={4} style={{ resize: 'vertical', minHeight: 100 }} />
                    </div>
                    <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg,#0ea5e9,#10b981)', color: 'white', border: 'none', borderRadius: 14, padding: '15px 0', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(14,165,233,0.35)', transition: 'opacity 0.2s' }}
                      onMouseOver={e => e.target.style.opacity = '0.9'}
                      onMouseOut={e => e.target.style.opacity = '1'}>
                      📅 Request Appointment
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Info sidebar */}
            <div className={`fade-right ${formInView ? 'visible' : ''}`} style={{ flex: 0.8, transitionDelay: '0.15s' }}>
              {/* Map placeholder */}
              <div style={{ background: 'linear-gradient(135deg,#e0f7fa,#e8f4fd)', borderRadius: 24, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(14,165,233,0.1),rgba(16,185,129,0.1))' }} />
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>📍</div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>123 Dental Street</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>City, State 123456</div>
                  <button style={{ marginTop: 12, background: 'linear-gradient(135deg,#0ea5e9,#10b981)', color: 'white', border: 'none', borderRadius: 999, padding: '8px 18px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                    Get Directions
                  </button>
                </div>
              </div>

              {/* Quick contact */}
              <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', borderRadius: 24, padding: '28px 24px', marginBottom: 24 }}>
                <h3 style={{ color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Quick Contact</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    ['📱', 'WhatsApp', '+91 98765 43210', '#25D366'],
                    ['📞', 'Call', '+91 98765 43210', '#0ea5e9'],
                    ['📧', 'Email', 'info@sharmadental.com', '#10b981'],
                  ].map(([icon, label, val, color]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px 16px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.2s' }}>
                      <div style={{ width: 36, height: 36, background: `${color}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{icon}</div>
                      <div>
                        <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600 }}>{label}</div>
                        <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency */}
              <div style={{ background: 'linear-gradient(135deg,#0ea5e9,#10b981)', borderRadius: 20, padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🚨</div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Dental Emergency?</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 14 }}>We offer same-day emergency appointments</div>
                <button style={{ background: 'white', color: '#0ea5e9', border: 'none', borderRadius: 999, padding: '10px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  Call Emergency Line
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'linear-gradient(180deg,#f8fafc,#f0fdf9)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="pill-badge" style={{ justifyContent: 'center' }}><span>✦</span> FAQ</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, color: '#0f172a' }}>
              Common <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              ['Do you accept walk-in patients?', 'Yes! We welcome walk-ins during clinic hours, though we recommend booking in advance for specific treatments to ensure minimal wait time.'],
              ['Is dental treatment painful?', 'We use modern pain management techniques and local anesthesia to ensure your comfort. Most patients report little to no discomfort during treatment.'],
              ['Do you offer EMI / payment plans?', 'Yes, we offer flexible payment options including EMI through major banks and credit cards for larger treatments.'],
              ['How often should I visit the dentist?', 'We recommend a routine checkup every 6 months. Patients with specific conditions may need more frequent visits based on their treatment plan.'],
            ].map(([q, a]) => (
              <FAQItem key={q} question={q} answer={a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item" style={{ background: 'white', borderRadius: 16, border: `1px solid ${open ? 'rgba(14,165,233,0.25)' : 'rgba(14,165,233,0.08)'}`, boxShadow: open ? '0 8px 30px rgba(14,165,233,0.08)' : 'none', transition: 'all 0.3s' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', background: 'none', border: 'none', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', lineHeight: 1.4 }}>{question}</span>
        <span style={{ fontSize: 20, color: '#0ea5e9', transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
      </button>
      {open && <div style={{ padding: '0 24px 20px', color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>{answer}</div>}
    </div>
  );
};

export default Contact;