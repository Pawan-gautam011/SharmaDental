import React, { useState, useEffect, useRef } from 'react';

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

const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView();
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target, duration]);
    return <span ref={ref}>{count}{suffix}</span>;
};

const services = [
    { icon: '🦷', title: 'Dental Implants', desc: 'Permanent, natural-looking tooth replacements that restore your smile and confidence.', color: '#0ea5e9' },
    { icon: '✨', title: 'Teeth Whitening', desc: 'Professional whitening treatments that brighten your smile up to 8 shades.', color: '#10b981' },
    { icon: '🔬', title: 'Root Canal', desc: 'Pain-free root canal therapy using modern techniques and gentle care.', color: '#0ea5e9' },
    { icon: '😁', title: 'Orthodontics', desc: 'Braces and aligners for straighter teeth and a perfectly aligned bite.', color: '#10b981' },
    { icon: '💎', title: 'Cosmetic Dentistry', desc: 'Veneers, bonding, and smile makeovers tailored to your unique beauty.', color: '#0ea5e9' },
    { icon: '🌿', title: 'Facial Aesthetics', desc: 'Non-surgical facial treatments that refresh, rejuvenate and restore.', color: '#10b981' },
];

const testimonials = [
    { name: 'Priya Sharma', text: 'Dr. Sharma transformed my smile completely! The implants look so natural. Best dental experience I have ever had.', rating: 5, avatar: 'PS' },
    { name: 'Rahul Gupta', text: 'The teeth whitening results were incredible. The staff is gentle, caring, and professional. Highly recommended!', rating: 5, avatar: 'RG' },
    { name: 'Anjali Singh', text: 'I was terrified of dentists, but this clinic changed everything. So calm, so professional. My smile has never looked better.', rating: 5, avatar: 'AS' },
];

