import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Dental Implants', 'Root Canal Treatment', 'Teeth Whitening',
    'Orthodontics', 'Facial Aesthetics', 'Cosmetic Dentistry',
  ];

  return (
    <footer style={{ background: 'linear-gradient(145deg, #f0fdf9 0%, #e0f7fa 40%, #e8f4fd 100%)', color: 'white', fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap');
        .footer-link { color:#000000; font-size:14px; text-decoration:none; transition:color 0.2s; display:block; padding:3px 0; }
        .footer-link:hover { color:#10b981; }
        .social-btn { width:40px; height:40px; background:rgba(255,255,255,0.06); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; cursor:pointer; transition:all 0.25s; border:1px solid rgba(255,255,255,0.1); text-decoration:none; }
        .social-btn:hover { background:linear-gradient(135deg,#0ea5e9,#10b981); border-color:transparent; transform:translateY(-3px); }
      `}</style>

      {/* Top Wave */}
      <div style={{ overflow: 'hidden', lineHeight: 0, marginBottom: -2 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <path d="M0,30 C480,60 960,0 1440,30 L1440,0 L0,0 Z" fill="#f8fafc" />
        </svg>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 48, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#0ea5e9,#10b981)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 20 }}>S</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 800, background: 'linear-gradient(135deg,#0ea5e9,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sharma Dental</div>
                <div style={{ fontSize: 10, color: '#64748b' }}>Oral Care & Face Clinic</div>
              </div>
            </div>
            <p style={{ color: '#000000', fontSize: 14, lineHeight: 1.75, marginBottom: 24, maxWidth: 260 }}>
              Providing exceptional dental and facial care with modern technology and genuine compassion since 2008.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                <a key={i} href="#" className="social-btn">{icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: 'black', marginBottom: 20, letterSpacing: '0.3px' }}>Quick Links</h4>
            {quickLinks.map(link => (
              <Link key={link.name} to={link.path} className="footer-link">{link.name}</Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'black', marginBottom: 20 }}>Our Services</h4>
            {services.map(s => (
              <Link key={s} to="/services" className="footer-link  ">{s}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'black', marginBottom: 20 }}>Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['📍', '123 Bardibas Road'],
                ['📞', '+977 9864152876'],
                ['📧', 'info@sharmadental.com'],
                ['🕐', 'Sun–Sat: 9am–8pm'],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }}>{icon}</span>
                  <span style={{ color: '#000000', fontSize: 13, lineHeight: 1.65 }}>{text.split('\n').map((t, i) => <span key={i}>{t}{i === 0 && text.includes('\n') ? <br /> : ''}</span>)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 28, paddingBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#64748b', fontSize: 13 }}>© 2024 Sharma Oral Dental Care and Face Clinic. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" style={{ color: '#64748b', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={e => e.target.style.color = '#10b981'}
                onMouseOut={e => e.target.style.color = '#64748b'}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;