export const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [heroVisible, setHeroVisible] = useState(false);
    const [servicesRef, servicesInView] = useInView();
    const [statsRef, statsInView] = useInView();
    const [testimonialsRef, testimonialsInView] = useInView();
    const [ctaRef, ctaInView] = useInView();

    useEffect(() => {
        setTimeout(() => setHeroVisible(true), 100);
        const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ fontFamily: "'DM Sans', 'Nunito', sans-serif", overflowX: 'hidden' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');
        :root {
          --green: #10b981; --blue: #0ea5e9; --dark: #0f172a; --mid: #334155;
          --light: #f0fdf9; --accent: #06d6a0;
        }
        .hero-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18; animation: blobMove 8s ease-in-out infinite alternate; }
        @keyframes blobMove { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(30px,20px) scale(1.08)} }
        .hero-float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        .fade-up { opacity:0; transform:translateY(40px); transition:opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity:1; transform:translateY(0); }
        .service-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .service-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(14,165,233,0.15); }
        .testimonial-dot { width:10px; height:10px; border-radius:50%; cursor:pointer; transition:all 0.3s; }
        .wave-divider { position:absolute; bottom:0; left:0; width:100%; overflow:hidden; line-height:0; }
        .pill-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(16,185,129,0.1); color:#10b981; border:1px solid rgba(16,185,129,0.25); border-radius:999px; padding:6px 16px; font-size:13px; font-weight:600; letter-spacing:0.5px; margin-bottom:20px; }
        .gradient-text { background: linear-gradient(135deg, #0ea5e9, #10b981); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .btn-primary { background: linear-gradient(135deg, #0ea5e9, #10b981); color:white; border:none; border-radius:999px; padding:14px 32px; font-size:15px; font-weight:600; cursor:pointer; transition:all 0.3s; box-shadow:0 4px 20px rgba(14,165,233,0.35); }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(14,165,233,0.45); }
        .btn-outline { background:transparent; color:#0ea5e9; border:2px solid #0ea5e9; border-radius:999px; padding:12px 30px; font-size:15px; font-weight:600; cursor:pointer; transition:all 0.3s; }
        .btn-outline:hover { background:#0ea5e9; color:white; }
        @media(max-width:768px) { .hero-grid { flex-direction: column!important; } .hero-image-wrap { display:none!important; } }
      `}</style>

            {/* ── HERO ── */}
            <section style={{ minHeight: '100vh', background: 'linear-gradient(145deg, #f0fdf9 0%, #e0f7fa 40%, #e8f4fd 100%)', position: 'relative', display: 'flex', alignItems: 'center', paddingTop: 80 }}>
                <div className="hero-blob" style={{ width: 500, height: 500, background: '#0ea5e9', top: -100, right: -100 }} />
                <div className="hero-blob" style={{ width: 400, height: 400, background: '#10b981', bottom: -50, left: -80, animationDelay: '2s' }} />

                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 2 }}>
                    <div className="hero-grid" style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
                        {/* Left */}
                        <div style={{ flex: 1, maxWidth: 580 }}>
                            <div className="pill-badge" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
                                <span>✦</span> Trusted by 5,000+ Patients
                            </div>
                            <h1 style={{
                                fontFamily: "'Playfair Display', serif", fontSize: 'clamp(38px, 5vw, 68px)', fontWeight: 800, lineHeight: 1.1,
                                color: '#0f172a', marginBottom: 24,
                                opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease 0.1s'
                            }}>
                                Your Smile, <span className="gradient-text">Our Passion</span>
                            </h1>
                            <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 36, maxWidth: 480, opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease 0.2s' }}>
                                Experience world-class dental and facial care with the latest technology and a compassionate team that puts your comfort first.
                            </p>
                            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', opacity: heroVisible ? 1 : 0, transition: 'all 0.7s ease 0.3s' }}>
                                <button className="btn-primary">Book Appointment</button>
                                <button className="btn-outline">View Services</button>
                            </div>
                            {/* Trust badges */}
                            <div style={{ display: 'flex', gap: 24, marginTop: 40, opacity: heroVisible ? 1 : 0, transition: 'all 0.7s ease 0.4s', flexWrap: 'wrap' }}>
                                {[['⭐', '4.9/5', 'Rating'], ['🏆', '15+', 'Years Exp.'], ['😊', '5000+', 'Patients']].map(([icon, val, label]) => (
                                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', borderRadius: 12, padding: '10px 18px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                                        <span style={{ fontSize: 20 }}>{icon}</span>
                                        <div><div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>{val}</div><div style={{ fontSize: 12, color: '#94a3b8' }}>{label}</div></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Illustration */}
                        <div className="hero-image-wrap" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <div className="hero-float" style={{ position: 'relative', opacity: heroVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.5s' }}>
                                {/* Main card */}
                                <div style={{ width: 320, height: 380, background: 'white', borderRadius: 32, boxShadow: '0 30px 80px rgba(14,165,233,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                                    <div style={{ width: 160, height: 160, background: 'linear-gradient(135deg, #e0f7fa, #e8f4fd)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, marginBottom: 20 }}>🦷</div>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', textAlign: 'center', marginBottom: 8 }}>Advanced Dental Care</div>
                                    <div style={{ fontSize: 14, color: '#64748b', textAlign: 'center' }}>Modern technology meets compassionate care</div>
                                </div>
                                {/* Floating badges */}
                                <div style={{ position: 'absolute', top: -20, right: -40, background: 'white', borderRadius: 16, padding: '12px 18px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: 13, fontWeight: 600, color: '#10b981' }}>✓ Pain-Free Treatment</div>
                                <div style={{ position: 'absolute', bottom: 40, left: -50, background: 'linear-gradient(135deg,#0ea5e9,#10b981)', borderRadius: 16, padding: '12px 18px', boxShadow: '0 10px 30px rgba(14,165,233,0.3)', fontSize: 13, fontWeight: 600, color: 'white' }}>🌟 5-Star Care</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wave-divider">
                    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* ── STATS ── */}
            <section ref={statsRef} style={{ background: 'white', padding: '60px 24px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32, textAlign: 'center' }}>
                    {[['5000+', 'Happy Patients'], ['15+', 'Years Experience'], ['98%', 'Success Rate'], ['20+', 'Expert Doctors']].map(([num, label], i) => (
                        <div key={label} className={`fade-up ${statsInView ? 'visible' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                            <div className="gradient-text" style={{ fontSize: 48, fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>{num}</div>
                            <div style={{ color: '#64748b', fontSize: 15, marginTop: 4, fontWeight: 500 }}>{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section ref={servicesRef} style={{ background: 'linear-gradient(180deg,#f8fafc 0%,#f0fdf9 100%)', padding: '100px 24px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 60 }}>
                        <div className="pill-badge" style={{ justifyContent: 'center' }}><span>✦</span> What We Offer</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
                            Comprehensive <span className="gradient-text">Dental Services</span>
                        </h2>
                        <p style={{ color: '#64748b', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>From routine checkups to advanced cosmetic procedures, we offer everything your smile needs.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 28 }}>
                        {services.map((s, i) => (
                            <div key={s.title} className={`service-card fade-up ${servicesInView ? 'visible' : ''}`}
                                style={{ background: 'white', borderRadius: 24, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(14,165,233,0.08)', cursor: 'pointer', transitionDelay: `${i * 0.08}s` }}>
                                <div style={{ width: 56, height: 56, background: `${s.color}15`, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 20 }}>{s.icon}</div>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{s.title}</h3>
                                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
                                <div style={{ marginTop: 20, color: s.color, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>Learn more <span>→</span></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHY CHOOSE US ── */}
            <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: '#0ea5e9', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.08 }} />
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
                    <div>
                        <div className="pill-badge" style={{ background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.3)', color: '#10b981' }}><span>✦</span> Why Choose Us</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'white', marginBottom: 20, lineHeight: 1.2 }}>
                            Care You Can <span className="gradient-text">Trust</span>
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.75, marginBottom: 36 }}>We combine cutting-edge technology with genuine compassion to deliver dental care that's truly exceptional—from your first visit to your last.</p>
                        <button className="btn-primary">Schedule a Free Consultation</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {[
                            ['🔬', 'Advanced Technology', 'Digital X-rays, 3D imaging, and laser treatments for precise, comfortable care.'],
                            ['💊', 'Pain-Free Experience', 'Gentle techniques and sedation options ensure a stress-free visit every time.'],
                            ['🏅', 'Expert Team', 'Board-certified dentists with 15+ years of combined experience.'],
                            ['🕐', 'Flexible Scheduling', 'Evening and weekend slots available to fit your busy lifestyle.'],
                        ].map(([icon, title, desc]) => (
                            <div key={title} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 20, border: '1px solid rgba(255,255,255,0.07)' }}>
                                <div style={{ fontSize: 28, flexShrink: 0 }}>{icon}</div>
                                <div>
                                    <div style={{ color: 'white', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{title}</div>
                                    <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section ref={testimonialsRef} style={{ background: 'white', padding: '100px 24px' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                    <div className="pill-badge" style={{ justifyContent: 'center' }}><span>✦</span> Patient Stories</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0f172a', marginBottom: 48 }}>
                        What Our <span className="gradient-text">Patients Say</span>
                    </h2>
                    <div style={{ background: 'linear-gradient(135deg,#f0fdf9,#e8f4fd)', borderRadius: 28, padding: '48px 40px', boxShadow: '0 8px 40px rgba(14,165,233,0.1)', minHeight: 220, position: 'relative' }}>
                        <div style={{ fontSize: 60, color: '#0ea5e9', opacity: 0.2, position: 'absolute', top: 16, left: 30, fontFamily: 'serif', lineHeight: 1 }}>"</div>
                        <p style={{ fontSize: 18, color: '#334155', lineHeight: 1.75, marginBottom: 28, position: 'relative', fontStyle: 'italic' }}>{testimonials[activeTestimonial].text}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#0ea5e9,#10b981)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{testimonials[activeTestimonial].avatar}</div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>{testimonials[activeTestimonial].name}</div>
                                <div style={{ color: '#f59e0b', fontSize: 13 }}>{'★'.repeat(testimonials[activeTestimonial].rating)}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 24 }}>
                        {testimonials.map((_, i) => (
                            <div key={i} className="testimonial-dot" onClick={() => setActiveTestimonial(i)}
                                style={{ background: i === activeTestimonial ? '#0ea5e9' : '#e2e8f0', transform: i === activeTestimonial ? 'scale(1.3)' : 'none' }} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section ref={ctaRef} style={{ background: 'linear-gradient(135deg,#0ea5e9,#10b981)', padding: '80px 24px', textAlign: 'center' }}>
                <div className={`fade-up ${ctaInView ? 'visible' : ''}`} style={{ maxWidth: 600, margin: '0 auto' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: 'white', marginBottom: 16 }}>Ready for a Healthier Smile?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, marginBottom: 36 }}>Book your free consultation today and take the first step toward the smile you've always dreamed of.</p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button style={{ background: 'white', color: '#0ea5e9', border: 'none', borderRadius: 999, padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}
                            onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
                            onMouseOut={e => e.target.style.transform = 'none'}>
                            📅 Book Appointment
                        </button>
                        <button style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 999, padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseOver={e => { e.target.style.background = 'rgba(255,255,255,0.25)'; }}
                            onMouseOut={e => { e.target.style.background = 'rgba(255,255,255,0.15)'; }}>
                            📞 Call Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};